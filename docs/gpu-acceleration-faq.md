# GPU acceleration FAQ

## Is Vira GPU-only?

No. CPU/conventional runtime remains a first-class path.

## Is the GPU path generally available?

No. The accelerator path is experimental and production promotion remains gated.

## What is the architectural goal?

Co-locate governed behavior execution and model inference on the same accepted accelerator path when that reduces overhead without changing behavior semantics.

## Does GPU execution bypass evaluation or release?

No. Accelerator execution consumes released behavior. It does not replace authoring, evaluation, approval, release, scope, or policy.

## Does Vira write one answer and then ask the model to write it again?

That is explicitly what the `behavior_plan` Strategy result mode is intended to avoid. Vira can produce a compact plan while the downstream model remains the only final prose generator.

## What model runtimes are part of the direction?

The architecture is provider-neutral. Experimental integration work covers common CUDA-serving patterns such as PyTorch CUDA, vLLM, TensorRT-LLM, and Triton-style runtimes. Public production support may differ by release.

## What protects correctness?

Parity, shadow/canary rollout, explicit fallback policy, released-artifact identity, and traceability remain the important gates.