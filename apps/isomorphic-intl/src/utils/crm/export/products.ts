export const exportProductData = (data: any) => {
  return data?.products && Array.isArray(data.products)
    ? data.products.map(
        ({ id, name, actualPrice, salePrice, category, brand, unit }: any) => ({
          ID: id,
          name,
          actualPrice,
          salePrice,
          category,
          brand,
          unit,
        })
      )
    : []
}
