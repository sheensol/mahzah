import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage, useForm } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import SettingsTabs from './SettingsTabs';
import LoadingButton from '@/Shared/LoadingButton';

const SettingsSEO = () => {
    const { course } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        meta_title: course.meta_title || '',
        meta_description: course.meta_description || '',
        meta_keywords: course.meta_keywords || '',

        _method: 'PUT'
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('courses.settings.seo.update', course.id), {
            preserveScroll: true,
        });
    }

    return (
        <CourseTabs activeTab='settings' course={course}>
            <SettingsTabs activeTab='settingsSEO' course={course}>
                <form
                    onSubmit={handleSubmit}
                    className="form w-100 p-lg-11 p-5 bg-white"
                >
                    <div className="section builder__content mx-0">
                        <div className="section__header d-flex justify-content-between mb-4">
                            <h4 className="section__header__title">SEO settings</h4>
                        </div>

                        <div className="form-group ">
                            <h5 className="mb-2">SEO title</h5>
                            <small>Enter the course title as it will be shown in internet browsers.</small>
                            <input className={`form-control form-control-solid ${errors.meta_title ? "is-invalid" : ""}`} maxLength="60"
                                type="text" name="meta_title" value={data.meta_title} onChange={e => setData('meta_title', e.target.value)} />
                            <small className="form-text d-flex text-end flex-column">Maximum 60 characters</small>
                            {errors.meta_title && <div className="fv-plugins-message-container invalid-feedback">{errors.meta_title}</div>}
                        </div>

                        <div className="form-group mt-5 ">
                            <h5 className="mb-2">SEO description</h5>
                            <small>Enter the course description that will appear underneath the SEO title.</small>
                            <textarea className={`form-control mt-3 text-area ${errors.meta_description ? "is-invalid" : ""}`} maxLength="320"
                                name="meta_description" onChange={e => setData('meta_description', e.target.value)} placeholder="Description text" defaultValue={data.meta_description}></textarea>
                            <small className="form-text d-flex text-end flex-column">Maximum 320 characters</small>
                            {errors.meta_description && <div className="fv-plugins-message-container invalid-feedback">{errors.meta_description}</div>}
                        </div>

                        <div className="form-group mt-5">
                            <h5 className="mb-2">Course keywords (optional)</h5>
                            <small>To improve your site's visibility in searches, enter maximum of 15 keywords separated by commas.<br />
                                e.g. slider, gallery, newsletter, wordpress menu
                            </small>
                            <textarea className={`form-control mt-3 text-area ${errors.meta_keywords ? "is-invalid" : ""}`}
                                name="meta_keywords" onChange={e => setData('meta_keywords', e.target.value)} defaultValue={data.meta_keywords}></textarea>
                            {errors.meta_keywords && <div className="fv-plugins-message-container invalid-feedback">{errors.meta_keywords}</div>}
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

SettingsSEO.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'SEO settings' }
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default SettingsSEO;