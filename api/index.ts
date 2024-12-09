// apiClient.ts

import { API_BASE_URL } from '@/config'

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface ApiError {
  status: number
  message: string
}

/**
 * Základní funkce pro volání API.
 */
async function request<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: unknown): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw { status: response.status, message: responseData.message || 'Something went wrong' }
    }

    return { data: responseData, status: response.status }
  } catch (error) {
    throw error as ApiError
  }
}

/**
 * GET request.
 */
export const get = <T>(endpoint: string): Promise<ApiResponse<T>> => {
  return request<T>(endpoint, 'GET')
}

/**
 * POST request.
 */
export const post = <T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> => {
  return request<T>(endpoint, 'POST', body)
}

/**
 * PUT request.
 */
export const put = <T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> => {
  return request<T>(endpoint, 'PUT', body)
}

/**
 * DELETE request.
 */
export const del = <T>(endpoint: string): Promise<ApiResponse<T>> => {
  return request<T>(endpoint, 'DELETE')
}
