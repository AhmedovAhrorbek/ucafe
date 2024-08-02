import {
  QueryProvider,
  AuthProvider,
  RouteProvider as Routes,
} from "./providers";

export default function App(): React.ReactElement {
  return (
        <QueryProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </QueryProvider>
  );
}
