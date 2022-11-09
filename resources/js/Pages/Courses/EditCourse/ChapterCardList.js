import React, { useEffect, useState, useContext } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, useForm } from '@inertiajs/inertia-react';
import ModalWithButtons from '@/Shared/Modals/ModalWithButtons';
import ConfirmModal from '@/Shared/Modals/ConfirmModal';
import Modal from '@/Shared/Modals/Modal';
import LoadingButton from '@/Shared/LoadingButton';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DropZoneUploader from '@/Shared/DropZoneUploader';
import CompeonTimepicker from '@compeon/timepicker';
import YoutubeEmbed from '@/Shared/YoutubeEmbed';
import VimeoEmbed from '@/Shared/VimeoEmbed';
import SortLessonsDialog from './SortLessonsDialog';
// import { clone } from 'lodash';

const ContextContainer = React.createContext(null);

const LessonCardToolbar = ({ setHoverLocked, lesson }) => {

    return (
        <>
            <EditLessonDialog setHoverLocked={setHoverLocked} lesson={lesson} />
            <DeleteLessonDialog setHoverLocked={setHoverLocked} lesson={lesson} />
        </>
    )
}

const EditLessonDialog = ({ setHoverLocked, lesson }) => {

    const initialData = {
        id: '',
        lesson_title: '',
        is_free: false,
        is_prerequisite: false,
        enable_discussions: false,
        status: 'Active',
        lesson_type: '',

        // Text
        content: '',
        text_content: {
            'content': ''
        },

        // PDF
        pdf_file: '',
        is_content_downloadable: false,
        pdf_content: {
            'id': null,
            'files': [],
            'is_content_downloadable': false
        },

        // Video
        video_file: '',
        video_optional_content: '',
        video_optional_downloads: [],
        video_primary_files: [],
        is_video_downloadable: false,
        video_content: {
            'id': null,
            'files': [],
            'video_optional_content': '',
            'is_video_downloadable': false
        },

        // Download
        download_content: '',
        download_files: [],
        download_content_data: {
            'id': null,
            'content': '',
            'files': []
        },

        // Audio
        audio_file: '',
        is_audio_downloadable: false,
        audio_content: {
            'id': null,
            'files': [],
            'is_audio_downloadable': false
        },

        // Video Platform
        video_platform_video_type: '',
        video_platform_video_url: '',
        video_platform_duration: '00:00',
        video_platform_optional_content: '',
        video_platform_content: {
            'id': null,
            'video_type': '',
            'video_url': '',
            'duration': '',
            'content': '',
        },

        _method: 'PUT'
    };

    const [editLessonDialog, setEditLessonDialog] = useState(false);
    const { data, setData, errors, reset, clearErrors, post, processing } = useForm(initialData);
    const [dropzoneProcessing, setDropzoneProcessing] = useState(false);

    useEffect(() => {
        setHoverLocked(editLessonDialog);
    }, [editLessonDialog]);


    useEffect(() => {
        initializeLessonData();
    }, [])

    const initializeLessonData = () => {
        const additionalFields = {
            text_content: {
                'content': ''
            },
            pdf_content: {
                'id': null,
                'files': [],
                'is_content_downloadable': false
            },
            video_content: {
                'id': null,
                'files': [],
                'video_optional_content': '',
                'is_video_downloadable': false
            },
            download_content_data: {
                'id': null,
                'content': '',
                'files': []
            },
            audio_content: {
                'id': null,
                'files': [],
                'is_audio_downloadable': false
            },
            video_platform_content: {
                'id': null,
                'video_type': '',
                'video_url': '',
                'duration': '',
                'content': '',
            },
        };

        switch (lesson.lessonable_name) {
            case 'LessonTypeText':
                additionalFields.text_content.content = lesson.lessonable_data.content;
                break;
            case 'LessonTypePDF':
                additionalFields.pdf_content.id = lesson.lessonable_data.id;
                additionalFields.pdf_content.is_content_downloadable =
                    lesson.lessonable_data.is_content_downloadable == 1;
                additionalFields.pdf_content.files =
                    lesson.lessonable_data.files;
                break;
            case 'LessonTypeVideo':
                additionalFields.video_content.id = lesson.lessonable_data.id;
                additionalFields.video_content.is_video_downloadable =
                    lesson.lessonable_data.is_video_downloadable == 1;
                additionalFields.video_content.video_optional_content =
                    lesson.lessonable_data.video_optional_content;
                additionalFields.video_content.files =
                    lesson.lessonable_data.files;
                break;
            case 'LessonTypeDownload':
                additionalFields.download_content_data.id = lesson.lessonable_data.id;
                additionalFields.download_content_data.content =
                    lesson.lessonable_data.content;
                additionalFields.download_content_data.files =
                    lesson.lessonable_data.files;
                break;
            case 'LessonTypeAudio':
                additionalFields.audio_content.id = lesson.lessonable_data.id;
                additionalFields.audio_content.is_audio_downloadable =
                    lesson.lessonable_data.is_audio_downloadable == 1;
                additionalFields.audio_content.files =
                    lesson.lessonable_data.files;
                break;
            case 'LessonTypeVideoPlatform':
                additionalFields.video_platform_content.id = lesson.lessonable_data.id;
                additionalFields.video_platform_content.video_type =
                    lesson.lessonable_data.video_type;
                additionalFields.video_platform_content.video_url =
                    lesson.lessonable_data.video_url;
                additionalFields.video_platform_content.duration =
                    lesson.lessonable_data.duration;
                additionalFields.video_platform_content.content =
                    lesson.lessonable_data.content;
                break;

        }

        setData({
            'id': lesson.id,
            'lesson_title': lesson.title,
            'is_free': lesson.is_free,
            'is_prerequisite': lesson.is_prerequisite,
            'enable_discussions': lesson.enable_discussions,
            'status': lesson.status,
            'lesson_type': lesson.lessonable_name,

            'content': '',
            'text_content': additionalFields.text_content,

            'pdf_file': '',
            'is_content_downloadable': false,
            'pdf_content': additionalFields.pdf_content,

            'video_file': '',
            'video_optional_content': '',
            'video_optional_downloads': [],
            'video_primary_files': [],
            'is_video_downloadable': false,
            'video_content': additionalFields.video_content,

            'download_content': '',
            'download_files': [],
            'download_content_data': additionalFields.download_content_data,

            'audio_file': '',
            'is_audio_downloadable': false,
            'audio_content': additionalFields.audio_content,

            'video_platform_video_type': '',
            'video_platform_video_url': '',
            'video_platform_duration': '00:00',
            'video_platform_optional_content': '',
            'video_platform_content': additionalFields.video_platform_content,

            '_method': 'PUT'
        });
    }

    const onClickEditLesson = () => {
        clearErrors();
        initializeLessonData();
        setEditLessonDialog(true);
    }

    const onCloseEditLessonDialog = () => {
        if (!dropzoneProcessing && !processing) {
            setEditLessonDialog(false);
        }
    }

    const postEditLessonData = () => {
        post(route('courses.settings.updateLesson', lesson.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDropzoneProcessing(false);
                setEditLessonDialog(false);
            }
        });
    }

    function handleEditLessonSubmit(e) {
        e.preventDefault();
        postEditLessonData();
    }

    return (
        <>
            <ContextContainer.Provider value={{ data, setData, errors, reset, post, clearErrors, processing, dropzoneProcessing, setDropzoneProcessing }}>
                <ModalWithButtons
                    title={`Edit lesson '${lesson.title}'`}
                    open={editLessonDialog}
                    onClose={() => onCloseEditLessonDialog()}
                    mWidthClassName="mw-900px"
                    buttons={
                        <React.Fragment>
                            <button
                                disabled={(processing || dropzoneProcessing)}
                                className="btn btn-primary"
                                onClick={handleEditLessonSubmit}
                            >
                                Save
                            </button>
                        </React.Fragment>
                    }
                >
                    <form
                        onSubmit={handleEditLessonSubmit}
                        className="form w-100"
                    >

                        <div className="fv-row mb-7">
                            <label className="fs-6 fw-bold mb-2">Title</label>
                            <input className={`form-control form-control-solid ${errors.lesson_title ? "is-invalid" : ""}`}
                                type="text" name="lesson_title" value={data.lesson_title} onChange={e => setData('lesson_title', e.target.value)} />
                            {errors.lesson_title && <div className="fv-plugins-message-container invalid-feedback">{errors.lesson_title}</div>}
                        </div>

                        <RenderLessonTypeComponent
                            lessonTypeComponent={data.lesson_type}
                            onSubmit={postEditLessonData}
                        />

                        <div className="fv-row mt-5">
                            <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                                <input
                                    name="status"
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={data.status == "Draft"}
                                    onChange={e => setData('status', e.target.checked == 1 ? 'Draft' : 'Active')}
                                />
                                <span className="form-check-label text-gray-600 fw-bold">Draft lesson?</span>
                            </label>
                        </div>
                        <div className="fv-row mt-1">
                            <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                                <input
                                    name="is_free"
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={data.is_free}
                                    onChange={e => setData('is_free', e.target.checked == 1)}
                                />
                                <span className="form-check-label text-gray-600 fw-bold">Make this a free preview lesson</span>
                            </label>
                        </div>
                        <div className="fv-row mt-1">
                            <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                                <input
                                    name="is_prerequisite"
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={data.is_prerequisite}
                                    onChange={e => setData('is_prerequisite', e.target.checked == 1)}
                                />
                                <span className="form-check-label text-gray-600 fw-bold">Make this a prerequisite</span>
                            </label>
                        </div>
                        <div className="fv-row mt-1">
                            <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                                <input
                                    name="enable_discussions"
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={data.enable_discussions}
                                    onChange={e => setData('enable_discussions', e.target.checked == 1)}
                                />
                                <span className="form-check-label text-gray-600 fw-bold">Enable discussions for this lesson</span>
                            </label>
                        </div>

                    </form>
                </ModalWithButtons>
                <span className="cursor-pointer mr-5" onClick={() => onClickEditLesson()}><i className="bi bi-pencil-square"></i></span>
            </ContextContainer.Provider>
        </>
    )

}

