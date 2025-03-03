import { proxyActivities } from "@temporalio/workflow";
// Only import the activity types
import type * as activities from "./activities";
import { VerifyInput, VerifyOutput } from "./configs/verify.types";
import { verifyConfig, initialVerifyOutcome } from "./configs/verify.config";
import { promptPrefixCaption } from "./configs/model.constants";
import { AIHelperWorkflowInput, ModelInput } from "./models";

const { runAiTool, verifyTargetSource } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
  retry: {
    initialInterval: 1,
    backoffCoefficient: 2,
  }
});

function resolveAiInput(
  aiToolInput: ModelInput,
  verificationFeedback: VerifyOutput,
) {
  return verificationFeedback.output
    ? {
        ...aiToolInput,
        input: `${promptPrefixCaption} ${verificationFeedback.output}`,
      }
    : aiToolInput;
}

export async function example(wfInput: AIHelperWorkflowInput): Promise<string> {
  let aiToolInput = wfInput.promptInitialInput;
  let verificationFeedback = initialVerifyOutcome;

  const verifyInput: VerifyInput = {
    verifyTargetPath: `${aiToolInput.workingDirectory}/runner.ts`,
    expectOutput:
      ".....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....",
  };

  while (!verificationFeedback.success) {
    console.log("Applying AI tool to source...");

    const aiInput = resolveAiInput(aiToolInput, verificationFeedback);

    await runAiTool(aiInput);

    console.log("Verification updates applied by AI...");

    verificationFeedback = await verifyTargetSource(verifyInput, verifyConfig);

    console.log("Verification outcome:", verificationFeedback.success);
  }
  return "Done!";
}
