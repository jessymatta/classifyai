import './App.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoginPage from "./pages/login";
import { HashRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './routes/RequireAuth';
import Dashboard from './pages/dashboard';
import Operators from './pages/operators';
import Supervisors from './pages/supervisors';
import Calls from './pages/calls';
import Scripts from './pages/scripts';
import {ROLES} from "./constants/roles"


export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <HashRouter>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected Route: accessible by SUPER_SUPERVISOR, SUPERVISOR and OPERATOR roles*/}
          <Route element={<RequireAuth allowedRoles={[ROLES.Super_Supervisor, ROLES.Supervisor, ROLES.Operator]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scripts" element={<Scripts />} />
          </Route>

          {/* Protected Route: accessible by SUPER_SUPERVISOR, SUPERVISOR*/}
          <Route element={<RequireAuth allowedRoles={[ROLES.Super_Supervisor, ROLES.Supervisor]} />}>
            <Route path="/operators" element={<Operators />} />
            <Route path="/calls" element={<Calls />} />
          </Route>

          {/* Protected Route: accessible by SUPER_SUPERVISOR role only*/}
          <Route element={<RequireAuth allowedRoles={[ROLES.Super_Supervisor]} />}>
            <Route path="/supervisors" element={<Supervisors />} />
          </Route>

        </Routes>
      </HashRouter>
    </QueryClientProvider>

  );
}

export default App;
