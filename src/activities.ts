import {
  VerifyOutput,
  VerifyConfig,
  VerifyInput,
} from "./configs/verify.types";
import { ModelInput, ModelOutput } from "./models";
import { spawn, execSync } from "node:child_process";

export async function runAiTool(mi: ModelInput): Promise<ModelOutput> {
  const { input, workingDirectory } = mi;
  const output: ModelOutput = {
    stdout: "",
    stderr: "",
    ranSuccessfully: false,
  };
  let sawInputPrompt = false;
  let lastSawNewOutputAt = Date.now();
  function recheckOutput() {
    lastSawNewOutputAt = Date.now();
  }
  console.log("Spawning aider using working dir", workingDirectory);
  let args = ["--no-auto-commits", "--yes-always", "--no-restore-chat-history"];
  args = args.concat(...mi.extraArguments);
  args = args.concat("-m", input);
  const child = spawn("aider", args, {
    cwd: workingDirectory,
  });
  child.stdout.on("data", (data) => {
    output.stdout += data;
    console.log(":::", output.stdout);
    recheckOutput();
  });
  child.stderr.on("data", (data) => {
    output.stderr += data;
    recheckOutput();
  });
  await new Promise((resolve) => {
    child.on("close", (code) => {
      output.ranSuccessfully = code === 0;
      resolve(code);
    });
  });
  console.log("Aider Output", output);
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

    if (
      input.expectOutput !== undefined &&
      verifierOutput !== input.expectOutput
    ) {
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