const DeleteLessonDialog = ({ setHoverLocked, lesson }) => {

    const [deleteLessonDialog, setDeleteLessonDialog] = useState(false);

    useEffect(() => {
        setHoverLocked(deleteLessonDialog);
    }, [deleteLessonDialog]);

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

            <span className="cursor-pointer" onClick={() => setDeleteLessonDialog(true)}><i className="bi bi-x-circle"></i></span>
        </>
    )
}

const LessonCardList = ({ lesson }) => {
    const [hovered, setHovered] = useState(false);
    const [hoverLocked, setHoverLocked] = useState(false);

    return (
        <li className="py-3 sm:py-4"
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <i className={lesson.lesson_icon}></i>
                </div>
                <div className="flex-1 min-w-0">
                    <span>{lesson.title}</span>
                    {lesson.status == 'Draft' && (<i className="text-sm ml-3">Draft</i>)}
                </div>
                <div className={`inline-flex items-center pr-5 ${hovered || hoverLocked ? 'block' : 'hidden'}`}>
                    <LessonCardToolbar setHoverLocked={setHoverLocked} lesson={lesson} />
                </div>
            </div>
        </li>
    )
}

const DeleteChapterDialog = ({ setHoverLocked, chapter }) => {

    const [deleteChapterDialog, setDeleteChapterDialog] = useState(false);

    useEffect(() => {
        setHoverLocked(deleteChapterDialog);
    }, [deleteChapterDialog]);

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

            <button type="button" className="btn btn-sm btn-light-primary m-1" onClick={() => setDeleteChapterDialog(true)}>
                <i className="bi bi-x-circle"></i> Delete chapter
            </button>
        </>
    )

}

