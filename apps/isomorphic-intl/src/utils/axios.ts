import axios, { AxiosInstance, AxiosResponse } from "axios"
import { getSession } from "next-auth/react"

// Enum to specify which API endpoint to use
export enum ApiEndpoint {
  DEFAULT = "default", // Primary endpoint
  FMS = "fms", // FMS testing endpoint
  HRMS = "hrms", // HRMS testing endpoint
  CRM = "crm", // CRM testing endpoint
  SCM = "scm", // SCM testing endpoint
}

const createAxiosInstance = async (
  endpoint: ApiEndpoint = ApiEndpoint.DEFAULT
): Promise<AxiosInstance> => {
  const session = await getSession()

  // Choose the baseURL based on the endpoint parameter
  const baseURL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT

  return axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
  })
}

const responseBody = (response: AxiosResponse) => response.data

const convertToFormData = (body: any): FormData => {
  const formData = new FormData()

  const buildFormData = (formData: FormData, data: any, parentKey?: string) => {
    if (data instanceof File) {
      formData.append(parentKey || "", data)
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        buildFormData(
          formData,
          item,
          parentKey ? `${parentKey}[${index}]` : String(index)
        )
      })
    } else if (typeof data === "object" && data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        const newKey = parentKey ? `${parentKey}.${key}` : key
        if (value instanceof File) {
          formData.append(newKey, value)
        } else if (typeof value === "object" && value !== null) {
          buildFormData(formData, value, newKey)
        } else {
          formData.append(newKey, String(value ?? ""))
        }
      })
    } else {
      formData.append(parentKey || "", String(data ?? ""))
    }
  }

  buildFormData(formData, body)
  return formData
}

class HttpClient {
  async get<T>(
    endpoint: string,
    query?: any,
    apiEndpoint: ApiEndpoint = ApiEndpoint.DEFAULT
  ): Promise<T> {
    const Axios = await createAxiosInstance(apiEndpoint)
    try {
      const response = await Axios.get(endpoint, {
        params: query,
      })
      console.log("response", response)
      return responseBody(response)
    } catch (error: any) {
      if (
        error?.response?.status === 404 ||
        error?.response?.status === 403 ||
        error?.response?.status === 401
      ) {
        return {} as T
      } else if (error?.response?.status === 400) {
        return {} as T
      } else if (error?.response?.status === 500) {
        return {} as T
      }

      throw error
    }
  }

  async post<T>(
    endpoint: string,
    body: any,
    isFormData: boolean = false,
    apiEndpoint: ApiEndpoint = ApiEndpoint.DEFAULT
  ): Promise<T> {
    const Axios = await createAxiosInstance(apiEndpoint)
    const response = await Axios.post(
      endpoint,
      isFormData ? convertToFormData(body) : body,
      isFormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : undefined
    )
    return responseBody(response)
  }

  async put<T>(
    endpoint: string,
    body: any,
    isFormData: boolean = false,
    apiEndpoint: ApiEndpoint = ApiEndpoint.DEFAULT
  ): Promise<T> {
    const Axios = await createAxiosInstance(apiEndpoint)
    const response = await Axios.put(
      endpoint,
      isFormData ? convertToFormData(body) : body,
      isFormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : undefined
    )
    return responseBody(response)
  }

  async patch<T>(
    endpoint: string,
    body: any,
    isFormData: boolean = false,
    apiEndpoint: ApiEndpoint = ApiEndpoint.DEFAULT
  ): Promise<T> {
    const Axios = await createAxiosInstance(apiEndpoint)
    const response = await Axios.patch(
      endpoint,
      isFormData ? convertToFormData(body) : body,
      isFormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : undefined
    )
    return responseBody(response)
  }

  async delete<T>(
    endpoint: string,
    apiEndpoint: ApiEndpoint = ApiEndpoint.DEFAULT
  ): Promise<T> {
    const Axios = await createAxiosInstance(apiEndpoint)
    const response = await Axios.delete(endpoint)
    return responseBody(response)
  }

  async bulkDelete<T>(
    endpoint: string,
    ids: (string | number)[],
    apiEndpoint: ApiEndpoint = ApiEndpoint.DEFAULT
  ): Promise<T> {
    const Axios = await createAxiosInstance(apiEndpoint)
    const response = await Axios.delete(endpoint, {
      data: ids,
    })

    return responseBody(response)
  }
}

const httpClient = new HttpClient()
export default httpClient
