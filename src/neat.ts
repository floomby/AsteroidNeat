// import assert from "assert";

// This implementation is slow as snails

type Domain = { inputs: number; outputs: number };

type Edge = {
  from: number;
  to: number;
  weight: number;
  innovation: number;
  enabled: boolean;
};

type Genome = { domain: Domain; edges: Edge[]; nodeCount: number };

const cloneGenome = (genome: Genome): Genome => {
  return {
    domain: genome.domain,
    edges: genome.edges.map((edge) => ({ ...edge })),
    nodeCount: genome.nodeCount,
  };
};

const isInputNode = (genome: Genome, node: number): boolean => {
  return node < genome.domain.inputs;
};

const isOutputNode = (genome: Genome, node: number): boolean => {
  return node >= genome.domain.inputs && node < genome.domain.inputs + genome.domain.outputs;
};

const isHiddenNode = (genome: Genome, node: number): boolean => {
  return node >= genome.domain.inputs + genome.domain.outputs;
};

const canConnect = (genome: Genome, from: number, to: number): boolean => {
  if (isInputNode(genome, to)) {
    return false;
  }
  if (isOutputNode(genome, from)) {
    return false;
  }
  // check if there is a cycle
  const visited = new Set<number>();
  const queue = [to];
  while (queue.length > 0) {
    const node = queue.pop()!;
    if (node === from) {
      return false;
    }
    if (visited.has(node)) {
      continue;
    }
    visited.add(node);
    for (const edge of genome.edges) {
      if (edge.from === node && edge.enabled) {
        queue.push(edge.to);
      }
    }
  }
  return true;
};

const onlyNew = (genome: Genome): Genome => {
  const innovationBound = genome.domain.inputs + genome.domain.outputs;
  return {
    domain: genome.domain,
    edges: genome.edges.filter((edge) => edge.innovation >= innovationBound),
    nodeCount: genome.nodeCount,
  };
};

// I thought that cycles appearing was a bug, but it is not.
// The appearance of cycles is consistent with what is outlined in the paper.
// Nevertheless the crossover rejects cycles when creating a merged topology.
const crossover = (a: Genome, b: Genome): Genome => {
  console.assert(a.domain.inputs === b.domain.inputs);
  console.assert(a.domain.outputs === b.domain.outputs);
  const innovations = new Set<number>();
  for (const edge of a.edges) {
    innovations.add(edge.innovation);
  }
  for (const edge of b.edges) {
    innovations.add(edge.innovation);
  }
  const edges: Edge[] = [];
  for (const innovation of innovations) {
    const edgeA = a.edges.find((edge) => edge.innovation === innovation);
    const edgeB = b.edges.find((edge) => edge.innovation === innovation);
    if (!edgeA) {
      if (!canConnect({ domain: a.domain, edges, nodeCount: Math.max(a.nodeCount, b.nodeCount) }, edgeB.from, edgeB.to)) {
        console.log("Cannot connect", edgeB.from, edgeB.to);
        continue;
      }
      edges.push(edgeB!);
      continue;
    } else if (!edgeB) {
      edges.push(edgeA);
      if (!canConnect({ domain: a.domain, edges, nodeCount: Math.max(a.nodeCount, b.nodeCount) }, edgeA.from, edgeA.to)) {
        console.log("Cannot connect", edgeA.from, edgeA.to);
        continue;
      }
      continue;
    }
    console.assert(edgeA.from === edgeB.from);
    console.assert(edgeA.to === edgeB.to);
    if (!canConnect({ domain: a.domain, edges, nodeCount: Math.max(a.nodeCount, b.nodeCount) }, edgeA.from, edgeA.to)) {
      console.log("Cannot connect", edgeA.from, edgeA.to);
      continue;
    }

    edges.push({
      from: edgeA.from,
      to: edgeA.to,
      weight: Math.random() < 0.5 ? edgeA.weight : edgeB.weight,
      innovation,
      enabled: edgeA.enabled && edgeB.enabled,
    });
  }
  return {
    domain: a.domain,
    edges,
    nodeCount: Math.max(a.nodeCount, b.nodeCount),
  };
};

const insertEdgeMutation = (genome: Genome, edgeIndex: number, innovation: number): { genome: Genome; innovationIndex: number } => {
  const edges = genome.edges.map((edge) => ({ ...edge }));
  const edge = edges[edgeIndex];
  console.assert(edge.enabled);
  edge.enabled = false;
  edges.push({
    from: edge.from,
    to: genome.nodeCount,
    weight: edge.weight,
    innovation,
    enabled: true,
  });
  // console.log("innovation", innovation);
  edges.push({
    from: genome.nodeCount,
    to: edge.to,
    weight: 0.75 + Math.random() * 0.5,
    innovation: innovation + 1,
    enabled: true,
  });
  // console.log("innovation", innovation + 1);
  return {
    genome: {
      domain: genome.domain,
      edges,
      nodeCount: genome.nodeCount + 1,
    },
    innovationIndex: innovation + 2,
  };
};

