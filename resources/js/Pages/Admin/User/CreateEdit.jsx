import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import InputBox from "../../../components/InputBox";
import LoadingButton from "../../../components/LoadingButton";
import { toast } from "react-toastify";
import DatePickerComponent from "../../../components/DatePickerComponent";

import "react-datepicker/dist/react-datepicker.css";

export default function CreateEdit(props) {
    const { data, setData, post, reset, processing, errors } = useForm({
        first_name: props.user?.first_name ?? "",
        last_name: props.user?.last_name ?? "",
        password: "",
        email: props.user?.email ?? "",
        dob: props.user?.dob ?? "",
        phone: props.user?.phone ?? "",
        status: props.user?.status ?? 1,
        profile_photo: "",
    });

    const [preview, setPreview] = useState(props.user?.profile_photo || null);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleDateChange = (name, date) => {
        setData({ ...data, [name]: date });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("profile_photo", file);
        setPreview(URL.createObjectURL(file));
    };

    function submit(e) {
        e.preventDefault();
        toast.success("Profile successfully updated");

        if (props.user?.id) {
            post(route("admin.editUser", props.user?.id), {
                preserveScroll: true,
                onSuccess: () => toast.success("Profile successfully updated"),
            });
        } else {
            post(route("admin.createUser"), {
                preserveScroll: true,
                onSuccess: () => toast.success("User successfully created"),
            });
        }
    }

    return (
        <>
            <Head title={`Admin | ${props.user ? "Edit" : "Create"} User`} />

            <div className="text-2xl my-2 bg-white shadow-md rounded p-4">
                {props.user ? "Edit" : "Create"} User
            </div>

            <div className="min-h-screen">
                <div>
                    <form
                        onSubmit={submit}
                        className="bg-white shadow-md rounded p-4"
                    >
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <InputBox
                                    label="First Name"
                                    placeholder="Enter your First Name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={handleChange}
                                    error={errors.first_name}
                                />
                            </div>

                            <div>
                                <InputBox
                                    label="Last Name"
                                    placeholder="Enter your Last Name"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={handleChange}
                                    error={errors.last_name}
                                />
                            </div>

                            {!props.user && (
                                <div>
                                    <InputBox
                                        type="password"
                                        label="Password"
                                        placeholder="Enter your Password"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                </div>
                            )}

                            <div>
                                <InputBox
                                    label="Email"
                                    placeholder="Enter your Email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                            </div>

                            <div>
                                <InputBox
                                    label="phone"
                                    type="number"
                                    placeholder="Enter your phone"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    onChange={handleChange}
                                    defaultValue={data.status}
                                >
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                </select>
                            </div>

                            <div>
                                <DatePickerComponent
                                    selectedDate={data.dob}
                                    handleDateChange={handleDateChange}
                                    name="dob"
                                    label="Date of birth"
                                    error={errors.dob}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Profile Photo
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="user_avatar_help"
                                    id="user_avatar"
                                />
                                {errors.profile_photo && (
                                    <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.profile_photo}
                                    </span>
                                )}
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Profile Preview"
                                        className="mt-4 w-32 h-32 object-cover rounded-full"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="p-5 flex justify-end">
                            <LoadingButton loader={processing} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
