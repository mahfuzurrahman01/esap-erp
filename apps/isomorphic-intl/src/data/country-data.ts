export type Country = {
  id: string
  name: string
  region: string
  isoCode: string
  currencyName: string
  continent: string
}

export const countries: Country[] = [
  {
    id: "1",
    name: "United Kingdom",
    region: "1",
    isoCode: "GB",
    currencyName: "Pound",
    continent: "Europe",
  },
  {
    id: "2",
    name: "United States",
    region: "2",
    isoCode: "US",
    currencyName: "Dollar",
    continent: "North America",
  },
  {
    id: "3",
    name: "Canada",
    region: "2",
    isoCode: "CA",
    currencyName: "Dollar",
    continent: "North America",
  },
  {
    id: "4",
    name: "Australia",
    region: "3",
    isoCode: "AU",
    currencyName: "Dollar",
    continent: "Australia",
  },
  {
    id: "5",
    name: "India",
    region: "4",
    isoCode: "IN",
    currencyName: "Rupee",
    continent: "Asia",
  },
  {
    id: "6",
    name: "Germany",
    region: "1",
    isoCode: "DE",
    currencyName: "Euro",
    continent: "Europe",
  },
  {
    id: "7",
    name: "Brazil",
    region: "5",
    isoCode: "BR",
    currencyName: "Real",
    continent: "South America",
  },
  {
    id: "8",
    name: "South Africa",
    region: "6",
    isoCode: "ZA",
    currencyName: "Rand",
    continent: "Africa",
  },
  {
    id: "9",
    name: "Japan",
    region: "4",
    isoCode: "JP",
    currencyName: "Yen",
    continent: "Asia",
  },
  {
    id: "10",
    name: "France",
    region: "1",
    isoCode: "FR",
    currencyName: "Euro",
    continent: "Europe",
  },
]
