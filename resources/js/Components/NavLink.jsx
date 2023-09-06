import { Link } from '@inertiajs/react';
import clsx from 'clsx';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={clsx(
                active ? 'text-white' : 'text-gray-400 hover:text-white',
                'inline-flex items-center py-8 text-sm font-medium leading-5 transition duration-150 ease-in-out',
            )}
        >
            {children}
        </Link>
    );
}