const EditChapterDialog = ({ setHoverLocked, chapter }) => {

    const initialData = {
        id: '',
        title: '',
        new_lessons_to_draft: false,
        _method: 'PUT'
    };

    const [editChapterDialog, setEditChapterDialog] = useState(false);
    const { data, setData, errors, post, reset, processing } = useForm(initialData);

    useEffect(() => {
        initializeChapterData();
    }, [chapter])

    const initializeChapterData = () => {
        setData({
            'id': chapter.id,
            'title': chapter.title,
            'new_lessons_to_draft': chapter.new_lessons_to_draft,
            '_method': 'PUT'
        });
    }

    useEffect(() => {
        setHoverLocked(editChapterDialog);
    }, [editChapterDialog]);

    const onClickEditChapter = () => {
        setEditChapterDialog(true);
    }

    function handleEditChapterSubmit(e) {
        e.preventDefault();
        post(route('courses.settings.updateChapter', chapter.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditChapterDialog(false);
            }
        });
    }

    return (
        <>
            <ModalWithButtons
                title={`Edit chapter '${chapter.title}'`}
                open={editChapterDialog}
                onClose={() => setEditChapterDialog(false)}
                onConfirm={() => setEditChapterDialog(false)}
                buttons={
                    <React.Fragment>
                        <button
                            disabled={processing}
                            className="btn btn-primary"
                            onClick={handleEditChapterSubmit}
                        >
                            Save
                        </button>
                    </React.Fragment>
                }
            >
                <form
                    onSubmit={handleEditChapterSubmit}
                    className="form w-100"
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

            <button type="button" className="btn btn-sm btn-light-primary m-1" onClick={() => onClickEditChapter()}>
                <i className="bi bi-pencil-square"></i> Edit chapter
            </button>
        </>
    )

}

const htmlToEditorState = (html) => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        return EditorState.createWithContent(contentState)
    }
}

const LessonTypeText = () => {

    const { data, setData, errors } = useContext(ContextContainer);
    const tmpData = Object.assign({}, data);

    const [editorState, setEditorState] = useState(htmlToEditorState((data.text_content ? data.text_content.content : data.content)));

    useEffect(() => {
        tmpData['content'] = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setData({ ...tmpData });
    }, [editorState]);

    return (
        <>
            <div className="fv-row mb-7">
                <label className="fs-6 fw-bold mb-2">Content</label>
                <Editor
                    editorClassName="react-editor-custom"
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                />
                {errors.content && <div className="fv-plugins-message-container invalid-feedback">{errors.content}</div>}
            </div>
        </>
    )
}

const RenderLessonTypeComponent = ({ lessonTypeComponent, onSubmit }) => {

    switch (lessonTypeComponent) {
        case "LessonTypeText":
            return <LessonTypeText />;
        case "LessonTypePDF":
            return <LessonTypePDF onSubmit={onSubmit} />;
        case "LessonTypeVideo":
            return <LessonTypeVideo />;
        case "LessonTypeDownload":
            return <LessonTypeDownload />;
        case "LessonTypeAudio":
            return <LessonTypeAudio onSubmit={onSubmit} />;
        case "LessonTypeVideoPlatform":
            return <LessonTypeVideoPlatform />;
        default:
            return <></>;
    }
};

const DeleteFileDialog = ({ file, onDeleteFile, className = '', actionLabel = '' }) => {

    const { data } = useContext(ContextContainer);
    const [deleteFileDialog, setDeleteFileDialog] = useState(false);

    function handleDeleteFileSubmit(e) {
        if (data.id > 0) {
            Inertia.delete(route('courses.settings.destroyLessonFile', [data.id, file.id]), {
                preserveScroll: true,
                onSuccess: () => {
                    typeof onDeleteFile === 'function' && onDeleteFile(file.id);
                }
            });
        } else {
            typeof onDeleteFile === 'function' && onDeleteFile(file.id);
        }
    }

    return (
        <>
            <ConfirmModal
                title={`Delete file '${file.filename}'?`}
                open={deleteFileDialog}
                onClose={() => setDeleteFileDialog(false)}
                onConfirm={handleDeleteFileSubmit}
            >
                Are you sure you want to remove this file?
            </ConfirmModal>

            <span className={`cursor-pointer ${className}`} onClick={() => setDeleteFileDialog(true)}><i className="bi bi-x-circle"></i> {actionLabel}</span>
        </>
    )

}

const LessonFileVideo = ({ file, onDeleteFile }) => {
    return (<>
        {file && <>
            <video width="100%" controls>
                <source src={route('files.streamFile', file.id)} type={file.mimetype} />
            </video >
            <div className="p-2">
                <DeleteFileDialog file={file} onDeleteFile={onDeleteFile} actionLabel="Remove" className="inline-block bg-gray-200 cursor-pointer px-3 py-1 text-sm font-semibold text-gray-700 m-2" />
                <a href={route('files.downloadFile', file.id)} className="inline-block bg-gray-200 cursor-pointer px-3 py-1 text-sm font-semibold text-gray-700 m-2"><i className="bi bi-cloud-arrow-down"></i> Download</a>
            </div>
        </>}
    </>)
}

const LessonFileAudio = ({ file, onDeleteFile }) => {
    return (<>
        {file && <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0 text-left">
                    <audio controls>
                        <source src={route('files.streamFile', file.id)} type={file.mimetype} />
                    </audio>
                </div>
                <div className="inline-flex items-center pr-5">
                    <a href={route('files.downloadFile', file.id)} className="mr-5"><i className="bi bi-download"></i></a>
                    <DeleteFileDialog file={file} onDeleteFile={onDeleteFile} />
                </div>
            </div>
        </li>}
    </>)
}

const LessonFileContent = ({ file, onDeleteFile }) => {
    return (<>
        {file && <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <i className={`bi bi-filetype-${file.ext}`}></i>
                </div>
                <div className="flex-1 min-w-0 text-left">
                    <span>{file.filename}</span>
                </div>
                <div className="inline-flex items-center pr-5">
                    <a href={route('files.downloadFile', file.id)} className="mr-5"><i className="bi bi-download"></i></a>
                    <DeleteFileDialog file={file} onDeleteFile={onDeleteFile} />
                </div>
            </div>
        </li>}
    </>)
}

