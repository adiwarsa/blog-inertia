import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import useSwal from '@/Hooks/useSwal.js';
import clsx from 'clsx';
import { ExclamationCircleIcon, TrashIcon } from '@heroicons/react/24/outline/index.js';
import ReportModal from '@/Pages/Articles/Partials/ReportModal.jsx';

export default function CommentOptions({ auth, article, comment }) {
    const { ask } = useSwal();
    const [showReportModal, setShowReportModal] = useState(false);
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex justify-end">
                    <EllipsisVerticalIcon className="-mr-1 h-5 w-5 text-gray-300" aria-hidden="true" />
                </Menu.Button>
            </div>

            <ReportModal comment={comment} show={showReportModal} onClose={setShowReportModal} />

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-4 top-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {auth.user?.id === comment.author.id && (
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            ask({
                                                url: route('comments.destroy', [article, comment]),
                                                message: `The comment you are about to delete is created ${comment.created_at}, Are you sure you want to delete this comment?`,
                                                method: 'delete',
                                            });
                                        }}
                                        className={clsx(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex w-full items-center gap-x-2 px-4 py-2 text-left text-sm',
                                        )}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                        Delete comment
                                    </button>
                                )}
                            </Menu.Item>
                        )}
                        {auth.user?.id !== comment.author.id && (
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setShowReportModal(true)}
                                        className={clsx(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex w-full items-center gap-x-2 px-4 py-2 text-left text-sm',
                                        )}
                                    >
                                        <ExclamationCircleIcon className="h-5 w-5" />
                                        Report
                                    </button>
                                )}
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}