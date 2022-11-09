import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage, useForm } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import ChapterCardList from './ChapterCardList';
import ModalWithButtons from '@/Shared/Modals/ModalWithButtons';
import SortChaptersDialog from './SortChaptersDialog';

const AddChapterDialog = ({ course }) => {

    const initialData = {
        id: '',
        title: '',
        new_lessons_to_draft: false,
    };

    const [addChapterDialog, setAddChapterDialog] = useState(false);
    const { data, setData, errors, post, reset, processing } = useForm(initialData);

    function handleAddChapterSubmit(e) {
        e.preventDefault();
        post(route('courses.settings.addChapter', course.id), {
            preserveScroll: true,
            onSuccess: () => {
                setAddChapterDialog(false);
                reset();
            }
        });
    }

    return (
        <>
            <ModalWithButtons
                title="Add chapter"
                open={addChapterDialog}
                onClose={() => setAddChapterDialog(false)}
                onConfirm={() => setAddChapterDialog(false)}
                buttons={
                    <React.Fragment>
                        <button
                            disabled={processing}
                            className="btn btn-primary"
                            onClick={handleAddChapterSubmit}
                        >
                            Add
                        </button>
                    </React.Fragment>
                }
            >
                <form
                    onSubmit={handleAddChapterSubmit}
                    className="form w-100 text-left"
                >
                    <div className="fv-row">
                        <input type="text" className={`form-control form-control-solid ${errors.title ? " is-invalid" : ""}`}
                            placeholder="Chapter title" value={data.title} name="title" onChange={e => setData('title', e.target.value)} />
                        {errors.title && <div className="fv-plugins-message-container invalid-feedback">{errors.title}</div>}
                    </div>
                    <div className="fv-row mt-5">
                        <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                            <input
                                name="new_lessons_to_draft"
                                className="form-check-input"
                                type="checkbox"
                                checked={data.new_lessons_to_draft}
                                onChange={e => setData('new_lessons_to_draft', e.target.checked == 1)}
                            />
                            <span className="form-check-label text-gray-600 fw-bold">Set new lessons to draft by default</span>
                        </label>
                    </div>
                    <div className="alert bg-light-warning border-dashed border-warning d-flex flex-column flex-sm-row p-2 mt-10">
                        <i className="bi bi-info-circle text-warning fs-4 me-4 mb-5 mb-sm-0"></i>
                        <div className="text-gray-600 pe-0 fs-6 pe-sm-10">
                            Chapter will remain in draft if there are no lessons or all are set to draft.
                        </div>
                    </div>
                </form>
            </ModalWithButtons>

            <button type="button" className="btn btn-sm btn-primary m-2" onClick={() => setAddChapterDialog(true)}>
                <i className="bi bi-plus-circle"></i> Add chapter
            </button>
        </>
    )

}

const Curriculum = () => {
    const { course } = usePage().props;
    return (
        <CourseTabs activeTab='curriculum' course={course}>
            <div className="d-flex flex-column flex-md-row">
                <div className="tab-content w-100 p-lg-11 p-5 bg-white">
                    <div className="tab-pane fade active show" role="tabpanel">
                        <div className="bg-light p-3 mb-5 text-center">
                            <SortChaptersDialog course={course} />
                            <AddChapterDialog course={course} />
                        </div>
                        {course && course.chapters && course.chapters.length > 0 &&
                            course.chapters.map((item, key) => (
                                <ChapterCardList
                                    key={key} chapter={item} />
                            )) ||
                            (<div className="text-center p-5">
                                <h1 className="fw-bolder text-gray-900 mb-5">Create a chapter to get started</h1>
                                <div className="fw-semibold fs-6 mb-7">Preview your course as a student to make sure everything is looking sharp.</div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </CourseTabs>
    )
}

Curriculum.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'Curriculum' }
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default Curriculum;