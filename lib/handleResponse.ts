// Handle Error Response From Backend API
interface ValidationError {
  field: string
  message: string
}

export const handleError = (data: any) => {
  const response = data.response.data

  let validationErrors: ValidationError[] = []
  let error = null

  if (response?.validationErrors) {
    validationErrors = response.validationErrors
  } else if (response?.message) {
    error = response.message
  } else {
    error = 'An unexpected error occurred'
  }

  return { validationErrors, error }
}

// Handle Success Response From Backend API
export const handleSuccess = (data: any) => {
  const response = data.data

  let message = null

  if (response?.message) {
    message = response.message
  }

  return { message }
}
