import {
  VerifyOutput,
  VerifyConfig,
  VerifyInput,
} from "./configs/verify.types";
import { ModelInput, ModelOutput } from "./models";
import { exec, execSync } from "node:child_process";

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

export async function verifyTargetSource(
  input: VerifyInput,
  config: VerifyConfig
): Promise<VerifyOutput> {
  try {
    const verifierOutput = execSync(
      `${config.path} ${config.options} ${input.verifyTargetPath}`,
      {
        encoding: "utf-8",
      }
    ).trim();

    if (verifierOutput !== input.expectOutput) {
      throw new Error(
        `Expected output does not match actual output. Expected: ${input.expectOutput} Actual: ${verifierOutput}`
      );
    }

    return { success: true, output: verifierOutput };
  } catch (error) {
    const errorMessage = (error as any).message;
    return { success: false, output: errorMessage };
  }
}
