// Only these known read-only public operations are eligible for the example.
export function buildInspectionInput(tool, raw, env) {
  const inspectedReadOnly = new Set([
    "get_scope", "list_capabilities", "list_ai_systems", "list_semantic_tasks",
    "list_behavior_points", "list_behavior_strategies", "list_packs",
  ]);
  if (!inspectedReadOnly.has(tool?.name)
    || tool.annotations?.readOnlyHint === false
    || tool.annotations?.destructiveHint === true
    || tool.annotations?.openWorldHint === true) {
    throw new Error("This discovery example is read-only. Use the documented server-owned approval workflow for writes.");
  }
  const input = JSON.parse(raw);
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("VIRA_MCP_ARGUMENTS must be a JSON object");
  }
  if (tool.inputSchema?.type !== "object" || !tool.inputSchema.properties) {
    throw new Error("Missing supported live input schema");
  }
  const scopeFields = {
    organizationId: "VIRA_ORGANIZATION_ID", projectId: "VIRA_PROJECT_ID",
    environmentId: "VIRA_ENVIRONMENT_ID", organizationUnitId: "VIRA_ORGANIZATION_UNIT_ID",
  };
  for (const [field, key] of Object.entries(scopeFields)) {
    if (!Object.hasOwn(tool.inputSchema.properties, field)) continue;
    const value = env[key];
    if (value && input[field] !== undefined && input[field] !== value) throw new Error(`Scope mismatch: ${field}`);
    if (!value && (input[field] !== undefined || tool.inputSchema.required?.includes(field))) throw new Error(`${key} is required`);
    if (value) input[field] = value;
  }
  for (const field of tool.inputSchema.required ?? []) {
    if (input[field] === undefined || input[field] === null) throw new Error(`Missing required argument: ${field}`);
  }
  return input;
}
