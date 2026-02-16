import { Product } from "@/modules/scm/types/inventory/products/products-types"


export const defaultProduct: Partial<Product> = {
  productCode: "",
  productName: "",
  productCategoryId: 0,
  productType: "",
  cost: 0,
  isFixedAsset: false,
  assetCategoryId: 0,
  assetCategoryName: "",
  purchasePrice: 0,
  sellingPrice: 0,
  purchaseTax: 0,
  salesTax: 0,
  discount: 0,
  companyId: 0,
  companyName: "",
  description: "",
  avatarFile: undefined,
  status: true,
  itemUnitId: 0,
}

export const generateCode = (
  productType: string,
  categoryName: string,
  productName: string
) => {
  // Get first 2 letters of product type
  const typePrefix = productType.slice(0, 2).toUpperCase()

  // Get first 3 letters of category name
  const categoryPrefix = categoryName.slice(0, 4).toUpperCase()

  // Get first 4 letters of product name
  const namePrefix = productName.slice(0, 10).toUpperCase()

  // Generate 4-digit random number with leading zeros
  const serialNumber = String(Math.floor(Math.random() * 10000)).padStart(
    4,
    "0"
  )

  return `${typePrefix}-${categoryPrefix}-${namePrefix}-${serialNumber}`
}

export const calculatePurchasePrice = (
  purchasePrice: number,
  purchaseTax: number
) => {
  return purchasePrice + (purchasePrice * purchaseTax) / 100
}


export const calculateSellingPrice = (
  sellingPrice: number,
  salesTax: number,
  discount: number
) => {
  const taxAmount = (sellingPrice * salesTax) / 100
  const discountAmount = (sellingPrice * discount) / 100
  const totalSellingPrice = sellingPrice + taxAmount - discountAmount
  return totalSellingPrice
}
