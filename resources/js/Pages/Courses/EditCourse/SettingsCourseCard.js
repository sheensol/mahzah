import React, { useRef, useState } from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage, useForm } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import SettingsTabs from './SettingsTabs';
import CustomTooltipWithIcon from '@/Shared/CustomTooltipWithIcon';
import LoadingButton from '@/Shared/LoadingButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingsCourseCard = () => {

    const { course } = usePage().props;
    const courseImageInput = useRef();
    const [diplayImage, setDisplayImage] = useState(course.img || null);
    const { data, setData, errors, post, processing } = useForm({
        course_image: '',
        course_description: course.description_min || '',

        _method: 'PUT'
    });

    function handleCourseImageChange(e) {
        const course_image = e.target.files[0];
        if (!course_image.name.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            toast.error("Please select valid image.");
            return false;
        }
        setData('course_image', course_image);
        setDisplayImage(URL.createObjectURL(course_image));
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route('courses.settings.courseCard.update', course.id), {
            preserveScroll: true,
        });
    }


    function browseCourseImage() {
        courseImageInput.current.click();
    }

    return (
        <CourseTabs activeTab='settings' course={course}>
            <SettingsTabs activeTab='courseCard' course={course}>
                <form
                    onSubmit={handleSubmit}
                    className="form w-100 p-lg-11 p-5 bg-white"
                >
                    <div className="section builder__content mx-0">
                        <div className="section__header">
                            <h4 className="text-dark mb-5">Course image &amp; description</h4>
                        </div>

                        <div className="row">
                            <div className="col-sm-6 ">
                                <h5 className="d-flex align-items-center">
                                    Change image
                                    <div className="ember-view">
                                        <CustomTooltipWithIcon content="Use of this image varies depending on your theme. For example, it can be used in course cards and in the checkout." />
                                    </div>
                                </h5>
                                <small>Suggested Dimensions: 760x420px</small>
                            </div>

                            <div className="col-sm-6 mt-2 mt-sm-0">
                                <div className="model-course-card__image">
                                    <div className="ember-view">
                                        <figure id="anchor-course-instructor" className="figure__uploader figure__uploader--favicon h-55">
                                            <img src={diplayImage} className="img-fluid" />
                                            <figcaption className="text-center align-items-center justify-content-center ">
                                                <button className="bg-transparent border-0 text-white fs-4 fw-bold" type="button" onClick={browseCourseImage}>Browse image</button>
                                            </figcaption>
                                        </figure>
                                    </div>
                                    <input
                                        id="course_image"
                                        ref={courseImageInput}
                                        accept="image/*"
                                        type="file"
                                        className="hidden"
                                        onChange={handleCourseImageChange}
                                    />
                                    {errors.course_image && <div className="fv-plugins-message-container invalid-feedback">{errors.course_image}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-sm-12">
                                <h5 className="d-flex align-items-center">
                                    Course description
                                    <div className="ember-view">
                                        <CustomTooltipWithIcon content="Use of this short description varies depending on your theme. For example, it can be used in course cards and in the checkout." />
                                    </div>
                                </h5>
                                <small>Include a brief description of your course. Max 250 characters.</small>
                                <textarea className={`ember-view ember-text-area form-control mt-3 ${errors.course_description ? "is-invalid" : ""}`} maxLength="250"
                                    name="course_description" onChange={e => setData('course_description', e.target.value)} placeholder="Course description" rows="4" defaultValue={data.course_description}></textarea>
                                {errors.course_description && <div className="fv-plugins-message-container invalid-feedback">{errors.course_description}</div>}
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
                </form>
            </SettingsTabs>
        </CourseTabs>
    )
}

SettingsCourseCard.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'Course image &amp; description' }
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default SettingsCourseCard;