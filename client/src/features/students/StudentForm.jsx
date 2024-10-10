import { useAddStudentMutation } from "./studentSlice";
/**
 * This form allows an instructor to add a new student to the database.
 */
function StudentForm() {
  const [addStudent] = useAddStudentMutation();

  async function onSubmit(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const cohort = event.target.cohort.value;

    if (name && cohort) {
      await addStudent({ name, cohort });
      event.target.reset();
    }
  }

  return (
    <section>
      <h2>Add a Student</h2>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Cohort
          <input type="text" name="cohort" />
        </label>
        <button type="submit">Add Student</button>
      </form>
    </section>
  );
}

export default StudentForm;
