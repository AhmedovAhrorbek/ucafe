export const settings= {
    baseUrl:import.meta.env.VITE_BASE_URL,
    staleTime:12000,
    requestTimeOut:18000,
    idleTimeout:3000,
    rowsPerPage:10,
    messageDuration:3,
    defaultLanguage:"ru",
    project:{},
} as const ;
