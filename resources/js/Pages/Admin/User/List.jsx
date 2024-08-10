import Paginate from "../../../components/Paginate";
import Perpage from "../../../components/Perpage";

export default function UserList(props) {
    const { users } = props;
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
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>

                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <input type="search" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <input type="search" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <input type="search" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <input type="search" />
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
                                        {/* <img
                                            className="w-10 h-10 rounded-full"
                                            src="/docs/images/people/profile-picture-1.jpg"
                                            alt="Jese image"
                                        /> */}
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
                                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 cursor-pointer">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            id="dropdownMenuIconHorizontalButton"
                                            data-dropdown-toggle="dropdownDotsHorizontal"
                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                            type="button"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 16 3"
                                            >
                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                            </svg>
                                        </button>

                                        <div
                                            id="dropdownDotsHorizontal"
                                            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                        >
                                            <ul
                                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="dropdownMenuIconHorizontalButton"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Edit
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
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
