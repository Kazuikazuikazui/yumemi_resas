import React, { ReactNode } from 'react';
import styles from './style.module.scss';

type Props = {
  children: ReactNode;
};


const Title: React.FC<Props>  = (props) => {
  return (
    <h2 className={styles.title}>
      {props.children}
    </h2>
  );
};

export default Title;
