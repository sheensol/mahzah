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
    <SettingsTopTabs activeTab='learning_content'>
      <div className="d-flex flex-column flex-md-row">
        <ul className="nav nav-tabs nav-pills border-0 flex-row flex-md-column inner_course_tabs mb-3 pt-10 mb-md-0 fs-6">
          <li className="nav-item"><a className="nav-link active" href="#plr_theme">Player theme</a></li>
          <li className="nav-item"><a className="nav-link" href="#plr_styles">Player styles</a></li>
          <li className="nav-item"><a className="nav-link" href="#plr_logo">Player logo</a></li>
          <li className="nav-item"><a className="nav-link" href="#social_shar">Social sharing</a></li>
          <li className="nav-item"><a className="nav-link" href="#lang-sett"> Language Setting</a></li>
          <li className="nav-item"><a className="nav-link" href="#learn_cont"> Learning Content</a></li>
        </ul>
        <div className="tab-content w-100 scroll">
          {/*Setting Course Player theme*/}
          <div className="w-100 mb-10" id="plr_theme">
            <form id="site_details" className="form w-100 p-lg-11 p-5 bg-white" action="#">
              <div className=" w-100 d-flex justify-content-between">
                <h2 className="fs-2">Course Player theme</h2>
              </div>
              <p>Changes the look and feel of the Course Player to suit your content.</p>
              <div className="row">
                <div className="col-12">
                  <div className="custom-control custom-radio mb-3" data-ember-action="1700">
                    <input id="course_player_white-theme" className="custom-control-input" name="theme" type="radio"
                           value="course_player_white"/>
                    <label htmlFor="course_player_white-theme" className="custom-control-label ms-4 me-4">Light
                      theme</label>
                    <div className="form-text ms-9">Dark text on a light background</div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="custom-control custom-radio mb-3" data-ember-action="1702">
                    <input id="course_player_black-theme" className="ember-view custom-control-input" name="theme"
                           type="radio" value="course_player_black"/>
                    <label htmlFor="course_player_black-theme" className="custom-control-label ms-4 me-4">Dark
                      theme</label>
                    <div className="form-text ms-9">Light text on a dark background</div>
                  </div>
                </div>
                <div className="col-12 text-end">
                  <button type="submit" id="site_details_submit" className="btn btn-primary">
                    <span className="indicator-label">Save</span>
                    <span className="indicator-progress">Please wait...<span
                      className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/*Setting Course Player styles*/}
          <div className="w-100 mb-10" id="plr_styles">
            <form id="site_details" className="form w-100 bg-white p-lg-11 p-5 " action="#">
              <div className="w-100 d-flex justify-content-between">
                <h2 className="fs-2">Course Player Styles</h2>
              </div>
              <p>Changes to your site colors might take up to a minute to appear.</p>
              <div className="section--gray p-10 bg-light">
                <div className="form-row align-items-end d-lg-flex justify-content-between my-0">
                  <div className="form-group col-sm-6 mb-0">
                    <label htmlFor="primaryColor" className="label mb-2 fw-bold fs-4">Primary color</label>
                    <p className="section__description">This color will be set as the background color for the Course
                      Player sidebar.</p>
                  </div>
                  <div className="w-100">
                    <div className="input-group col-sm-6 mb-3 w-100">
                      <input type="color" className="form-control form-control-color " id="exampleColorInput"
                             value="#563d7c" title="Choose your color" aria-describedby="basic-addon2"/>
                      <span className="input-group-text" id="basic-addon2"><i
                        className="bi bi-caret-down-fill"></i> </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section--gray p-10 mt-5 bg-light">
                <div className="form-row align-items-end d-lg-flex justify-content-between my-0">
                  <div className="form-group col-sm-6 mb-0 ">
                    <label htmlFor="font" className="label mb-2 fw-bold fs-4">Font</label>
                    <p className="section__description">This will change the default Course Player font.</p>
                  </div>
                  <div className="form-group col-sm-6 mb-0">
                    <div className="mb-7 w-100">
                      <select name="timezone" data-control="select2" data-placeholder="Select an option"
                              data-hide-search="true"
                              className="form-select form-select-lg fs-6 text-gray-700 select2-hidden-accessible"
                              data-select2-id="select2-data-10-8jro" tabIndex="-1" aria-hidden="true"
                              data-kt-initialized="1">
                        <option data-select2-id="select2-data-12-hnnk">Select an option</option>
                        <option value="25" data-select2-id="select2-data-365-6q0q">US $25.00</option>
                        <option value="50" data-select2-id="select2-data-366-o3sc">US $50.00</option>
                        <option value="100" data-select2-id="select2-data-367-18nu">US $100.00</option>
                        <option value="125" data-select2-id="select2-data-368-s3q6">US $125.00</option>
                        <option value="150" data-select2-id="select2-data-369-cpz2">US $150.00</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="empty-state__actions mt-5 text-end">
                <a className="btn btn-outline-success mx-2" href="#">
                  COURSES
                  <span className="bi bi-arrow-right fs-3" aria-hidden=""></span>
                </a>
                <button type="submit" id="site_details_submit" className="btn btn-primary">
                  <span className="indicator-label">Save</span>
                  <span className="indicator-progress">Please wait...<span
                    className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>

              </div>
            </form>
          </div>
          {/*Setting Course Player logo*/}
          <div className="w-100 mb-10" id="plr_logo">
            <form id="site_details" className="form w-100 p-lg-11 p-5 bg-white" action="#">
              <div className="row">
                <div className="col-sm-6">
                  <div className="section__header mt-10">
                    <div className="course-settings__section-upgrade mb-4 d-flex">
                      <h2 className="fs-2 mb-0">Course Player logo</h2>
                    </div>
                  </div>
                  <p>Your logo will appear at the center of the top bar. For best results: upload a PNG or JPEG file
                    under 250kb with dimensions 240 x 48px (5:1 ratio).</p>
                </div>
                <div className="col-sm-6">
                  <div className="mt-10">
                    <div id="ember1611" className="ember-view">
                      <figure id="anchor-course-instructor" className="figure__uploader figure__uploader--favicon ">
                        <img src="../assets/images/default-product-card.png" className="img-fluid"/>
                        <figcaption>
                          <button className="bg-transparent border-0 text-white fs-7" data-ember-action="1615">Upload
                          </button>
                          <a className="mx-4" href="#"><i className="fa fa-trash"></i></a>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="empty-state__actions mt-5 text-end">
                <a className="btn btn-outline-success mx-2 " href="#">
                  COURSES
                  <span className="bi bi-arrow-right fs-3" aria-hidden=""></span>
                </a>
              </div>
            </form>
          </div>

          {/*Setting Social sharing*/}
          <div className="w-100 mb-10" id="social_shar">
            <form id="site_details" className="form w-100 p-lg-11 p-5 bg-white" action="#">
              <div className="w-100 d-flex justify-content-between">
                <h2 className="fs-2">Social sharing</h2>
              </div>
              <div id="ember1650" className="ember-view">
                <section className="social-share mt-5">
                  <p className="section__description">
                    Social sharing allows your students to share a link to the course landing page with their network.
                    These settings can be changed per course in the settings section of course builder.
                  </p>
                  <p className="section__description">Your course link will be added to the end of the social sharing
                    text, along with ‘Powered by Mahzah’. You can remove mahzah branding from your <a href="#"> site
                      settings.</a></p>
                  <div className="form-row">
                    <div className="form-group col-12 my-0">
                      <div className="custom-control custom-checkbox">
                        <input id="ember1651" className="ember-view custom-control-input" type="checkbox"/>
                        <label className="custom-control-label mx-2" htmlFor="ember1651">
                          Social sharing at chapter completion
                        </label>
                        <div className="form-text mx-7">Allow your students to share the course with their network at
                          the completion of each chapter
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row mt-5">
                    <div className="form-group col-12 my-0">
                      <div className="custom-control custom-checkbox">
                        <input id="ember1652" className="ember-view custom-control-input" type="checkbox"/>
                        <label className="custom-control-label mx-2" htmlFor="ember1652">
                          Social sharing at course completion
                        </label>
                        <div className="form-text mx-7">Allow your students to share the course with their network when
                          they reach 100% completion of your course
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group mt-5 col-12">
                      <label className="label social-share__text-label" htmlFor="social-share-message">
                        Social sharing text
                        <span className="badge badge--primary mx-2">Default</span>
                      </label>
                      <textarea id="social-share-message" className="ember-view ember-text-area form-control mb-4"
                                placeholder="Check out this great course!"></textarea>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-12 text-end mt-5">
                <button type="submit" id="site_details_submit" className="btn btn-primary">
                  <span className="indicator-label">Save</span>
                  <span className="indicator-progress">Please wait...<span
                    className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>
              </div>
            </form>
          </div>
          {/*Setting Language settings*/}
          <div className="w-100 mb-10" id="lang-sett">
            <form id="site_details" className="form w-100 p-lg-11 p-5 bg-white" action="#">
              <div className="w-100 d-flex justify-content-between">
                <h2 className="fs-2">Language Setting</h2>
              </div>
              <section className="social-share mt-5">
                <p className="section__description">This is the language in which your site appears to your
                  students. Don't see your language?<a href="#"> Contact us</a> and let us know!</p>

                <div className="d-flex flex-column mb-8 fv-row">
                  <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                    <span>Site language</span>
                  </label>
                  <div className="mw-300px">
                    <select className="form-select form-select-sm " data-control="select2"
                            data-placeholder="English">
                      <option></option>
                      <option value="1">English</option>
                      <option value="2">Spanish</option>
                      <option value="3">English(UK)</option>
                      <option value="4">French</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-12 my-0">
                    <div className="custom-control custom-checkbox">
                      <input id="ember1651" className="ember-view custom-control-input" type="checkbox"/>
                      <label className="custom-control-label mx-2" htmlFor="ember1651">
                        Social sharing at chapter completion
                        <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                           title="" data-bs-original-title="Course Image"
                           aria-label="Course Image"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
              <div className="col-12 text-end mt-5">
                <button type="submit" id="site_details_submit" className="btn btn-sm btn-primary">
                  <span className="indicator-label">Save</span>
                  <span className="indicator-progress">Please wait...<span
                    className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>
              </div>
            </form>
          </div>
          {/*Setting Learning content*/}
          <div className="w-100 mb-10" id="learn_cont">
            <form id="site_details" className="form w-100 p-lg-11 p-5 bg-white" action="#">
              <div className="w-100">
                <h2 className="fs-2">Modify text: Learning content</h2>
                <p>Change small default text snippets on your site. You can easily reset it to the default
                  text at any time.</p>
              </div>
              <div className="w-100 bg-gray-300 p-5 mb-5">
                <div className="d-block d-sm-flex align-items-center justify-content-between">
                  <div className="mr-sm-3">
                    <p className="fw-bold fs-4 mb-0">Go to Dashboard</p>
                    <small className="d-block mt-2 mb-3 mb-sm-0 fs-7">Displayed in the Course Player,
                      Communities navigation bar, and Checkout Thank You Page</small>
                  </div>
                  <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
                </div>
              </div>

              <div className="w-100 bg-gray-300 p-5 mb-5">
                <div className="d-block d-sm-flex align-items-center justify-content-between">
                  <div className="mr-sm-3">
                    <p className="fw-bold fs-4 mb-0">Complete & continue</p>
                    <small className="d-block mt-2 mb-3 mb-sm-0 fs-7">Displayed on the Complete & continue
                      button in the Course Player</small>
                  </div>
                  <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
                </div>
              </div>
              <div className="w-100 bg-gray-300 p-5 mb-5">
                <div className="d-block d-sm-flex align-items-center justify-content-between">
                  <div className="mr-sm-3">
                    <p className="fw-bold fs-4 mb-0">Mark Incomplete</p>
                    <small className="d-block mt-2 mb-3 mb-sm-0 fs-7">Displayed on the Mark Incomplete
                      button in the Course Player</small>
                  </div>
                  <a href="#" className="btn btn-sm mt-2 mb-2 btn-primary">CUSTOMIZE</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SettingsTopTabs>
  )
}

Site.layout = page => {
  return (<Layout title='Site Settings' children={page}
                  breadcrumbs={[
                    {name: 'Settings', path: route('settings')},
                    {name: 'Site settings'}
                  ]}
                  openedMenu="2"
                  activeLink="2.1"
  />);
}
;

export default Site;
