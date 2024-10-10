import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import { useMeQuery } from "../features/auth/authSlice";
import Dashboard from "../features/dashboard/Dashboard";
import "./App.css";

/**
 * App is the root component of our application.
 * It will render either a login form or the dashboard
 * depending on whether the user is logged in or not.
 */
function App() {
  const guestRouter = (
    <Routes>
      <Route path="/*" element={<AuthForm />} />
    </Routes>
  );
  const userRouter = (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
    </Routes>
  );

  const { data: me } = useMeQuery();
  const loggedIn = !!me?.id;
  return loggedIn ? userRouter : guestRouter;
}

export default App;
