export const CART_KEY = "isomorphic-cart"
export const POS_CART_KEY = "isomorphic-pos-cart"
export const DUMMY_ID = "FC6723757651DB74"
export const CHECKOUT = "isomorphic-checkout"
export const CURRENCY_CODE = "USD"
export const LOCALE = "en"
export const CURRENCY_OPTIONS = {
  formation: "en-US",
  fractions: 2,
}

export const ROW_PER_PAGE_OPTIONS = [
  {
    value: 5,
    name: "5",
  },
  {
    value: 10,
    name: "10",
  },
  {
    value: 15,
    name: "15",
  },
  {
    value: 20,
    name: "20",
  },
]

export const ROLES = {
  Administrator: "Administrator",
  Manager: "Manager",
  Sales: "Sales",
  Support: "Support",
  Developer: "Developer",
  HRD: "HR Department",
  RestrictedUser: "Restricted User",
  Customer: "Customer",
} as const

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE_SIZE_200 = 200
export const DEFAULT_PAGE_INDEX = 1
export const DEFAULT_DATE_FORMAT = "DD/MM/YYYY"
export const DEFAULT_TIME_FORMAT = "hh:mm a"

export const DEFAULT_QUERY_PARAMS = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
}
