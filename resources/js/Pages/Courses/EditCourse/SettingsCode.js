import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage, useForm } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import SettingsTabs from './SettingsTabs';
import LoadingButton from '@/Shared/LoadingButton';

const SettingsCode = () => {
    const { course } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        page_footer_code: course.page_footer_code || '',

        _method: 'PUT'
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('courses.settings.code.update', course.id), {
            preserveScroll: true,
        });
    }

    return (
        <CourseTabs activeTab='settings' course={course}>
            <SettingsTabs activeTab='settingsCode' course={course}>
                <form
                    onSubmit={handleSubmit}
                    className="form w-100 p-lg-11 p-5 bg-white"
                >
                    <div className="section__header mb-4">
                        <h4 className="section__header__title">Page footer code</h4>
                    </div>

                    <div className="form-group mt-5 ">
                        <p className="mb-3">Code will be placed on the landing page of this course. Javascript code should be placed within &lt;script&gt; tags.</p>
                        <textarea className={`"ember-text-area form-control text-area mb-2 ${errors.page_footer_code ? "is-invalid" : ""}`} style={{ 'height': '100px' }}
                            name="page_footer_code" onChange={e => setData('page_footer_code', e.target.value)} placeholder="Place page footer code here" defaultValue={data.page_footer_code}></textarea>
                        <small>{`Available variables: {{ name }}, {{ price }}, {{ product_id }}, {{ course_id }}`}</small>
                        {errors.page_footer_code && <div className="fv-plugins-message-container invalid-feedback">{errors.page_footer_code}</div>}
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
                </form>
            </SettingsTabs>
        </CourseTabs>
    )
}

SettingsCode.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'Page footer code' }
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default SettingsCode;
