import React from "react";
import styles from './style.module.scss';
import Highcharts from "highcharts";
import ReactHighcharts from "highcharts-react-official";
let minyear;
let maxyear;
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
    series.push({
      type: "line",
      name: p.prefName,
      data: data,
    });
    minyear = 2;
    maxyear = 12;
  }

  const options: Highcharts.Options = {
    title: {
      text: "総人口推移",
    },
    legend: {
      itemStyle: {
        fontSize: '16px' 
      }  
    },
    xAxis: {
      title: {
        text: "年度",
      },
      gridLineWidth: 1,
      min: minyear,
      max: maxyear,
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
    tooltip: {
      headerFormat: '',
      useHTML: true,
      formatter() {
        const value = (Math.round((this.y as number) / 1000) / 10).toFixed(1);
        return `
          <div style="margin-bottom: 16px">${this.x as number}年</div>
          <div>${this.series.name}</div>
          <div>
            <span style="font-size: 1.2rem; color: ${this.color as string}">${value}</span>
            <span>万人</span>
          </div>`;
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