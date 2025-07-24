// Utility to detect environment and connection status
export const isProduction = () => {
  return process.env.NODE_ENV === 'production' || 
         typeof window !== 'undefined' && window.location.hostname !== 'localhost';
};

export const isDatabaseAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch('/rest/Recipe?$top=1', { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    return response.ok;
  } catch (error) {
    console.log('Database not available:', error);
    return false;
  }
};

export const getEnvironmentInfo = async () => {
  const isProd = isProduction();
  const dbAvailable = await isDatabaseAvailable();
  
  return {
    environment: isProd ? 'production' : 'development',
    databaseAvailable: dbAvailable,
    usingMockData: !dbAvailable
  };
};
