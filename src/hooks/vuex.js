import { createVuexHelpers } from 'vue2-helpers';

const {
  useState: oUseState,
  useGetters: oUseGetters,
  useMutations: oUseMutations,
  useActions: oUseActions,
} = createVuexHelpers();

export const useState = oUseState;
export const useGetters = oUseGetters;
export const useMutations = oUseMutations;
export const useActions = oUseActions;
