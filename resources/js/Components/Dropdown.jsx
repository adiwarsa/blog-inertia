import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';

export function Dropdown({ align = 'left', trigger, children }) {
    return (
        <Menu as="div" className="relative ml-4 flex-shrink-0">
            <div>
                <Menu.Button className="py-2 text-white focus:outline-none">
                    <span className="sr-only">Open dropdown menu</span>
                    {trigger}
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
                <Menu.Items
                    className={clsx(
                        'absolute right-0 z-10 mt-2 w-64 origin-top-right divide-y rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                        align === 'left' ? 'right-0' : 'left-0',
                    )}
                >
                    {children}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export function DropdownLink({ children, ...props }) {
    return (
        <Menu.Item>
            {({ active }) => (
                <Link
                    {...props}
                    className={clsx(
                        active ? 'bg-gray-100' : '',
                        'block w-full px-4 py-2 text-left text-sm text-gray-700',
                    )}
                >
                    {children}
                </Link>
            )}
        </Menu.Item>
    );
}