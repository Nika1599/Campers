import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./BookForm.module.css";

const BookFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  date: Yup.date()
    .min(new Date(), "Date cannot be in the past!")
    .required("Date is required"),
  comments: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
});

const initialValues = {
  name: "",
  email: "",
  date: "",
  comments: "",
};
export const BookForm = () => {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={BookFormSchema}
    >
      <Form className={css.form}>
        <p className={css.formTitle}>Book your campervan now</p>
        <p className={css.formText}>
          Stay connected! We are always ready to help you.
        </p>
        <Field
          className={css.field}
          type="text"
          name="name"
          placeholder="Name"
        />
        <ErrorMessage className={css.error} name="name" component="span" />
        <Field
          className={css.field}
          type="email"
          name="email"
          placeholder="Email"
        />
        <ErrorMessage className={css.error} name="email" component="span" />
        <Field
          className={css.field}
          type="date"
          name="date"
          placeholder="Booking date"
        />
        <ErrorMessage className={css.error} name="date" component="span" />
        <Field
          className={css.field}
          type="text"
          name="comments"
          placeholder="Comments"
        />
        <ErrorMessage className={css.error} name="comments" component="span" />
        <button type="submit" className={css.formButton}>
          Send
        </button>
      </Form>
    </Formik>
  );
};
