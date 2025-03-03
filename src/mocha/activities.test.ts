import { MockActivityEnvironment } from "@temporalio/testing";
import { describe, it } from "mocha";
import * as activities from "../activities";
import assert from "assert";
import { verifyConfig } from "../configs/verify.config";
import { VerifyInput } from "../configs/verify.types";

describe("verifyTargetSource activity", async () => {
  it("successfully executes the the project runner", async () => {
    const env = new MockActivityEnvironment();
    const testProjectLocation = "/src/target-project/runner.ts";

    const sourcePath = `${process.cwd()}${testProjectLocation}`;

    const verifyInput: VerifyInput = {
      verifyTargetPath: sourcePath,
      expectOutput:
        ".....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....",
    };

    const result = await env.run(
      activities.verifyTargetSource,
      verifyInput,
      verifyConfig
    );

    assert.deepEqual(result, {
      success: true,
      output:
        ".....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....",
    });
  });

  it("fail to match the expected outcome", async () => {
    const env = new MockActivityEnvironment();
    const testProjectLocation = "/src/target-project/runner.ts";

    const sourcePath = `${process.cwd()}${testProjectLocation}`;

    const verifyInput: VerifyInput = {
      verifyTargetPath: sourcePath,
      expectOutput:
        ".....\n.....\n.....\n.....\n.....\n.....\n.....\n...\n...\n...",
    };

    const result = await env.run(
      activities.verifyTargetSource,
      verifyInput,
      verifyConfig
    );

    assert.deepEqual(result, {
      success: false,
      output:
        "Expected output does not match actual output. Expected: .....\n.....\n.....\n.....\n.....\n.....\n.....\n...\n...\n... Actual: .....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....",
    });
  });
});
