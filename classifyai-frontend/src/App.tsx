import './App.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoginPage from "./pages/login";
import { HashRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './routes/RequireAuth';


const ROLES = {
  "Super_Supervisor": 1,
  "Supervisor": 2,
  "Operator": 3
}

export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <HashRouter>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected Route: accessible by SUPER_SUPERVISOR role only*/}
          <Route element={<RequireAuth allowedRoles={[ROLES.Super_Supervisor]} />}>

          </Route>

          {/* Protected Route: accessible by SUPER_SUPERVISOR and SUPERVISOR roles only*/}
          <Route element={<RequireAuth allowedRoles={[ROLES.Super_Supervisor, ROLES.Supervisor]} />}>

          </Route>

          {/* Protected Route: accessible by OPERATORS role only*/}
          <Route element={<RequireAuth allowedRoles={[ROLES.Super_Supervisor, ROLES.Supervisor]} />}>

          </Route>

        </Routes>
      </HashRouter>
    </QueryClientProvider>

  );
}

export default App;
