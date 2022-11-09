import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import CoursesList from './CoursesList';
import Pagination from '@/Shared/Pagination';
import { usePage } from '@inertiajs/inertia-react';

const Index = () => {
  const { courses } = usePage().props;
  const {
    data,
    meta: { links }
  } = courses;

  return (
    <>
      <CoursesList courses={data} />
      <Pagination links={links} />
    </>
  );
};

Index.layout = page => <Layout title="Manage Courses" children={page}
  toolbarbuttons={[{ link: route('courses.create'), name: 'New Course', icon: 'bi bi-plus' }]}
  openedMenu="2"
  activeLink="2.1"
  />;

export default Index;
