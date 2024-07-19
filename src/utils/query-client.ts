import { QueryClient } from "@tanstack/react-query";
import { settings } from "../configs/settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: settings.staleTime,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default queryClient;
