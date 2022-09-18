import { Domain, progenerate, printGenome, computePlan, printPlan, compute, topologicalInsertionMutation } from "./neat";

import { tester, tester2 } from "./game";

// const test = () => {
//   const domain = { inputs: 3, outputs: 2 };
//   const { genomes, innovation } = progenerate(domain, 10);
//   for (const genome of genomes) {
//     printGenome(genome);
//     const plan = computePlan(genome);
//     printPlan(plan.plan);
//     console.log(compute(plan, [1, 2, 3]));
//   }
// };

const toRun = tester2;

if (document.readyState === "complete") {
  toRun();
} else {
  document.addEventListener("DOMContentLoaded", toRun);
}
