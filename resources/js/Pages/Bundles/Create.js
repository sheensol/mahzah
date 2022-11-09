import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import {usePage, useForm} from '@inertiajs/inertia-react';
import BundlesTopTabs from "@/Pages/Bundles/BundlesTopTabs";


const Create = () => {


  return (<BundlesTopTabs activeTab='bundles'>

    <form id="site_details" className="form w-100 p-lg-11 p-5 bg-white" action="#">
      <div className=" w-100 d-flex">
        <h2 className="fs-2">BUNDLE (xyz)</h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="fv-row w-100 mt-8">
            <label className="d-flex align-items-center fs-6 fw-bold mb-2">Select Course</label>
            <select className="form-select " data-control="select2" data-placeholder="Add course">
              <option></option>
              <option value="1">Course 1</option>
              <option value="2">Course 2</option>
              <option value="3">Course 3</option>
            </select>
          </div>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4 ">
          <div className="card courses_box mt-10 shadow-sm">
            <div className="card-img card-img-top">
              <img src="../assets/images/default-product-card.png" className="img-fluid"/>
            </div>
            <div className="card-body p-3">
              <h4 className="card-title">Course 1</h4>
              <div className="card__content-caption">Imran Haider</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className=" mt-10 w-100">
          <button type="submit" id="site_details_submit" className="btn btn-primary w-100 ">
            <span>Course Added Successfully</span>
          </button>
        </div>
      </div>
    </form>


  </BundlesTopTabs>)
}
export default Create;
