import {
  QueryProvider,
  AuthProvider,
  RouteProvider as Routes,
  LangProvider,
  PrototypeExtensionsProvider,
} from "./providers";

export default function App(): React.ReactElement {
  return (
    <PrototypeExtensionsProvider>
      <LangProvider>
        <QueryProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </QueryProvider>
      </LangProvider>
    </PrototypeExtensionsProvider>
  );
}
