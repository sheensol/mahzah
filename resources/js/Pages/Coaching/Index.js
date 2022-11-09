import React from 'react';
import Layout from '@/Layouts/Admin/Layout';

import {usePage} from '@inertiajs/inertia-react';

const SiteSettings = () => {

  return (
    <>
      text here
    </>
  );
};


SiteSettings.layout = page => <Layout title="Coaching" children={page} openedMenu="6"/>;

export default SiteSettings;
