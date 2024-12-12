// apiClient.ts

import { API_BASE_URL } from '@/config'
import { apiGetEndpoints, apiPostEndpoints, apiPutEndpoints, Contact } from './types'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

export namespace Api {
  export const axiosInstance: AxiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  export const get = <T extends keyof apiGetEndpoints>(endpoint: T, config?: AxiosRequestConfig<any> | undefined) => {
    try {
      return axiosInstance.get<apiGetEndpoints[T]>(`${API_BASE_URL}/${endpoint}`, config)
    } catch (err) {
      console.log('error', (err as AxiosError<any>).toJSON())
      return null
    }
  }

  export const post = <T extends keyof apiPostEndpoints>(endpoint: T, data?: any, config?: AxiosRequestConfig<any> | undefined) => {
    try {
      return axiosInstance.post<apiPostEndpoints[T]>(`${API_BASE_URL}/${endpoint}`, data, config)
    } catch (err) {
      console.log('error', (err as AxiosError<any>).toJSON())
      return null
    }
  }

  export const put = <T extends keyof apiPutEndpoints>(endpoint: T, data?: any, config?: AxiosRequestConfig<any> | undefined) => {
    try {
      return axiosInstance.put<apiPutEndpoints[T]>(`${API_BASE_URL}/${endpoint}`, data, config)
    } catch (err) {
      console.log('error', (err as AxiosError<any>).toJSON())
      return null
    }
  }
}
