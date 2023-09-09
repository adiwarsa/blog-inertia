import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function SearchInput({ value, onChange }) {
    return (
        <div className="flex w-full items-center rounded-md border-0 bg-white/5 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10">
            <span className="pl-3">
                <MagnifyingGlassIcon className="h-h-4 group-focus-within:text-primary-400 w-4 transition duration-300" />
            </span>
            <input
                value={value}
                onChange={onChange}
                type="text"
                className="h-9 w-full border-none bg-transparent text-sm text-white placeholder-gray-400 focus:border-transparent focus:ring-0"
                placeholder="Search..."
            />
        </div>
    );
}