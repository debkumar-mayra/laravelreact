import "./bootstrap";
import "flowbite";

import { createInertiaApp, router } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { toast } from "react-toastify";
import FrontendLayout from "./Pages/Layout/Frontend/Layout";
import UserLayout from "./Pages/Layout/User/Layout";
import AdminLayout from "./Pages/Layout/Admin/Layout";
import { useRoute } from "ziggy-js";

window.route = useRoute();
window.toaster = toast;

router.on("finish", () => {
    // const { flash } = usePage().props;
    // console.log(flash.success);
    // if (flash.success) {
    //     toaster.success(flash.success);
    // }
    // if (flash.error) {
    //     toaster.error(flash.error);
    // }
    // if (flash.warning) {
    //     toaster.warning(flash.warning);
    // }
    // if (flash.info) {
    //     toaster.info(flash.info);
    // }
});

createInertiaApp({
    progress: false,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const page = pages[`./Pages/${name}.jsx`];
        if (name.startsWith("Frontend/")) {
            page.default.layout = (page) => <FrontendLayout children={page} />;
        }
        if (name.startsWith("User/")) {
            page.default.layout = (page) => <UserLayout children={page} />;
        }

        if (name.startsWith("Admin/")) {
            page.default.layout = (page) => <AdminLayout children={page} />;
        }
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
