import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import Bundles from './Create';

const SiteSettings = () => {
  return (
    <>
      <Bundles/>

    </>
  );
};

SiteSettings.layout = page =>
  <Layout title="Bundles" children={page} openedMenu="5"/>
;
export default SiteSettings;