const LessonTypeVideoPlatform = () => {
    const { data, setData, errors } = useContext(ContextContainer);
    const tmpData = Object.assign({}, data);

    const [preVideoType, setPreVideoType] = useState(false);
    const [preVideoURL, setPreVideoURL] = useState(false);

    const [editorState, setEditorState] = useState(htmlToEditorState((data.video_platform_content ? data.video_platform_content.content : data.video_platform_optional_content)));

    // Set default ..
    useEffect(() => {
        const preVideoType = (data.video_platform_content ? data.video_platform_content.video_type : data.video_platform_video_type);
        setPreVideoType(preVideoType);
        tmpData['video_platform_video_type'] = preVideoType;

        const preVideoURL = (data.video_platform_content ? data.video_platform_content.video_url : data.video_platform_video_url);
        setPreVideoURL(preVideoURL);
        tmpData['video_platform_video_url'] = preVideoURL;

        tmpData['video_platform_duration'] = (data.video_platform_content ? data.video_platform_content.duration : data.video_platform_duration);
        setData({ ...tmpData });
    }, []);

    useEffect(() => {
        tmpData['video_platform_optional_content'] = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setData({ ...tmpData });
    }, [editorState]);

    const platforms = [
        { label: "Youtube", value: "youtube" },
        { label: "Vimeo", value: "vimeo" },
    ];

    const onChangeDuration = duration => {
        tmpData['video_platform_duration'] = duration;
        setData({ ...tmpData });
    };

    const youtubeIdFromURL = (video_url) => {
        let video_id = video_url.split('v=')[1];
        let ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    const vimeoIdFromURL = (video_url) => {
        return video_url.split('?')[0].split('/').pop()
    }

    return (
        <>
            <div className="fv-row mt-5">
                <label className="fs-6 fw-bold mb-2">Video Type</label>
                <select className="form-select"
                    name="video_platform_video_type"
                    value={data.video_platform_video_type}
                    onChange={e => setData('video_platform_video_type', e.target.value)}
                >
                    <option value=""></option>
                    {platforms.map((platform, key) => (
                        <option key={key} value={platform.value}>
                            {platform.label}
                        </option>
                    ))}
                </select>
                {errors.video_platform_video_type && <div className="fv-plugins-message-container invalid-feedback">{errors.video_platform_video_type}</div>}
            </div>

            <div className="fv-row mt-5">
                <label className="fs-6 fw-bold mb-2">Video URL</label>
                <input className={`form-control form-control-solid ${errors.video_platform_video_url ? "is-invalid" : ""}`}
                    type="text" name="video_platform_video_url" value={data.video_platform_video_url} onChange={e => setData('video_platform_video_url', e.target.value)} />
                {errors.video_platform_video_url && <div className="fv-plugins-message-container invalid-feedback">{errors.video_platform_video_url}</div>}
                {preVideoURL != '' &&
                    (<div className="mt-2">
                        {preVideoType == 'youtube' &&
                            <YoutubeEmbed embedId={youtubeIdFromURL(preVideoURL)} />}
                        {preVideoType == 'vimeo' &&
                            <VimeoEmbed embedId={vimeoIdFromURL(preVideoURL)} />}
                    </div>)}
            </div>

            <div className="fv-row mt-5">
                <label className="fs-6 fw-bold mb-2">Duration <small className="text-muted">HH:MM</small></label>
                <CompeonTimepicker onChange={onChangeDuration} value={data.video_platform_duration}
                    inputClassName={`form-control form-control-solid ${errors.video_platform_duration ? "is-invalid" : ""}`}
                    minutesPerStep={1}>
                    <input />
                </CompeonTimepicker>
                {errors.video_platform_duration && <div className="fv-plugins-message-container invalid-feedback">{errors.video_platform_duration}</div>}
            </div>

            <div className="fv-row mt-5">
                <label className="fs-6 fw-bold mb-2">Content</label>
                <Editor
                    editorClassName="react-editor-custom"
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                />
                {errors.video_platform_optional_content && <div className="fv-plugins-message-container invalid-feedback">{errors.video_platform_optional_content}</div>}
            </div>
        </>
    )
}

const LessonTypeAudio = ({ onSubmit }) => {

    const { data, setData, errors, dropzoneProcessing, setDropzoneProcessing } = useContext(ContextContainer);
    const tmpData = Object.assign({}, data);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [autoSubmitted, setAutoSubmitted] = useState(false);

    // Set default ..
    useEffect(() => {
        tmpData['is_audio_downloadable'] = (data.audio_content ? data.audio_content.is_audio_downloadable : data.is_audio_downloadable);
        setData({ ...tmpData });
    }, []);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            if (tmpData['lesson_title'] == '') {
                tmpData['lesson_title'] = uploadedFiles[0].filename.replace(/\.[^/.]+$/, "");
            }
            tmpData['audio_file'] = uploadedFiles[0].id;
            setData({ ...tmpData });
        }
    }, [uploadedFiles]);

    useEffect(() => {
        if (data.lesson_title != '' && data.audio_file) {
            if (!autoSubmitted) {
                setAutoSubmitted(true)
                onSubmit();
            }
        }
    }, [data]);

    const onFileDelete = (id) => {
        tmpData.audio_content.files = data.audio_content.files.filter(file => file.id != id);
        setData({ ...tmpData });
    }

    return (
        <>
            <DropZoneUploader
                accept={{
                    'audio/*': [".mp2", ".mp3", ".wav", ".m4a"],
                    'application/ogg': ['.ogg']
                }}
                uploadableSection={{ 'name': "Audio", 'section': 'Primary' }}
                onSuccess={setUploadedFiles}
                extraInfo="You can upload files with the extension: mp2, mp3, wav, m4a, ogg"
                dropzoneProcessing={dropzoneProcessing}
                setDropzoneProcessing={setDropzoneProcessing}
                isHidden={(data.audio_content && data.audio_content.files.length > 0)}
            />
            {errors.audio_file && <div className="fv-plugins-message-container invalid-feedback">{errors.audio_file}</div>}

            {(data.audio_content && data.audio_content.files.length > 0) &&
                <div className="p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data.audio_content.files.map((file, key) => (
                                <LessonFileAudio key={key} file={file} onDeleteFile={onFileDelete} />
                            ))}
                        </ul>
                    </div>
                </div>
            }

            <div className="fv-row mt-5">
                <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                    <input
                        name="is_audio_downloadable"
                        className="form-check-input"
                        type="checkbox"
                        checked={data.is_audio_downloadable}
                        onChange={e => setData('is_audio_downloadable', e.target.checked == 1)}
                    />
                    <span className="form-check-label text-gray-600 fw-bold">Make this audio downloadable</span>
                </label>
            </div>
        </>
    )
}

