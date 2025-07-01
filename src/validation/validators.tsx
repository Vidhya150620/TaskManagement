import * as yup from "yup";
export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Task description is required"),
  dueDate: yup.string().required("Duedate is must"),
});