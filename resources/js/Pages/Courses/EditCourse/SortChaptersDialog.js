import React, { useState, useEffect } from 'react';
import { swapArrayElements, arrayEquals } from "@/utils";
import Modal from '@/Shared/Modals/Modal';
import { Draggable } from "react-drag-reorder";
import { useForm } from '@inertiajs/inertia-react';

const SortChaptersDialog = ({ course }) => {

    const [sortChaptersDialog, setSortChaptersDialog] = useState(false);

    const { data, post, setData } = useForm({
        chapter_ids: [],
        chapter_ids_changed: false,
        _method: 'PUT'
    });

    useEffect(() => {
        setData('chapter_ids', (course.chapters.length > 0 ? course.chapters.map(chapter => chapter.id) : []));
    }, [course.chapters]);

    useEffect(() => {
        let isMounted = true;
        if (data.chapter_ids) {
            const chapterIds = course.chapters.length > 0 ? course.chapters.map(chapter => chapter.id) : [];
            if (data.chapter_ids.length > 0 && !arrayEquals(chapterIds, data.chapter_ids)) {
                if (isMounted) {
                    post(route('courses.settings.sortChapters', course.id), {
                        preserveScroll: true
                    });
                }
            }
        }
        return () => {
            isMounted = false;
        };
    }, [data.chapter_ids]);

    const onSortChapters = (currentPos, newPos) => {
        const chapterIds = [...data.chapter_ids];
        swapArrayElements(chapterIds, currentPos, newPos);
        setData('chapter_ids', chapterIds.map(chapterId => chapterId));
    }

    return (
        <>
            <Modal
                title="Sort chapters"
                open={sortChaptersDialog}
                onClose={() => setSortChaptersDialog(false)}
                mWidthClassName="mw-650px"
            >
                {course.chapters.length > 0 && (
                    <div className="p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <Draggable onPosChange={onSortChapters}>
                                    {course.chapters.map((chapter, key) => (
                                        <li className="py-3 sm:py-4" key={key}>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <i className="bi bi-list"></i>
                                                </div>
                                                <div className="flex-1 min-w-0 text-left">
                                                    <span>{chapter.title}</span>
                                                </div>
                                            </div>
                                        </li>))}
                                </Draggable>
                            </ul>
                        </div>
                    </div>
                )}
            </Modal>

            {(course.chapters && course.chapters.length > 0 &&
                <button type="button" className="btn btn-sm btn-light-primary"
                    onClick={() => setSortChaptersDialog(true)}>
                    <i className="bi bi-sort-up"></i> Sort chapters
                </button>
            )}
        </>
    )

}

export default SortChaptersDialog;