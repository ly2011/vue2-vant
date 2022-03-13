/* eslint-disable no-restricted-syntax */
import { areaList } from '@vant/area-data'

const defaultFieldNames = { text: 'text', value: 'value', children: 'children' }

export const normalizeData = (area = areaList, fieldNames = defaultFieldNames) => {
  const list = []

  for (const [key, value] of Object.entries(area.province_list)) {
    const children = []
    for (const [cityKey, cityValue] of Object.entries(area.city_list)) {
      const cityChildren = []
      if (key.slice(0, 2) === cityKey.slice(0, 2)) {
        for (const [countyKey, countyValue] of Object.entries(area.county_list)) {
          if (cityKey.slice(0, 4) === countyKey.slice(0, 4)) {
            cityChildren.push({
              id: countyKey,
              [fieldNames.value]: countyValue,
              [fieldNames.text]: countyValue
            })
          }
        }

        children.push({
          id: cityKey,
          [fieldNames.value]: cityValue,
          [fieldNames.text]: cityValue,
          [fieldNames.children]: cityChildren
        })
      }
    }

    list.push({
      id: key,
      [fieldNames.value]: value,
      [fieldNames.text]: value,
      [fieldNames.children]: children
    })
  }

  return list
}
