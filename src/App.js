import { useSelector } from 'react-redux';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import AuthProvider from 'context/authContext';

// ==============================|| APP ||============================== //
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

const App = () => {
  const customization = useSelector((state) => state.customization);
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <Toaster position="top-right" richColors visibleToasts={5} />
        <ThemeProvider theme={themes(customization, 'light')}>
          <CssBaseline />
          <NavigationScroll>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default App;
