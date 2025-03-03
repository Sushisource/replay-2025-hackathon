import { VerificationResult, VerifyConfig } from "./configs/config.types";
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
  source: string,
  verifier: VerifyConfig,
): Promise<VerificationResult> {
  try {
    const verifierOutput = execSync(
      `${verifier.path} ${verifier.options} ${source}`,
      {
        encoding: "utf-8",
      },
    ).trim();
    return { success: true, output: verifierOutput };
  } catch (error) {
    const errorMessage = (error as any).message;
    return { success: false, output: errorMessage };
  }
}
