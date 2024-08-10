import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@inertiajs/react";

export default function Paginate(props) {
    const {
        next_page_url,
        prev_page_url,
        current_page,
        links,
        total,
        from,
        to,
        per_page,
        last_page,
    } = props.data;

    const startPage = Math.max(1, current_page - 1);
    const endPage = Math.min(links.length - 1, current_page + 1);

    const visibleLinks = links.filter((link, index) => {
        const pageLabel = parseInt(link.label, 10);
        return (
            !isNaN(pageLabel) &&
            (pageLabel === 1 ||
                pageLabel === last_page ||
                (pageLabel >= startPage && pageLabel <= endPage))
        );
    });

    const processedLinks = [];
    visibleLinks.forEach((link, index) => {
        const previousLink = visibleLinks[index - 1];
        if (
            previousLink &&
            parseInt(link.label, 10) > parseInt(previousLink.label, 10) + 1
        ) {
            processedLinks.push({ label: "...", url: null });
        }
        processedLinks.push(link);
    });

    return (
        <>
            <nav
                className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation"
            >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {from}-{to}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {total}
                    </span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <Link
                        disabled={current_page == 1}
                        as="button"
                        type="button"
                        href={prev_page_url || "#"}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <Icon
                            icon="grommet-icons:form-previous"
                            width="1.2rem"
                            height="1.2rem"
                        />
                    </Link>
                    {processedLinks.map((link, index) => (
                        <li key={index}>
                            {link.url ? (
                                current_page == link.label ? (
                                    <Link
                                        href={link.url || "#"}
                                        aria-current="page"
                                        className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <Link
                                        href={link.url || "#"}
                                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ) : (
                                <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                    ...
                                </span>
                            )}
                        </li>
                    ))}

                    <Link
                        disabled={next_page_url == null}
                        as="button"
                        type="button"
                        href={next_page_url || "#"}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <Icon
                            icon="material-symbols:navigate-next"
                            width="1.2rem"
                            height="1.2rem"
                        />
                    </Link>
                </ul>
            </nav>
        </>
    );
}
