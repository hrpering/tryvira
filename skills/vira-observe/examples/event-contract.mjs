/**
 * Build an Observe event with the SDK-required identity/scope envelope.
 * Pure function: no network activity and no side effects.
 */
export function makeObservationEvent(input) {
  const fields = ["organizationId", "projectId", "environmentId", "eventId", "eventType", "aiSystemId", "connectionId"];
  for (const key of fields) {
    if (typeof input?.[key] !== "string" || !input[key].trim()) {
      throw new Error("OBSERVE_REQUIRED_" + key);
    }
  }
  if (input.payload !== undefined && (input.payload === null || Array.isArray(input.payload) || typeof input.payload !== "object")) {
    throw new Error("OBSERVE_PAYLOAD_OBJECT_REQUIRED");
  }
  const event = Object.fromEntries(fields.map(key => [key, input[key].trim()]));
  return {...event, ...(input.payload ? {payload: {...input.payload}} : {})};
}
