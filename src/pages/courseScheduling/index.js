import React, { useState } from 'react';
import { Calendar, NavBar, Button, Badge, Steps, Icon } from 'antd-mobile';
import styles from './index.less';
import home from '@/assets/img/home.png';
import router from 'umi/router';

const { Step } = Steps;
const now = new Date();
const extra = {
  '2017/07/15': { info: <Badge dot></Badge> },
};

extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = {
  info: <Badge dot></Badge>,
};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = {
  info: <Badge dot></Badge>,
};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = {
  info: <Badge dot></Badge>,
};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = {
  info: <Badge dot></Badge>,
};

Object.keys(extra).forEach(key => {
  const info = extra[key];
  const date = new Date(key);
  if (!Number.isNaN(+date) && !extra[+date]) {
    extra[+date] = info;
  }
});

export default function courseScheduling() {
  const [visible, setVisible] = useState(false);

  const onConfirm = date => {
    console.log(date);
    setVisible(false);
  };
  const onCancel = () => {
    setVisible(false);
  };

  const getDateExtra = date => {
    return extra[+date];
  };

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
        儿童康复系统
      </NavBar>
      <div className={styles.outside}>
        <div className={styles.title}>查看排课</div>
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
          defaultDate={new Date(+now - 5184000000)}
          minDate={new Date(+now - 5184000000)}
          visible={visible}
          onConfirm={onConfirm}
          onCancel={onCancel}
          getDateExtra={getDateExtra}
        />

        <div className={styles.title}>课程详情</div>

        <div className={styles.noContent}>暂无课程内容</div>
        <Steps size="small" current={3}>
          <Step
            icon={<div className={styles.circle}></div>}
            title="2020-11-11"
            description={
              <ul className={styles.content}>
                <li>课程名称：运动治疗师</li>
                <li>治疗师：小王老师</li>
                <li>患者：吴子健</li>
                <li>教室：3楼A001室</li>
              </ul>
            }
          />
          <Step
            icon={<div className={styles.circle}></div>}
            title="2020-11-12"
            description={
              <ul className={styles.content}>
                <li>课程名称：运动治疗师</li>
                <li>治疗师：小王老师</li>
                <li>患者：吴子健</li>
                <li>教室：3楼A001室</li>
              </ul>
            }
          />
          <Step
            icon={<div className={styles.circle}></div>}
            title="2020-11-13"
            description={
              <ul className={styles.content}>
                <li>课程名称：运动治疗师</li>
                <li>治疗师：小王老师</li>
                <li>患者：吴子健</li>
                <li>教室：3楼A001室</li>
              </ul>
            }
          />
        </Steps>
      </div>
    </>
  );
}
