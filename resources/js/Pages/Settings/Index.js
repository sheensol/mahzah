import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import Site from './Site';

import { usePage } from '@inertiajs/inertia-react';

const SiteSettings = () => {

  return (
    <>
      <Site />

    </>
  );
};


SiteSettings.layout = page => <Layout title="Settings" children={page} openedMenu="9" />;

export default SiteSettings;
