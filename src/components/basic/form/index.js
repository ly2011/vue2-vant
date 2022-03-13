import components from './components';
import IForm from './form';
import IFormItem from './form-item';

const allRestComponents = [IForm, IFormItem];
const restComponents = {};
allRestComponents.forEach(Component => {
  restComponents[Component.name] = Component;
});
Object.assign(components, restComponents);

// eslint-disable-next-line func-names
const install = function (Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export const formComponents = components;

// export default components
export default {
  install,
  ...components,
};
