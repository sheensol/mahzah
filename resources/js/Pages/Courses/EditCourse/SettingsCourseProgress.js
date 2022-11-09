import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import SettingsTabs from './SettingsTabs';

const SettingsCourseProgress = () => {
    const { course } = usePage().props;

    return (
        <CourseTabs activeTab='settings' course={course}>
            <SettingsTabs activeTab='courseProgress' course={course}>
              <div className="section__header d-flex justify-content-between mb-4">
                <h4 className="section__header__title">Course progress &amp; completion</h4>
              </div>
              <p className="section__description mb-3">
                Customize how your students progress through and complete your course.

              </p>

              <h5 className="mt-5 mb-2">Video lesson progress</h5>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input id="ember1629" className="custom-control-input" type="checkbox"
                         name="model.autoplay_all_videos"/>
                    <label className="custom-control-label mx-2" htmlFor="ember1629">Video lesson autoplay</label>
                    <p className="form-text mx-7">
                      Video lessons will autoplay and also automatically progress to the following lesson upon
                      completion.
                      <a target="_blank" href="#">Learn more</a>
                    </p>
                </div>
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <i className="fa fa-lock fs-5"></i>
                  <label className="mx-2">Video completion (%) required</label>
                  <a title="Click to upgrade" href="#">
                    <span className="badge btn-primary">Pro</span>
                  </a>
                  <p className="form-text mx-7">
                    Video lessons will be marked complete when a student reaches your desired completion percentage.
                    <a target="_blank" href="#">Learn more</a>
                  </p>
                </div>
              </div>
              <h5 className="mt-5 mb-2">Chapter completion</h5>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input id="ember1630" className="ember-view ember-checkbox custom-control-input" type="checkbox"
                         name="model.disable_chapter_completed_modal"/>
                    <label className="custom-control-label mx-2" htmlFor="ember1630">Disable chapter completion
                      message</label>
                    <p className="form-text mx-7">When students complete a chapter they will not see the chapter
                      completion message. This includes the prompt to review the course (if enabled) and social sharing
                      on chapters (if enabled).</p>
                </div>
              </div>
              <h5 className="mt-5 mb-5">Course completion</h5>
              <div id="ember1639" className="ember-view bg-light p-10">
                <div className="empty-state empty-state--card empty-state--upsell mt-2 mb-4">
                  <div className="certificate mb-4">
                    <i className="fa fa-certificate" aria-hidden=""></i>
                  </div>
                  <h2 className="empty-state__title">Completion Certificates</h2>
                  <div>
                    <p className="empty-state__description">
                      <b>Upgrade to Pro</b> to automatically issue certificates to your students
                      after they complete a course! You can also configure certificates to expire automatically.
                      <a target="_blank" href="#">Learn more</a>
                    </p>
                  </div>
                  <div>
                    <p>On your current plan, you can start creating certificates right away.</p>
                  </div>
                  <div className="empty-state__actions">
                    <a className="btn btn-success" href="#">
                      <i className="toga-icon toga-icon-upgrade" aria-hidden=""></i>
                      UPGRADE NOW
                    </a>
                    <a className="btn btn-outline-success px-0 mx-2" href="#">
                      CREATE CERTIFICATE
                      <span className="toga-icon toga-icon-arrow-right" aria-hidden=""></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="form-group py-10">
                <div className="custom-control custom-checkbox">
                  <input id="ember1640" className="ember-view ember-checkbox custom-control-input" type="checkbox"/>
                    <label className="custom-control-label mx-2" htmlFor="ember1640">Custom completion page</label>
                    <div className="form-text mx-7">Customize the page students see when they reach 100% completion of
                      your course. This is a perfect opportunity to show them other courses to take or share some follow
                      up material.
                    </div>
                </div>
              </div>
              <h5 className="mb-3">Social sharing</h5>
              <div id="ember1650" className="ember-view">
                <section className="social-share">
                  <p className="section__description">
                    Social sharing allows your students to share a link to the course landing page with their network.
                    These settings can be changed for all courses at once in your
                    <a href="#">learning content settings.</a>
                  </p>
                  <p className="section__description">Your course link will be added to the end of the social sharing
                    text.</p>
                  <div className="form-row">
                    <div className="form-group col-12 my-0">
                      <div className="custom-control custom-checkbox">
                        <input id="ember1651" className="ember-view custom-control-input" type="checkbox"/>
                          <label className="custom-control-label mx-2" htmlFor="ember1651">
                            Social sharing at chapter completion
                            <span className="badge btn-primary mx-2">Default</span>
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
                            <span className="badge btn-primary mx-2">Default</span>
                          </label>
                          <div className="form-text mx-7">Allow your students to share the course with their network
                            when they reach 100% completion of your course
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
              <div className="text-end mt-5">
                <button className="btn btn-primary" data-ember-action="1626">Save</button>
              </div>
            </SettingsTabs>
        </CourseTabs>
    )
}

SettingsCourseProgress.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'Course progress & completion'}
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default SettingsCourseProgress;
