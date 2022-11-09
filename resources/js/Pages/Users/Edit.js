import React from 'react';
import { usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/Admin/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import CustomTooltipWithIcon from '@/Shared/CustomTooltipWithIcon';
import { find } from 'lodash';

const Edit = () => {
  const { user, roles } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    password: '',
    roles: user.roles_ids || [],

    // NOTE: When working with Laravel PUT/PATCH requests and FormData
    // you SHOULD send POST request and fake the PUT request like this.
    _method: 'PUT'
  });

  function handleSubmit(e) {
    e.preventDefault();

    post(route('users.update', user.id), {
      preserveScroll: true
    });
  }

  const handleRoleToggle = (e) => {
    let id = e.target.value;
    let checked = find(data.roles, function (n) {
      return (n == id);
    });

    if (typeof checked !== 'undefined') {
      setData(
        "roles",
        data.roles.filter((item) => {
          return item != id;
        })
      );
    } else {
      setData("roles", [...data.roles, id]);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="form w-100 p-lg-11 p-5 bg-white"
      >
        <h2 className="fs-2">User Information</h2>
        <p className="mb-10">Update user personal details.</p>

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

        <h2 className="fs-2">User roles</h2>

        <p className="mb-10">
          Each user role has different levels of access and functionality with Mahzah.<br />
          <u>Learn more</u> about how they can be used in your organization.
        </p>

        <div className="row">
          <div className="col-md-6">
            <div className="fv-row w-100 mb-8">
              {roles.map((item, key) => (
                <label className="form-check form-check-custom form-check-sm form-check-solid mb-3"
                  key={key}>
                  <input
                    name={`role${item.id}`}
                    className="form-check-input"
                    type="checkbox"
                    value={item.id}
                    checked={typeof find(data.roles, function (n) {
                      return (n == item.id);
                    }) !== 'undefined'}
                    onChange={handleRoleToggle}
                  />
                  <span className="d-flex align-items-center m-2">
                    {item.title}
                    {item.description && <div className="ember-view">
                      <CustomTooltipWithIcon content={item.description} />
                    </div>}
                  </span>
                </label>
              ))}
              {errors.roles && <div className="fv-plugins-message-container invalid-feedback">{errors.roles}</div>}
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

Edit.layout = page => <Layout title="Edir User" children={page}
  openedMenu="3" />;

export default Edit;