const connectMutation = (genome: Genome, innovation: number, from: number, to: number): { genome: Genome; innovationIndex: number } => {
  console.assert(to !== from);
  console.assert(to < genome.nodeCount);
  console.assert(from < genome.nodeCount);
  const edgeCheck = genome.edges.find((edge) => edge.from === from && edge.to === to);
  if (edgeCheck) {
    return { genome, innovationIndex: innovation };
  }
  const edges = genome.edges.map((edge) => ({ ...edge }));
  edges.push({
    from,
    to,
    weight: Math.random() * 0.5 - 0.25,
    innovation,
    enabled: true,
  });
  // console.log("innovation", innovation);
  return {
    genome: {
      domain: genome.domain,
      edges,
      nodeCount: genome.nodeCount,
    },
    innovationIndex: innovation + 1,
  };
};

const connectableTo = (genome: Genome, from: number): number[] => {
  const nodes: number[] = [];
  for (let i = 0; i < genome.nodeCount; i++) {
    if (canConnect(genome, from, i)) {
      nodes.push(i);
    }
  }
  return nodes;
};

const connectableFrom = (genome: Genome, to: number): number[] => {
  const nodes: number[] = [];
  for (let i = 0; i < genome.nodeCount; i++) {
    if (canConnect(genome, i, to)) {
      nodes.push(i);
    }
  }
  return nodes;
};

const topologicalConnectionMutation = (genome: Genome, innovation: number): { genome: Genome; innovationIndex: number } => {
  // let randomHiddenOrOutputNode = Math.floor(Math.random() * (genome.nodeCount - genome.domain.inputs)) + genome.domain.inputs;
  // const connectable = allConnectable(genome, randomHiddenOrOutputNode);
  // if (connectable.length === 0) {
  //   return { genome, innovationIndex: innovation };
  // }
  // const randomConnectable = connectable[Math.floor(Math.random() * connectable.length)];
  // return connectMutation(genome, innovation, randomConnectable, randomHiddenOrOutputNode);
  throw new Error("not implemented");
};

const acceptConnectionRate = 0.02;

const topologicalInsertionMutation = (genome: Genome, innovation: number): { genome: Genome; innovationIndex: number } => {
  let randomEdgeIndex = -1;
  while (randomEdgeIndex === -1) {
    randomEdgeIndex = Math.floor(Math.random() * genome.edges.length);
    if (!genome.edges[randomEdgeIndex].enabled) {
      randomEdgeIndex = -1;
    }
  }

  let done = insertEdgeMutation(genome, randomEdgeIndex, innovation);
  let newGenome = done.genome;
  let newInnovation = done.innovationIndex;

  // connect every possible node to the new node
  const connectTo = connectableTo(newGenome, newGenome.nodeCount - 1);
  for (const connectableNode of connectTo) {
    if (Math.random() < acceptConnectionRate) {
      done = connectMutation(newGenome, newInnovation, newGenome.nodeCount - 1, connectableNode);
      newGenome = done.genome;
      newInnovation = done.innovationIndex;
    }
  }
  const connectFrom = connectableFrom(newGenome, newGenome.nodeCount - 1);
  for (const connectableNode of connectFrom) {
    if (Math.random() < acceptConnectionRate) {
      done = connectMutation(newGenome, newInnovation, connectableNode, newGenome.nodeCount - 1);
      newGenome = done.genome;
      newInnovation = done.innovationIndex;
    }
  }

  return { genome: newGenome, innovationIndex: newInnovation };
};

const printGenome = (genome: Genome): void => {
  console.log(`Genome: ${genome.nodeCount} nodes`);
  for (const edge of genome.edges) {
    console.log(`Edge: ${edge.from} -> ${edge.to} (${edge.weight}) ${edge.enabled ? "enabled" : "disabled"} Innovation: ${edge.innovation}`);
  }
};

// TODO support different activation functions
type ComputeStep = Edge | "activation";

type ComputePlan = { plan: ComputeStep[]; genome: Genome; protection: number };

