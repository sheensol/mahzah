import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import {usePage, useForm} from '@inertiajs/inertia-react';
import SettingsTopTabs from './SettingsTopTabs';
// import SettingsTabs from './SettingsTabs';
import LoadingButton from '@/Shared/LoadingButton';
import $ from 'jquery';

const SiteTabs = ({activeTab = 'site_details', children}) => {
  return (<div className="d-flex flex-column flex-md-row">
    <ul className="nav nav-tabs nav-pills border-0 flex-row flex-md-column inner_course_tabs mb-3 pt-10 mb-md-0 fs-6">
      <li className="nav-item w-md-200px"><Link className="nav-link active" href="#">Site Details</Link></li>
      <li className="nav-item w-md-200px"><Link className="nav-link" href="#">Site Emails</Link></li>
    </ul>
    <div className="tab-content w-100 p-lg-11 p-5 bg-white">
      <div className="tab-pane fade active show" role="tabpanel">
        {children}
      </div>
    </div>
  </div>)
}

const Site = () => {

// function handleSubmit(e) {
//     e.preventDefault();
//     post(route('settings.site.update'), {
//         preserveScroll: true,
//     });
// }


  return (<SettingsTopTabs activeTab='site'>
    <div className="d-flex flex-column flex-md-row">
      <ul className="nav nav-tabs nav-pills flex-md-column inner_course_tabs mb-3 pt-10 mb-md-0 fs-6">
        <li className="nav-item w-md-200px"><a className="nav-link active" href="cr_vtab_settings">Site Details</a>
        </li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_emails">Site Emails</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#cr_vtab_url">Site URL</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#cr_vtab_certif">SSL Certificate</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#cr_vtab_brand">Remove Branding</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#cr_vtab_check">Steamlined Checkout</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#cr_vtab_modify">Modify Text</a></li>
      </ul>

      <div className="tab-content w-100" id="myTabContent">
        <div className="w-100 mb-10" id="cr_vtab_settings">
          <form className="form p-lg-11 p-5 bg-white">
            <h4 className="text-dark mb-3">Site Details</h4>
            <p>Your site name appears in the meta tags for search engines. Your site address is used to access your
              products and can be changed below in "Site URL" .</p>

            <div className="row mt-5">
              <div className="col-md-6 mb-8">
                <label className=" fs-6 fw-bold mb-2 required">Site Name</label>
                <input type="text" className="form-control form-control-solid" name="site_name"/>
              </div>
              <div className="col-md-6 mb-8">
                <label className=" fs-6 fw-bold mb-2 required">Site Address</label>
                <input type="text" className="form-control form-control-solid" placeholder="imranha.mahzah.com"
                       name="site_address"/>
              </div>
            </div>
            <div className="text-end w-100">
              <button type="submit" id="site_details_submit" className="btn btn-primary">
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
        <div className="w-100 mb-10" id="set_tab_emails">
          <form id="site_emails" className="form w-100 p-lg-11 p-5 bg-white" action="#">
            <h2 className="fs-2 mb-10">Site Email</h2>
            <div className="row">
              <div className="col-md-6">
                <label className="fs-6 fw-bold mb-2 required">Reply to email</label>
                <input type="email" className="form-control form-control-solid" value="sheensoltech@gmail.com"
                       name="reply_email"/>
                <small className="pt-3 ">Customers that reply to emails sent from your Mahzah
                  site will reach you at this address</small>
              </div>
              <div className="col-md-6">
                <label className="fs-6 fw-bold mb-2 required">Support email</label>
                <input type="email" className="form-control form-control-solid" placeholder="info@mahzah.com"
                       name="support_email"/>
                <small className="pt-3">Customers that click support links on your Mahzah site
                  will reach you at this address</small>
              </div>
            </div>
            <div className="text-end w-100">
              <button type="submit" id="site_emails_submit" className="btn btn-primary">
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
        {/*Setting Site URL*/}
        <div className="w-100 mb-10" id="cr_vtab_url">
          <form id="site_url" className="form w-100 p-lg-11 p-5 bg-white" action="#">
            <h2 className="fs-2">Site Url</h2>
            <p>This is the address to access your Mahzah site. Please note if changed, the previous site URL will no
              longer work. Any URLs added will also direct visitors to your site.</p>
            <div className="row mt-4">
              <div className="col-md-6">
                <label className=" fs-6 fw-bold mb-2 required">My Mahzah URL</label>
                <input type="url" className="form-control form-control-solid" name="site_url"/>
              </div>
            </div>
          </form>
          <div className="w-100 bg-light-success p-lg-7 p-5 d-md-flex align-items-center justify-content-between">
            <p className="mb-1 fs-4">Custom site URLs are available on the Basic plan.</p>
            <a href="#"
               className="btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success m-lg-0 mt-1">
              <i className="fa fa-check-circle text-success fs-4 me-2"></i>
              UPGRADE NOW
            </a>
          </div>
        </div>
        {/*Setting SSL Certificate*/}
        <div className="w-100 mb-10" id="cr_vtab_certif">
          <div id="site_ssl" className="form w-100 p-lg-11 p-5 bg-white">
            <h2 className="fs-2">SSL Certificate</h2>
            <p>Your Mahzah site automatically includes a free SSL certificate to help keep your site secure and
              encrypted and let students know that their information is safe on your site.</p>
          </div>
          <div className="w-100 bg-light-success p-lg-7 p-5">
            <div className="d-flex">
              <i className="bi bi-gear fs-2 me-3"></i>
              <h4 className="mb-1 fs-3">Custom SSL Certificates</h4>
            </div>
            <p className="mb-1 fs-5">Interested in adding features to your certificate including an Extended
              Validation SSL Certification? Custom SSL Certificates are available on the Premier plan.</p>
            <a href="#"
               className="btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success m-lg-0 mt-3"><i
              className="fa fa-check-circle text-success fs-4 me-2"></i> UPGRADE NOW</a>
          </div>
        </div>
        {/*Setting Remove Branding*/}
        <div className="w-100 mb-10" id="cr_vtab_brand">
          <div id="site_branding" className="p-lg-11 p-5 bg-white">
            <h2 className="fs-2">Remove Mahzah branding</h2>
            <p>Hide "Powered by Mahzah" on your Mahzah site pages and products.</p>
          </div>
          <div className="bg-light-success p-lg-7 p-5 d-md-flex justify-content-between">
            <p className="mb-1 fs-5">Available on the Pro + Growth plan.</p>
            <a href="#"
               className="btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success m-lg-0 mt-3">
              <i className="fa fa-check-circle text-success fs-4 me-2"></i> UPGRADE NOW</a>
          </div>
        </div>
        {/*Setting Streamlined Checkout*/}
        <div className="w-100 mb-10" id="cr_vtab_check">
          <div id="site_branding" className="p-lg-11 p-5 bg-white">
            <h2 className="fs-2">New: Streamlined Checkout</h2>
            <p>Hide "Powered by Mahzah" on your Mahzah site pages and products.</p>
          </div>
          <div className="bg-light-success p-lg-7 p-5 d-flex align-items-center justify-content-between">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="streamlined"/>
              <label>Opt. to the test</label>
            </div>
            <a href="#"
               className="btn btn-sm btn-outline btn-outline-dashed btn-outline-success btn-active-light-success mt-3">Save</a>
          </div>
        </div>
        {/*Setting Modify text: Site*/}
        <div className="w-100 mb-10" id="cr_vtab_modify">
          <div id="site_modify" className="p-lg-11 p-5 bg-white">
            <h2 className="fs-2">Modify text: Site</h2>
            <p>Change small default text snippets on your site. You can easily reset it to the default text at any
              time.</p>
          </div>
          <ul className="nav nav-tabs main-course-tabs bg-white nav-line-tabs nav-line-tabs-2x fs-5 mt-5">
            <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab"
                                        href="#set_tab_general">General</a></li>
            <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#set_tab_product">Product
              pages</a></li>
          </ul>
          {/*General*/}
          <div className="tab-pane fade show active" id="set_tab_general" role="tabpanel">
            <div className=" bg-gray-100 p-5 mb-5">
              <div className="d-sm-flex justify-content-between">
                <div className="mr-sm-3">
                  <p className="fw-bold fs-4 mb-0">Pre-order available now!</p>
                  <small className="d-block mt-2 mb-3 mb-sm-0 fs-7">The highlighted text that appears on the cards for
                    Pre-order products - 32 character limit.</small>
                </div>
                <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
              </div>
              <div className="custom-container">
                <hr className="my-3"/>
                <form action="#" method="post" className="row align-items-center">
                  <div className="col-sm-8">
                    <input className="form-control" maxLength="100" size="100" type="text" name="snippet[content]"
                           id="snippet_content"/>
                  </div>
                  <div className="col-sm-4 d-sm-flex justify-content-end mt-3 mt-sm-0">
                    <button type="reset" className="btn btn-sm btn-secondary">CANCEL</button>
                    <button type="submit" className="btn btn-sm btn-primary ms-2">SAVE</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-gray-100 p-5 mb-5">
              <div className="d-sm-flex justify-content-between">
                <div className="mr-sm-3">
                  <p className="fw-bold fs-4 mb-0">Lessons</p>
                  <small className="mt-2 mb-3 mb-sm-0 fs-7">The label used on course cards to show how many
                    lessons are in the course.</small>
                </div>
                <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
              </div>
            </div>
            <div className=" bg-gray-100 p-5 mb-5">
              <div className="d-sm-flex justify-content-between">
                <div className="mr-sm-3">
                  <p className="fw-bold fs-4 mb-0">Courses</p>
                  <small className=" mt-2 mb-3 mb-sm-0 fs-7">The label used on bundle cards to show how many
                    courses are in the bundle.</small>
                </div>
                <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
              </div>
            </div>
            <div className=" bg-gray-100 p-5 mb-5">
              <div className="d-sm-flex justify-content-between">
                <div className="mr-sm-3">
                  <p className="fw-bold fs-4 mb-0">Start learning</p>
                  <small className="mt-2 mb-3 mb-sm-0 fs-7">The button text that displays on the thank you page.</small>
                </div>
                <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
              </div>
            </div>
          </div>
          {/*Product pages*/}
          <div className="tab-pane fade" id="set_tab_product" role="tabpanel">
            <div className="w-100 bg-gray-300 p-5 mb-5">
              <div className="d-block d-sm-flex justify-content-between">
                <div className="mr-sm-3">
                  <p className="fw-bold fs-4 mb-0">Interested in this course? Email us at [support_email_address]</p>
                  <small className="d-block mt-2 mb-3 mb-sm-0 fs-7">For Private courses only, this is the text that
                    appears in the banner instead of the Buy button</small>
                </div>
                <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SettingsTopTabs>)
}

Site.layout = page => {
  return (<Layout title='Site Settings' children={page}
                  breadcrumbs={[{name: 'Settings', path: route('settings')}, {name: 'Site settings'}]}
                  openedMenu="2"
                  activeLink="2.1"
  />);
};

export default Site;
