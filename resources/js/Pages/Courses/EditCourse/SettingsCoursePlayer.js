import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import {usePage} from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import SettingsTabs from './SettingsTabs';

const SettingsCoursePlayer = () => {
  const {course} = usePage().props;

  return (<CourseTabs activeTab='settings' course={course}>
    <SettingsTabs activeTab='coursePlayer' course={course}>
      <div className="section__header mobile--hide">
        <h3 className="section__header__title text-uppercase">Course Player appearance </h3>
      </div>
      <p className="section__description mb-10">Any changes made from the Default settings will only be applied
        to this course. To change your Default settings, click
        <a target="_blank" href="#">here</a>.
      </p>
      <div className="section">
        <div className="section__header d-flex">
          <h4 className="section__header__title mb-1">Course Player theme and style</h4>
        </div>
        <p className="section__description ">Change the look and feel of the Course Player to suit your
          content.</p>
        <h5 className="mb-3 mt-10">Theme</h5>
        <div className="row">
          <div className="col-12">
            <div className="custom-control custom-radio mb-3" data-ember-action="1700">
              <input id="course_player_white-theme" className="custom-control-input" name="theme" type="radio"
                     value="course_player_white"/>
              <label htmlFor="course_player_white-theme" className="custom-control-label ms-4 me-4">Light
                theme</label>
              <span className="badge btn-primary mx-2">Default</span>
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
              <button className="btn btn-light-primary  mt-5" data-qa="delete-course__button"
                      data-ember-action="2032">
                REVERT THEME TO DEFAULT
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-3 d-flex">
          <h5 className="course-settings__section-subtitle mb-0 ">Style</h5>
          <span className="badge btn-primary mx-6 ">Pro</span>
        </div>
        <p className="section__description mb-10">Hangs to your site colors might take up to a minute to
          appear.</p>
        <div className="section--gray p-10 bg-light">
          <div className="form-row align-items-end d-lg-flex justify-content-between my-0">
            <div className="form-group col-sm-6 mb-0">
              <label htmlFor="primaryColor" className="label mb-2 fw-bold fs-4">Primary color
                <span className="badge btn-primary ms-4 ">Default</span>
              </label>
              <p className="section__description">This color will be set as the background color for the Course
                Player sidebar.</p>
            </div>
            <div className="form-group col-sm-6 mb-0">
              <div className="mb-7 mw-350px">
                <select className="form-select">
                  <option>Select an option</option>
                  <option value="25">US $25.00</option>
                  <option value="50">US $50.00</option>
                  <option value="100">US $100.00</option>
                  <option value="125">US $125.00</option>
                  <option value="150">US $150.00</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="section--gray p-10 mt-5 bg-light">
          <div className="form-row align-items-end d-lg-flex justify-content-between my-0">
            <div className="form-group col-sm-6 mb-0">
              <label htmlFor="font" className="label mb-2 fw-bold fs-4">Font
                <span className="badge btn-primary ms-4">Default</span>
              </label>
              <p className="section__description">This color will be set as the background color for the Course
                Player sidebar.</p>
            </div>
            <div className="form-group col-sm-6 mb-0">
              <div className="mb-7 mw-350px">
                <select name="timezone" data-control="select2" data-placeholder="Select an option"
                        data-hide-search="true"
                        className="form-select  form-select-lg  fs-6">
                  <option>Select an option</option>
                  <option value="25">US $25.00</option>
                  <option value="50">US $50.00</option>
                  <option value="100">US $100.00</option>
                  <option value="125">US $125.00</option>
                  <option value="150">US $150.00</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="section__header mt-10">
          <div className="course-settings__section-upgrade mb-3 d-flex">
            <h5 className="course-settings__section-subtitle mb-0">Lesson type icon and label</h5>
            <span className="badge btn-primary mx-6">Pro</span>
          </div>
        </div>
        <p className="mb-3">Customize how lessons will appear in the Course Player sidebar.</p>
        <div className="row">
          <div className="col-12">
            <div className="custom-control custom-checkbox">
              <input id="ember1706" className="ember-view custom-control-input" type="checkbox" value="false"
                     disabled=""/>
              <label className="custom-control-label mx-2" htmlFor="ember1706">Hide lesson type icon and
                label</label>
            </div>
          </div>
        </div>
        <div className="section__footer p-10 mt-5 bg-light">
          <div className="section__upgrade__container d-flex justify-content-between">
            <p className="section__upgrade__label mb-0">Upgrade to customize lesson type icon and label</p>
            <div className="section__upgrade__actions">
              <a className="button button--knockout-upgrade button--icon-left" href="#">
                <span className="toga-icon toga-icon-upgrade"></span>UPGRADE PLAN
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <div className="col-sm-6">
            <div className="section__header mt-10">
              <div className="course-settings__section-upgrade mb-4 d-flex">
                <h4 className="section__header__title mb-0">Course Player logo</h4>
                <span className="badge btn-primary mx-6">Pro</span>
              </div>
            </div>
            <p className="section__description">Your logo will appear at the center of the top bar. For best
              results: upload a PNG or JPEG file under 250kb with dimensions 240 x 48px (5:1 ratio).</p>
          </div>
          <div className="col-sm-6">
            <div className="model-course-card__image position-relative mt-10">
              <div id="ember1611" className="ember-view">
                <figure id="anchor-course-instructor" className="figure__uploader figure__uploader--favicon ">
                  <img src="../assets/images/default-product-card.png" className="img-fluid"/>
                  <figcaption className="">
                    <button className="bg-transparent border-0 text-white fs-4 fw-bold"
                            data-ember-action="1615">Upload
                    </button>
                  </figcaption>
                </figure>
              </div>
              <span className="badge bg-primary ">Default</span>
            </div>
          </div>
        </div>
        <div className="section__footer p-10 mt-5 bg-light">
          <div className="section__upgrade__container d-flex justify-content-between">
            <p className="section__upgrade__label mb-0 ">Upgrade to customize Course Player logo per course</p>
            <div className="section__upgrade__actions">
              <a className="button button--knockout-upgrade button--icon-left" href="#">
                <span className="toga-icon toga-icon-upgrade"></span>
                UPGRADE NOW
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-end mt-5">
        <button className="btn btn-primary" data-ember-action="1699">SAVE</button>
      </div>
    </SettingsTabs>
  </CourseTabs>)
}
SettingsCoursePlayer.layout = page => {
  const courseTitle = page.props.course.title;
  return (<Layout title={courseTitle} children={page}
                  breadcrumbs={[{name: 'Courses', path: route('courses.index')}, {name: 'Course Player appearance'}]}
                  openedMenu="2"
                  activeLink="2.1"
  />);
};
export default SettingsCoursePlayer;

