import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "@inertiajs/inertia-react";

const Navigation = ({ menus, opened, active }) => {

    const [open, setOpen] = useState([]);

    const toggleOpen = (index) => {
        setOpen((previousState) => previousState.map((item, key) => key === index ? !item : false));
    };

    useEffect(() => {
        setOpen(menus.map(menu => menu.id === opened));
    }, [opened]);

    return (
        <>
            {menus.map((menu, i) => (
                <Fragment key={i}>
                    {menu.topHeading &&
                        <div className="menu-item">
                            <div className="menu-content pt-8 pb-2">
                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">{menu.topHeading}</span>
                            </div>
                        </div>
                    }
                    {menu.items && <>
                        <div className={`menu-item menu-accordion ${open[i] ? 'show' : ''}`} onClick={() => toggleOpen(i)}>
                            <span className="menu-link">
                                <span className="menu-icon"><i className={menu.icon}></i></span>
                                <span className="menu-title">{menu.name}</span>
                                <span className="menu-arrow"></span>
                            </span>
                        </div>
                        <div className={`menu-sub menu-sub-accordion menu-active-bg ${open[i] ? " show" : ""}`}>
                            {menu.items.map((item, j) => (
                                <div key={j} className={`menu-item ${item.id === active ? "show font-bold" : ""}`}>
                                    <Link
                                        className="menu-link"
                                        href={item.href}
                                        as="a"
                                    >
                                        <span className="menu-bullet"><span className="bullet bullet-dot"></span></span>
                                        <span className="menu-title">{item.name}</span>
                                    </Link>
                                </div>))}
                        </div>
                    </>
                    }
                    {menu.href &&
                        <div className={`menu-item menu-accordion ${menu.id === opened ? " show font-bold" : ""}`} onClick={() => toggleOpen(i)}>
                            <Link
                                className="menu-link"
                                href={menu.href}
                                as="a"
                            >
                                <span className="menu-icon"><i className={menu.icon}></i></span>
                                <span className="menu-title">{menu.name}</span>
                            </Link>
                        </div>}
                </Fragment>
            ))}
        </>
    )
}

export default Navigation;