export const logger = {
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
  }
};