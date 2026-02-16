interface FormattedCurrencyParts {
  mainPart: string
  decimalPart: string
}

export const formatCurrency = (value: number): FormattedCurrencyParts => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  
  if (value >= 1000) {
    const valueInK = value / 1000
    const formatted = formatter.format(valueInK)
    const [dollars, cents] = formatted.split('.')
    
    return {
      mainPart: `${dollars}.`,
      decimalPart: `${cents}K`
    }
  }
  
  const formatted = formatter.format(value)
  const [dollars, cents] = formatted.split('.')
  
  return {
    mainPart: `${dollars}.`,
    decimalPart: cents
  }
} 