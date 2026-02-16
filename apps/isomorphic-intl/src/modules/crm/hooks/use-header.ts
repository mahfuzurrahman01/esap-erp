export const getHeaders = (token: string | undefined) => ({
  "Content-Type": "application/json",
  Authorization: token ? `Bearer ${token}` : "",
})
