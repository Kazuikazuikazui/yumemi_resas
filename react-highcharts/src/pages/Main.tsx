import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from '../components/Layout';
import Title from '../components/Title';
import PrefectureList from "../components/PrefectureList";
import Graph from "../components/Graph";
import axios from "axios";


const Main: React.FC = () => {
  
  const [prefectures, setPrefectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);

  const [prefPopulation, setPrefPopulation] = useState<{ 
    prefName: string;
    data: { year: number; value: number }[] 
  }[]>([]);

  useEffect(() => {
    // 都道府県の一覧を取得
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": process.env.REACT_APP_API_KEY},
      })
      .then((results) => {
        setPrefectures(results.data);
      })
      .catch((error) => {});
  }, []);

  // 都道府県を選択した時の処理
  const handleClick = (
    prefName: string,
    prefCode: number,
    click: boolean
  ) => {
    const click_prefPop = prefPopulation.slice();

    // 選択した時
    if (click) {
      if (click_prefPop.findIndex((value) => value.prefName === prefName) !== -1){
        return;
      }
      else{
        axios
        .get(
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" + String(prefCode),
          {
            headers: { "X-API-KEY": process.env.REACT_APP_API_KEY}
          }
        )
        .then((results) => {
          click_prefPop.push({
            prefName: prefName,
            data: results.data.result.data[0].data
          });
          
          setPrefPopulation(click_prefPop);
        })
        .catch((error) => {
          return;
        });
      }
    }
    // 選択を外した時
    else {
      const deleteIndex = click_prefPop.findIndex(
        (value) => value.prefName === prefName
      );
      if (deleteIndex === -1) return;
      click_prefPop.splice(deleteIndex, 1);
      setPrefPopulation(click_prefPop);
    }
  };

  return (
    <>
      <Helmet>
        <title>都道府県人工推移グラフ</title>
        <base href="/" ></base>
        <meta
            name="description"
            content="都道府県人工推移グラフです。"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>

      </Helmet>
      <Layout>
        <Title>都道府県選択</Title>
        {prefectures && (
          <PrefectureList 
            prefectures={prefectures.result}
            onChange={handleClick}
          />
        )}
        <Title>人口推移グラフ</Title>
        <Graph populationgraph={prefPopulation} />
      </Layout>
    </>
    
    
  );
};

export default Main;