import { Connection, Client } from "@temporalio/client";
import { example } from "./workflows";
import { nanoid } from "nanoid";
import path from "node:path";

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: "localhost:7233" });

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(example, {
    taskQueue: "hello-world",
    // type inference works! args: [name: string]
    args: [
      {
        promptInitialInput: {
          input:
            "Edit src/target-project/editme.ts to fix any type errors, and correct any mistakes in the game of life implementation. Also optimize the implementation.",
          extraArguments: ["--sonnet"],
          workingDirectory: path.resolve(__dirname, "target-project"),
        },
      },
    ],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: "workflow-" + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
