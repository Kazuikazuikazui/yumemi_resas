import React from "react";
import styles from './style.module.scss';

const Header: React.FC = () => {
  return (
    <>
      <h1 className={styles.h1}>都道府県別人口推移グラフ</h1>
    </>
  );
};

export default Header;