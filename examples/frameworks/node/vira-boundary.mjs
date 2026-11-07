/**
 * Call Vira's documented governed runtime resolver from a server-side
 * framework boundary. This wrapper does not execute a model or authorize a
 * local action; callers must inspect and preserve the Vira result.
 */
export async function resolveViraBoundary(
  vira,
  { behaviorPoint, scope, idempotencyKey },
) {
  if (!vira || typeof vira.resolveRuntime !== "function") {
    throw new TypeError("A published ViraClient with resolveRuntime is required");
  }
  if (!behaviorPoint || !scope?.organizationId || !scope?.projectId || !scope?.environmentId) {
    throw new TypeError("behaviorPoint and complete Vira execution scope are required");
  }
  if (!idempotencyKey) {
    throw new TypeError("A stable idempotencyKey is required for this runtime request");
  }

  return vira.resolveRuntime({
    behaviorPoint,
    executionBoundary: scope,
    idempotencyKey,
  });
}
