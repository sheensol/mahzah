import React, { useState, useEffect } from 'react';
import { swapArrayElements, arrayEquals } from "@/utils";
import Modal from '@/Shared/Modals/Modal';
import { Draggable } from "react-drag-reorder";
import { useForm } from '@inertiajs/inertia-react';

const SortLessonsDialog = ({ setHoverLocked = null, BtnSizeClass="btn-sm", chapter }) => {

    const [sortLessonsDialog, setSortLessonsDialog] = useState(false);

    useEffect(() => {
        typeof setHoverLocked === 'function' && setHoverLocked(sortLessonsDialog);
    }, [sortLessonsDialog]);

    const initialData = {
        lesson_ids: [],
        lesson_ids_changed: false,
        _method: 'PUT'
    };

    const { data, post, setData } = useForm(initialData);

    useEffect(() => {
        setData('lesson_ids', (chapter.lessons.length > 0 ? chapter.lessons.map(lesson => lesson.id) : []));
    }, [chapter.lessons]);

    useEffect(() => {
        let isMounted = true;
        if (data.lesson_ids) {
            const lessonIds = chapter.lessons.length > 0 ? chapter.lessons.map(lesson => lesson.id) : [];
            if (data.lesson_ids.length > 0 && !arrayEquals(lessonIds, data.lesson_ids)) {
                if (isMounted) {
                    post(route('courses.settings.sortLessons', chapter.id), {
                        preserveScroll: true
                    });
                }
            }
        }
        return () => {
            isMounted = false;
        };
    }, [data.lesson_ids]);

    const onSortLessons = (currentPos, newPos) => {
        const lessonIds = [...data.lesson_ids];
        swapArrayElements(lessonIds, currentPos, newPos);
        setData('lesson_ids', lessonIds.map(lessonId => lessonId));
    }

    const onShowSortLessonsDialog = () => {
        setSortLessonsDialog(true);
    }

    return (
        <>
            <Modal
                title="Sort lessons"
                open={sortLessonsDialog}
                onClose={() => setSortLessonsDialog(false)}
                mWidthClassName="mw-650px"
            >
                {chapter.lessons.length > 0 && (
                    <div className="p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <Draggable onPosChange={onSortLessons}>
                                    {chapter.lessons.map((lesson, key) => (
                                        <li className="py-3 sm:py-4" key={key}>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <i className="bi bi-list"></i>
                                                </div>
                                                <div className="flex-1 min-w-0 text-left">
                                                    <span>{lesson.title}</span>
                                                </div>
                                            </div>
                                        </li>))}
                                </Draggable>
                            </ul>
                        </div>
                    </div>
                )}
            </Modal>

            {(chapter.lessons && chapter.lessons.length > 0 &&
                <button type="button" className={`btn ${BtnSizeClass} btn-light-primary`}
                    onClick={() => onShowSortLessonsDialog()}>
                    <i className="bi bi-sort-up"></i> Sort lessons
                </button>
            )}
        </>
    )

}

export default SortLessonsDialog;
