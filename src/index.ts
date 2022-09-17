import {
  Domain,
  progenerate,
  printGenome,
  computePlan,
  printPlan,
  compute,
} from "./neat";

import { tester } from "./game";

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

if (document.readyState === "complete") {
  tester();
} else {
  document.addEventListener("DOMContentLoaded", tester);
}

