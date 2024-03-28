import { useFormContext } from 'react-hook-form';

interface SelectProps {
    label: string;
    options: { value: string }[];
    name: string;
    placeholder?: string;
    errorMessage?: string;
}

const Select = ({ label, options, name, placeholder, errorMessage }: SelectProps) => {
    const { register } = useFormContext();

    return (
        <div>
            <label className="text-xs lg:text-base font-semibold">{label}</label>
            <select
                className={`${errorMessage ? "border-red-500" : "border-gray-300 hover:border-gray-400 focus:border-[#9089fc] active:border-[#9089fc]"} border capitalize appearance-none w-full mt-1 lg:mt-3 rounded-xl outline-none h-10 lg:h-[52px] text-xs lg:text-base px-3 py-3 lg:px-5 bg-white text-black`}
                defaultValue={placeholder}
                {...register(name, {
                    required: {
                        value: true,
                        message: `Please choose your ${name}`
                    }
                })}
            >
                <option className="capitalize" value={placeholder} disabled hidden>{placeholder || `select ${label}`}</option>
                {options.map((option, index) => (
                    <option className="capitalize" key={index} value={option.value}>{option.value}</option>
                ))}
            </select>
            {errorMessage && <p className="text-xs md:text-sm text-red-500">{errorMessage}</p>}
        </div>
    );
}

export default Select;