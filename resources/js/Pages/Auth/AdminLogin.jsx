import { useForm } from "@inertiajs/react";
import InputBox from "../../components/InputBox";
import PasswordInput from "../../components/PasswordInput";
import LoadingButton from "../../components/LoadingButton";

export default function AdminLogin() {
    const { data, setData, post, reset, processing, errors } = useForm({
        password: "",
        email: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    function submit(e) {
        e.preventDefault();
        post(route("admin.login"), {
            preserveScroll: true,
            onSuccess: () => reset("password", "captcha"),
            onError: () => reset("password", "captcha"),
        });
    }

    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h1 className="text-xl">Admin Login</h1>
                    </div>

                    <form
                        onSubmit={submit}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <div className="mb-4">
                            <InputBox
                                label="Email"
                                placeholder="Enter your Email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                        </div>

                        <div className="mb-6">
                            <PasswordInput
                                label="Password"
                                placeholder="Enter your Password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                error={errors.password}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <LoadingButton name="Login" loader={processing} />
                            <a
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                href="#"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2024 Your Company. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
}
