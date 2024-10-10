import { useState } from "react";
import {
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "./studentSlice";

/**
 * Displays student information and allows users to either
 * update or delete the student.
 */
function Student({ student }) {
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [cohort, setCohort] = useState(student.cohort);

  function onEdit(event) {
    event.preventDefault();
    if (editing) {
      updateStudent({ id: student.id, name, cohort });
    }
    setEditing(!editing);
  }

  const editFields = (
    <>
      <td>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={cohort}
          onChange={(e) => setCohort(e.target.value)}
        />
      </td>
    </>
  );

  return (
    <tr>
      {editing ? (
        editFields
      ) : (
        <>
          <td>{name}</td>
          <td>{cohort}</td>
        </>
      )}
      <td>
        <button onClick={onEdit}>{editing ? "Save" : "Edit"}</button>
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Student;
