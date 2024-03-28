import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string | undefined;
    errorMessage?: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, errorMessage, name, placeholder, value, onChange }, ref) => {
    return (
        <div>
            <label htmlFor={name} className="text-xs lg:text-base font-semibold">{label}</label>
            <input
                ref={ref}
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${errorMessage ? "border-red-500" : "border-gray-300 hover:border-gray-400 focus:border-[#9089fc] active:border-[#9089fc]"} border bg-white text-black w-full mt-1 lg:mt-3 rounded-xl outline-none h-10 lg:h-[52px] text-xs lg:text-base px-3 py-3 lg:px-5`}
            />
            {errorMessage && <p className="text-xs md:text-sm text-red-500">{errorMessage}</p>}
        </div>
    );
});

export default Input;
