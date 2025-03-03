import { ModelInput, ModelOutput } from "./models";
import { exec } from "node:child_process";

export async function runAiTool(mi: ModelInput): Promise<ModelOutput> {
  const { input, subprocess } = mi;
  const output: ModelOutput = {
    stdout: "",
    stderr: "",
    ranSuccessfully: false,
  };
  let commandArray = [subprocess, input];
  exec(commandArray.join(" "), (error, stdout, stderr) => {
    output.stdout = stdout;
    output.stderr = stderr;
    output.ranSuccessfully = error === null;
  });
  return output;
}
