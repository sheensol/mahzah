import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage, useForm } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import SettingsTabs from './SettingsTabs';
import LoadingButton from '@/Shared/LoadingButton';

const Settings = () => {
    const { course, instructors } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        course_title: course.title || '',
        course_slug: course.slug || '',
        course_instructor_id: course.instructor && course.instructor.id || '',
        course_is_private: course.is_private && course.is_private || false,
        course_is_hidden: course.is_hidden && course.is_hidden || false,

        _method: 'PUT'
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('courses.settings.update', course.id), {
            preserveScroll: true,
        });
    }

    return (
        <CourseTabs activeTab='settings' course={course}>
            <SettingsTabs activeTab='settings' course={course}>
                <form
                    onSubmit={handleSubmit}
                    className="form w-100 p-lg-11 p-5 bg-white"
                >
                    <div className="section builder__content mx-0">
                        <div className="section__header">
                            <h4 className="text-dark mb-5">Basic settings</h4>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6 ">
                                <label className="label">Course name</label>
                                <input className={`form-control form-control-solid ${errors.course_title ? "is-invalid" : ""}`}
                                    type="text" name="course_title" value={data.course_title} onChange={e => setData('course_title', e.target.value)} />
                                {errors.course_title && <div className="fv-plugins-message-container invalid-feedback">{errors.course_title}</div>}
                            </div>
                        </div>

                        <div className="row mt-5 d-flex ">
                            <div className="form-group col-md-6">
                                <label className="label">Course URL</label>
                                <input className={`form-control form-control-solid ${errors.course_slug ? "is-invalid" : ""}`}
                                    type="text" name="course_slug" value={data.course_slug} onChange={e => setData('course_slug', e.target.value)} />
                                {errors.course_slug && <div className="fv-plugins-message-container invalid-feedback">{errors.course_slug}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label className="label">Course Instructor</label>
                                <select className="form-select"
                                    name="course_instructor_id"
                                    value={data.course_instructor_id}
                                    onChange={e => setData('course_instructor_id', e.target.value)}
                                >
                                    <option value=""></option>
                                    {instructors.map(({ id, first_name, last_name }) => (
                                        <option key={id} value={id}>
                                            {first_name} {last_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.course_instructor_id && <div className="fv-plugins-message-container invalid-feedback">{errors.course_instructor_id}</div>}
                            </div>
                        </div>

                        <h5 className="mt-10 mb-2 ml-1">Access</h5>

                        <div className="form-group mb-5 mt-3">
                            <div className="custom-control d-flex">
                                <i className="fa fa-lock fs-4 mt-1 mr-1"></i>
                                <label htmlFor="course_is_private" className="ms-4 me-4 text-dark fs-5 fw-bold">Private course</label>
                                <input
                                    name="course_is_private"
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={data.course_is_private}
                                    onChange={e => setData('course_is_private', e.target.checked == 1)}
                                />
                                {/* <a title="Click to upgrade" href="#">
                                <span className="badge btn-primary mx-2">Pro</span>
                            </a> */}
                            </div>
                        </div>

                        <div className="form-group mb-5">
                            <div className="custom-control d-flex ">
                                <i className="fa fa-eye fs-4 mt-1"></i>
                                <label htmlFor="is_hidden" className="ms-4 me-4 text-dark fs-5 fw-bold">Hidden course</label>
                                <input
                                    name="course_is_hidden"
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={data.course_is_hidden}
                                    onChange={e => setData('course_is_hidden', e.target.checked == 1)}
                                />
                                {/* <a title="Click to upgrade" href="#">
                                <span className="badge bg-primary btn-primary mx-2">Pro</span>
                            </a> */}
                            </div>
                        </div>

                        <h5 className="mb-2 mt-10">Delete this course</h5>
                        <p className="mb-2">
                            Make sure this breakup is for real, because once you delete a course, it cannot be recovered.
                        </p>
                        <small>
                            Note: A course can only be deleted if it has zero enrollments.
                        </small>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-light-primary mt-5" disabled="disabled">
                                Delete this Course
                            </button>
                            <LoadingButton
                                loading={processing}
                                type="submit"
                                className="btn btn-primary mt-5"
                            >
                                Save
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </SettingsTabs>
        </CourseTabs>
    )
}

Settings.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'Basic settings' }
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default Settings;