import React, { ReactNode } from 'react';
import 'normalize.css';
import '../../styles/global.scss';
import Header from "../Header";

type Props = {
  children: ReactNode;
};


const Layout: React.FC<Props>  = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
