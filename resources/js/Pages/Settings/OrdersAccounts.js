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


  return (<SettingsTopTabs activeTab='orders_accounts'>
    <div className="d-flex flex-column flex-md-row">
      <ul
        className="nav nav-tabs nav-pills border-0 flex-row flex-md-column inner_course_tabs mb-3 pt-10 mb-md-0 fs-6">
        <li className="nav-item w-md-200px"><a className="nav-link active" href="#set_tab_sign">Sign in/Sign up</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_custom">Custom sign up</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_order">Order setup</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_modify">Modify text:Orders</a></li>
      </ul>


      <div className="tab-content w-100" id="myTabContent">

        {/*Setting Sign in/Sign up*/}
        <div className="w-100 mb-10" id="set_tab_sign" role="tabpanel">
          <form id="site_details" className="form p-lg-11 p-5 bg-white" action="#">
            <h2 className="fs-2">Sign in/Sign up settings</h2>
            <div className="mt-5">
              <h4>Social login</h4>
              <p>Allow your users to sign in or sign up through their social media accounts.<a href="#"> Learn
                more </a></p>
            </div>
            <label className="form-check  form-check-solid align-items-start mb-3">
              <input className="form-check-input me-3" type="checkbox" name="email-preferences[]"
                     value="1"/>
              <span className="d-flex">
                <span className="fw-bold fs-6 mb-0">Enable Google sign in</span>
                   <img src="../assets/images/social-img/google.svg" className="w-20px ms-6" alt=""/>
              </span>
            </label>

            <label className="form-check  form-check-solid align-items-start mb-3">
              <input className="form-check-input me-3" type="checkbox" name="email-preferences[]"
                     value="1"/>
              <span className="d-flex">
                 <span className="fw-bold fs-6 mb-0">Enable Facebook sign in</span>
                   <img src="../assets/images/social-img/facebook.svg" className="w-20px ms-6" alt=""/>
              </span>
            </label>
            <label className="form-check  form-check-solid align-items-start">
              <input className="form-check-input me-3" type="checkbox" name="email-preferences[]"
                     value="1"/>
              <span className="d-flex">
               <span className="fw-bold fs-6 mb-0">Enable LinkedIn sign in</span>
                   <img src="assets/images/social-img/linkedin-2.svg" className="w-20px ms-6" alt=""/>
              </span>
            </label>

            <h4 className="mt-5">Custom single sign on (SSO)</h4>
            <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6 mt-5">
              <span className="me-5"> <i className="bi bi-arrow-up-circle text-primary fs-2"></i></span>

              <div className="mb-3 mb-md-0 fw-semibold">
                <div className="fs-6 text-gray-700 pe-7">Upgrade to the Plus plan to provide a seamless logged-in
                  experience for users when navigating between your primary experience and your Mahzah site.
                </div>
                <div className="mt-3">
                  <a className="btn btn-success" href="#">UPGRADE TO GET SSO</a>
                  <a className="btn btn-outline-success mx-2" href="#">LEARN MORE</a>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h4>Terms & conditions</h4>
              <p>A checkbox will appear on your sign up page and users will be required to agree the Privacy Policy
                and/or Terms of Use before creating their account. <a href="#"> Learn more </a></p>
              <label className="form-check form-check-solid align-items-start mb-3">
                <input className="form-check-input me-3" type="checkbox" name="email-preferences[]" value="1"/>
                <span className="form-check-label">
                  <span
                    className="fw-bold fs-6">Customers must agree to your Privacy Policy to create an account.</span>
                </span>
              </label>
              <label className="form-check form-check-solid align-items-start">
                <input className="form-check-input me-3" type="checkbox" name="email-preferences[]" value="1"/>
                <span className="form-check-label">
                  <span className="fw-bold fs-6">Customers must agree to your Terms of Use to create an account.</span>
                </span>
              </label>
            </div>
            <div className="text-end mt-5 w-100">
              <button type="submit" id="site_details_submit" className="btn btn-primary">
                <span className="indicator-label">Save</span>
              </button>
            </div>
          </form>
        </div>
        {/*Setting Custom sign up*/}
        <div class="w-100 mb-10" id="set_tab_custom" role="tabpanel">
          <form id="site_details" class="p-lg-11 p-5 bg-white" action="#">
            <h2 class="fs-2">Custom sign up fields</h2>
            <p>Add optional or required custom fields to your sign up form to collect additional
              information from new users.<a href="#"> Learn more </a></p>
            <h5 class="fs-7">Maximum of 4 fields.</h5>
            <button class="btn btn-light-primary mt-4" data-ember-action="2000">ADD FIELD</button>
          </form>
        </div>
        {/*Setting Order setup*/}
        <div className="w-100 mb-10" id="set_tab_order" role="tabpanel">
          <form id="site_details" className="form p-lg-11 p-5 bg-white" action="#">
            <h2 className="fs-2">Order setup</h2>
            <p>The order ID shows on your receipts.</p>
            <div className="row">
              <div className="col-md-6">
                <div className=" w-100 mb-8">
                  <label className="fs-6 fw-bold mb-2 required">Order ID Starts From</label>
                  <input type="email" className="form-control" name="reply_email"/>
                  <small className="pt-3">The new order ID value will only be applied
                    to orders created after changes saved</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="w-100 mb-8">
                  <label className="fs-6 fw-bold mb-2 required">Order ID Format</label>
                  <input type="email" className="form-control" placeholder="ORD{{number}}" name="support_email"/>
                  <small className="pt-3">This is the format that will determine how
                    your order numbers will appear. For example, you could use Order: (number)
                    to have it appear as: Order: 100</small>
                </div>
              </div>
            </div>
            <div className="text-end w-100 mt-5">
              <button type="submit" id="site_details_submit" className="btn btn-primary">
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
        {/*Setting Modify text: Orders*/}
        <div className="w-100 mb-10" id="set_tab_modify" role="tabpanel">
          <form id="site_details" className="form p-lg-11 p-5 bg-white" action="#">
            <h2 className="fs-2">Modify text: Orders</h2>
            <p>Change small default text snippets on your site. You can easily reset it to the default
              text at any time.</p>

            <div className=" bg-gray-300 mt-10 p-5 mb-5">
              <div className="d-sm-flex justify-content-between">
                <div className="mr-sm-3">
                  <p className="fw-bold fs-4 mb-0">Coupon code</p>
                  <small className="d-block mt-2 mb-3 mb-sm-0 fs-7">The wording for coupon code in the checkout</small>
                </div>
                <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
              </div>
            </div>

            <div className="bg-gray-300 p-5 mb-5">
              <div className="d-sm-flex justify-content-between">
                <p className="fw-bold fs-4 mb-0">Have a coupon?</p>
                <small className="mt-2 mb-3 mb-sm-0 fs-7">The wording that is displayed in the checkout asking if the
                  user has a coupon</small>
                <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
              </div>
            </div>
            <div className="text-end w-100 mt-5">
              <button type="submit" id="site_details_submit" className="btn btn-primary">
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </SettingsTopTabs>)
}

Site.layout = page => {
  return (<Layout title='Site Settings' children={page}
                  breadcrumbs={[{name: 'Settings', path: route('settings')}, {name: 'OrderAccount settings'}]}
                  openedMenu="2"
                  activeLink="2.1"
  />);
};

export default Site;
