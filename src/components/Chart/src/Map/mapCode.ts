interface GeoJSON {
  type: string
  features: {
    geometry: Recordable
    properties: {
      name: string
      adcode: string
      [x: string]: any
    }
  }[]
}

export const mapCodes = new Map()

export const generateMapCodes = (data: GeoJSON) => {
  data.features.forEach(v => {
    mapCodes.set(v.properties.name, v.properties.adcode)
  })
}
