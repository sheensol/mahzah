import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';

const Drip = () => {
    const { course } = usePage().props;

    return (
        <CourseTabs activeTab='drip' course={course}>
            <div className="w-100 p-lg-11 p-4 bg-white">

              <h4 className="text-dark mb-0">Drip Type</h4>
              <span className="mt-3">When will the course content be released?</span>

              <div className="row mt-5 g-9">
                <div className="col-md-4 col-lg-12 col-xxl-4">
                  <label className="btn-active-light-primary active d-flex text-start" data-kt-button="true">
                            <span
                              className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                <input className="form-check-input" type="radio" name="usage" value="1"
                                       checked="checked" />
                            </span>
                    <span className="ms-5">
                                <span className="fs-5 fw-bold mb-1 d-block">Student enrollment date</span>
                                <span className="fw-semibold fs-7 text-gray-600">When student enrolls in course</span>
                            </span>
                  </label>
                </div>
                <div className="col-md-4 col-lg-12 col-xxl-4">
                  <label className="btn-active-light-primary d-flex text-start" data-kt-button="true">
                            <span
                              className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                <input className="form-check-input" type="radio" name="usage" value="2"/>
                            </span>
                    <span className="ms-5">
                                <span className="fs-5 fw-bold mb-1 d-block">Student course start date</span>
                                <span className="fw-semibold fs-7 text-gray-600">When student access the course for the first time.</span>
                            </span>
                  </label>
                </div>
                <div className="col-md-4 col-lg-12 col-xxl-4">
                  <label className="btn-active-light-primary d-flex text-start" data-kt-button="true">
                            <span
                              className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                <input className="form-check-input" type="radio" name="usage" value="3"/>
                            </span>
                    <span className="ms-5">
                                <span className="fs-5 fw-bold mb-1 d-block">On a specific date</span>
                                <span className="fw-semibold fs-7 text-gray-600">Select a date when the course will be released.</span>
                            </span>
                  </label>
                </div>
              </div>

              <div className="d-flex mt-11">
                <ul className="nav border-transparent fs-5 fw-bold gap-1">
                  <li className="nav-item">
                    <a className="nav-link px-3 px-lg-8 btn btn-sm btn-primary rounded-top rounded-bottom-0" href="#"
                       data-bs-toggle="tab" data-bs-target="#kt_landing_projects_all_drip">ALL</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-3 px-lg-8 btn btn-sm btn-primary rounded-top rounded-bottom-0" href="#"
                       data-bs-toggle="tab" data-bs-target="#kt_landing_projects_drip_lesson">LESSONS</a>
                  </li>
                </ul>
              </div>

              <div className="tab-content">
                <div className="tab-pane fade active show" role="tabpanel" id="kt_landing_projects_all_drip">
                  <span className="fs-4 fw-semi-bold mb-1 d-block mt-5">BIO</span>
                  <div className="accordion accordion-icon-toggle" id="kt_accordion_2">
                    <div className="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                         data-bs-target="#kt_accordion_2_item_1">
                      <li className="fs-5 fw-bold d-flex align-items-center py-2">
                        <span className="bullet bg-dark me-5"></span> Chapter 1
                      </li>
                    </div>
                    <div id="kt_accordion_2_item_1" className="fs-6 collapse show ps-5"
                         data-bs-parent="#kt_accordion_2">
                      <ul className="chapter_content p-0">
                        <li>
                          <h5>quiz</h5>
                          <div className="d-flex content_action">
                            <a href="#"><i className="bi bi-plus-circle"></i></a>
                            <a href="#"><i className="bi bi-eye"></i></a>
                            <a href="#"><i className="bi bi-pen"></i></a>
                            <a href="#"><i className="bi bi-trash"></i></a>
                          </div>
                        </li>
                      </ul>

                      <div className="d-flex justify-content-between collapsible border  d-flex justify-content-between py-2 toggle mb-0 collapsed"
                        data-bs-toggle="collapse" data-bs-target="#kt_job_4_1" aria-expanded="false">
                        <h5 className=" ms-2 p-2 mb-0">pdf</h5>
                        <div className="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                          <span className="svg-icon toggle-on svg-icon-primary svg-icon-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5"
                                    fill="currentColor"></rect>
                              <rect x="6.0104" y="10.9247" width="12" height="2" rx="1"
                                    fill="currentColor"></rect>
                            </svg>
                          </span>
                          <span className="svg-icon toggle-off svg-icon-1">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5"
                                      fill="currentColor"></rect>
                                <rect x="10.8891" y="17.8033" width="12" height="2" rx="1"
                                      transform="rotate(-90 10.8891 17.8033)" fill="currentColor"></rect>
                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1"
                                      fill="currentColor"></rect>
                              </svg>
                            </span>
                        </div>
                      </div>
                      <div id="kt_job_4_1" className="fs-6 ms-1 p-5 collapse show">
                        <div className="w-100 mt-5">
                          <label className="btn-active-light-primary d-flex text-start" data-kt-button="true">
                            <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                              <input className="form-check-input" type="radio" name="usage" value="2"/>
                              </span>
                            <span className="ms-5">
                              <span className="fs-5 fw-bold mt-1 d-block">Time</span>
                            </span>
                          </label>
                          <div className="row gx-10 mb-5">
                            <div className="col-lg-3">
                              <label className="fs-6 fw-semibold form-label mt-3">
                                <span>Open the Quiz</span>
                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                   aria-label="Enable/disable tracking customers online status."
                                   data-kt-initialized="1"></i>
                              </label>
                            </div>
                            <div className="col-lg-2">
                              <div className="position-relative d-flex align-items-center">
                                                  <span className="svg-icon position-absolute ms-4 mb-1 svg-icon-2">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.3"
                                                              d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z"
                                                              fill="currentColor"></path>
                                                        <path
                                                          d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z"
                                                          fill="currentColor"></path>
                                                        <path
                                                          d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z"
                                                          fill="currentColor"></path>
                                                    </svg>
                                                  </span>

                                <input className="form-control ps-12 flatpickr-input active" name="date"
                                       placeholder="Calender" id="kt_datepicker_1" type="text" readOnly="readonly"/>
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="fv-row w-100 flex-md-root fv-plugins-icon-container"
                                   data-select2-id="select2-data-131-bc2l">
                                <select className="form-select">
                                  <option>hrs</option>
                                  <option value="0" >1 hour</option>
                                  <option value="1" >2hour</option>
                                  <option value="2" >2 hour</option>
                                </select>

                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="fv-row w-100 flex-md-root fv-plugins-icon-container"
                                   data-select2-id="select2-data-131-bc2l">
                                <select className="form-select">
                                  <option >min</option>
                                  <option value="electronics" >25 min</option>
                                  <option value="office" >28 min</option>
                                  <option value="fashion">30 min</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-2">

                              <div className="custom-control custom-checkbox my-3">
                                <input id="ember1706" className="ember-view custom-control-input" type="checkbox"
                                       value="false"/>
                                  <label className="custom-control-label mx-2" htmlFor="ember1706">Enable</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-100 mt-5">
                          <div className="row gx-10 mb-5">
                            <div className="col-lg-3">
                              <label className="fs-6 fw-semibold form-label mt-3">
                                <span>Close the Quiz</span>
                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                   aria-label="Enable/disable tracking customers online status."
                                   data-kt-initialized="1"></i>
                              </label>
                            </div>
                            <div className="col-lg-2">

                              <div className="position-relative d-flex align-items-center">
                                                 <span className="svg-icon position-absolute ms-4 mb-1 svg-icon-2">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.3"
                                                              d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z"
                                                              fill="currentColor"></path>
                                                        <path
                                                          d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z"
                                                          fill="currentColor"></path>
                                                        <path
                                                          d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z"
                                                          fill="currentColor"></path>
                                                    </svg>
                                                 </span>
                                <input className="form-control ps-12 flatpickr-input active" name="date"
                                       placeholder="Calender" id="kt_datepicker_1" type="text" readOnly="readonly"/>
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <select className="form-select mb-2" name="tax">
                                  <option value="0">hrs</option>
                                  <option value="1">1 hr</option>
                                  <option value="2">2 hr</option>
                                  <option value="5">5hr</option>
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <select className="form-select">
                                  <option value="all" >min</option>
                                  <option value="all" >25 min</option>
                                  <option value="published" >30 min</option>
                                  <option value="scheduled">40 min</option>
                                  <option value="inactive" >50min</option>
                                </select>
                            </div>
                            <div className="col-lg-2">

                              <div className="custom-control custom-checkbox my-3">
                                <input id="ember1706" className="ember-view custom-control-input" type="checkbox"
                                       value="false"/>
                                  <label className="custom-control-label mx-2" htmlFor="ember1706">Enable</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-100 mt-5">
                          <div className="row gx-10 mb-5">
                            <div className="col-lg-3">
                              <label className="fs-6 fw-semibold form-label mt-3">
                                <span>Time limit</span>
                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                   aria-label="Enable/disable tracking customers online status."
                                   data-kt-initialized="1"></i>
                              </label>
                            </div>
                            <div className="col-lg-2">
                              <div className="position-relative d-flex align-items-center">
                                <input className="form-control flatpickr-input" name="limit" id="kt_datepicker_1"
                                       type="text"/>
                              </div>
                            </div>
                            <div className="col-lg-2">
                                <select className="form-select">
                                  <option data-select2-id="select2-data-21-e40b">minutes</option>
                                  <option value="Weeks">Weeks</option>
                                  <option value="Days" >Days</option>
                                  <option value="Hours" >Hours</option>
                                  <option value="Seconds" >Seconds</option>
                                </select>

                            </div>
                            <div className="col-lg-2">
                              <div className="custom-control custom-checkbox my-3">
                                <input id="ember1706" className="ember-view custom-control-input" type="checkbox"
                                       value="false"/>
                                  <label className="custom-control-label mx-2" htmlFor="ember1706">Enable</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-100 mt-5">
                          <div className="row gx-10 mb-5">
                            <div className="col-lg-3">
                              <label className="fs-6 fw-semibold form-label mt-3">
                                <span>When Time Expires</span>
                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                   aria-label="Enable/disable tracking customers online status."
                                   data-kt-initialized="1"></i>
                              </label>
                            </div>
                            <div className="col-lg-8">
                              <div className="w-100">
                                <select className="form-select">
                                  <option>Attempts must be submitted before time expires, or they not</option>
                                  <option value="1">Open attempts are submitted successfully.</option>
                                  <option value="2">There is a grace period when open attempts can be submitted, but no
                                    more questions answered
                                  </option>
                                  <option value="1">Attempts must be submitted before time expires, or they not
                                    counted.
                                  </option>

                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-100 mt-5">
                          <label className="btn-active-light-primary d-flex text-start" data-kt-button="true">
                                                <span
                                                  className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                                    <input className="form-check-input" type="radio" name="usage"
                                                           value="2"/>
                                                </span>
                            <span className="ms-5">
                                                 <span className="fs-5 fw-bold mt-1 d-block">Days</span>
                                               </span>
                          </label>
                          <div className="row gx-10 mb-5">
                            <div className="col-lg-3">
                              <label className="fs-6 fw-semibold form-label mt-3">
                                <span>Will Be Released</span>
                                <i className="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                   aria-label="Enable/disable tracking customers online status." data-kt-initialized="1"
                                   data-bs-original-title="" title=""></i>
                              </label>
                            </div>
                            <div className="col-lg-2">
                              <div className="position-relative d-flex align-items-center">
                                <input className="form-control flatpickr-input" name="limit" id="kt_datepicker_1"
                                       type="text" placeholder="Days"/>
                              </div>

                            </div>
                            <div className="col-lg-4">
                              <div className="custom-control custom-checkbox my-3">
                                <label className="custom-control-label mx-2" htmlFor="ember1706">After
                                  Enrollment.</label>
                              </div>
                            </div>
                            <div className="col-lg-3"></div>
                          </div>
                        </div>
                        <div className="w-100 mt-5 text-end">
                          <button type="button" className="btn btn-light-primary me-3" data-kt-menu-trigger="click"
                                  data-kt-menu-placement="bottom-end">Save Drip
                          </button>
                        </div>
                      </div>

                    </div>
                    </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end mt-11 pt-11">
                <button type="reset" className="btn btn-light btn-active-light-primary me-2">Discard</button>
                <button type="submit" className="btn btn-sm btn-primary">Save Changes</button>
              </div>

            </div>
        </CourseTabs>
    )
}

Drip.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'Drip' }
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default Drip;
