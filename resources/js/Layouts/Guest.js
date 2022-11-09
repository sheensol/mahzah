import React from 'react';
import Helmet from 'react-helmet';

export default function Guest({ title, children }) {
  return (
    <div className="bg-body">
        <Helmet titleTemplate="%s | Mahzah" title={title} />
        {children}
    </div>
  )
}
