import { useState } from "react";
import { Icon } from "@iconify/react";

export default function PasswordInput({
    label,
    name,
    placeholder,
    value,
    onChange,
    error,
}) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={passwordVisible ? "text" : "password"}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={
                        error
                            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    }
                />

                <span
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                    {passwordVisible ? (
                        <Icon
                            icon="iconamoon:eye-off-light"
                            width="1.2rem"
                            height="1.2rem"
                        />
                    ) : (
                        <Icon icon="f7:eye" width="1.2rem" height="1.2rem" />
                    )}
                </span>
            </div>
            {error && (
                <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
}
