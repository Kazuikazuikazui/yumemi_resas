import React from "react";
import styles from './style.module.scss';
type Props = {
  prefectures:{
    prefCode: number;
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
                  prefecture.prefCode,
                  event.target.checked
                )
              }
              id={"checkbox" + prefecture.prefCode}
            />
            <label
              className={styles.label}
              htmlFor={"checkbox" + prefecture.prefCode}
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