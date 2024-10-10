import LogoutButton from "../auth/LogoutButton";
import { useMeQuery } from "../auth/authSlice";
import StudentForm from "../students/StudentForm";
import StudentTable from "../students/StudentTable";

/**
 * The Dashboard is the main page of the application that instructors see.
 */
function Dashboard() {
  const { data: me } = useMeQuery();
  return (
    <main>
      <h1>Welcome, {me.username}!</h1>
      <LogoutButton />
      <StudentTable />
      <StudentForm />
    </main>
  );
}

export default Dashboard;
