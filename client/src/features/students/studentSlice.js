import { api, invalidatesId, providesId, providesList } from "../../app/api";

/**
 * API endpoints
 */
const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "api/students",
      providesTags: providesList("Students"),
    }),
    getStudent: builder.query({
      query: (id) => `api/students/${id}`,
      providesTags: providesId("Students"),
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: "api/students",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
    updateStudent: builder.mutation({
      query: (student) => ({
        url: `api/students/${student.id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: invalidatesId("Students"),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `api/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: invalidatesId("Students"),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
