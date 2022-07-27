import React, { ReactNode } from 'react';
import 'normalize.css';
import '../../styles/global.scss';
import styles from './style.module.scss';
import Header from "../Header";

type Props = {
  children: ReactNode;
};


const Layout: React.FC<Props>  = (props) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
