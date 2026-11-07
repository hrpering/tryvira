export function requireSafeTutorialScope() {
  if (process.env.VIRA_TUTORIAL_NON_PRODUCTION !== "true") {
    throw new Error("Set VIRA_TUTORIAL_NON_PRODUCTION=true only after verifying VIRA_API_URL and scope target an isolated non-production environment");
  }
  if (process.env.VIRA_TUTORIAL_ALLOW_MUTATIONS !== "true") {
    throw new Error("Set VIRA_TUTORIAL_ALLOW_MUTATIONS=true to authorize this tutorial step's writes");
  }
}
