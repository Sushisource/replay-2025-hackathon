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
  const initialInput = wfInput.promptInitialInput;
  let verificationFeedback = initialVerifyOutcome;

  const verifyInput: VerifyInput = {
    verifyTargetPath: `${wfInput.promptInitialInput.workingDirectory}/runner.ts`,
  };

  let aiInput = initialInput;
  while (!verificationFeedback.success) {
    console.log("Applying AI tool to source...");

    await runAiTool(aiInput);

    console.log("Verifying updates applied by AI...");

    verificationFeedback = await verifyTargetSource(verifyInput, verifyConfig);

    console.log("Verification outcome:", verificationFeedback);
    if (verificationFeedback.success) {
      break;
    }
    aiInput = resolveAiInput(aiInput, verificationFeedback);
  }
  return "Verification succeeded!";
}
