import { Link, useForm } from "@inertiajs/react";
import InputBox from "../../components/InputBox.jsx";
import PasswordInput from "../../components/PasswordInput.jsx";
import LoadingButton from "../../components/LoadingButton.jsx";

export default function Login() {
    const { data, setData, post, reset, processing, errors } = useForm({
        password: "",
        email: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    function submit(e) {
        e.preventDefault();
        post(route("login"), {
            preserveScroll: true,
            onSuccess: () => reset("password", "captcha"),
            onError: () => reset("password", "captcha"),
        });
    }

    return (
        <div className="grid gap-2 sm:grid-cols-2 sm:p-10 p-4">
            <div className="sm:p-5">
                {/* <img src="../../../../../images/logo.png" class="absolute object-cover opacity-5" alt=" Logo" />  */}
                <div className="text-center m-4">WELCOME TO CISCE</div>
                <div className="sm:p-10">
                    <p>
                        Thank you for your interest in having your school
                        affiliated with CISCE. To proceed, you need to fill out
                        a form for provisional affiliation and submit scanned
                        copies of certain documents to the Council.
                    </p>
                    <br />
                    <p>
                        If you are a first-time user and do not have a password,
                        you need to register with CISCE. A password will be sent
                        to your email and mobile number, using which you need to
                        login to the system and enter the details as required
                        and upload the documents
                        <Link
                            href={route("register")}
                            className="text-blue-600"
                        >
                            {" "}
                            Click here to register
                        </Link>
                        .
                    </p>
                    <br />
                    <p>
                        If you are already registered, you can login to the
                        system from this page. Enter the mobile number and the
                        password you used while registering and click the Login
                        button. This will take you to a page where you can enter
                        the preliminary information and upload the necessary
                        documents.
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 m-auto">
                    <form className="space-y-6" onSubmit={submit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                            Sign in to our platform
                        </h5>
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
                        <div className="flex items-start">
                            <a
                                href="#"
                                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Lost Password?
                            </a>
                        </div>
                        <LoadingButton name="Submit" loader={processing} />
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <a
                                href="#"
                                className="text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Create account
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
