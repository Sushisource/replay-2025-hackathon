import { runAiTool } from "./activities";
import { ModelInput } from "./models";
import path from "node:path";

async function run() {
  const abspath = path.resolve(__dirname, "target-project");
  console.log("path resolve as", abspath);
  const input: ModelInput = {
    input:
      "Edit src/target-project/editme.ts to fix any type errors, and correct any mistakes in the game of life implementation",
    extraArguments: ["--sonnet"],
    workingDirectory: abspath,
  };
  const output = await runAiTool(input);
  console.log("Output", output);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
