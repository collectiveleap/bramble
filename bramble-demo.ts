// Live demo: drives the Phoenix-GENERATED GraphDAG engine through the core
// Bramble behaviors and renders the outline. Run: `node bramble-demo.ts`
import { GraphDAG, type NodeId } from './src/generated/graph/graph-dag.ts';

type AR<T> = { ok: true; value: T } | { ok: false; reason: string };
const must = <T,>(r: AR<T>): T => { if (!r.ok) throw new Error(r.reason); return r.value; };

const g = new GraphDAG();
const under = (parent: NodeId, content: string): NodeId =>
  must(g.createNodeUnder(parent, content)).newNodeId;

function render(): string {
  const out: string[] = [];
  const walk = (parent: NodeId | null, depth: number) => {
    for (const id of g.getChildren(parent)) {
      const node = g.getNode(id)!;
      const kids = g.getChildren(id);
      const expanded = g.getOccurrenceState(parent, id).expanded;
      const collapsed = !expanded && kids.length > 0;
      const marker = collapsed ? '▸' : kids.length ? '▾' : '•';
      const badge = g.getBadgeInfo(id);
      const tag = badge.showBadge ? `   ⟨appears in ${badge.predecessorCount} places⟩` : '';
      out.push(`${'   '.repeat(depth)}${marker} ${node.content}${tag}`);
      if (!collapsed) walk(id, depth + 1);
    }
  };
  walk(null, 0);
  return out.join('\n');
}
const check = (label: string, cond: boolean) =>
  console.log(`   ${cond ? '✓' : '✗ FAIL'}  ${label}`);

console.log('━━━ Bramble core — running the generated GraphDAG engine ━━━\n');

// 1) Build an outline
const groceries = g.createNode('Groceries');
const milk = under(groceries, 'Milk');
const eggs = under(groceries, 'Eggs');
under(groceries, 'Bread');
const project = g.createNode('Project Bramble');
const spec = under(project, 'Write the spec');
under(project, 'Generate the code');
console.log('1) Build an outline by typing bullets:\n');
console.log(render());

// 2) Indent (Tab): Eggs nests under Milk
console.log('\n2) Tab on "Eggs" → nests under "Milk":\n');
check('indent succeeded', g.indent(groceries, eggs).ok);
console.log(render());

// 3) Multi-parent DAG: the same node lives in two places
console.log('\n3) Add the existing "Write the spec" node ALSO under Groceries');
console.log('   (one node, two parents — the DAG, not a copy):\n');
check('add-existing succeeded', g.addExistingNodeUnder(groceries, spec).ok);
console.log(render());
check('"Write the spec" now has 2 predecessors (single identity, two occurrences)',
  g.getBadgeInfo(spec).predecessorCount === 2);

// 4) Cycle prevention is a system invariant
console.log('\n4) Try to nest "Project Bramble" under its own descendant "Write the spec":\n');
const cyc = g.addExistingNodeUnder(spec, project);
check('refused (graph stays acyclic)', cyc.ok === false);
if (!cyc.ok) console.log(`   reason: ${cyc.reason}`);

// 5) Per-occurrence collapse
console.log('\n5) Collapse the "Groceries" occurrence:\n');
g.setOccurrenceState(null, groceries, { expanded: false });
console.log(render());

console.log('\n━━━ done — that is generated-from-spec Bramble, actually running ━━━');
