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


  return (
    <SettingsTopTabs activeTab='payments'>

      <form className="form w-100 p-lg-11 p-5 bg-white" action="#">
        <h2 className="fs-2">Add a payment provider to accept payments at checkout</h2>
        <p>You can connect both to provide more options for your learners.</p>
        <div className="row">
          <div className="col-xl-6">
            <div className="bg-gray-200 p-lg-8 p-5">
              <h3 className="mb-2">My Paypal</h3>
              <div className="text-gray-600 fs-6 mb-5">Only one-time purchases are currently supported.</div>
              <div className="row">
                <div className="col-md-6 mb-5">
                  <label className="required fs-5 fw-bold mb-2">PayPal email</label>
                  <input type="email" className="form-control" name="papypal-email"/>
                </div>
                <div className="col-md-6 mb-5">
                  <label className="required fs-5 fw-bold mb-2">PayPal merchant ID</label>
                  <input type="text" className="form-control" name="papypal-id"/>
                </div>
                <div className="col-md-12 text-end">
                  <button type="reset" className="btn btn-sm btn-secondary me-3">SHOW PAYPAL IPN URL</button>
                  <button type="submit" className="btn btn-sm btn-primary">
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="bg-gray-200 w-100 p-lg-8 p-5 ">
              <h3 className="mb-2">Stripe</h3>
              <div className="text-gray-600 fs-6 mb-5">
                Accept card payments on your Mahzah site with funds going directly into your linked bank account. Learn
                more.
                <br/><br/>
                Note: If Stripe isn't supported in your country, learn about payment alternatives.
              </div>
              <div className="w-100 text-start">
                <button type="reset" className="btn btn-sm btn-secondary me-3">Connect Account</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </SettingsTopTabs>
  )
}

Site.layout = page => {
  return (<Layout title='Site Settings' children={page}
                  breadcrumbs={[
                    {name: 'Settings', path: route('settings')},
                    {name: 'Payments settings'}
                  ]}
                  openedMenu="2"
                  activeLink="2.1"
  />);
}
;

export default Site;
