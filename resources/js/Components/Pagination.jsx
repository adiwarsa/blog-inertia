import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/20/solid/index.js';
import { Link } from '@inertiajs/react';

export default function Pagination({ meta, links }) {
    return (
        <div className="flex justify-center px-5 pt-8">
            <div className="flex items-center gap-3">
                {meta.current_page !== 1 && (
                    <Link
                        href={links.first}
                        className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-gray-900 shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300 hover:bg-gray-800"
                    >
                        <ChevronDoubleLeftIcon className="h-6 w-6" />
                    </Link>
                )}
                {links.prev ? (
                    <Link
                        href={links.prev}
                        className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-gray-900 shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300 hover:bg-gray-800"
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </Link>
                ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-900 opacity-25 shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300">
                        <ChevronLeftIcon className="h-6 w-6" />
                    </div>
                )}
                <div className="grid w-16 place-items-center">
                    <div className="relative h-12 w-14">
                        <div className="absolute right-[60%] top-0 text-xl font-semibold transition-all duration-300">
                            {meta.current_page}
                        </div>
                        {Array.from(Array(meta.total).keys()).map((i) => (
                            <div
                                key={i}
                                className="absolute -top-5 right-[20%] text-xl font-semibold opacity-0 transition-all duration-300"
                                children={i}
                            />
                        ))}
                        <div className="absolute right-1/2 top-1/2 h-[0.5px] w-10 -translate-y-1/2 translate-x-1/2 -rotate-45 rounded-full bg-gray-400" />
                        <div className="absolute bottom-1 left-[60%] text-sm" children={meta.last_page} />
                    </div>
                </div>
                {links.next ? (
                    <Link
                        href={links.next}
                        className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-gray-900 shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300 hover:bg-gray-800"
                    >
                        <ChevronRightIcon className="h-6 w-6" />
                    </Link>
                ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-900 opacity-25 shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300">
                        <ChevronRightIcon className="h-6 w-6" />
                    </div>
                )}
                {meta.to !== meta.total && (
                    <Link
                        href={links.last}
                        className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-gray-900 shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300 hover:bg-gray-800 hover:bg-white"
                    >
                        <ChevronDoubleRightIcon className="h-6 w-6" />
                    </Link>
                )}
            </div>
        </div>
    );
}