import IInput from './input/index.vue';
import ICheckbox from './checkbox/index.vue';
import ICheckboxGroup from './checkbox-group/index.vue';
import IRadioGroup from './radio-group/index.vue';
import ISwitch from './switch/index.vue';
import IStepper from './stepper/index.vue';
import ICalendar from './calendar/index.vue';
import IPicker from './picker/index.vue';
import IDropdown from './dropdown/index.vue';
import IUploader from './uploader/index.vue';
import IArea from './area/index.vue';
import IDateTime from './datetime/index.vue';
import IFormComponentCustom from './form-component-custom/index.vue';

const allComponents = [
  IInput,
  ICheckbox,
  ICheckboxGroup,
  IRadioGroup,
  ISwitch,
  IStepper,
  ICalendar,
  IPicker,
  IDropdown,
  IUploader,
  IArea,
  IDateTime,
  IFormComponentCustom,
];

const components = {};
allComponents.forEach(Component => {
  components[Component.name] = Component;
});

export default components;
