import React from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';
import LoadingButton from '@/Shared/LoadingButton';
import Guest from '@/Layouts/Guest';


const Login = () => {
  const { data, setData, errors, post, processing } = useForm({
    email: '',
    password: '',
    remember: true
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('login.attempt'));
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
              <div className="text-center mb-10">
                <h1 className="text-dark mb-3">Sign In to Mahzah</h1>
              </div>

              <div className="fv-row mb-10">
                <label className="form-label fs-6 fw-bolder text-dark">Email</label>
                <input className={`form-control form-control-lg form-control-solid ${errors.email ? "is-invalid" : ""}`}
                  type="text" name="email" autoComplete="off"
                  value={data.email} onChange={e => setData('email', e.target.value)} />
                {errors.email && <div className="fv-plugins-message-container invalid-feedback">{errors.email}</div>}
              </div>

              <div className="fv-row mb-10">
                <div className="d-flex flex-stack mb-2">
                  <label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
                  <Link href="#" className="link-primary fs-6">Forgot Password?</Link>
                </div>
                <input className={`form-control form-control-lg form-control-solid ${errors.password ? "is-invalid" : ""}`}
                  type="password" name="password" autoComplete="off"
                  onChange={e => setData('password', e.target.value)} />
                {errors.password && <div className="fv-plugins-message-container invalid-feedback">{errors.password}</div>}
              </div>

              <div className="fv-row mb-10 fv-plugins-icon-container">
                <label className="form-check form-check-custom form-check-solid form-check-inline"
                  htmlFor="remember">
                  <input
                    name="remember"
                    className="form-check-input"
                    type="checkbox"
                    checked={data.remember}
                    onChange={e => setData('remember', e.target.checked)}
                  />
                  <span className="form-check-label text-gray-700 fs-6">Remember Me</span>
                </label>
              </div>

              <div className="text-center">
                <LoadingButton
                  type="submit"
                  loading={processing}
                  className="btn btn-lg btn-primary w-100 mb-5"
                >
                  Sign In <i className="las la-arrow-right"></i>
                </LoadingButton>

                <div className="text-gray-400 fs-3 mt-3 mb-3">New to Mahzah? <Link href={route('register')} className="link-primary fw-bolder">Create an account</Link> .</div>

                <div className="text-center text-muted text-uppercase fw-bolder mb-5">or</div>
                <Link href="#" className="btn btn-flex flex-center btn-light me-2"><img alt="Logo" src="/assets/media/svg/brand-logos/google-icon.svg" className="h-30px" /></Link>
                <Link href="#" className="btn btn-flex flex-center btn-light me-2"><img alt="Logo" src="/assets/media/svg/brand-logos/facebook-3.svg" className="h-30px" /></Link>
                <Link href="#" className="btn btn-flex flex-center btn-light"><img alt="Logo" src="/assets/media/svg/brand-logos/linkedin-1.svg" className="h-30px" /></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


Login.layout = page => <Guest title="Login" children={page} />;

export default Login;
