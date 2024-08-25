import { Head, useForm } from "@inertiajs/react";
import LoadingButton from "../../components/LoadingButton";
import PasswordInput from "../../components/PasswordInput";

export default function ChangePassword() {
    const { data, setData, post, reset, processing, errors } = useForm({
        old_password: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    function submit(e) {
        e.preventDefault();
        post(route("admin.changePassword"), {
            preserveScroll: true,
            onSuccess: () => reset(""),
        });
    }

    return (
        <>
            {/* <Head title="Admin | Change password" /> */}

            <form onSubmit={submit} className="bg-white shadow-md rounded p-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <PasswordInput
                            label="Old Password"
                            placeholder="Enter your Old Password"
                            name="old_password"
                            value={data.old_password}
                            onChange={handleChange}
                            error={errors.old_password}
                        />
                    </div>

                    <div>
                        <PasswordInput
                            label="New Password"
                            placeholder="Enter New Password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                    </div>

                    <div>
                        <PasswordInput
                            label="Confirm Password"
                            placeholder="Enter Confirm Password"
                            name="confirm_password"
                            value={data.confirm_password}
                            onChange={handleChange}
                            error={errors.confirm_password}
                        />
                    </div>
                </div>
                <div className="p-5 flex justify-end">
                    <LoadingButton loader={processing} />
                </div>
            </form>
        </>
    );
}