const LessonTypePDF = ({ onSubmit }) => {

    const { data, setData, errors, dropzoneProcessing, setDropzoneProcessing } = useContext(ContextContainer);
    const tmpData = Object.assign({}, data);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [autoSubmitted, setAutoSubmitted] = useState(false);

    // Set default ..
    useEffect(() => {
        tmpData['is_content_downloadable'] = (data.pdf_content ? data.pdf_content.is_content_downloadable : data.is_content_downloadable);
        setData({ ...tmpData });
    }, []);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            if (tmpData['lesson_title'] == '') {
                tmpData['lesson_title'] = uploadedFiles[0].filename.replace(/\.[^/.]+$/, "");
            }
            tmpData['pdf_file'] = uploadedFiles[0].id;
            setData({ ...tmpData });
        }
    }, [uploadedFiles]);

    useEffect(() => {
        if (data.lesson_title != '' && data.pdf_file) {
            if (!autoSubmitted) {
                setAutoSubmitted(true)
                onSubmit();
            }
        }
    }, [data]);

    const onFileDelete = (id) => {
        tmpData.pdf_content.files = data.pdf_content.files.filter(file => file.id != id);
        setData({ ...tmpData });
    }

    return (
        <>
            <DropZoneUploader
                accept={{ 'application/pdf': ['.pdf'] }}
                uploadableSection={{ 'name': "PDF", 'section': 'Primary' }}
                onSuccess={setUploadedFiles}
                extraInfo="You can upload files with the extension: pdf"
                dropzoneProcessing={dropzoneProcessing}
                setDropzoneProcessing={setDropzoneProcessing}
                isHidden={(data.pdf_content && data.pdf_content.files.length > 0)}
            />
            {errors.pdf_file && <div className="fv-plugins-message-container invalid-feedback">{errors.pdf_file}</div>}

            {(data.pdf_content && data.pdf_content.files.length > 0) &&
                <div className="p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data.pdf_content.files.map((file, key) => (
                                <LessonFileContent key={key} file={file} onDeleteFile={onFileDelete} />
                            ))}
                        </ul>
                    </div>
                </div>
            }

            <div className="fv-row mt-5">
                <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                    <input
                        name="is_content_downloadable"
                        className="form-check-input"
                        type="checkbox"
                        checked={data.is_content_downloadable}
                        onChange={e => setData('is_content_downloadable', e.target.checked == 1)}
                    />
                    <span className="form-check-label text-gray-600 fw-bold">Make this PDF content downloadable</span>
                </label>
            </div>
        </>
    )
}

const LessonTypeDownload = () => {

    const { data, setData, errors, dropzoneProcessing, setDropzoneProcessing } = useContext(ContextContainer);
    const tmpData = Object.assign({}, data);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [dropzoneOptFilesProcessing, setDropzoneOptFilesProcessing] = useState(false);

    const [editorState, setEditorState] = useState(htmlToEditorState((data.download_content_data ? data.download_content_data.content : data.download_content)));

    useEffect(() => {
        tmpData['download_files'] = (data.download_content_data ? data.download_content_data?.files.filter(file => file.uploadable_section == 'Downloads').map(file => {
            return { id: file.id, filename: file.filename, ext: file.ext };
        }) : data.download_files);
        setData({ ...tmpData });
    }, [data.download_content_data?.files]);

    useEffect(() => {
        tmpData['download_content'] = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setData({ ...tmpData });
    }, [editorState]);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            const preDownloads = data.download_content_data.files ?? [];
            tmpData.download_content_data.files = [...preDownloads, ...uploadedFiles];
            setData({ ...tmpData });
            setDropzoneOptFilesProcessing(false);
        }
    }, [uploadedFiles]);

    const onFileDelete = (id) => {
        tmpData.download_content_data.files = data.download_content_data.files.filter(file => file.id != id);
        setData({ ...tmpData });
    }

    return (
        <>
            <div className="fv-row mt-5">
                <label className="fs-6 fw-bold mb-2">Content</label>
                <Editor
                    editorClassName="react-editor-custom"
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                />
                {errors.download_content && <div className="fv-plugins-message-container invalid-feedback">{errors.download_content}</div>}
            </div>

            <div className="fv-row mt-5">
                <label className="fs-6 fw-bold mb-2">Upload a file</label>
                <DropZoneUploader
                    uploadableSection={{ 'name': "Download", 'section': 'Downloads' }}
                    multiple={true}
                    onSuccess={setUploadedFiles}
                    extraInfo="You can upload any type of file except .dmg, .svg, and .html files"
                    dropzoneProcessing={dropzoneOptFilesProcessing}
                    setDropzoneProcessing={setDropzoneOptFilesProcessing}
                    isHidden={dropzoneOptFilesProcessing}
                />
                {errors.download_files && <div className="fv-plugins-message-container invalid-feedback">{errors.download_files}</div>}

                {(data.download_files && data.download_files.length > 0) &&
                    <div className="p-4 w-full mt-5 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {data.download_files.map((file, key) => (
                                    <LessonFileContent key={key} file={file} onDeleteFile={onFileDelete} />
                                ))}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

