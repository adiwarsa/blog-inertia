export default function Select({ options, placeholder = 'Select an options', ...props }) {
    return (
        <select
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            {...props}
        >
            <option className="text-black" value="">{placeholder}</option>
            {options.map((option, index) => (
                <option className="text-black" key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}