import axios, { AxiosResponse } from "axios"

import { siteConfig } from "@/config/site.config"

export const AxiosBlob = axios.create({
  baseURL: siteConfig.apiUrl,
  timeout: 50000,
  responseType: "blob",
  headers: {
    Accept: "*/*",
  },
})

const responseBody = (response: AxiosResponse) => response.data

class HttpClient {
  async getBlob<T>(endpoint: string, query?: any): Promise<T> {
    const response = await AxiosBlob.get(endpoint, { params: query })
    return responseBody(response)
  }
}

const httpClient = new HttpClient()

export default httpClient
