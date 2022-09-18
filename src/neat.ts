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
      edges.push(edgeB!);
      continue;
    } else if (!edgeB) {
      edges.push(edgeA);
      continue;
    }
    console.assert(edgeA.from === edgeB.from);
    console.assert(edgeA.to === edgeB.to);
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
    weight: Math.random() * 2 - 1,
    innovation,
    enabled: true,
  });
  edges.push({
    from: genome.nodeCount,
    to: edge.to,
    weight: Math.random() * 2 - 1,
    innovation: innovation + 1,
    enabled: true,
  });
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
    weight: Math.random() * 2 - 1,
    innovation,
    enabled: true,
  });
  return {
    genome: {
      domain: genome.domain,
      edges,
      nodeCount: genome.nodeCount,
    },
    innovationIndex: innovation + 1,
  };
};

const printGenome = (genome: Genome): void => {
  console.log(`Genome: ${genome.nodeCount} nodes`);
  for (const edge of genome.edges) {
    console.log(`Edge: ${edge.from} -> ${edge.to} (${edge.weight}) ${edge.enabled ? "enabled" : "disabled"} Innovation: ${edge.innovation}`);
  }
};

// TODO support different activation functions
type ComputeStep = Edge | "activation";

type ComputePlan = { plan: ComputeStep[]; nodeCount: number };

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
      throw new Error("Invalid topology found while building compute plan (non-input node has no inputs)");
    }
    for (const dep of deps) {
      computeNode(dep.from);
      plan.push(dep);
    }
    nodeComputed[node] = true;
    plan.push("activation");
  };
  for (let i = 0; i < genome.domain.outputs; i++) {
    computeNode(genome.domain.inputs + i);
  }
  return { plan, nodeCount: genome.nodeCount };
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
const compute = ({ plan, nodeCount }: ComputePlan, inputs: number[]): number[] => {
  const nodes = new Array<number>(nodeCount).fill(0);
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
      edge.weight += Math.random() * 0.4 - 0.2;
    }
  }
  return {
    domain: genome.domain,
    edges,
    nodeCount: genome.nodeCount,
  };
};

const progenerate = (domain: Domain, size: number): { genomes: Genome[]; innovation: number } => {
  const genomes: Genome[] = [];
  let progenitor: Genome = {
    domain,
    edges: [],
    nodeCount: domain.inputs + domain.outputs,
  };
  let innovation = 0;
  for (let i = 0; i < domain.outputs; i++) {
    for (let j = 0; j < domain.inputs; j++) {
      const { genome, innovationIndex } = connectMutation(progenitor, innovation, j, domain.inputs + i);
      progenitor = genome;
      innovation = innovationIndex;
    }
  }
  for (let i = 0; i < size; i++) {
    genomes.push(mutateWeights(progenitor));
  }
  return { genomes, innovation };
};

export { Domain, Edge, Genome, ComputePlan, progenerate, compute, printGenome, printPlan, computePlan };
