import clsx from 'clsx';

export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={clsx(
                'rounded border-white/10 bg-gray-700 text-blue-600  shadow-sm  focus:ring-0 focus:ring-blue-500 focus:ring-offset-0',
                className,
            )}
        />
    );
}