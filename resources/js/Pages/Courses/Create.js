import React, { useState } from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage, useForm } from '@inertiajs/inertia-react';
import ModalWithButtons from '@/Shared/Modals/ModalWithButtons';

const Create = () => {
  const { courseTemplates } = usePage().props;
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const { data, setData, errors, post, reset, processing } = useForm({
    course_title: '',
    template_id: ''
  });

  const onShowDialogWithButtons = (template_id) => {
    setData('template_id', template_id);
    setDialogIsOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    post(route('courses.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('course_title');
        setDialogIsOpen(false);
      }
    })

  }

  return (
    <>
      <div className=" bg-transparent pt-10 pb-10  ptd-block justify-content-center align-items-center text-center">
        <h2 className="mb-5 fs-1">ADD NEW COURSES</h2>
        <h3 className="mb-10 fs-3">First, let's find out what type of course you're making.</h3>
      </div>
      <div className="row">
        {courseTemplates.length > 0 && courseTemplates.map((courseTemplate, i) => (
          <div className="col-md-4 col-xxl-4 mt-5 cursor-pointer" key={i}>
            <span className="card h-100 add_boxs" onClick={() => onShowDialogWithButtons(courseTemplate.id)}>
              <div className="card-body d-flex flex-center flex-column pt-12 p-9">
                <i className={courseTemplate.icon}></i>
                <h3 className="fs-4 text-gray-400 fw-bolder mb-3">{courseTemplate.title}</h3>
                <p className="text-dark text-center mb-6">{courseTemplate.description}</p>
              </div>
            </span>
          </div>))}
      </div>

      <ModalWithButtons
        title="Name your new course"
        open={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
        onConfirm={() => setDialogIsOpen(false)}
        buttons={
          <React.Fragment>
            <button
              onClick={handleSubmit}
              disabled={processing}
              className="btn btn-primary"
            >
              Create Course
            </button>
          </React.Fragment>
        }
      >
        <form
          onSubmit={handleSubmit}
          className="form w-100"
        >
          <div className="fv-row">
            <input type="text" className={`form-control ${errors.course_title ? " is-invalid" : ""}`}
              placeholder="My course" value={data.course_title} name="course_title" onChange={e => setData('course_title', e.target.value)} />
            {errors.course_title && <div className="fv-plugins-message-container invalid-feedback">{errors.course_title}</div>}
            <div className="fs-8 pt-2 text-muted">Don't worry, you can always change it later.</div>
          </div>
        </form>
      </ModalWithButtons>
    </>
  )
}

Create.layout = page => <Layout title="New Course" children={page}
  breadcrumbs={[
    { name: 'Courses', path: route('courses.index') }
  ]}
  openedMenu="2"
  activeLink="2.1"
/>;

export default Create;
