import { makeVar } from "@apollo/client";

// Filter states
export const completedFilterVar = makeVar<boolean | undefined>(undefined);
export const priorityFilterVar = makeVar<string | undefined>(undefined);

// Default values for resetting
export const DEFAULT_FILTERS = {
  completed: undefined,
  priority: undefined,
};
