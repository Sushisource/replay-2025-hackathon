/**
 * Input to the overall workflow
 */
export interface AIHelperWorkflowInput {
  /** Directory to the project that the activites should run in */
  workingDirectory: string;
  /** Initial input to the AI tool runner */
  promptInitialInput: ModelInput;
}

/**
 * Input to the AI prompt
 */
export interface ModelInput {
  /** Input prompt for the tool */
  input: string;
  /** Command to use for the AI tool */
  subprocess: string;
}

export interface ModelOutput {
  stdout: string;
  stderr: string;
  ranSuccessfully: boolean;
}

/** Input to the tool that verifies AI changes */
export interface VerificationToolInput {
  /** Command to use for the verification tool */
  subprocess: string;
  /** Extra arguments to the verification tool */
  arguments: string[];
}
