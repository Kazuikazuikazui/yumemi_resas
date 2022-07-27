import React from "react";
import styles from './style.module.scss';
import Highcharts from "highcharts";
import ReactHighcharts from "highcharts-react-official";

type Props = {
  populationgraph: {
    prefName: string;
    data: { year: number; value: number }[];
  }[];
};

const Graph: React.FC<Props> = ({ populationgraph }) => {
  
  let series: Highcharts.SeriesOptionsType[] = [];
  let categories = [];

  for (let p of populationgraph) {
    let data = [];

    for (let pd of p.data) {
      data.push(pd.value);
      categories.push(String(pd.year));
    }
    
    console.log(p.prefName);
    series.push({
      type: "line",
      name: p.prefName,
      data: data,
    });
  }

  const options: Highcharts.Options = {
    title: {
      text: "総人口推移",
    },
    
    xAxis: {
      title: {
        text: "年度",
      },
      gridLineWidth: 1,
      min: 2,
      max: 12,
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口数（万人）",
      },
      minTickInterval: 50000,
      gridLineWidth: 1,
      labels: {
        formatter() {
          return `${(this.value as number) / 10000}`;
        },
      },
    },
    // 都道府県を選択していない時の処理
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };

  return (
    <>
      <div className={styles.graph}>
        <ReactHighcharts highcharts={Highcharts} options={options} />
      </div>
      
    </>
  );
};

export default Graph;