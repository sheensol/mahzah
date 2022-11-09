import { Link } from "@inertiajs/inertia-react";
import React from "react";
const ToolbarButtons = ({ data = [] }) => {
    return (
        <>
            {data.map((item, key) => (
                <Link href={item.link} className="btn btn-sm btn-primary" key={key}>{item.icon && (<i className={item.icon}></i>)} {item.name} </Link>
            ))}
        </>
    );
};

export default ToolbarButtons;
