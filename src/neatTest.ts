import {
  Domain,
  progenerate,
  printGenome,
  ComputePlan,
  computePlan,
  printPlan,
  compute,
  mutateWeights,
  insertEdgeMutation,
  topologicalInsertionMutation,
  crossover,
  Genome,
} from "./neat";

import { setupCanvas, drawPoint, drawCircle, drawLine, clearCanvas, Point } from "./game";

const drawGenome = (genome: Genome, where: Point) => {
  const domain = genome.domain;
  
};

const neatTest = () => {};

export { neatTest };