const LessonTypeVideo = () => {

    const { libraryFiles } = usePage().props;

    const { data, setData, errors, dropzoneProcessing, setDropzoneProcessing } = useContext(ContextContainer);
    const tmpData = Object.assign({}, data);

    const [uploadedVideo, setUploadedVideo] = useState([]);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [dropzoneOptFilesProcessing, setDropzoneOptFilesProcessing] = useState(false);
    const [selectedVideoPrimary, setSelectedVideoPrimary] = useState('');

    const [editorState, setEditorState] = useState(htmlToEditorState((data.video_content ? data.video_content.video_optional_content : data.video_optional_content)));

    // Set default ..
    useEffect(() => {
        tmpData['is_video_downloadable'] = (data.video_content ? data.video_content.is_video_downloadable : data.is_video_downloadable);
        setData({ ...tmpData });
    }, []);

    useEffect(() => {
        tmpData['video_primary_files'] = (data.video_content ? data.video_content?.files.filter(file => file.uploadable_section == 'Primary').map(file => {
            setSelectedVideoPrimary(file.id);
            return { id: file.id, filename: file.filename, ext: file.ext };
        }) : data.video_primary_files);
        tmpData['video_optional_downloads'] = (data.video_content ? data.video_content?.files.filter(file => file.uploadable_section == 'Downloads').map(file => {
            return { id: file.id, filename: file.filename, ext: file.ext };
        }) : data.video_optional_downloads);
        setData({ ...tmpData });
    }, [data.video_content?.files]);

    useEffect(() => {
        tmpData['video_optional_content'] = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setData({ ...tmpData });
    }, [editorState]);

    useEffect(() => {
        if (uploadedVideo.length > 0) {
            if (tmpData['lesson_title'] == '') {
                tmpData['lesson_title'] = uploadedVideo[0].filename.replace(/\.[^/.]+$/, "");
            }
            tmpData['video_file'] = uploadedVideo[0].id;

            const preDownloads = data.video_content.files ?? [];
            tmpData.video_content.files = [...preDownloads, ...uploadedVideo];
            setData({ ...tmpData });
            setDropzoneProcessing(false);
        }
    }, [uploadedVideo]);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            const preDownloads = data.video_content.files ?? [];
            tmpData.video_content.files = [...preDownloads, ...uploadedFiles];
            setData({ ...tmpData });
            setDropzoneOptFilesProcessing(false);
        }
    }, [uploadedFiles]);

    const onFileDelete = (id) => {
        tmpData.video_content.files = data.video_content.files.filter(file => file.id != id);
        setData({ ...tmpData });
        setSelectedVideoPrimary('');
    }

    const onChangeLibrary = (event) => {
        tmpData.video_content.files = data.video_content.files.filter(file => file.uploadable_section != 'Primary');
        setData({ ...tmpData });

        const selectedVideo = libraryFiles.filter(file => file.id == event.target.value);
        setUploadedVideo(selectedVideo);
    }

    return (
        <>
            <div className="fv-row mt-5">
                <label className="fs-5 fw-bold form-label mb-5">Videos from your library</label>
                <select className="form-select form-select-lg"
                    name="selected_video_primary"
                    value={selectedVideoPrimary}
                    onChange={onChangeLibrary}
                >
                    <option value="" disabled></option>
                    {libraryFiles.map((file, key) => (
                        <option key={key} value={file.id}>
                            {file.filename}
                        </option>
                    ))}
                </select>
            </div>

            <div className="fv-row mt-5">
                {!(data.video_primary_files && data.video_primary_files.length > 0) && (<label className="fs-6 fw-bold mb-2">Upload a video file</label>)}
                <DropZoneUploader
                    accept={{
                        'video/*': ['.mp4', '.3gp', '.mov', '.avi', '.wmv']
                    }}
                    uploadableSection={{ 'name': "Video", 'section': 'Primary' }}
                    onSuccess={setUploadedVideo}
                    extraInfo="You can upload files with the extensions: mp4, 3gp, mov, avi, wmv"
                    dropzoneProcessing={dropzoneProcessing}
                    setDropzoneProcessing={setDropzoneProcessing}
                    fileSize={1024}
                    isLibaray={true}
                    isHidden={(data.video_primary_files && data.video_primary_files.length > 0)}
                />
                {errors.video_file && <div className="fv-plugins-message-container invalid-feedback">{errors.video_file}</div>}

                {(data.video_primary_files && data.video_primary_files.length > 0) &&
                    <div className="w-full bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
                        {data.video_primary_files.map((file, key) => (<div key={key} className="flow-root">
                            <LessonFileVideo key={key} file={file} onDeleteFile={onFileDelete} />
                        </div>
                        ))}
                    </div>
                }
            </div>

            <div className="fv-row mt-5">
                <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                    <input
                        name="is_video_downloadable"
                        className="form-check-input"
                        type="checkbox"
                        checked={data.is_video_downloadable}
                        onChange={e => setData('is_video_downloadable', e.target.checked == 1)}
                    />
                    <span className="form-check-label text-gray-600 fw-bold">Make this video downloadable</span>
                </label>
            </div>

            <div className="fv-row mt-5">
                <label className="fs-6 fw-bold mb-2">Add text <i className="text-muted text-sm">optinal</i></label>
                <Editor
                    editorClassName="react-editor-custom"
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                />
                {errors.video_optional_content && <div className="fv-plugins-message-container invalid-feedback">{errors.video_optional_content}</div>}
            </div>

            <div className="fv-row mt-5">
                <label className="fs-6 fw-bold mb-2">Add downloads <i className="text-muted text-sm">optinal</i></label>
                <DropZoneUploader
                    uploadableSection={{ 'name': "Video", 'section': 'Downloads' }}
                    multiple={true}
                    onSuccess={setUploadedFiles}
                    extraInfo="You can upload any type of file except .dmg, .svg, and .html files"
                    dropzoneProcessing={dropzoneOptFilesProcessing}
                    setDropzoneProcessing={setDropzoneOptFilesProcessing}
                    isHidden={dropzoneOptFilesProcessing}
                />
                {errors.video_optional_downloads && <div className="fv-plugins-message-container invalid-feedback">{errors.video_optional_downloads}</div>}

                {(data.video_optional_downloads && data.video_optional_downloads.length > 0) &&
                    <div className="p-4 w-full mt-5 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {data.video_optional_downloads.map((file, key) => (
                                    <LessonFileContent key={key} file={file} onDeleteFile={onFileDelete} />
                                ))}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

