import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import {usePage, useForm} from '@inertiajs/inertia-react';
import PlansTopTabs from './PlansTopTabs';


const PricePlans = () => {


  return (<PlansTopTabs activeTab='primary_plan'>

    <div className="d-flex flex-column flex-md-row">
      <ul className="nav nav-tabs nav-pills border-0 flex-row flex-md-column inner_course_tabs mb-3 pt-10 mb-md-0 fs-6">
        <li className="nav-item w-md-200px"><a className="nav-link active" href="#set_tab_free">Free</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_onetime">One-time</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link"
                                               href="#set_tab_subscribe">Subscription/Membership</a></li>
        <li className="nav-item w-md-200px"><a className="nav-link" href="#set_tab_payment">Monthly Payment</a></li>
      </ul>
      <div className="w-100 ">
        <div className="p-lg-11 p-5 bg-white mb-10" id="set_tab_free">
          <h2 className="fs-2">Free</h2>
          <p className="text-dark fs-5 mt-4">Offer Free Content To Your Subscribers, Optionally, You Can
            Set An Enrollment Duration That Will Limit The Time Students Have Access To Your Content. </p>
          <form className="form w-lg-500px bg-gray-100 rounded p-10" noValidate="novalidate">
            <label className="fw-bolder text-dark fs-4">Days Until Expiry</label>
            <div className="input-group mb-5">
              <input type="text" className="form-control " id="basic-url" name="input_group_input"/>
              <span className="input-group-text fw-bolder" id="basic-addon3">Days</span>
            </div>
            <div className="text-dark fs-6 mt-3">Leave Blank For Unlimited Access.</div>
          </form>
        </div>

        <div className="mb-10 bg-white p-lg-11 p-5" id="set_tab_onetime">
          <h2 className="fs-2">One-Time Payment</h2>
          <p className="text-dark fs-5">Charge Students A One-Time Fee To Access The Content, Optionally
            You Can Set An enrollment Duration That Will Limit The Time Students Have Access To Your
            Content.</p>
          <h1 className="fw-bolder text-dark fs-4 mb-4">You Need To Set up A Payment Processor.</h1>
          <div>
            <a href="#" className="btn btn-sm btn-primary">SET UP PAYMENTS</a>
          </div>
        </div>

        <div className="w-100 bg-white  p-9 mb-10" id="set_tab_subscribe">
          <h2 className="fs-2">Subscription/Membership</h2>
          <p className="text-dark fs-5 mb-5">Charge Students Recurring Monthly Fees For Access To Course
            Content. Great For Membership Sites! </p>
          <form id="kt_docs_formvalidation_input_group" className="form d-flex gap-3" action="#" autoComplete="off">
            <div className=" mb-10 w-100">
              <label className="fw-bolder fs-4 mb-2">Amount</label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">$</span>
                <input type="text" className="form-control" placeholder="50" aria-label="Username"/>
              </div>
            </div>
            <div className="mb-10 w-100">
              <label className="fw-bolder fs-4 mb-2">Paid Every</label>
              <div className="input-group">
                <span className="input-group-text">01</span>
                <div className=" flex-grow-1">
                  <select className="form-select form-select-lg rounded-start-0" data-control="select2"
                          data-placeholder="month(s)">
                    <option value="1">month(s)</option>
                    <option value="2">year(s)</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className="w-100 bg-gray-200 rounded  p-10 ">
            <form id="kt_docs_formvalidation_input_group" className="form" action="#" autoComplete="off">
              <div className="d-lg-flex gap-5 mb-5">
                <label className="form-switch">
                  <input className="form-check-input" type="checkbox" value="1"/>
                </label>
                <div className="me-5">
                  <label className="fw-bolder text-dark fs-4">Free Trail Period</label>
                  <div className="fs-7 fw-bold text-muted">Regular Payments Begin when free trails ends.
                  </div>
                  <div className="input-group flex-nowrap mt-3">
                    <div className="overflow-hidden flex-grow-1">
                      <select className="form-select form-select-lg rounded" data-control="select2"
                              data-placeholder="month(s)">
                        <option value="1">month(s)</option>
                        <option value="2">year(s)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-lg-flex gap-5 mt-5">
                <label className="form-switch ">
                  <input className="form-check-input" type="checkbox" value="1"/>
                </label>
                <div className="me-5">
                  <label className="fw-bolder text-dark fs-4">Custom First Payment</label>
                  <div className="fs-7 fw-bold text-muted">Regular payments begin when free trails ends:</div>
                  <div className="input-group mt-3">
                    <input type="text" className="form-control" aria-label="Username"/>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-8 text-end"><a href="#" className="btn btn-sm btn-primary">Save</a></div>
        </div>
        <div className="w-100 p-9 bg-white mb-10" id="set_tab_payment">
          <h2 className="fs-2">Monthly Payment Plan</h2>
          <p className="text-dark fs-5 mb-5">Charge Students Recurring Monthly Fees For Access To Course
            Content. Great For Membership Sites! </p>
          <form id="kt_docs_formvalidation_input_group" className="form d-flex gap-3 " action="#"
                autoComplete="off">
            <div className="mb-10 w-100">
              <label className="fw-bolder fs-4 mb-2">Price Per Payment</label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon3">$</span>
                <input type="text" className="form-control" id="basic-url" name="input_group_input"
                       aria-describedby="basic-addon3" placeholder="150"/>
              </div>
            </div>
            <div className="mb-10 w-100">
              <label className="fw-bolder fs-4 mb-2">Total Months</label>
              <div className="input-group  mb-5">
                <input type="text" className="form-control %" id="basic-url" name="input_group_input"
                       aria-describedby="basic-addon3" placeholder="03"/>
              </div>
              <p className="text-gray-600 text-start mb-4">Minimum 2 Months</p>
            </div>
          </form>
          <div className="bg-gray-100 rounded p-10">
            <form id="kt_docs_formvalidation_input_group" className="form d-block" action="#" autoComplete="off">
              <div className="mb-10">
                <label className="fw-bolder text-dark fs-4">Enrollment Duration</label>
                <p className="text-gray-600 mb-2">Regular Payments Begin when free trails ends.</p>
                <div className="input-group mb-5">
                  <input type="text" className="form-control " id="basic-url" name="input_group_input"
                         aria-describedby="basic-addon3"/>
                  <span className="input-group-text fw-bolder" id="basic-addon3">Days</span>
                </div>
              </div>
              <div className="fv-row">
                <label className="fw-bolder text-dark fs-4">Buy Button Text Label</label>
                <p className="text-gray-600 mb-2">Regular Payments Begin when free trails ends.</p>
                <div className="input-group mb-5">
                  <input type="text" className="form-control" id="basic-url" name="input_group_input"
                         aria-describedby="basic-addon3" placeholder="3 Easy Payments"/>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-8 text-end"><a href="#" className="btn btn-sm btn-primary">Save</a></div>
        </div>
      </div>
    </div>
  </PlansTopTabs>)
}
export default PricePlans;
