import { Icon } from "@iconify/react/dist/iconify.js";
import Paginate from "../../../components/Paginate";
import Perpage from "../../../components/Perpage";
import ListHelper from "../../../helpers/ListHelper";
import { useEffect, useRef, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
import NameImage from "../../../components/NameImage";
import Thead from "../../../components/table/Thead";

export default function UserList(props) {
    const { users } = props;

    const changeStatus = (id) => {
        ListHelper.confirmAlert(route("admin.changeUserStatus", id));
    };
    const deleteUser = (id) => {
        ListHelper.confirmAlert(
            route("admin.deleteUser", id),
            "Are you sure? want to delete?",
            "Yes! Delete it"
        );
    };

    const { data, setData, get, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        status: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const fetchData = debounce(() => {
                router.visit(route("admin.users"), {
                    method: "get",
                    data: pickBy(data),
                    preserveState: true,
                });
            }, 500);
            if (data) {
                fetchData();
            }
            return () => {
                fetchData.cancel();
            };
        }
    }, [data]);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 pb-8 min-h-lvh">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    <div>
                        <Perpage />
                    </div>
                </div>
                <div className="min-w-48">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <Thead field_name="first_name">Name</Thead>
                                <Thead field_name="email">email</Thead>
                                <Thead field_name="phone">phone</Thead>
                                <Thead field_name="status">Status</Thead>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>

                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <input
                                        type="search"
                                        className="rounded-md h-10 text-sm"
                                        placeholder="Search Name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <input
                                        type="search"
                                        className="rounded-md h-10 text-sm"
                                        placeholder="Search Email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm">
                                    <input
                                        type="search"
                                        className="rounded-md h-10 text-sm"
                                        placeholder="Search Phone"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <select
                                        className="rounded-md h-10 text-sm"
                                        name="status"
                                        onChange={handleChange}
                                    >
                                        <option value="">All</option>
                                        <option value="1">Active</option>
                                        <option value="2">Inactive</option>
                                    </select>
                                </th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => (
                                <tr
                                    key={user.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {user.profile_photo ? (
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={user.profile_photo}
                                                alt="Jese image"
                                            />
                                        ) : (
                                            <NameImage name={user.full_name} />
                                        )}

                                        <div className="ps-3">
                                            {/* <div className="text-base font-semibold">
                                                {user.full_name}
                                            </div> */}
                                            <div className="font-normal text-gray-500">
                                                {user.full_name}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.phone}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={` ${
                                                user.status == 1
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-500 text-white"
                                            }  text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 cursor-pointer`}
                                            onClick={() =>
                                                changeStatus(user.id)
                                            }
                                        >
                                            {user.status == 1
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            id={`dropdownMenuIconHorizontalButton_${user.id}`}
                                            data-dropdown-toggle={`dropdownDotsHorizontal_${user.id}`}
                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                            type="button"
                                        >
                                            <Icon
                                                icon="solar:menu-dots-bold"
                                                width="1.2rem"
                                                height="1.2rem"
                                            />
                                        </button>

                                        <div
                                            id={`dropdownDotsHorizontal_${user.id}`}
                                            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                        >
                                            <ul
                                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby={`dropdownMenuIconHorizontalButton_${user.id}`}
                                            >
                                                <li>
                                                    <Link
                                                        href={route(
                                                            "admin.editUser",
                                                            user.id
                                                        )}
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex"
                                                    >
                                                        <Icon
                                                            icon="basil:edit-outline"
                                                            width="1.2rem"
                                                            height="1.2rem"
                                                            className="mr-1"
                                                        />
                                                        Edit
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={() =>
                                                            deleteUser(user.id)
                                                        }
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-600 flex"
                                                    >
                                                        <Icon
                                                            icon="material-symbols-light:delete-outline"
                                                            width="1.2rem"
                                                            height="1.2rem"
                                                            className="mr-1"
                                                        />
                                                        Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Paginate data={users} />
            </div>
        </>
    );
}
