import store from '@/store';

export const getBtnAuth = code => {
  if (!code) return false;
  const btnAuthList = store.state.user.btnAuthList;
  return btnAuthList.some(x => x.menuCode === code);
};
