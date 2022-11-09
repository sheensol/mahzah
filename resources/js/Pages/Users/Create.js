import React, { useEffect, useState, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/Admin/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import CustomTooltipWithIcon from '@/Shared/CustomTooltipWithIcon';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Create = () => {
  const { roles, courses } = usePage().props;
  const [products, setProducts] = useState([]);

  const [selectedproducts, setSelectedProducts] = useState([]);
  const [expiryDate, setExpiryDate] = useState("");
  const selectProductRef = useRef();

  const { data, setData, errors, post, processing } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    roles: [],
    enrollments: []
  });

  function handleSubmit(e) {
    e.preventDefault();

    post(route('users.store'), {
      preserveScroll: true
    });
  }

  const handleRoleChanged = (e) => {
    let id = e.target.value;
    if (e.target.checked) {
      setData("roles", [...data.roles, id]);
    } else {
      setData(
        "roles",
        data.roles.filter((item) => {
          return item !== id;
        })
      );
    }
  };

  useEffect(() => {
    const products = courses.map((item) => {
      return {
        value: item.id, label: item.title
      };
    });
    setProducts(products);
  }, [courses]);

  const handleEnrollClear = () => {
    setExpiryDate('');
    selectProductRef.current.clearValue();
  }

  const handleEnrollRemove = (id) => {
    setData("enrollments", data.enrollments.filter((item) => item.id !== id));
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  const handleEnrollSubmit = () => {
    if (selectedproducts.length > 0) {
      setData("enrollments", [...data.enrollments, ...selectedproducts
        .filter(selectedProduct => !data.enrollments.find((x) => x.id === selectedProduct.value))
        .map((selectedProduct) => {
          return {
            id: selectedProduct.value,
            title: selectedProduct.label,
            expiry_date: expiryDate ? formatDate(expiryDate) : ''
          };
        })]);
    }
    handleEnrollClear();
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="form w-100 p-lg-11 p-5 bg-white"
      >
        <h2 className="fs-2">User Information</h2>
        <p className="mb-10">Enter user personal details.</p>

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

        <h3 className="fs-2">User roles</h3>

        <p className="mb-10">
          Each user role has different leve0ls of access and functionality with Mahzah.<br />
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
                    onChange={handleRoleChanged}
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

        <h3 className="fs-2">Enrollments</h3>

        <p className="mb-10">
          Manually enroll students in any course or bundle.
        </p>

        <div className="row">
          <div className="col-md-4">
            <Select options={products}
              onChange={(data) => setSelectedProducts(data)}
              ref={selectProductRef}
              isMulti={true} />
          </div>
          <div className="col-md-4">
            <DatePicker onChange={(date) => setExpiryDate(date)}
              selected={expiryDate}
              className="form-control form-control-sm"
              placeholderText="Exipry date"
            />
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-sm btn-secondary mr-2" onClick={handleEnrollClear}>Clear</button>
            <button type="button" className="btn btn-sm btn-info" onClick={handleEnrollSubmit}>Enroll</button>
          </div>
        </div>
        {data.enrollments.length > 0 &&
          <div className="row mt-10">
            <div className="col-md-12">
              <table className="table table-flush align-middle table-row-bordered table-row-solid gy-4">
                <thead className="border-gray-200 text-gray-400 fs-5 fw-bold bg-lighten">
                  <tr>
                    <th className="ps-9">Product</th>
                    <th className="ps-9">Exipry date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="fs-6 fw-semibold text-gray-600">
                  {data.enrollments.map((enrollment, key) => (
                    <tr key={key}>
                      <td className="ps-9">{enrollment.title}
                        {errors['enrollments.' + key + '.id'] && <p className="fv-plugins-message-container invalid-feedback">The selected enrollment is invalid.</p>}
                      </td>
                      <td className="ps-9">{enrollment.expiry_date}</td>
                      <td className="ps-9" onClick={() => handleEnrollRemove(enrollment.id)}><i className="bi bi-trash cursor-pointer"></i></td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>}

        <div className="text-end w-100">
          <LoadingButton
            loading={processing}
            type="submit"
            className="btn btn-primary"
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

Create.layout = page => <Layout title="New User" children={page} openedMenu="3" />;

export default Create;
