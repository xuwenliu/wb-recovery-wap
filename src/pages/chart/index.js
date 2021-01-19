import React, { useState, useEffect } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import styles from './index.less';

import more from '@/assets/img/more.png';
import home from '@/assets/img/home.png';

import router from 'umi/router';
import { getPatientSubjectInfo } from '@/pages/info/service';
import { getGraphData } from '@/pages/home/service';
import ChartsPer from '@/components/ChartsPer';
import ChartsStand from '@/components/ChartsStand';

export default function Chart() {
  const patientId = localStorage.getItem('patientId');
  const [graphData, setGraphData] = useState();
  const [genderName, setGenderName] = useState('女');

  const queryGraphData = async () => {
    const gen = await getPatientSubjectInfo({ patientId });
    if (gen) {
      setGenderName(gen.genderName);
    }
    const res = await getGraphData({ mpPatientId: patientId });
    if (res) {
      setGraphData(res);
    }
  };
  useEffect(() => {
    if (patientId) {
      queryGraphData();
    }
  }, []);

  return (
    <>
      <NavBar
        className="nav-bar"
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => router.goBack()}
        rightContent={
          <img
            onClick={() => {
              router.replace('/');
            }}
            className="home-icon"
            src={home}
          />
        }
      >
        体格检查曲线图
      </NavBar>

      <div className={styles.outside}>
        <div className={styles.card}>
          <div className={styles.title}>
            <div>百分位曲线图</div>
          </div>
          <ChartsPer gender={genderName} graphData={graphData} />

          <div className={styles.title}>
            <div>标准差单位曲线图</div>
          </div>
          <ChartsStand gender={genderName} graphData={graphData} />
        </div>
      </div>
    </>
  );
}
