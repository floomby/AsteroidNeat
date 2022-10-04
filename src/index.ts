import { Domain, progenerate, printGenome, computePlan, printPlan, compute, topologicalInsertionMutation } from "./neat";

import { playGame, startSimulations, resumeFromCheckpoint, initDB } from "./game";

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

const toRun = () => {
  const restart = document.getElementById("restart") as HTMLButtonElement;
  const resume = document.getElementById("resume") as HTMLButtonElement;
  const play = document.getElementById("play") as HTMLButtonElement;
  const onlyHighlighted = document.getElementById("onlyHighlighted") as HTMLInputElement;

  restart.onclick = () => {
    startSimulations();
  }

  resume.onclick = () => {
    resumeFromCheckpoint();
  }

  play.onclick = () => {
    play.blur();
    playGame(onlyHighlighted.checked);
  }

  initDB(() => {
    restart.disabled = false;
    resume.disabled = false;
    play.disabled = false;
    onlyHighlighted.disabled = false;
  });
};

if (document.readyState === "complete") {
  toRun();
} else {
  document.addEventListener("DOMContentLoaded", toRun);
}
