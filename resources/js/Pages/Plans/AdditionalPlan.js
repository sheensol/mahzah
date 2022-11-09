import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import {usePage, useForm} from '@inertiajs/inertia-react';
import PlansTopTabs from './PlansTopTabs';
import Plans from "@/Pages/Plans/PrimaryPlan";
import Site from "@/Pages/Settings/Payments";


const SiteSettings = () => {

  return (
    <>
      <PlansTopTabs activeTab='additional_plan'>
        <div className="d-flex bg-white p-9 flex-wrap flex-sm-nowrap mb-3">
          <div className="flex-grow-1">
            <div className="align-items-start flex-wrap mb-2">
                <h2 className="fs-2 text-uppercase">Set Additional Pricing </h2>
                <p className="text-dark fs-5  mt-4">Offer Your Customers Additional Pricing Options To Purchase Your
                  course. Add As Many Prices As You Like! <a href="#"> Learn More</a></p>
            </div>
            <div data-kt-buttons="true" className="mt-8">
              <label
                className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 mb-5">
                <div className="d-flex align-items-center me-2">
                  <div className="form-check form-check-custom form-check-solid me-6">
                    <input className="form-check-input" type="radio" name="plan" value="startup"/>
                  </div>
                  <div className="flex-grow-1">
                    <h2 className="d-flex align-items-center fs-3 fw-bold flex-wrap">One-Time Payment</h2>
                    <div className="fw-semibold">Charge students a one-time free to access the content optionally you
                      can set an enrollment duration that will limit the time students have access to your content.
                    </div>
                  </div>
                </div>
              </label>
              <label
                className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 mb-5 active">
                <div className="d-flex align-items-center me-2">
                  <div className="form-check form-check-custom form-check-solid me-6">
                    <input className="form-check-input" type="radio" name="plan" checked="checked" value="advanced"/>
                  </div>
                  <div className="flex-grow-1">
                    <h2 className="d-flex align-items-center fs-3 fw-bold flex-wrap">Subscription / Membership</h2>
                    <div className="fw-semibold">Charge students and recurring monthly fees for access to course
                      content. great for membership sites!
                    </div>
                  </div>
                </div>
              </label>
              <label
                className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6">
                <div className="d-flex align-items-center me-2">
                  <div className="form-check form-check-custom form-check-solid me-6">
                    <input className="form-check-input" type="radio" name="plan" value="enterprise"/>
                  </div>
                  <div className="flex-grow-1">
                    <h2 className="d-flex align-items-center fs-3 fw-bold flex-wrap">Monthly Payment Plan</h2>
                    <div className="fw-semibold">Charge students and recurring monthly fees for access to course
                      content. great for membership sites!
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

      </PlansTopTabs>

    </>
  );
};

SiteSettings.layout = page => {
  return (<Layout title='Additional Plans' children={page}
                  breadcrumbs={[
                    {name: 'Plans', path: route('settings')},
                    {name: 'Additional Plan'}
                  ]}
                  openedMenu="7"
                  activeLink="7.1"
  />);
}
;

export default SiteSettings;
