import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
var shortBy = false;
class ListHelper {
    confirmAlert(
        route = "",
        message = "Are you sure? want to change?",
        confirmButtonText = "Yes, change it!"
    ) {
        Swal.fire({
            title: message,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText,
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log("hhhhhhhhhhhhhhhhhhhhhhh");
                router.get(route);
            }
        });
    }

    sortBy(column) {
        shortBy = !shortBy;
        let shortByy = shortBy ? "asc" : "desc";
        router.reload({
            method: "get",
            data: { field_name: column, short_by: shortByy },
            replace: true,
        });
    }
}

export default ListHelper = new ListHelper();
