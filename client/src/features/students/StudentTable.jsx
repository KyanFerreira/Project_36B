import Student from "./Student";
import { useGetStudentsQuery } from "./studentSlice";
import "./studentTable.css";

/**
 * StudentList displays a list of students
 */
function StudentTable() {
  const { data: students, error, isLoading } = useGetStudentsQuery();
  return (
    <section>
      <h2>Students</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cohort</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student) => (
              <Student key={student.id} student={student} />
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default StudentTable;
