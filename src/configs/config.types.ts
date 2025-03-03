export interface VerifyConfig {
  path: string;
  options: string;
}

export interface VerifyInput {
  verifyTargetPath: string;
  expectOutput: any;
}

export interface VerifyOutput {
  success: boolean;
  output: string;
}
