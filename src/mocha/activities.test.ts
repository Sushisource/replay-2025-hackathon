import { MockActivityEnvironment } from "@temporalio/testing";
import { describe, it } from "mocha";
import * as activities from "../activities";
import assert from "assert";
import { verifyConfig } from "../configs/verifty.config";

describe("verifyTargetSource activity", async () => {
  it("successfully executes the the project runner", async () => {
    const env = new MockActivityEnvironment();
    const testProjectLocation = "/src/target-project/runner.ts";

    const location = `${process.cwd()}${testProjectLocation}`;

    const result = await env.run(
      activities.verifyTargetSource,
      location,
      verifyConfig
    );
    assert.deepEqual(result, {
      success: true,
      output:
        ".....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....\n.....",
    });
  });
});
