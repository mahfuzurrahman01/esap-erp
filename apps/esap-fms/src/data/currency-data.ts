export type CurrencyData = {
  id: string
  countryId: number
  currencyCode: string
  currencyName: string
  status: boolean
  url: string
}

export const CurrencyData: CurrencyData[] = [
  {
    id: "1",
    countryId: 1,
    currencyCode: "$",
    currencyName: "Dollar",
    status: true,
    url: "https://example.com/1",
  },
  {
    id: "2",
    countryId: 2,
    currencyCode: "€",
    currencyName: "Euro",
    status: true,
    url: "https://example.com/2",
  },
  {
    id: "3",
    countryId: 3,
    currencyCode: "¥",
    currencyName: "Yen",
    status: true,
    url: "https://example.com/3",
  },
  {
    id: "4",
    countryId: 4,
    currencyCode: "£",
    currencyName: "Pound",
    status: false,
    url: "https://example.com/4",
  },
  {
    id: "5",
    countryId: 5,
    currencyCode: "₹",
    currencyName: "Rupee",
    status: true,
    url: "https://example.com/5",
  },
  {
    id: "6",
    countryId: 6,
    currencyCode: "₩",
    currencyName: "Won",
    status: true,
    url: "https://example.com/6",
  },
  {
    id: "7",
    countryId: 7,
    currencyCode: "₱",
    currencyName: "Peso",
    status: false,
    url: "https://example.com/7",
  },
  {
    id: "8",
    countryId: 8,
    currencyCode: "₣",
    currencyName: "Franc",
    status: true,
    url: "https://example.com/8",
  },
  {
    id: "9",
    countryId: 9,
    currencyCode: "₦",
    currencyName: "Naira",
    status: true,
    url: "https://example.com/9",
  },
  {
    id: "10",
    countryId: 10,
    currencyCode: "₴",
    currencyName: "Hryvnia",
    status: false,
    url: "https://example.com/10",
  },
]
