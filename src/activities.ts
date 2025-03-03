import { execSync } from "child_process";
import { VerificationResult, VerifyConfig } from "./configs/config.types";

export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function verifyTargetSource(
  sourceLocation: string,
  verifier: VerifyConfig
): Promise<VerificationResult> {
  try {
    const verifierOutput = execSync(
      `${verifier.path} ${verifier.options} ${sourceLocation}`,
      {
        encoding: "utf-8",
      }
    ).trim();
    return { success: true, output: verifierOutput };
  } catch (error) {
    const errorMessage = (error as any).message;
    return { success: false, output: errorMessage };
  }
}

// @@@SNIPEND
