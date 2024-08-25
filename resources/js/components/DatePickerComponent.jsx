import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
    selectedDate,
    handleDateChange,
    name,
    error,
    label,
}) => {
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
            <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(name, date)}
                name={name}
                yearDropdownItemNumber={60}
                showYearDropdown
                scrollableYearDropdown={true}
                className={
                    error
                        ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                }
            />
        </div>
    );
};

export default DatePickerComponent;
