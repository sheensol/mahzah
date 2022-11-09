import React, { useState } from 'react';
import { Link, InertiaLink, usePage } from "@inertiajs/inertia-react";

const ProfileDropdown = () => {
    const { auth } = usePage().props;
    const [dropdownOpened, setDropdownOpened] = useState(false);
    return (
        <div className="d-flex align-items-stretch flex-shrink-0">
            <div className="d-flex align-items-center ms-1 ms-lg-3">
                <div className="cursor-pointer symbol symbol-30px symbol-md-40px show menu-dropdown" onClick={() => setDropdownOpened((previousState) => !previousState)}>
                    {auth.user.photo ? (<img src={auth.user.photo} />) : (<img src="/assets/images/default-avatar.jpg" />)}
                </div>
                <div className={`${dropdownOpened ? '' : 'hidden'} absolute right-0 z-20`}>
                    <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px show"
                        style={{ "zIndex": "105", "position": "fixed", "inset": "0px 0px auto auto", "margin": "0px", "transform": "translate(-30px, 65px)" }}>
                        <div className="menu-item px-3">
                            <div className="menu-content d-flex align-items-center px-3">
                                <div className="symbol symbol-50px me-5">
                                    {auth.user.photo ? (<img src={auth.user.photo} />) : (<img src="/assets/images/default-avatar.jpg" />)}
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="fw-bolder d-flex align-items-center fs-5">{auth.user.first_name} {auth.user.last_name}
                                        <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span></div>
                                    <Link href="#" className="fw-bold text-muted text-hover-primary fs-7">{auth.user.email}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="separator my-2"></div>
                        <div className="menu-item px-5"><Link href={route('users.myProfile')} className="menu-link px-5" onClick={() => setDropdownOpened(false)}>My Profile</Link></div>
                        <div className="menu-item px-5"><InertiaLink href={route("logout")} method="post" as="button" className="block w-full menu-link px-5">Sign out</InertiaLink></div>
                    </div>
                    <div
                        onClick={() => {
                            setDropdownOpened(false);
                        }}
                        className="fixed inset-0 z-10 bg-black opacity-25"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDropdown;
