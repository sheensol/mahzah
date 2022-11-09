import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import Plans from './PrimaryPlan';
// import Plans from './AdditionalPlan';

import {usePage} from '@inertiajs/inertia-react';

const SiteSettings = () => {

  return (
    <>
      <Plans/>
    </>
  );
};


SiteSettings.layout = page => <Layout title="Price Plans" children={page} openedMenu="7"/>;

export default SiteSettings;
