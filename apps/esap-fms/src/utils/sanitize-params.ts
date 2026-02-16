export const sanitizeParams = <T extends Record<string, any> | undefined>(
  params?: T
): T => {
  if (!params) return {} as T
  return Object.keys(params).reduce((acc: any, key) => {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      acc[key] = params[key] as any
    }
    return acc
  }, {} as T)
}
