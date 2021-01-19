import React, { useState, useEffect } from 'react';
import { Calendar, NavBar, Button, Badge, Steps, Icon } from 'antd-mobile';
import styles from './index.less';
import home from '@/assets/img/home.png';
import router from 'umi/router';
import { getArrangeClassInfo } from './service';
import moment from 'moment';
const { Step } = Steps;
import NoData from '@/components/NoData';

const now = new Date();

const extra = {
  // '2017/07/15': { info: <Badge dot></Badge> },
};
let allData = [];

export default function courseScheduling() {
  const [visible, setVisible] = useState(false);
  const patientId = localStorage.getItem('patientId');
  const [list, setList] = useState([]);
  const queryArrangeClassInfo = async () => {
    const res = await getArrangeClassInfo({
      mpPatientId: patientId,
    });
    if (res) {
      allData = res;
      res.map(item => {
        extra[moment(item.date).format('YYYY/MM/DD')] = {
          info: <Badge dot></Badge>,
        };

        Object.keys(extra).forEach(key => {
          const info = extra[key];
          const date = new Date(key);
          if (!Number.isNaN(+date) && !extra[+date]) {
            extra[+date] = info;
          }
        });
      });
    }
  };
  const onConfirm = date => {
    const selectDateStr = moment(date).format('YYYY-MM-DD');
    const list = allData.filter(item => item.dateStr === selectDateStr);
    console.log(list);
    setVisible(false);
    setList(list);
  };
  const onCancel = () => {
    setVisible(false);
  };

  const getDateExtra = date => {
    return extra[+date];
  };

  useEffect(() => {
    queryArrangeClassInfo();
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
        查看排课
      </NavBar>
      <div className={styles.outside}>
        {/* <div className={styles.title}>查看排课</div> */}
        <Button
          onClick={() => {
            setVisible(true);
          }}
          type="primary"
        >
          选择日期查看
        </Button>

        <Calendar
          className="calendar"
          type="one"
          defaultDate={now}
          minDate={new Date(+now - 5184000000)}
          visible={visible}
          onConfirm={onConfirm}
          onCancel={onCancel}
          getDateExtra={getDateExtra}
        />

        <div className={styles.title}>课程详情</div>
        {list.length === 0 && <NoData />}

        {list.length !== 0 && (
          <Steps size="small" current={3}>
            {list.map(item => (
              <Step
                key={item.id}
                icon={<div className={styles.circle}></div>}
                title={`${item.dateStr} ${item.timeName}`}
                description={
                  <ul className={styles.content}>
                    <li>课程名称：{item.className}</li>
                    <li>治疗师：{item.employeeName}</li>
                    <li>患者：{item.patientName}</li>
                    <li>教室：{item.siteName}</li>
                  </ul>
                }
              />
            ))}

          </Steps>
        )}
      </div>
    </>
  );
}