const AddLessonDialog = ({ setHoverLocked, chapter }) => {

    const lessonTypeLists = [
        {
            key: "LessonTypeVideo",
            label: "Video",
            active: true,
            icon: "bi-camera-video",
            description: "Easily upload and display your video content in Mahzah"
        },
        {
            key: "LessonTypeText",
            label: "Text",
            active: true,
            icon: "bi-file-text",
            description: "Include bodies of text, styled HTML content, and also images or external links"
        },
        {
            key: "LessonTypePDF",
            label: "PDF",
            active: true,
            icon: "bi-file-pdf",
            description: "Easily upload PDF content for your students to view directly within the Course Player"
        },
        {
            key: "LessonTypeAudio",
            label: "Audio",
            active: true,
            icon: "bi-megaphone",
            description: "Perfect for learning on the go, audio content is great if you know your students are mobile"
        },
        {
            key: "LessonTypeDownload",
            label: "Download",
            active: true,
            icon: "bi-cloud-arrow-down",
            description: "Distribute files to your students"
        },
        {
            key: "LessonTypeVideoPlatform",
            label: "Video Platform",
            active: true,
            icon: "bi-file-play",
            description: "Display your online video content (Youtube, Vimeo) in Mahzah"
        },
        // {
        //     key: "LessonTypePresentation",
        //     label: "Presentation",
        //     active: false,
        //     icon: "bi-file-ppt",
        //     description: "Display slides with audio that your students can navigate through"
        // },
        // {
        //     key: "LessonTypeLive",
        //     label: "Live",
        //     active: false,
        //     icon: "bi-wifi",
        //     description: "Enable Live Lessons using Zoom's video meeting and/or webinar tools"
        // },
        // {
        //     key: "LessonTypeMultimedia",
        //     label: "Multimedia",
        //     active: false,
        //     icon: "bi-music-note-beamed",
        //     description: "Include a great resource into your course that is hosted outside of Mahzah"
        // },

    ];

    const initialData = {
        lesson_title: '',
        is_free: false,
        is_prerequisite: false,
        enable_discussions: false,
        status: 'Active',
        lesson_type: '',

        // Text
        content: '',
        text_content: {
            'content': ''
        },

        // PDF
        pdf_file: '',
        is_content_downloadable: false,
        pdf_content: {
            'id': null,
            'files': [],
            'is_content_downloadable': false
        },

        // Video
        video_file: '',
        video_optional_content: '',
        video_optional_downloads: [],
        video_primary_files: [],
        is_video_downloadable: false,
        video_content: {
            'id': null,
            'files': [],
            'video_optional_content': '',
            'is_video_downloadable': false
        },

        // Download
        download_content: '',
        download_files: [],
        download_content_data: {
            'id': null,
            'content': '',
            'files': []
        },

        // Audio
        audio_file: '',
        is_audio_downloadable: false,
        audio_content: {
            'id': null,
            'files': [],
            'is_audio_downloadable': false
        },

        // Video Platform
        video_platform_video_type: '',
        video_platform_video_url: '',
        video_platform_duration: '00:00',
        video_platform_optional_content: '',
        video_platform_content: {
            'id': null,
            'video_type': '',
            'video_url': '',
            'duration': '',
            'content': '',
        },


    };

    const { data, setData, errors, reset, post, clearErrors, processing } = useForm(initialData);

    const [addLessonDialog, setAddLessonDialog] = useState(false);
    const [showLessonTypeList, setShowLessonTypeLists] = useState(true);
    const [lessonTypeComponent, setLessonTypeComponent] = useState(null);
    const [dropzoneProcessing, setDropzoneProcessing] = useState(false);

    useEffect(() => {
        setData('status', chapter.new_lessons_to_draft ? 'Draft' : 'Active');
    }, [chapter]);

    useEffect(() => {
        setData("lesson_type", lessonTypeComponent);
    }, [lessonTypeComponent]);

    useEffect(() => {
        setHoverLocked(addLessonDialog);
    }, [addLessonDialog]);

    const postAddLessonData = () => {
        post(route('courses.settings.addLesson', chapter.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
                setDropzoneProcessing(false);
                setAddLessonDialog(false);
            }
        });
    }

    const handleAddLessonSubmit = (e) => {
        e.preventDefault();
        postAddLessonData();
    }

    const resetAddLessonDialog = () => {
        setShowLessonTypeLists(true);
        setLessonTypeComponent(null);
        setDropzoneProcessing(false);
    }

    const onClickAddLessonDialog = () => {
        setAddLessonDialog(true);
        resetAddLessonDialog();
        setData(initialData);
    }

    const onCloseAddLessonDialog = () => {
        if (!dropzoneProcessing && !processing) {
            setAddLessonDialog(false);
            resetAddLessonDialog();
        }
    }

    const handleLessonType = (key, active) => {
        if (active) {
            setShowLessonTypeLists(false);
            setLessonTypeComponent(key);
        }
    }

    return (
        <>
            <ContextContainer.Provider value={{ data, setData, errors, reset, post, clearErrors, processing, dropzoneProcessing, setDropzoneProcessing }}>
                <Modal
                    title={`Add lesson in '${chapter.title}'`}
                    open={addLessonDialog}
                    onClose={() => onCloseAddLessonDialog()}
                    mWidthClassName="mw-900px"
                    buttons={!showLessonTypeList &&
                        <React.Fragment>
                            <button onClick={() => onCloseAddLessonDialog()} className="btn btn-light me-3">
                                Discard changes
                            </button>
                            <LoadingButton
                                loading={(processing || dropzoneProcessing)}
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleAddLessonSubmit}
                            >
                                Save
                            </LoadingButton>
                        </React.Fragment>
                    }
                >
                    {showLessonTypeList && (
                        <div className="container mx-auto">
                            <h2 className="mb-7">Deliver learning content</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                {lessonTypeLists.map((item, key) =>
                                (<div className="card m-3 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
                                    key={key} onClick={() => handleLessonType(item.key, item.active)}>
                                    <div className="m-3">
                                        <h3 className="text-lg mb-2">{item.label}
                                            <span className="text-teal-800 bg-teal-100 inline rounded-full px-2 align-top float-right"><i className={item.icon}></i></span></h3>
                                        <p className="font-light text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">{item.description}</p>
                                    </div>
                                </div>)
                                )}
                            </div>
                        </div>
                    )}

                    {!showLessonTypeList && (
                        <form
                            onSubmit={handleAddLessonSubmit}
                            className="form w-100"
                        >
                            <div className="fv-row mb-7">
                                <label className="fs-6 fw-bold mb-2">Title</label>
                                <input className={`form-control form-control-solid ${errors.lesson_title ? "is-invalid" : ""}`}
                                    type="text" name="lesson_title" value={data.lesson_title} onChange={e => setData('lesson_title', e.target.value)} />
                                {errors.lesson_title && <div className="fv-plugins-message-container invalid-feedback">{errors.lesson_title}</div>}
                            </div>

                            <RenderLessonTypeComponent
                                lessonTypeComponent={lessonTypeComponent}
                                onSubmit={postAddLessonData}
                            />

                            <div className="fv-row mt-5">
                                <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                                    <input
                                        name="status"
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={data.status == "Draft"}
                                        onChange={e => setData('status', e.target.checked == 1 ? 'Draft' : 'Active')}
                                    />
                                    <span className="form-check-label text-gray-600 fw-bold">Draft lesson?</span>
                                </label>
                            </div>
                            <div className="fv-row mt-1">
                                <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                                    <input
                                        name="is_free"
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={data.is_free}
                                        onChange={e => setData('is_free', e.target.checked == 1)}
                                    />
                                    <span className="form-check-label text-gray-600 fw-bold">Make this a free preview lesson</span>
                                </label>
                            </div>
                            <div className="fv-row mt-1">
                                <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                                    <input
                                        name="is_prerequisite"
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={data.is_prerequisite}
                                        onChange={e => setData('is_prerequisite', e.target.checked == 1)}
                                    />
                                    <span className="form-check-label text-gray-600 fw-bold">Make this a prerequisite</span>
                                </label>
                            </div>
                            <div className="fv-row mt-1">
                                <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                                    <input
                                        name="enable_discussions"
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={data.enable_discussions}
                                        onChange={e => setData('enable_discussions', e.target.checked == 1)}
                                    />
                                    <span className="form-check-label text-gray-600 fw-bold">Enable discussions for this lesson</span>
                                </label>
                            </div>
                        </form>)}

                </Modal>

                <button type="button" className="btn btn-sm btn-primary m-1" onClick={() => onClickAddLessonDialog()}>
                    <i className="bi bi-plus-circle"></i> New lesson
                </button>
            </ContextContainer.Provider>
        </>
    )

}

