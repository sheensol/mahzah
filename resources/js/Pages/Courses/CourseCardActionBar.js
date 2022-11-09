import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { Link } from '@inertiajs/inertia-react';
import { classNames } from '@/utils';
import ConfirmModal from '@/Shared/Modals/ConfirmModal';
import { Inertia } from '@inertiajs/inertia';

const CourseCardActionBar = ({ course }) => {

    const [duplicateCourseDialog, setDuplicateCourseDialog] = useState(false);

    function handleDuplicateCourseSubmit(e) {
        Inertia.post(route('courses.settings.duplicateCourse', course.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDuplicateCourseDialog(false);
            }
        });
    }

    return (
        <>
            <ConfirmModal
                title={`Duplicate course '${course.title}'?`}
                open={duplicateCourseDialog}
                onClose={() => setDuplicateCourseDialog(false)}
                onConfirm={handleDuplicateCourseSubmit}
            >
                Are you sure you want to duplicate this course?
            </ConfirmModal>

            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href={route("courses.edit", course.id)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Edit
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <span
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'cursor-pointer block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => setDuplicateCourseDialog(true)}
                                    >
                                        Duplicate
                                    </span>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default CourseCardActionBar;
