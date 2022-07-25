import React from "react";
import styles from './style.module.scss';
type Props = {
  prefectures:{
    prefNum: number;
    prefName: string;
  }[];

  onChange: (name: string, prefName: number, check: boolean) => void;
};

const PrefectureList: React.FC<Props> = ({ prefectures, onChange }) => {
  return (
    <>
      <div className={styles.block}>
        {prefectures.map((prefecture) => (
          <div className={styles.list} key={prefecture.prefName}>
            <input
              type="checkbox"
              name="Prefecture name"
              onChange={(event) =>
                onChange(
                  prefecture.prefName,
                  prefecture.prefNum,
                  event.target.checked
                )
              }
              id={"checkbox" + prefecture.prefNum}
            />
            <label
              className={styles.text}
              htmlFor={"checkbox" + prefecture.prefNum}
            >
              {prefecture.prefName.length === 3
                ? " " + prefecture.prefName
                : prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default PrefectureList;