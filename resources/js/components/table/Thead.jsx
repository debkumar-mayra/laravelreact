import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import ListHelper from "../../helpers/ListHelper";
import { router } from "@inertiajs/react";

export default function Thead({
    sortable = true,
    field_name = "",
    children = "cloumn name",
}) {
    const [shortBy, setShortBy] = useState(
        urlParams.get("short_by") == "desc" ? true : false
    );
    const sortBy = (column) => {
        setShortBy(!shortBy);
        let shortByy = shortBy ? "asc" : "desc";
        router.reload({
            method: "get",
            data: { field_name: column, short_by: shortByy },
            replace: true,
        });
    };

    return (
        <>
            {sortable ? (
                <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer "
                    onClick={() => sortBy(field_name)}
                >
                    <div className="flex justify-items-center justify-between">
                        <span>{children}</span>
                        <div>
                            <Icon
                                icon="icons8:sort-up"
                                width="1.2rem"
                                height="1.2rem"
                                style={
                                    shortBy && {
                                        color: "#0481f6",
                                    }
                                }
                            />
                            <Icon
                                icon="la:sort-down"
                                className="-mt-2"
                                width="1.2rem"
                                height="1.2rem"
                                style={
                                    !shortBy && {
                                        color: "#0481f6",
                                    }
                                }
                            />
                        </div>
                    </div>
                </th>
            ) : (
                <th scope="col" className="px-6 py-3 cursor-pointer ">
                    {children}
                </th>
            )}
        </>
    );
}
