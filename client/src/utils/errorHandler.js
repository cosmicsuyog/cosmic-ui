/**
 * API Error Handler - Standardized error handling
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || "Server error occurred",
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    // Request made but no response received
    return {
      message: "No response from server. Please check your connection.",
      status: null,
      data: null,
    };
  }
  // Error in request setup
  return {
    message: error.message || "An error occurred",
    status: null,
    data: null,
  };
};

/**
 * Format Error Message - User-friendly error messages
 */
export const formatErrorMessage = (error) => {
  const errorInfo = handleApiError(error);
  return errorInfo.message;
};

/**
 * Retry Logic - Exponential backoff for API calls
 */
export const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
};
