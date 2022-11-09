import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import {usePage, useForm} from '@inertiajs/inertia-react';
import SettingsTopTabs from './SettingsTopTabs';
// import SettingsTabs from './SettingsTabs';
import LoadingButton from '@/Shared/LoadingButton';


const Site = () => {

  // function handleSubmit(e) {
  //     e.preventDefault();
  //     post(route('settings.site.update'), {
  //         preserveScroll: true,
  //     });
  // }


  return (<SettingsTopTabs activeTab='code_analytics'>
    <div className="d-flex flex-column flex-md-row">
      <ul
        className="nav nav-tabs nav-pills border-0 flex-row flex-md-column inner_course_tabs mb-3 pt-10 mb-md-0 fs-6">
        <li className="nav-item w-md-200px"><a className="nav-link active" href="#set_tab_order">Order tracking</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_signup">Signup tracking</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_google">Google site
          verification</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_webhooks">Webhooks</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_api">API</a></li>
      </ul>

      <div className="tab-content w-100" id="myTabContent">
        {/*Setting order tracking tab*/}
        <div className="mb-10" id="set_tab_order" role="tabpanel">
          <form id="site_details" className="form p-lg-11 p-5 bg-white" action="#">
            <h2 className="fs-2">Order tracking code</h2>
            <p>Order tracking code runs on the thank you page when a purchase is completed, and is typically used for
              purchase conversation tracking . HTML and JavaScript can be used (JavaScript must be enclosed
              is (script)tags. Note: Free courses do not generate an order - you may wish to use signup tracking
              code instead for free sites.</p>
            <h2 className="fs-2">How to track conversions</h2>
            <p>Tracking codes are used to track sales for advertising programs such as Google Adwords, external
              affiliate programs and anything that needs conversion tracking. Here are some examples and more
              details.</p>
            <p>Variables (using liquid markup) representing the current user are available for to help with conversion
              tracking. When using the variables within your tracking code, you should wrap them in curly
              brackets.</p>
            <p>For example, to insert the order number, you should enter (order_number) which will output ORD00001
              for example.</p>
            <h2 className="fs-4">The following variables can be used:</h2>
            <li className="d-flex align-items-center py-2">
              <span className="bullet bullet-dot h-10px w-10px bg-dark mx-5"></span>
              (order_number)
            </li>
            <li className="d-flex align-items-center py-2">
              <span className="bullet bullet-dot h-10px w-10px bg-dark mx-5"></span>
              (product_name)
            </li>
            <li className="d-flex align-items-center py-2">
              <span className="bullet bullet-dot h-10px w-10px bg-dark mx-5"></span>
              [billing_name] (The full name of the person who made the purchase)
            </li>
            <div className="text-end w-100">
              <button type="submit" id="site_details_submit" className="btn btn-primary">
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
        {/*setting signup tracking code*/}
        <div className="w-100 mb-10" id="set_tab_signup" role="tabpanel">
          <form id="site_details" className="form  p-lg-11 p-5 bg-white" action="#">
            <h2 className="fs-2">Signup tracking code</h2>
            <p>Signup tracking code is triggered when a user successfully signs up to the site, independent to the
              whether an order is placed or a course is enrolled in. HTML and JavaScript can be use (JavaScript must
              be enclosed in (script) tags).</p>

            <h2 className="fs-2">How to track signups</h2>
            <p>Signup codes are used to track signups for advertising programs such as Google Adwords. external
              affiliate programs and anything that needs conversation tracking. Here are some examples and more
              details.</p>
            <p>Variables (using liquid markup) representing the current user are available for to help with conversion
              tracking. When using the variables within your signup code, you should wrap them in curly brackets.</p>
            <p>For example, to insert the user email, you would enter [email] which will output joe@example.com for
              example.</p>
            <h2 className="fs-4">The following variables can be used:</h2>

            <li className="d-flex py-2">
              <span className="bullet bullet-dot h-10px w-10px bg-dark mx-5"></span>
              id (The unique identifier of the user that signed up).
            </li>
            <li className="d-flex py-2">
              <span className="bullet bullet-dot h-10px w-10px bg-dark mx-5"></span>
              first_name
            </li>
            <li className="d-flex py-2">
              <span className="bullet bullet-dot h-10px w-10px bg-dark mx-5"></span>
              last_name
            </li>

            <div className="text-end w-100">
              <button type="submit" id="site_details_submit" className="btn btn-primary">
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
        {/*Setting google site verification*/}
        <div className="w-100 mb-10" id="set_tab_google" role="tabpanel">
          <form id="site_details" className="form  p-lg-11 p-5 bg-white" action="#">
            <h2 className="fs-2">Google site verification meta tag</h2>
            <p>Enter the value supplied to you by Google. For more information, see our help article.</p>
            <div className="row">
              <div className="col-md-8">
                <div className="mb-8">
                  <input type="text" className="form-control" placeholder="EX:abcd-a1b2c3-54852-ghkks"
                         name="site_name"/>
                  <div className="fv-plugins-message-container invalid-feedback"></div>
                </div>
              </div>
            </div>
            <div className="text-end w-100">
              <button type="submit" id="site_details_submit" className="btn btn-primary">
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
        {/*Setting webhooks*/}
        <div className="w-100 mb-10" id="set_tab_webhooks" role="tabpanel">
          <div id="site_branding" className="p-lg-11 p-5 bg-white">
            <h2 className="fs-2">Webhooks</h2>
            <p>Use webhooks to be notified about events that happen in a Mahzah account.</p>
          </div>
          <div className="bg-light-success p-lg-7 p-5 d-md-flex justify-content-between">
            <p className="mb-1 fs-5">Webhooks is available on the Pro + Growth plan.</p>
            <a href="#"
               className="btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success m-lg-0 mt-3">
              <i className="fa fa-check-circle text-success fs-4 me-2"></i> UPGRADE PLAN</a>
          </div>
        </div>
        {/*Setting api*/}
        <div className="w-100 mb-10" id="set_tab_api" role="tabpanel">
          <form id="site_details" className="form p-lg-11 p-5 bg-white " action="#">
            <h2 className="fs-2">API</h2>
            <p>This is your Mahzah API key. Use this key to integrate with wordpress.</p>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-8">
                  <label className="fs-6 fw-bold mb-2 required">API Key</label>
                  <input type="text" className="form-control" placeholder="EX:abcs-1b1c15d8s6s6s-5s656s" name="api-key"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex pt-9 pb-9 gap-2 gap-lg-3">
                  <a href="#" className="btn btn-sm btn-outline-primary">Reveal Key</a>
                  <a href="#" className="btn btn-sm btn-primary">Reset Key</a>
                </div>
              </div>
            </div>
            <p>This is your Mahzah subdomain, which may be needed along with your API key for some integrations.</p>
            <div className="row">
              <div className="col-md-6">
                <div className="fv-row w-100 mb-8 fv-plugins-icon-container">
                  <label className="d-flex align-items-center fs-6 fw-bold mb-2 required">Subdomain</label>
                  <input type="text" className="form-control" name="subdomain"/>
                  <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2 mt-4">
                    <i className="bi bi-lock fs-2"></i>
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="pt-9">
                  <a href="#" className="btn btn-sm btn-primary">EDIT</a>
                </div>
              </div>
            </div>
          </form>
          <div className=" bg-light-success p-lg-7 p-5 d-md-flex justify-content-between">
            <p className="mb-1 fs-5">Webhooks is available on the Pro + Growth plan.</p>
            <a href="#"
               className="btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success m-lg-0 mt-3">
              <i className="fa fa-check-circle text-success fs-4 me-2"></i> UPGRADE PLAN</a>
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
