import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import renderCheckBoxField from "../../../../shared/components/form/CheckBox";
import { Formik, ErrorMessage } from "formik";

class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };

    this.showPassword = this.showPassword.bind(this);
  }

  showPassword(e) {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  render() {
    const { showPassword } = this.state;

    return (
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            errors
            /* and other goodies */
          }) => (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Username</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Password</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <KeyVariantIcon />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    component="input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />

                  <button
                    type="button"
                    className={`form__form-group-button${
                      showPassword ? " active" : ""
                    }`}
                    onClick={e => this.showPassword(e)}
                  >
                    <EyeIcon />
                  </button>
                </div>
                <ErrorMessage name="password" component="div" />
              </div>
              <div className="account__btns">
                <div className="form__form-group">
                  <div className="form__form-group-field padding-ten">
                    <Field
                      name="remember_me"
                      component={renderCheckBoxField}
                      label="Remember me"
                    />
                    </div>
                    <div>
                      <a href="/easydev/log_in">Forgot a password?</a>
                    </div>
                  
                </div>
                <Link
                  className={`btn btn-primary account__btn ${
                    Object.keys(errors).length !== 0 ? "disabled" : ""
                  }`}
                  to="/profiles"
                >
                  Sign In
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );

    // render() {
    //   const { handleSubmit } = this.props;
    //   const { showPassword } = this.state;

    //   return (
    //     <form className="form" onSubmit={handleSubmit}>
    //       <div className="form__form-group">
    //         <span className="form__form-group-label">Username</span>
    //         <div className="form__form-group-field">
    //           <div className="form__form-group-icon">
    //             <AccountOutlineIcon />
    //           </div>
    //           <Field
    //             name="username"
    //             component="input"
    //             type="text"
    //             placeholder="Name"
    //           />
    //         </div>
    //       </div>
    //       <div className="form__form-group">
    //         <span className="form__form-group-label">Password</span>
    //         <div className="form__form-group-field">
    //           <div className="form__form-group-icon">
    //             <KeyVariantIcon />
    //           </div>
    //           <Field
    //             name="password"
    //             component="input"
    //             type={showPassword ? 'text' : 'password'}
    //             placeholder="Password"
    //           />
    //           <button
    //             type="button"
    //             className={`form__form-group-button${showPassword ? ' active' : ''}`}
    //             onClick={e => this.showPassword(e)}
    //           ><EyeIcon />
    //           </button>
    //         </div>
    //         <div className="account__forgot-password">
    //           <a href="/easydev/log_in">Forgot a password?</a>
    //         </div>
    //       </div>
    //       <div className="form__form-group">
    //         <div className="form__form-group-field">
    //           <Field
    //             name="remember_me"
    //             component={renderCheckBoxField}
    //             label="Remember me"
    //           />
    //         </div>
    //       </div>
    //       <div className="account__btns">
    //         <Link className="btn btn-primary account__btn" to="/dashboard_default">Sign In</Link>
    //         <Link className="btn btn-outline-primary account__btn" to="/register">Create
    //           Account
    //         </Link>
    //       </div>
    //     </form>
    //   );
    // }
  }
}

export default reduxForm({
  form: "log_in_form" // a unique identifier for this form
})(LogInForm);
