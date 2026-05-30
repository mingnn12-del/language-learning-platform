export interface ApiError {
  message: string
  status?: number
  code?: string
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    const { data, status } = error.response
    return {
      message: data.error || data.message || '请求失败',
      status,
      code: data.code || `HTTP_${status}`,
    }
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: '网络连接失败，请检查网络',
      code: 'NETWORK_ERROR',
    }
  } else {
    // Error setting up request
    return {
      message: error.message || '发生未知错误',
      code: 'UNKNOWN_ERROR',
    }
  }
}

export const logError = (error: any, context?: string) => {
  console.error(`Error${context ? ` [${context}]` : ''}:`, error)
}
