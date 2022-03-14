import {
  useRoute as oUseRoute,
  useRouter as oUseRouter,
  onBeforeRouteLeave as oOnBeforeRouteLeave,
  onBeforeRouteUpdate as oOnBeforeRouteUpdate,
} from 'vue2-helpers/vue-router';

export const useRoute = oUseRoute;
export const useRouter = oUseRouter;
export const onBeforeRouteLeave = oOnBeforeRouteLeave;
export const onBeforeRouteUpdate = oOnBeforeRouteUpdate;
