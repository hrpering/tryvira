import { ViraClient } from "@tryvira/sdk";

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
};

const vira = new ViraClient({
  baseUrl: required("VIRA_API_URL"),
  apiKey: process.env.VIRA_API_KEY,
});

const capabilities = await vira.listCapabilities({ surface: "sdk" });
console.log("Capabilities:", JSON.stringify(capabilities?.body, null, 2));

const task = await vira.createSemanticTask({
  taskKey: "marketing.launch_plan",
  description: "Create a measurable launch plan",
  examples: [
    "Build a launch plan for a membership product",
    "Create a go-to-market launch plan for a subscription service"
  ],
  negativeExamples: [
    "Write a single ad headline",
    "Summarize last month's campaign report"
  ]
}, {
  idempotencyKey: "example:semantic-task:marketing.launch_plan:v1"
});

const taskId = String(task?.body?.task?.id ?? "");
if (!taskId) throw new Error("Semantic Task creation did not return a task id");

const point = await vira.createBehaviorPoint({
  key: "marketing.launch_plan",
  taskId,
  constraints: [
    "cover the required funnel stages",
    "include a measurement approach",
    "do not fabricate historical performance"
  ]
}, {
  idempotencyKey: "example:behavior-point:marketing.launch_plan:v1"
});

console.log(JSON.stringify({
  task: task?.body,
  behaviorPoint: point?.body
}, null, 2));
