import React from 'react';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/Admin/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import FileInput from '@/Shared/FileInput';

const MyProfile = () => {
  const { user } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    password: user.password || '',
    photo: '',

    // NOTE: When working with Laravel PUT/PATCH requests and FormData
    // you SHOULD send POST request and fake the PUT request like this.
    _method: 'PUT'
  });

  function handleSubmit(e) {
    e.preventDefault();

    post(route('users.updateMyProfile'), {
      preserveScroll: true,
      onSuccess: () => {
        setData('photo', '');
      }
    });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="form w-100 p-lg-11 p-5 bg-white"
      >
        <h2 className="fs-2">Profile Information</h2>
        <p className="mb-10">Update your photo and personal details.</p>

        <div className="row">
          <div className="col-md-6">
            <div className="fv-row w-100 mb-8">
              <label className="d-flex align-items-center fs-6 fw-bold mb-2 required">First Name</label>
              <input className={`form-control form-control-solid ${errors.first_name ? "is-invalid" : ""}`}
                type="text" name="first_name" value={data.first_name} onChange={e => setData('first_name', e.target.value)} />
              {errors.first_name && <div className="fv-plugins-message-container invalid-feedback">{errors.first_name}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="fv-row w-100 mb-8">
              <label className="d-flex align-items-center fs-6 fw-bold mb-2 required">Last Name</label>
              <input className={`form-control form-control-solid ${errors.last_name ? "is-invalid" : ""}`}
                type="text" name="last_name" value={data.last_name} onChange={e => setData('last_name', e.target.value)} />
              {errors.last_name && <div className="fv-plugins-message-container invalid-feedback">{errors.last_name}</div>}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="fv-row w-100 mb-8">
              <label className="d-flex align-items-center fs-6 fw-bold mb-2 required">Email</label>
              <input className={`form-control form-control-solid ${errors.email ? "is-invalid" : ""}`}
                type="text" name="email" value={data.email} onChange={e => setData('email', e.target.value)} />
              {errors.email && <div className="fv-plugins-message-container invalid-feedback">{errors.email}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="fv-row w-100 mb-8">
              <label className="d-flex align-items-center fs-6 fw-bold mb-2">Password</label>
              <input className={`form-control form-control-solid ${errors.password ? "is-invalid" : ""}`}
                type="password" name="password" value={data.password} onChange={e => setData('password', e.target.value)} />
              {errors.password && <div className="fv-plugins-message-container invalid-feedback">{errors.password}</div>}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="fv-row">
              <label className="d-flex align-items-center fs-6 fw-bold mb-2">Your Photo</label>
              <div className="flex items-center space-x-4">
                {user.photo && (
                  <img className="block w-20 h-20 mr-4 rounded-full" src={user.photo} />
                )}
                <div className="font-medium dark:text-white mt-5">
                  <p className="mb-2">This will be displayed on your profile.</p>
                  <div>
                    <FileInput
                      className="w-full"
                      name="photo"
                      accept="image/*"
                      errors={errors.photo}
                      value={data.photo}
                      onChange={photo => setData('photo', photo)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-end w-100">
          <LoadingButton
            loading={processing}
            type="submit"
            className="btn btn-primary"
          >
            Update
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

MyProfile.layout = page => <Layout title="My Profile" children={page} />;

export default MyProfile;
