import Header from "./Header";
import SideMenu from "./SideMenu";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <SideMenu />

            <div className="p-4 sm:ml-64">
                <div className="p-2 mt-14 min-h-screen mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    {children}
                </div>
            </div>
        </>
    );
}
