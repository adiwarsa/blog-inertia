import { Dialog } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/20/solid/index.js';
import { useForm } from '@inertiajs/react';

export default function CommentForm(props) {
    const { data, post, setData, reset, processing, errors } = useForm({
        body: props.attributes.body ?? '',
        parent_id: props.attributes?.item?.id,
        _method: props.attributes.method,
    });

    function submit(e) {
        e.preventDefault();
        post(props.attributes.url, {
            onSuccess: () => {
                reset();
                props.close();
            },
            preserveScroll: true,
        });
    }
    return (
        <AnimatePresence>
            {props.open && (
                <Dialog
                    className="fixed bottom-0 left-0 z-50 mx-auto w-full max-w-2xl md:px-4 lg:right-0"
                    open={true}
                    onClose={props.close}
                >
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.4,
                                ease: [0.36, 0.66, 0.04, 1],
                            },
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.3,
                                ease: [0.36, 0.66, 0.04, 1],
                            },
                        }}
                        className="fixed inset-0 bg-gray-950/50 backdrop-blur-sm"
                    />
                    <Dialog.Panel>
                        <motion.div
                            className="overflow-hidden rounded-t-xl bg-white"
                            initial={{ y: '100%' }}
                            animate={{
                                y: 0,
                                transition: {
                                    duration: 0.5,
                                    ease: [0.36, 0.66, 0.04, 1],
                                },
                            }}
                            exit={{
                                y: '100%',
                                transition: {
                                    duration: 0.3,
                                    ease: [0.36, 0.66, 0.04, 1],
                                },
                            }}
                        >
                            <div>
                                <div className="flex items-center justify-between border-b bg-white px-4 py-2 sm:py-2.5">
                                    <div className="flex items-center gap-x-2">
                                        <div className="shrink-0">
                                            <img
                                                width="24"
                                                height="24"
                                                className="h-6 w-6 rounded-full"
                                                src={props.auth.user.gravatar}
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{props.auth.user.name}</h4>
                                        </div>
                                    </div>
                                    <button onClick={props.close} className="">
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                <form onSubmit={submit}>
                                    <div className="px-4 py-2 sm:py-2.5">
                                        <textarea
                                            autoFocus
                                            placeholder="Enter your commment here..."
                                            className="sm:text-tiny w-full resize-none border-0 bg-transparent p-0 text-sm placeholder-gray-400 focus:border-0 focus:outline-none focus:ring-0"
                                            name="body"
                                            rows="6"
                                            value={data.body}
                                            onChange={(event) => setData('body', event.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between border-t px-4 py-2 text-gray-500">
                                        <span className="flex items-center text-xs">
                                            Basic formatting & Markdown support
                                        </span>
                                        {errors && (
                                            <div className="text-sm text-rose-500">{errors.body}</div>
                                        )}
                                        <button
                                            disabled={data.body === '' ? true : props.processing}
                                            type="submit"
                                            className={clsx(
                                                'rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:outline-none',
                                                processing || (data.body === '' && 'opacity-50'),
                                            )}
                                        >
                                            {props.attributes.submitText}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </Dialog.Panel>
                </Dialog>
            )}
        </AnimatePresence>
    );
}