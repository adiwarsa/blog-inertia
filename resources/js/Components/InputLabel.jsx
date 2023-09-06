import clsx from 'clsx';

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={clsx('mb-1 block text-sm font-medium text-gray-300', className)}>
            {value ? value : children}
        </label>
    );
}