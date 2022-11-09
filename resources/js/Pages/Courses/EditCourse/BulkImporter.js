import React, { useState, useEffect, useRef, useContext } from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage, useForm } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import DropZoneBulkUploader from '@/Shared/DropZoneBulkUploader';
import ConfirmModal from '@/Shared/Modals/ConfirmModal';
import { Inertia } from '@inertiajs/inertia';
import { debounce } from 'lodash';
import SortChaptersDialog from './SortChaptersDialog';
import SortLessonsDialog from './SortLessonsDialog';

const ContextContainer = React.createContext(null);

const LessonCardList = ({ lesson }) => {

  const initialData = {
    'lesson_title': lesson.title,
    _method: 'PUT'
  };

  const { data, setData, errors, post } = useForm(initialData);

  useEffect(() => {
    initializeLessonData();
  }, [lesson]);

  const initializeLessonData = () => {
    setData({
      'lesson_title': lesson.title,
      '_method': 'PUT'
    });
  }

  const handleUpdateLesson = () => {
    post(route('courses.settings.updateLessonTitle', lesson.id), {
      preserveScroll: true
    });
  }

  const debouncedHandleUpdateLesson = debounce(handleUpdateLesson, 1500);
  const init = useRef(false);
  useEffect(() => {
    if (init.current === true && data.lesson_title != lesson.title) {
      debouncedHandleUpdateLesson();
    }
    init.current = true;
  }, [data.lesson_title]);

  return (
    <>
      <div className="d-flex align-center mb-5">
        <div className="input-group">
          <input type="text" name="lesson_title" value={data.lesson_title}
            className="form-control"
            onChange={e => setData('lesson_title', e.target.value)} placeholder="Lesson title" />
          <i className={lesson.lesson_icon}></i>
        </div>
        <DeleteLessonDialog lesson={lesson} />
      </div>
      {errors.lesson_title && <div className="fv-plugins-message-container invalid-feedback mb-5 ml-12">{errors.lesson_title}</div>}
    </>
  )
}

const DeleteChapterDialog = ({ chapter }) => {

  const [deleteChapterDialog, setDeleteChapterDialog] = useState(false);

  function handleDeleteChapterSubmit(e) {
    Inertia.delete(route('courses.settings.destroyChapter', chapter.id), {
      preserveScroll: true
    });
  }

  return (
    <>
      <ConfirmModal
        title={`Delete chapter '${chapter.title}'?`}
        open={deleteChapterDialog}
        onClose={() => setDeleteChapterDialog(false)}
        onConfirm={handleDeleteChapterSubmit}
      >
        Are you sure you want to delete this chapter?
      </ConfirmModal>

      <span className="cursor-pointer input-group-text hover-outline bg-white" onClick={() => setDeleteChapterDialog(true)}><i className="bi bi-trash"></i></span>
    </>
  )

}

const DeleteLessonDialog = ({ lesson }) => {

  const [deleteLessonDialog, setDeleteLessonDialog] = useState(false);

  function handleDeleteLessonSubmit(e) {
    Inertia.delete(route('courses.settings.destroyLesson', lesson.id), {
      preserveScroll: true
    });
  }

  return (
    <>
      <ConfirmModal
        title={`Delete lesson '${lesson.title}'?`}
        open={deleteLessonDialog}
        onClose={() => setDeleteLessonDialog(false)}
        onConfirm={handleDeleteLessonSubmit}
      >
        Are you sure you want to delete this lesson?
      </ConfirmModal>
      <span className="cursor-pointer input-group-text hover-outline" onClick={() => setDeleteLessonDialog(true)}><i className="bi bi-trash"></i></span>
    </>
  )
}

