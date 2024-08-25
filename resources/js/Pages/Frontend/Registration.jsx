import { Head, useForm } from "@inertiajs/react";
import InputBox from "../../components/InputBox.jsx";
import PasswordInput from "../../components/PasswordInput.jsx";
import LoadingButton from "../../components/LoadingButton.jsx";

export default function Register(props) {
    const { data, setData, post, reset, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        country_code: "91",
        mobile_number: "",
        password: "",
        email: "",
        captcha: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    function submit(e) {
        e.preventDefault();
        post(route("register"), {
            preserveScroll: true,
            onSuccess: () => reset("password", "captcha"),
            onError: () => reset("password", "captcha"),
        });
    }

    return (
        <>
            <Head title="Registration" />

            <div className="grid gap-2 sm:grid-cols-2 sm:p-10 p-4">
                <div className="">
                    <div className="text-center m-4">
                        <h3 className="text-2xl mb-4">WELCOME TO CISCE</h3>
                        <img
                            src="../../../../../images/logo.png"
                            className=" opacity-5 sm:block hidden"
                            alt=" Logo"
                        />
                    </div>
                </div>

                <div className="">
                    <div className="mt-4 w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 m-auto">
                        <form className="space-y-4" onSubmit={submit}>
                            <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">
                                Sign up to our platform
                            </h5>

                            <div className="grid grid-flow-col gap-1">
                                <InputBox
                                    label="First Name"
                                    placeholder="Enter your First name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={handleChange}
                                    error={errors.first_name}
                                />

                                <InputBox
                                    label="Last Name"
                                    placeholder="Enter your Last name"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={handleChange}
                                    error={errors.last_name}
                                />
                            </div>

                            <div className="grid gap-1 grid-cols-12 ">
                                <div className="col-span-2 ">
                                    <InputBox
                                        label="Country"
                                        placeholder="Enter your Country Code"
                                        name="country_code"
                                        value={data.country_code}
                                        onChange={handleChange}
                                        error={errors.country_code}
                                    />
                                </div>
                                <div className="col-span-10">
                                    <InputBox
                                        label="Mobile Munber"
                                        placeholder="Enter your mobile number"
                                        name="mobile_number"
                                        value={data.mobile_number}
                                        onChange={handleChange}
                                        error={errors.mobile_number}
                                    />
                                </div>
                            </div>
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
                                <PasswordInput
                                    label="Password"
                                    placeholder="Enter your Password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                            </div>

                            <div>
                                <InputBox
                                    label="Captcha"
                                    placeholder="Enter your Captcha"
                                    name="captcha"
                                    value={data.captcha}
                                    onChange={handleChange}
                                    error={errors.captcha}
                                />
                            </div>
                            <div>
                                <img src={props.captcha} />
                            </div>

                            <div className="flex items-start">
                                <a
                                    href={route("forgotPassword")}
                                    className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                                >
                                    Lost Password?
                                </a>
                            </div>
                            <LoadingButton name="Submit" loader={processing} />
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                If registered?{" "}
                                <a
                                    href={route("login")}
                                    className="text-blue-700 hover:underline dark:text-blue-500"
                                >
                                    Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
