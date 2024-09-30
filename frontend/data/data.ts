export type Country = { countryCode: string; name: string }

export type CountryDetail = {
  country: Country
  borders: Array<Country>
  populationData: Array<{
    year: number
    value: number
  }>
  flag: string
}