const ChapterCardList = ({ chapter }) => {

  const [dropzoneProcessing, setDropzoneProcessing] = useState(false);
  const { dropzoneDisabled, setDropzoneDisabled } = useContext(ContextContainer);

  const initialData = {
    title: chapter.title,
    new_lessons_to_draft: false,

    _method: 'PUT'
  };

  const { data, setData, errors, post } = useForm(initialData);

  useEffect(() => {
    initializeLessonData();
  }, [chapter]);

  useEffect(() => {
    setDropzoneDisabled(dropzoneProcessing);
  }, [dropzoneProcessing]);

  const initializeLessonData = () => {
    setData({
      'title': chapter.title,
      '_method': 'PUT'
    });

  }

  const handleUpdateChapter = () => {
    post(route('courses.settings.updateChapterTitle', chapter.id), {
      preserveScroll: true
    });
  }

  const debouncedHandleUpdateChapter = debounce(handleUpdateChapter, 1500);
  const init = useRef(false);
  useEffect(() => {
    if (init.current === true && data.title != chapter.title) {
      debouncedHandleUpdateChapter();
    }
    init.current = true;
  }, [data.title]);

  return (
    <div className="add_section_view bg-light card border-bottom h-lg-100 mb-5">
      <div className="card-body p-lg-5 pt-5 ps-6">
        <div className="d-flex align-center mb-5">
          <input type="text" name="title" value={data.title}
            className={`form-control ml-2 mr-2 ${errors.title ? " is-invalid" : ""}`}
            onChange={e => setData('title', e.target.value)} placeholder="Chapter title" />
          <SortLessonsDialog chapter={chapter} BtnSizeClass="btn-md w-50" />
          <DeleteChapterDialog chapter={chapter} />
        </div>
        {errors.title && <div className="fv-plugins-message-container invalid-feedback mb-5">{errors.title}</div>}
        {chapter.lessons.length > 0 && (
          <div className="w-100 bulkList p-lg-5 p-3 bg-gray-200 mb-4">
            {chapter.lessons.map((item, key) => (
              <LessonCardList
                key={key} lesson={item} />
            ))}
          </div>)}
      </div>

      <div className="p-7">
        <DropZoneBulkUploader
          accept={{
            'video/*': ['.mp4', '.3gp', '.mov', '.avi', '.wmv'],
            'audio/*': [".mp2", ".mp3", ".wav", ".m4a"],
            'application/ogg': ['.ogg'],
            'application/pdf': ['.pdf']
          }}
          chapter={chapter}
          dropzoneDisabled={dropzoneDisabled}
          extraInfo="You can upload files with the extensions: mp4, 3gp, mov, avi, wmv, mp2, mp3, wav, m4a, ogg, pdf"
          dropzoneProcessing={dropzoneProcessing}
          setDropzoneProcessing={setDropzoneProcessing}
        />
      </div>
    </div>
  )
}

const BulkImporter = () => {
  const { course } = usePage().props;
  const [dropzoneDisabled, setDropzoneDisabled] = useState(false);

  const initialData = {
    title: 'New chapter',
    new_lessons_to_draft: false,
  };

  const { post, processing } = useForm(initialData);

  function addNewChapterSubmit() {
    post(route('courses.settings.addChapter', course.id), {
      preserveScroll: true
    });
  }

  return (
    <CourseTabs activeTab='bulkImporter' course={course}>
      <ContextContainer.Provider value={{ dropzoneDisabled, setDropzoneDisabled }}>
        <div className="card">
          <div className="card-header pt-5" style={{ 'display': 'block' }}>
            <div className="bg-light p-3 mb-5 text-center">
              <SortChaptersDialog course={course} />
              <button type="button" className="btn btn-sm btn-primary m-2"
                disabled={processing} onClick={addNewChapterSubmit}>
                <i className="bi bi-plus-circle"></i> Add chapter
              </button>
            </div>
          </div>
          <div className="card-body">
            {course && course.chapters && course.chapters.length > 0 &&
              course.chapters.map((item, key) => (
                <ChapterCardList
                  key={key} chapter={item} />
              ))
              ||
              (<div className="text-center p-5">
                <h1 className="fw-bolder text-gray-900 mb-5">Create a chapter to get started</h1>
                <div className="fw-semibold fs-6 mb-7">Preview your course as a student to make sure everything is looking sharp.</div>
              </div>)
            }
          </div>
          <div className="card-footer">
            <div className="bg-light p-3 mb-5 text-center">
              <SortChaptersDialog course={course} />
              <button type="button" className="btn btn-sm btn-primary m-2"
                disabled={processing} onClick={addNewChapterSubmit}>
                <i className="bi bi-plus-circle"></i> Add chapter
              </button>
            </div>
          </div>
        </div>
      </ContextContainer.Provider>
    </CourseTabs>
  )
}

BulkImporter.layout = page => {
  const courseTitle = page.props.course.title;
  return (<Layout title={courseTitle} children={page}
    breadcrumbs={[
      { name: 'Courses', path: route('courses.index') },
      { name: 'Bulk importer' }
    ]}
    openedMenu="2"
    activeLink="2.1"
  />);
};

export default BulkImporter;