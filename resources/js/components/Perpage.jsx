import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Perpage() {
    const queryParams = new URLSearchParams(window.location.search);

    const paramValue = queryParams.get("perPage") ?? 5;

    const [perpageValue, setperpageValue] = useState(paramValue);
    const changeHandler = (e) => {
        setperpageValue(e.target.value);
        router.reload({
            method: "get",
            data: { perPage: e.target.value },
            replace: false,
        });
    };
    return (
        <>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border border-e-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    Show
                </span>
                <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={changeHandler}
                    value={perpageValue}
                >
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
        </>
    );
}
