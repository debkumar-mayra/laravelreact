import { useForm } from "@inertiajs/react";
import InputBox from "../../components/InputBox";
import LoadingButton from "../../components/LoadingButton";
import ChangePassword from "./ChangePassword";

export default function Profile(props) {
    const { data, setData, post, reset, processing, errors } = useForm({
        first_name: props.user?.first_name ?? "",
        last_name: props.user?.last_name ?? "",
        email: props.user?.email ?? "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    function submit(e) {
        e.preventDefault();
        post(route("admin.profile"), {
            preserveScroll: true,
            onSuccess: () => reset(""),
        });
    }

    return (
        <>
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
                        </div>
                        <div className="p-5 flex justify-end">
                            <LoadingButton loader={processing} />
                        </div>
                    </form>
                </div>
                <div className="mt-2">
                    <ChangePassword />
                </div>
            </div>
        </>
    );
}
