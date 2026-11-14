# Recipe Preferences Pack · Beginner (v1.1.0)

Keep **vegetarian and onion-free** defaults across short requests, follow-ups and conflicting user instructions, while still producing useful cooking instructions.

The Program checks not only obvious meat and onion but onion powder, stock, leek, scallion, fish sauce and gelatin. It must not mistake vegetarian for vegan, or ban garlic and eggs without a separate reason. A dish adaptation should preserve practical cooking function, quantities and servings; missing pantry information must not be invented.

## Try

- "Make menemen for two." Should be cookable, onion-free and may use eggs.
- "Use my vegetable stock with onion powder." Should identify the hidden ingredient and offer an alternative.
- "Add lamb to the stuffed eggplant." Should acknowledge the standing constraint and offer a viable vegetarian filling.
- "Use whatever is in my pantry." Should not invent pantry contents.

The 26 design-time cases cover baseline cooking, hidden derivatives, conflicts, missing inputs, quality and out-of-scope routing. A **real domain judge extension** is required for the semantic `post_model` checks; a deterministic non-empty check alone is insufficient. `onFailure: repair` is only meaningful when a bounded repair path actually exists.

[Source tests](tests/cases.json) · [Comparison protocol](../../../docs/pack-evaluation.md) · [Pack authoring](../../../docs/pack-authoring-guide.md)
