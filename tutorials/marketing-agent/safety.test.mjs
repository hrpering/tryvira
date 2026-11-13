import assert from "node:assert/strict";
import { test } from "node:test";
import { requireSafeTutorialScope } from "./guard.mjs";

test("tutorial mutations fail closed without non-production scope and explicit opt-in", () => {
  const previous = {
    nonProduction: process.env.VIRA_TUTORIAL_NON_PRODUCTION,
    allowMutations: process.env.VIRA_TUTORIAL_ALLOW_MUTATIONS,
  };
  delete process.env.VIRA_TUTORIAL_NON_PRODUCTION;
  delete process.env.VIRA_TUTORIAL_ALLOW_MUTATIONS;
  assert.throws(requireSafeTutorialScope, /VIRA_TUTORIAL_NON_PRODUCTION/);
  process.env.VIRA_TUTORIAL_NON_PRODUCTION = "true";
  assert.throws(requireSafeTutorialScope, /VIRA_TUTORIAL_ALLOW_MUTATIONS/);
  process.env.VIRA_TUTORIAL_ALLOW_MUTATIONS = "true";
  assert.doesNotThrow(requireSafeTutorialScope);
  if (previous.nonProduction === undefined) delete process.env.VIRA_TUTORIAL_NON_PRODUCTION;
  else process.env.VIRA_TUTORIAL_NON_PRODUCTION = previous.nonProduction;
  if (previous.allowMutations === undefined) delete process.env.VIRA_TUTORIAL_ALLOW_MUTATIONS;
  else process.env.VIRA_TUTORIAL_ALLOW_MUTATIONS = previous.allowMutations;
});