// This hangs if the dag is not a dag (it shouldn't)
const computePlan = (genome: Genome): ComputePlan => {
  const nodeDeps = new Array<Edge[]>(genome.nodeCount);
  for (const edge of genome.edges) {
    if (!edge.enabled) {
      continue;
    }
    if (!nodeDeps[edge.to]) {
      nodeDeps[edge.to] = [];
    }
    nodeDeps[edge.to].push(edge);
  }
  const nodeComputed = new Array<boolean>(genome.nodeCount).fill(false);
  for (let i = 0; i < genome.domain.inputs; i++) {
    nodeComputed[i] = true;
  }
  const plan: ComputeStep[] = [];
  const computeNode = (node: number): void => {
    if (nodeComputed[node]) {
      return;
    }
    const deps = nodeDeps[node];
    if (!deps) {
      // throw new Error("Invalid topology found while building compute plan (non-input node has no inputs)");
    } else {
      for (const dep of deps) {
        computeNode(dep.from);
        plan.push(dep);
      }
    }
    nodeComputed[node] = true;
    plan.push("activation");
  };
  for (let i = 0; i < genome.domain.outputs; i++) {
    computeNode(genome.domain.inputs + i);
  }
  return { plan, genome, protection: 0 };
};

const printPlan = (plan: ComputeStep[]): void => {
  console.log(`Plan: ${plan.length} steps`);
  for (const step of plan) {
    if (typeof step === "string") {
      console.log(`Step: ${step}`);
      continue;
    }
    console.log(`Step: ${step.from} -> ${step.to} (${step.weight}) ${step.enabled ? "enabled" : "disabled"} Innovation: ${step.innovation}`);
  }
};

// Sigmoid activation function from the NEAT paper
const activation = (x: number): number => 1 / (1 + Math.exp(-x));

// This can be made more efficient by performing the plan in place on an existing array of the correct size
const compute = ({ plan, genome }: ComputePlan, inputs: number[]): number[] => {
  const nodes = new Array<number>(genome.nodeCount).fill(0);
  for (let i = 0; i < inputs.length; i++) {
    nodes[i] = inputs[i];
  }
  let lastNode = Number.NaN;
  for (const step of plan) {
    if (typeof step === "string") {
      // console.assert(step === "activation");
      nodes[lastNode] = activation(nodes[lastNode]);
      continue;
    }
    nodes[step.to] += nodes[step.from] * step.weight;
    lastNode = step.to;
  }
  return nodes.slice(inputs.length);
};

const mutateWeights = (genome: Genome): Genome => {
  const edges = genome.edges.map((edge) => ({ ...edge }));
  for (const edge of edges) {
    if (Math.random() < 0.8) {
      edge.weight += Math.random() * 0.3 - 0.15;
    }
  }
  return {
    domain: genome.domain,
    edges,
    nodeCount: genome.nodeCount,
  };
};

const progenerationConnectionRate = 0.05;

const progenerate = (domain: Domain, size: number): { genomes: Genome[]; innovation: number } => {
  const genomes: Genome[] = [];
  let innovation = 0;
  for (let i = 0; i < size; i++) {
    let progenitor: Genome = {
      domain,
      edges: [],
      nodeCount: domain.inputs + domain.outputs,
    };
    for (let i = 0; i < domain.outputs; i++) {
      for (let j = 0; j < domain.inputs; j++) {
        if (Math.random() < progenerationConnectionRate) {
          const done = connectMutation(progenitor, innovation, j, domain.inputs + i);
          progenitor = done.genome;
          innovation = done.innovationIndex;
        }
      }
    }
    genomes.push(mutateWeights(progenitor));
  }
  return { genomes, innovation };
};

const geneticDistance = (a: Genome, b: Genome): number => {
  const aEdges = new Map<number, Edge>();
  for (const edge of a.edges) {
    aEdges.set(edge.innovation, edge);
  }
  const bEdges = new Map<number, Edge>();
  for (const edge of b.edges) {
    bEdges.set(edge.innovation, edge);
  }
  const aKeys = new Set(aEdges.keys());
  const bKeys = new Set(bEdges.keys());
  const disjoint = new Set([...aKeys].filter((x) => !bKeys.has(x)));
  const excess = new Set([...bKeys].filter((x) => !aKeys.has(x)));
  const matching = new Set([...aKeys].filter((x) => bKeys.has(x)));
  let weightDiff = 0;
  for (const key of matching) {
    weightDiff += Math.abs(aEdges.get(key)!.weight - bEdges.get(key)!.weight);
  }
  const n = Math.max(a.nodeCount, b.nodeCount);
  return (disjoint.size + excess.size) / n + weightDiff / matching.size;
};

export {
  Domain,
  Edge,
  Genome,
  ComputePlan,
  progenerate,
  compute,
  printGenome,
  printPlan,
  computePlan,
  mutateWeights,
  connectMutation,
  insertEdgeMutation,
  topologicalConnectionMutation,
  topologicalInsertionMutation,
  geneticDistance,
  crossover,
  isHiddenNode,
  isOutputNode,
  isInputNode,
};
