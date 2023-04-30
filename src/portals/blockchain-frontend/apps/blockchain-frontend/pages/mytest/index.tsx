import React from 'react';
import { useFormik } from 'formik';

export default function SignupForm() {
  const validate = (values) => {
    const errors: {
      firstName?: string;
      lastName?: string;
      email?: string;
    } = {};

    if (!values.firstName) {
      errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      firstName: 'Mark',
      lastName: 'Anthoney',
      email: 'mark@gmail.com',
    },
    validate,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={values.firstName}
        />
        <sub style={{ color: 'red' }}>
          {errors.firstName ? `${errors.firstName}` : null}
        </sub>
      </div>

      <div>
        <label htmlFor="email">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={values.lastName}
        />
        <sub style={{ color: 'red' }}>
          {errors.lastName ? `${errors.lastName}` : null}
        </sub>
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
          value={values.email}
        />
        <sub style={{ color: 'red' }}>
          {errors.email ? `${errors.email}` : null}
        </sub>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