const CopyLessonDialog = ({ setHoverLocked, chapter }) => {

    const { course, courses } = usePage().props;
    const [copyLessonDialog, setCopyLessonDialog] = useState(false);

    useEffect(() => {
        setHoverLocked(copyLessonDialog);
    }, [copyLessonDialog]);

    const initialData = {
        from_course_id: course.id || '',
        from_lesson_id: '',

        _method: 'PUT'
    };

    const { data, post, setData, processing } = useForm(initialData);

    const onShowCopyLessonDialog = () => {
        setCopyLessonDialog(true);
    }

    const onChangeCourse = (event) => {
        setData('from_course_id', event.target.value);
    }

    useEffect(() => {
        setData('from_lesson_id', '');
    }, [data.from_course_id]);

    const onChangeLesson = (event) => {
        setData('from_lesson_id', event.target.value);
    }

    function handleCopyLessonSubmit(e) {
        e.preventDefault();
        post(route('courses.settings.copyLesson', chapter.id), {
            preserveScroll: true,
            onSuccess: () => {
                setData(initialData);
                setCopyLessonDialog(false);
            }
        });
    }

    return (
        <>
            <Modal
                title="Copy a lesson from..."
                open={copyLessonDialog}
                onClose={() => setCopyLessonDialog(false)}
                mWidthClassName="mw-650px"
                buttons={
                    <React.Fragment>
                        <button
                            disabled={(processing || data.from_course_id == '' || data.from_lesson_id == '')}
                            className="btn btn-primary"
                            onClick={handleCopyLessonSubmit}
                        >
                            Copy
                        </button>
                    </React.Fragment>
                }
            >
                <div className="fv-row mb-10">
                    <label className="fs-5 fw-bold form-label mb-5">Select a course</label>
                    <select className="form-select form-select-lg"
                        name="from_course_id"
                        value={data.from_course_id}
                        onChange={onChangeCourse}
                    >
                        <option value="" disabled></option>
                        {courses.map((course, key) => (
                            <option key={key} value={course.id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
                {data.from_course_id != '' && (
                    <div className="fv-row mb-10">
                        <label className="fs-5 fw-bold form-label mb-5">Select a lesson</label>
                        <select className="form-select form-select-lg"
                            name="from_lesson_id"
                            value={data.from_lesson_id}
                            onChange={onChangeLesson}
                        >
                            <option value="" disabled></option>
                            {courses.filter(cource => cource.id == data.from_course_id)
                                .map(course => {
                                    if (course.chapters.length > 0) {
                                        return course.chapters.map((chapter, key) => {
                                            return (<optgroup key={key} label={chapter.title}>
                                                {chapter.lessons.length > 0 && chapter.lessons.map((lesson, key) => (
                                                    <option key={key} value={lesson.id}>
                                                        {lesson.title}
                                                    </option>
                                                ))}
                                                {chapter.lessons.length == 0 && <option disabled>No lesson found.</option>}
                                            </optgroup>)
                                        });
                                    } else {
                                        return (<optgroup label="No chapter found." key="initialBlankLessonOptgroup" disabled></optgroup>);
                                    }
                                })
                            }
                        </select>
                    </div>)}
            </Modal>

            <button type="button" className="btn btn-sm btn-info"
                onClick={() => onShowCopyLessonDialog()}>
                <i className="bi bi-clipboard"></i> Copy lesson
            </button>
        </>
    )

}

const ChapterCardToolbar = ({ setHoverLocked, chapter }) => {

    return (
        <>
            <EditChapterDialog setHoverLocked={setHoverLocked} chapter={chapter} />
            <DeleteChapterDialog setHoverLocked={setHoverLocked} chapter={chapter} />
            <SortLessonsDialog setHoverLocked={setHoverLocked} chapter={chapter} />
            <AddLessonDialog setHoverLocked={setHoverLocked} chapter={chapter} />
            <CopyLessonDialog setHoverLocked={setHoverLocked} chapter={chapter} />
        </>
    )
}

const ChapterCardList = ({ chapter }) => {
    const [hovered, setHovered] = useState(false);
    const [hoverLocked, setHoverLocked] = useState(false);

    return (
        <div className="add_section_view bg-light card border-bottom h-lg-100 mb-5"
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="card-header">
                <div className="card-title">
                    <h3>{chapter.title}</h3>
                    {chapter.status == 'Draft' && (<i className="text-sm ml-3">Draft</i>)}
                </div>
                <div className="card-toolbar">
                    <div className={hovered || hoverLocked ? 'block' : 'hidden'}>
                        <ChapterCardToolbar setHoverLocked={setHoverLocked} chapter={chapter} />
                    </div>
                </div>
            </div>
            {chapter.lessons.length > 0 && (
                <div className="card-body p-lg-5 pt-5 ps-6">
                    <div className="p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {chapter.lessons.map((item, key) => (
                                    <LessonCardList
                                        key={key} lesson={item} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

export default ChapterCardList;
