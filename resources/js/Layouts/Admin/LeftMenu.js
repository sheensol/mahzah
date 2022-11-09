import React, { useRef, useState, useEffect } from 'react'
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Layouts/Admin/Navigation";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export default function LeftMenu({ openedMenu, activeLink }) {
    const [asideToggleOn, setAsideToggleOn] = useState(false);
    const asideRef = useRef();

    useEffect(() => {
        if (asideToggleOn) {
            asideRef.current.classList.add("animating");
            setTimeout(function () { asideRef.current.classList.remove("animating") }, 300);
            document.body.setAttribute('data-kt-aside-minimize', 'on');
        } else {
            document.body.removeAttribute('data-kt-aside-minimize');
        }
    }, [asideToggleOn]);

    return (
        <div ref={asideRef} className="aside aside-dark aside-hoverable">
            <div className="aside-logo flex-column-auto">
                <Link href="#"><img alt="Logo" src="/assets/images/logos/Mahzalogo1.png" className="h-25px logo" /></Link>
                <div onClick={() => setAsideToggleOn((previousState) => !previousState)} className={`btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle ${asideToggleOn ? 'active' : ''}`}>
                    <span className="svg-icon svg-icon-1 rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.5" d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z" fill="currentColor" />
                            <path d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z" fill="currentColor" />
                        </svg>
                    </span>
                </div>
            </div>
            <SimpleBar style={{ maxHeight: 768 }}>
                <div className="aside-menu flex-column-fluid">
                    <div className="hover-scroll-overlay-y my-5 my-lg-5">
                        <div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" id="#kt_aside_menu" data-kt-menu="true" data-kt-menu-expand="false">
                            <Navigation menus={[
                                { id: "1", name: "Dashboard", icon: "bi bi-grid fs-3", href: route("dashboard") },
                                { id: "3", name: "Users", icon: "bi bi-person-lines-fill fs-3", href: route("users.index") },
                                // {
                                //   id: "3", name: "Users", icon: "bi bi-person-lines-fill fs-3", items: [
                                //     { id: "3.1", name: "Student", href: "#" },
                                //     { id: "3.2", name: "Leads", href: "#" },
                                //     { id: "3.3", name: "Owners", href: "#" },
                                //     { id: "3.4", name: "Authors", href: "#" },
                                //     { id: "3.5", name: "Affiliates", href: "#" },
                                //     { id: "3.6", name: "Custom", href: "#" },
                                //   ],
                                //   // topHeading: "Users"
                                // },
                                {
                                  id: "4", name: "Sites", icon: "bi bi-card-text fs-3", items: [
                                    { id: "4.1", name: "Site Pages", href: "#" },
                                    { id: "4.2", name: "Theme Library", href: "#" },
                                    { id: "4.3", name: "Preview Website", href: "#" },
                                  ],
                                },
                                {
                                    id: "2", name: "Learning Products", icon: "bi bi-book fs-3", items: [
                                        { id: "2.1", name: "Courses", href: route("courses.index") },
                                        { id: "2.2", name: "Instructors", href: "#" },
                                    ],
                                    topHeading: "Products"
                                },
                                {
                                  id: "5", name: "Bundles", icon: "bi bi-collection fs-3", href:route("bundles")
                                },
                                {
                                  id: "6", name: "Coaching", icon: "bi bi-person-workspace fs-3", href:route("coaching")
                                },
                                {
                                  id: "10", name: "Video library", icon: "bi bi-camera-video fs-3", href: route("videos")
                                },
                                {
                                  topHeading: "APPS",
                                  id: "7", name: "Price Plans", icon: "bi bi-cash-stack fs-3", href: route("plans")
                                },
                                {
                                  id: "8", name: "Messages", icon: "bi bi-chat-left-text fs-3", items: [
                                    { id: "8.1", name: "Settings", href: "#" },
                                  ],
                                },
                                {
                                  id: "9", name: "Settings", icon: "bi bi-gear fs-3", href: route("settings")
                                }
                            ]} opened={openedMenu} active={activeLink} />
                        </div>
                    </div>
                </div>
            </SimpleBar>
        </div>
    )
}
