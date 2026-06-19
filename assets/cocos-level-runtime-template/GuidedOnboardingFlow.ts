export interface GuidedStep {
  readonly stepId: string;
  readonly targetId: string;
  readonly instructionKey: string;
  readonly skippable: boolean;
}

export interface GuidedFlowState {
  readonly flowId: string;
  readonly completedStepIds: readonly string[];
  readonly currentStepId: string | null;
  readonly completed: boolean;
}

export class GuidedOnboardingFlow {
  public start(flowId: string, steps: readonly GuidedStep[]): GuidedFlowState {
    return {
      flowId,
      completedStepIds: [],
      currentStepId: steps.length > 0 ? steps[0].stepId : null,
      completed: steps.length === 0,
    };
  }

  public completeStep(
    state: GuidedFlowState,
    steps: readonly GuidedStep[],
    stepId: string
  ): GuidedFlowState {
    if (state.completed) {
      return state;
    }

    const completedStepIds = state.completedStepIds.includes(stepId)
      ? [...state.completedStepIds]
      : [...state.completedStepIds, stepId];
    const nextStep = steps.find((step) => !completedStepIds.includes(step.stepId)) ?? null;

    return {
      flowId: state.flowId,
      completedStepIds,
      currentStepId: nextStep ? nextStep.stepId : null,
      completed: nextStep === null,
    };
  }
}
