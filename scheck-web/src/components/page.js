import React from 'react';
import { Helmet } from 'react-helmet';

const Page = (props) => {
  return (
    <div className={props.className}>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      {props.children}
    </div>
  );
};
export default Page;
