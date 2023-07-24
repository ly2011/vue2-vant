// import IEmpty from './empty'
// import IIconSvg from './icon-svg'
// import IImagePreview from './image-preview'
// import INavBar from './nav-bar'
// import IPopup from './popup'
// import ITable from './table'
import { formComponents } from './form/index.js';

// const allComponents = [
//   // IEmpty,
//   // IIconSvg,
//   // IImagePreview,
//   // INavBar,
//   // IPopup,
//   // ITable
// ];
const components = {};
// allComponents.forEach(Component => {
//   components[Component.name] = Component;
// });
Object.assign(components, formComponents);
console.log('所有注册的组件！', components);
// eslint-disable-next-line func-names
const install = function (Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// export default components
export default {
  install,
  ...components,
};
