import { Fragment, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline/index.js';
import { XMarkIcon } from '@heroicons/react/20/solid/index.js';

export default function FlashMessage() {
    const [visible, setVisible] = useState(false);
    const [timeExit, setTimeExit] = useState(null);
    const { flash_message } = usePage().props;
    useEffect(() => {
        setVisible(true);
        if (timeExit) {
            clearTimeout(timeExit);
        }
        setTimeExit(setTimeout(() => setVisible(false), 4000));
    }, [flash_message]);
    return (
        <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                <Transition
                    show={!!flash_message?.type && visible}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    {flash_message.type === 'success' && (
                                        <CheckCircleIcon className="h-5 w-5 text-emerald-500 lg:mt-0.5" />
                                    )}
                                    {flash_message.type === 'error' && (
                                        <ExclamationCircleIcon className="h-5 w-5 text-rose-500 lg:mt-0.5" />
                                    )}
                                    {flash_message.type === 'info' && (
                                        <ExclamationCircleIcon className="h-5 w-5 text-sky-500 lg:mt-0.5" />
                                    )}
                                    {flash_message.type === 'warning' && (
                                        <ExclamationCircleIcon className="h-5 w-5 text-orange-500 lg:mt-0.5" />
                                    )}
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-black">{flash_message.title}</p>
                                    <p className="mt-1 text-sm text-gray-500">{flash_message.message}</p>
                                </div>
                                <div className="ml-4 flex flex-shrink-0">
                                    <button
                                        type="button"
                                        className="inline-flex rounded-md p-1 text-gray-600 ring-1 ring-gray-200 hover:text-black focus:outline-none"
                                        onClick={() => {
                                            setVisible(false);
                                        }}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
}