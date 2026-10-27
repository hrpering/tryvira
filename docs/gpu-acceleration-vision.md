# GPU acceleration vision

> **Status: experimental architecture, not general production availability.**

Vira’s long-term runtime direction is to move governed behavior closer to model inference.

Today, Vira can be integrated as a behavior-control layer around an AI system. The accelerator path explores a tighter runtime boundary where released behavior state and model execution can share the same accelerator context instead of paying repeated CPU ↔ model-serving hops.

Experimental implementation and CUDA validation work exists, but the GPU path is **not presented here as a generally available production feature**. Production rollout remains gated by parity, failure handling, deployment identity, and operational acceptance.

![Vira GPU acceleration vision](../assets/vira-gpu-vision.svg)

## Why put behavior next to inference?

A normal AI stack can look like this:

```text
request
→ semantic / behavior resolution
→ application boundary
→ model-serving boundary
→ model
→ application boundary
→ verification / trace
```

That separation is useful, but every boundary can add latency, copies, duplicated state, and opportunities for the model-serving path to drift away from the behavior decision that was made earlier.

The accelerator vision is:

```text
request
→ semantic selection
→ released behavior artifact
→ bounded behavior projection
→ accelerator runtime
     ├─ behavior execution
     └─ model inference
→ verified output
→ trace / receipt
```

The important idea is **co-location, not GPU for GPU’s sake**.

## Same-device behavior + model execution

The target architecture keeps the model and the behavior runtime under the same accelerator residency/serving identity when that path is accepted.

Conceptually, the accelerator receives a bounded execution package containing the information required for the request, such as:

- the selected governed task / Behavior Point;
- released behavior state;
- the model-facing behavior projection;
- bounded generation constraints;
- the execution context required to preserve traceability.

The model runtime then generates under that behavior context instead of receiving a disconnected prompt patch after the behavior system already made its decision.

## Provider-neutral direction

The architecture is intended to stay model-serving neutral.

Experimental adapters and integration seams are being explored around runtimes such as:

- PyTorch CUDA;
- vLLM;
- TensorRT-LLM;
- Triton-based serving paths.

That list describes the architecture direction. It is **not** a promise that every backend is production-certified or publicly supported today.

## CPU remains a first-class path

The accelerator work does not turn Vira into a GPU-only product.

The CPU / conventional runtime path remains important for:

- compatibility;
- smaller deployments;
- development and debugging;
- parity comparison;
- safe fallback where explicitly authorized;
- workloads where GPU residency would not provide meaningful value.

Vira should not move work to GPU simply because a GPU exists.

## Parity before promotion

A faster runtime is not useful if it silently changes governed behavior.

The accelerator direction therefore treats the existing safe runtime as the reference boundary and promotes GPU execution progressively:

```text
OFF
→ SHADOW
→ CANARY
→ LIMITED
→ GENERAL
```

At each stage, the important questions are:

- Did semantic selection remain equivalent?
- Did the same released behavior apply?
- Did Strategy behavior remain equivalent?
- Did generation constraints remain equivalent where they are intended to be exact?
- Was any fallback explicit and authorized?
- Can the result still be traced to the released behavior that produced it?

## Fail closed, or fall back explicitly

Accelerator failure should not silently become different behavior.

A production path must distinguish between outcomes such as:

- fail closed;
- authorized fallback to a known-safe runtime;
- bounded retry / recovery.

The correct outcome depends on the operation and policy. The important part is that fallback is deliberate rather than an invisible change of authority.

## How this relates to Strategies

The GPU direction is especially interesting when a Strategy produces a compact `behavior_plan` rather than a second full answer.

```text
Vira behavior plan
→ model runtime on the same accelerator path
→ final user-visible answer
```

That keeps Vira focused on behavior planning, constraints, verification, and governance while the selected model remains responsible for final prose.

See [Behavior Strategies](strategies.md) for the `response` and `behavior_plan` result modes.

## What this vision does not mean

It does **not** mean:

- every Vira deployment requires NVIDIA hardware;
- behavior approval or release moves onto an opaque GPU-only authority;
- an accelerator can bypass scope, policy, evaluation, approval, or release;
- HTTP metadata alone proves model/behavior co-location;
- benchmark success automatically means production readiness;
- Vira becomes a second model that writes an answer before the user’s model writes another one.

## Public status language

When referring to this architecture publicly, use language such as:

> Vira is exploring an accelerator runtime that can co-locate released behavior execution with model inference on the same GPU path. Experimental CUDA work exists, while production availability remains gated by parity and operational acceptance.

Do not describe the GPU path as generally available until the production acceptance gates are complete.