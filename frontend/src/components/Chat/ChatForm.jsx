import { Navigation } from "@mui/icons-material";
import { IconButton, CircularProgress } from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const chatFormSchema = Yup.object({
  content: Yup.string().required("Обязательное поле"),
});

const ChatForm = ({ loading, onAddMessage }) => {
  const initialValues = {
    content: "",
  };

  const addMessage = async (values, actions) => {
    actions.resetForm();

    await onAddMessage(values.content);
  };

  const submitBtn = loading ? (
    <CircularProgress className="chat__loading"/>
  ) : (
    <IconButton className="chat__btn chat__btn--add" type="submit">
      <Navigation className="navigation-icon" />
    </IconButton>
  );

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={chatFormSchema}
      onSubmit={addMessage}
    >
      <Form className="chat__form">
        <div className="form-group">
          <Field className="form-field" type="text" name="content" />
          <p className="error-text">
            <ErrorMessage name="content" />
          </p>
        </div>
        {submitBtn}
      </Form>
    </Formik>
  );
};

ChatForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onAddMessage: PropTypes.func.isRequired,
};

export default ChatForm;
