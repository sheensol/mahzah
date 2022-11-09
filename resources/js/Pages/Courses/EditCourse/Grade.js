import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';

const Grade = () => {
    const { course } = usePage().props;

    return (
        <CourseTabs activeTab='grade' course={course}>
          <div className="d-flex flex-column flex-md-row">

            <ul className="nav nav-tabs nav-pills border-0 flex-row flex-md-column inner_course_tabs mb-3 pt-10 mb-md-0 fs-6">
              <li className="nav-item w-md-200px"><a className="nav-link active" data-bs-toggle="tab" href="#cr_vtab_assignment">Assignment</a></li>
              <li className="nav-item w-md-200px"><a className="nav-link" data-bs-toggle="tab" href="#cr_vtab_quiz">Quiz</a></li>
            </ul>
            <div className="tab-content w-100 p-lg-11 p-5 bg-white" id="myTabContent">
              <div className="tab-pane fade active show" id="cr_vtab_assignment" role="tabpanel">


                  <div className="section__header d-flex justify-content-between">
                    <h4 className="text-dark mb-0">Assignment Grade</h4>
                    <div className="section__header__actions">
                        <i className="fas fa-exclamation-circle mx-5" data-bs-toggle="tooltip" title="" data-bs-original-title="Course Image" aria-label="Course Image"></i>
                        <button className="btn btn-sm btn-light-primary">70%</button>
                    </div>
                  </div>

                <h5 className="mt-10 mb-0">1. Biology Group </h5>
                <div className="table-responsive border mt-10">
                  <table className="table table-flush align-middle table-row-bordered table-row-solid gy-4">
                    <thead className="border-gray-200 text-gray-400 fs-5 fw-bold bg-lighten">
                    <tr>
                      <th className="ps-9">Group Name</th>
                      <th>
                        <i className="fas fa-exclamation-circle me-3 fs-7" data-bs-toggle="tooltip" title="" data-bs-original-title="Course Image" aria-label="Course Image"></i>Points
                      </th>
                      <th>
                        <i className="fas fa-exclamation-circle me-3 fs-7" data-bs-toggle="tooltip" title="" data-bs-original-title="Course Image" aria-label="Course Image"></i>Weight
                      </th>
                    </tr>
                    </thead>
                    <tbody className="fs-6 fw-semibold text-gray-600">
                    <tr>
                      <td className="ps-9">Group Assignment 1</td>
                      <td className="ps-9">15</td>
                      <td className="ps-9">25%</td>
                    </tr>
                    <tr>
                      <td className="ps-9">Group Assignment 2</td>
                      <td className="ps-9">12</td>
                      <td className="ps-9">60%</td>
                    </tr>
                    <tr>
                      <td className="ps-9">Group Assignment 3</td>
                      <td className="ps-9">15</td>
                      <td className="ps-9">50%</td>
                    </tr>
                    <tr>
                      <td className="ps-9">Group Assignment 4</td>
                      <td className="ps-9">15</td>
                      <td className="ps-9">40%</td>
                    </tr>
                    <tr>
                      <td className="ps-9">Group Assignment 5</td>
                      <td className="ps-9">12</td>
                      <td className="ps-9">30%</td>
                    </tr>
                    </tbody>
                  </table>
                </div>


                <h5 className="text-dark mt-10 mb-0">2. Physics Group </h5>
                <div className="table-responsive border mt-10">
                  <table className="table table-flush align-middle table-row-bordered table-row-solid gy-4">
                    <thead className="border-gray-200 text-gray-400 fs-5 fw-bold bg-lighten">
                    <tr>
                      <th className="ps-9">Group Name</th>
                      <th>
                        <i className="fas fa-exclamation-circle me-3 fs-7"
                                                          data-bs-toggle="tooltip" title=""
                                                          data-bs-original-title="Course Image"
                                                          aria-label="Course Image"></i>Points
                      </th>
                      <th><i className="fas fa-exclamation-circle me-3 fs-7"
                                                    data-bs-toggle="tooltip" title=""
                                                    data-bs-original-title="Course Image" aria-label="Course Image"></i>Weight
                      </th>
                    </tr>
                    </thead>
                    <tbody className="fs-6 fw-semibold text-gray-600">
                    <tr>
                      <td className="ps-9">Group Assignment 1</td>
                      <td className="ps-9">15</td>
                      <td className="ps-9">25%</td>
                    </tr>
                    <tr>
                      <td className="ps-9">Group Assignment 2</td>
                      <td className="ps-9">12</td>
                      <td className="ps-9">60%</td>
                    </tr>
                    <tr>
                      <td className="ps-9">Group Assignment 3</td>
                      <td className="ps-9">15</td>
                      <td className="ps-9">50%</td>
                    </tr>
                    <tr>
                      <td className="ps-9">Group Assignment 4</td>
                      <td className="ps-9">15</td>
                      <td className="ps-9">40%</td>
                    </tr>
                    <tr>
                      <td className="ps-9">Group Assignment 5</td>
                      <td className="ps-9">12</td>
                      <td className="ps-9">30%</td>
                    </tr>
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-end py-6">
                  <button type="submit" className="btn btn-sm btn-primary">Save</button>
                </div>

              </div>

              <div className="tab-pane fade" id="cr_vtab_quiz" role="tabpanel">


              </div>

            </div>

          </div>
        </CourseTabs>
    )
}

Grade.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'Grade' }
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default Grade;
