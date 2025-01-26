interface Logger {
  apiCall: (functionName: string) => void;
  apiError: (functionName: string, error: unknown) => string;
  apiSuccess: <T>(functionName: string, data: T) => T;
  apiWarning: (functionName: string, message: string) => void;
}

export const logger: Logger = {
  apiCall: (functionName: string) => {
    console.log(`🌐 API Call Attempted: ${functionName}`);
    console.log({
      timestamp: new Date().toISOString(),
      status: 'pending',
      endpoint: functionName
    });
  },
  
  apiError: (functionName: string, error: any) => {
    const errorMessage = error?.response?.data?.message || error?.message || 'Unknown error occurred';
    console.error(`❌ API Error in ${functionName}:`, {
      timestamp: new Date().toISOString(),
      status: 'error',
      endpoint: functionName,
      error: errorMessage
    });
    
    return errorMessage;
  },

  apiSuccess: (functionName: string, data: any) => {
    console.log(`✅ API Success: ${functionName}`, {
      timestamp: new Date().toISOString(),
      status: 'success',
      endpoint: functionName,
      data
    });
    return data;
  },
  apiWarning: (functionName: string, message: string) => {
    console.warn(`⚠️ API Warning: ${functionName}`, {
      timestamp: new Date().toISOString(),
      status: 'warning',
      endpoint: functionName,
      message
    });
  }
};

