import { Link } from "@inertiajs/inertia-react";
import React from "react";
const Breadcrumbs = ({ data = [] }) => {
    return (
        <>
            <span className="h-20px border-gray-300 border-start mx-4"></span>
            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                {data.map((item, key) => (
                    <li className="breadcrumb-item text-muted" key={key}>
                        {key > 0 && <span className="bullet bg-gray-300 w-5px h-2px m-3"></span>}
                        {item.path ? (
                            <Link
                                className="text-muted text-hover-primary"
                                href={item.path}
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <span>{item.name}</span>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Breadcrumbs;
