import {
  QueryProvider,
  AuthProvider,
  RouteProvider as Routes,
  PrototypeExtensionsProvider,
} from "./providers";

export default function App(): React.ReactElement {
  return (
    <PrototypeExtensionsProvider>
        <QueryProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </QueryProvider>
    </PrototypeExtensionsProvider>
  );
}
