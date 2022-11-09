import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage, useForm } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import LoadingButton from '@/Shared/LoadingButton';

const Pricing = () => {
    const { course } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        price: course.price,
        price_type: course.is_free_course ? 1 : 0,
        days_until_expiry: (course.is_free_course == 1 && course.enrollment_duration ? course.enrollment_duration : ''),
        enrollment_duration: (course.is_free_course == 0 && course.enrollment_duration ? course.enrollment_duration : ''),

        _method: 'PUT'
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('courses.pricing.update', course.id), {
            preserveScroll: true,
        });
    }

    return (
        <CourseTabs activeTab='pricing' course={course}>
            <form
                onSubmit={handleSubmit}
                className="form w-100 p-lg-11 p-5 bg-white"
            >
                <div className="card">
                    <div className="card-header">
                        <div className="card-title fs-3 fw-bold">Pricing</div>
                    </div>
                    <div className="card-body">
                        <div className="row mb-8">
                            <div className="col-xl-9">
                                <div className="d-flex flex-column">
                                    <div className="w-100 fs-4 fw-bold mb-3">
                                        <span>Primary pricing</span>
                                    </div>
                                    <span>Set the initial pricing option that will be displayed on the course landing page.</span>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-8">
                            <div className="col-xl-9">
                                <div className="row g-9">
                                    <div className="col-md-12">
                                        <label className="btn-active-light-primary active d-flex text-start">
                                            <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                                <input className="form-check-input" type="radio" name="price_type"
                                                    checked={data.price_type == 1} value="1" onChange={e => setData('price_type', e.target.value)} />
                                            </span>
                                            <span className="ms-5">
                                                <span className="fs-5 fw-bold mb-1 d-block">Free</span>
                                                <span className="fw-semibold fs-7 text-gray-600">Offer free content to your subscribers. Optionally, you can set an enrollment duration that will limit the time students have access to your content.</span>
                                            </span>
                                        </label>
                                        {data.price_type == 1 &&
                                            <div className="row pl-10 pt-3">
                                                <div className="form-group col-md-6">
                                                    <label className="label fw-bold">Days Until Expiry</label>
                                                    <div className="input-group">
                                                        <input className={`form-control form-control-solid ${errors.days_until_expiry ? "is-invalid" : ""}`} placeholder="Days"
                                                            type="text" name="days_until_expiry" value={data.days_until_expiry} onChange={e => setData('days_until_expiry', e.target.value)} />
                                                    </div>
                                                    <small>Leave blank for unlimited access.</small>
                                                    {errors.days_until_expiry && <div className="fv-plugins-message-container invalid-feedback">{errors.days_until_expiry}</div>}
                                                </div>
                                            </div>}
                                    </div>
                                    <div className="col-md-12">
                                        <label className="btn-active-light-primary d-flex text-start" data-kt-button="true">
                                            <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                                <input className="form-check-input" type="radio" name="price_type"
                                                    checked={data.price_type == 0} value="0" onChange={e => setData('price_type', e.target.value)} />
                                            </span>
                                            <span className="ms-5">
                                                <span className="fs-5 fw-bold mb-1 d-block">One-time payment</span>
                                                <span className="fw-semibold fs-7 text-gray-600">Charge students a one-time fee to access the content. Optionally, you can set an enrollment duration that will limit the time students have access to your content.</span>
                                            </span>
                                        </label>
                                        {data.price_type == 0 && (<>
                                            <div className="row pl-10 pt-3">
                                                <div className="form-group col-md-6">
                                                    <label className="label fw-bold">Course price ($)</label>
                                                    <div className="input-group">
                                                        <input className={`form-control form-control-solid ${errors.price ? "is-invalid" : ""}`}
                                                            type="text" name="price" value={data.price} onChange={e => setData('price', e.target.value)} />
                                                    </div>
                                                    {errors.price && <div className="fv-plugins-message-container invalid-feedback">{errors.price}</div>}
                                                </div>
                                            </div>
                                            <div className="row pl-10 pt-5">
                                                <div className="form-group col-md-6">
                                                    <label className="label fw-bold">Enrollment Duration</label>
                                                    <div className="input-group">
                                                        <input className={`form-control form-control-solid ${errors.enrollment_duration ? "is-invalid" : ""}`} placeholder="Days"
                                                            type="text" name="enrollment_duration" value={data.enrollment_duration} onChange={e => setData('enrollment_duration', e.target.value)} />
                                                    </div>
                                                    <small>Leave blank for unlimited access.</small>
                                                    {errors.enrollment_duration && <div className="fv-plugins-message-container invalid-feedback">{errors.enrollment_duration}</div>}
                                                </div>
                                            </div>
                                        </>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-end mt-5">
                            <LoadingButton
                                loading={processing}
                                type="submit"
                                className="btn btn-primary mt-5"
                            >
                                Save
                            </LoadingButton>
                        </div>
                    </div>
                </div>
            </form>
        </CourseTabs>
    )
}

Pricing.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'Pricing' }
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default Pricing;
