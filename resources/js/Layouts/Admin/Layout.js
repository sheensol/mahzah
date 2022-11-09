import React from 'react';
import Helmet from 'react-helmet';
import FlashMessages from '@/Shared/FlashMessages';
import LeftMenu from '@/Layouts/Admin/LeftMenu';
import TopHead from '@/Layouts/Admin/TopHead';
import TopToolbar from '@/Layouts/Admin/TopToolbar';
import Footer from '@/Layouts/Admin/Footer';
import Breadcrumbs from '@/Layouts/Admin/Breadcrumbs';
import ToolbarButtons from '@/Layouts/Admin/ToolbarButtons';

export default function Layout({ breadcrumbs = [], toolbarbuttons = [], openedMenu = '', activeLink = '', withFlashMessages = true, title, children }) {
    return (
        <React.Fragment>
            <Helmet titleTemplate="%s | Mahzah" title={title} />
            <div className="d-flex flex-column flex-root">
                <div className="page d-flex flex-row flex-column-fluid">
                    <LeftMenu openedMenu={openedMenu} activeLink={activeLink} />
                    <div className="wrapper d-flex flex-column flex-row-fluid">
                        <TopHead />
                        <div className="content d-flex flex-column flex-column-fluid">
                            <TopToolbar>
                                <div className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
                                    <h1 className="d-flex text-dark fw-bolder fs-3 align-items-center my-1">{title}</h1>
                                    {(!(breadcrumbs === undefined || breadcrumbs.length == 0) && <Breadcrumbs data={breadcrumbs} />)}
                                </div>
                                {(!(toolbarbuttons === undefined || toolbarbuttons.length == 0) && <ToolbarButtons data={toolbarbuttons} />)}
                            </TopToolbar>
                            <div className="post d-flex flex-column-fluid">
                                <div className="container-xxl">
                                    {withFlashMessages && <FlashMessages />}
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}
