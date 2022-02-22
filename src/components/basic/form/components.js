import IInput from './input'
import ICheckbox from './checkbox'
import ICheckboxGroup from './checkbox-group'
import IRadioGroup from './radio-group'
import ISwitch from './switch'
import IStepper from './stepper'
import ICalendar from './calendar'
import IPicker from './picker'
import IDropdown from './dropdown'
import IUploader from './uploader'
import IArea from './area'
import IDateTime from './datetime'
import IFormComponentCustom from './form-component-custom'

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
  IFormComponentCustom
]

const components = {}
allComponents.forEach((Component) => {
  components[Component.name] = Component
})

export default components
