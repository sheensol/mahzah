import React, { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';
import LoadingButton from '@/Shared/LoadingButton';
import Guest from '@/Layouts/Guest';

const Register = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    post(route('register'));
  }

  return (
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
        <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
          <Link href="#" className="mb-12"><img src="/assets/images/logos/Mahzalogo.png" className="h-80px" /></Link>
          <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
            <form
              onSubmit={handleSubmit}
              className="form w-100"
            >
              <div className="mb-10 text-center">
                <h1 className="text-dark mb-3">Create an Account</h1>
              </div>

              <div className="fv-row mb-10">
                <label className="d-flex align-items-center fs-6 fw-bold mb-2 required">First Name</label>
                <input className={`form-control form-control-solid ${errors.first_name ? "is-invalid" : ""}`}
                  type="text" name="first_name" value={data.first_name} onChange={e => setData('first_name', e.target.value)} />
                {errors.first_name && <div className="fv-plugins-message-container invalid-feedback">{errors.first_name}</div>}
              </div>

              <div className="fv-row mb-10">
                <label className="d-flex align-items-center fs-6 fw-bold mb-2 required">Last Name</label>
                <input className={`form-control form-control-solid ${errors.last_name ? "is-invalid" : ""}`}
                  type="text" name="last_name" value={data.last_name} onChange={e => setData('last_name', e.target.value)} />
                {errors.last_name && <div className="fv-plugins-message-container invalid-feedback">{errors.last_name}</div>}
              </div>

              <div className="fv-row mb-10">
                <label className="form-label fs-6 fw-bolder text-dark mb-2 required">Email</label>
                <input className={`form-control form-control-lg form-control-solid ${errors.email ? "is-invalid" : ""}`}
                  type="text" name="email" autoComplete="off"
                  value={data.email} onChange={e => setData('email', e.target.value)} />
                {errors.email && <div className="fv-plugins-message-container invalid-feedback">{errors.email}</div>}
              </div>

              <div className="fv-row mb-10">
                <label className="d-flex align-items-center fs-6 fw-bold mb-2 required">Password</label>
                <input className={`form-control form-control-solid ${errors.password ? "is-invalid" : ""}`}
                  type="password" name="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                {errors.password && <div className="fv-plugins-message-container invalid-feedback">{errors.password}</div>}
              </div>

              <div className="fv-row mb-10">
                <label className="d-flex align-items-center fs-6 fw-bold mb-2 required">Confirm Password</label>
                <input className={`form-control form-control-solid ${errors.password_confirmation ? "is-invalid" : ""}`}
                  type="password" name="password_confirmation" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                {errors.password_confirmation && <div className="fv-plugins-message-container invalid-feedback">{errors.password_confirmation}</div>}
              </div>

              <div className="text-center">
                <LoadingButton
                  type="submit"
                  loading={processing}
                  className="btn btn-lg btn-primary w-100 mb-5"
                >
                  Register <i className="las la-arrow-right"></i>
                </LoadingButton>
                
                <div className="text-gray-400 fs-3 mt-3 mb-3">Have an account? <Link href={route('login')} className="link-primary fw-bolder">Sign in</Link> .</div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


Register.layout = page => <Guest title="Register" children={page} />;

export default Register;
