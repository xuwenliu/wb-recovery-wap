import React, { useState, useEffect } from 'react';
import { Carousel, Flex, NavBar, Modal, List, Toast, Icon } from 'antd-mobile';
import { Fab } from '@material-ui/core';

import styles from './index.less';
import ziliao from '@/assets/img/ziliao.png';
import zipping from '@/assets/img/zipping.png';
import paike from '@/assets/img/paike.png';
import daka from '@/assets/img/daka.png';
import jilv from '@/assets/img/jilv.png';
import mubiao_view from '@/assets/img/mubiao_view.png';
import mubiao from '@/assets/img/mubiao.png';
import peixun from '@/assets/img/peixun.png';
import manyidu from '@/assets/img/manyidu.png';
import chakanbubiao from '@/assets/img/chakanbubiao.png';
import gongneng from '@/assets/img/gongneng.png';
import quxian from '@/assets/img/quxian.png';
import liangbiao from '@/assets/img/liangbiao.png';

import more from '@/assets/img/more.png';
import home from '@/assets/img/home.png';
import scan from '@/assets/img/scan.png';

import { getParentAllPatient, getTargetToday, getLongTimeTarget, getCarouselList } from './service';
import wxHelper from '@/utils/weixin';
import { scanSync } from '@/services/api';
import router from 'umi/router';

const tabs = [
  [
    {
      name: '基本资料',
      icon: ziliao,
      path: '/info/index',
    },
    {
      name: '检核自评',
      icon: zipping,
      path: '/scale/quick',
    },
    {
      name: '就诊记录',
      icon: jilv,
      path: '/home/visitingRecord',
    },
    {
      name: '查看目标',
      icon: mubiao_view,
      path: '/home/target',
    },
    {
      name: '查看排课',
      icon: paike,
      path: '/home/courseScheduling',
    },
  ],
  [
    {
      name: '训练打卡',
      icon: daka,
      path: '/home/punchCard',
    },
    {
      name: '干预培训',
      icon: peixun,
      path: '',
    },
    {
      name: '满意度调查',
      icon: manyidu,
      path: '',
    },
    {
      name: '测评记录',
      icon: liangbiao,
      path: '/scale/record',
    },
    {
      name: '生长曲线',
      icon: quxian,
      path: '/home/chart',
    },
  ],
  [
    {
      name: '更多功能',
      icon: gongneng,
      path: '',
    },
    {},
    {},
    {},
    {},
  ],
];

export default function Home({ location }) {
  const [carouselList, setCarouselList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [targetToday, setTargetToday] = useState();
  const [longTimeTarget, setLongTimeTarget] = useState('');
  const [visible, setVisible] = useState(false);
  const [patientList, setPatientList] = useState([]);

  const queryCarouselList = async () => {
    const res = await getCarouselList();
    if (res) {
      setCarouselList(res);
      setSelectedIndex(1); // 首次进入自动轮播，不设置则不会自动轮播，要手动操作一次才会轮播
    }
  };

  const queryParentAllPatient = async () => {
    let res = await getParentAllPatient();
    if (res) {
      setPatientList(res);
      const oldPatientId = localStorage.getItem('patientId');
      const hasPatientId = res.findIndex(item => item.id === oldPatientId) > -1;
      console.log('hasPatientId', hasPatientId);
      if (!hasPatientId) {
        if (res[0]?.id) {
          localStorage.setItem('patientId', res[0].id); // 默认设置第一个患者
        } else {
          Modal.alert('提示', '您还未添加患者，请点击【基本资料】去添加');
        }
      }
      if (res[0]?.id) {
        queryTargetToday(res[0].id);
      }
    }
  };

  const queryTargetToday = async patientId => {
    const res = await getTargetToday({
      mpPatientId: patientId,
    });
    if (res && res.length != 0) {
      setTargetToday(res[0]);
    }
    const sub = await getLongTimeTarget({
      mpPatientId: patientId,
    });
    if (sub && sub.length != 0) {
      setLongTimeTarget(sub);
    }
  };

  // 扫码成功后-提交到后台
  const scanPost = scanCode => {
    const patientId = localStorage.getItem('patientId');
    if (scanCode && patientId) {
      scanSync({
        code: scanCode,
        mpPatientId: patientId,
      }).then(res => {
        if (res) {
          Toast.success('操作成功');
        }
      });
    }
  };

  useEffect(() => {
    queryCarouselList();
    queryParentAllPatient();
  }, []);

  const handleScan = () => {
    wxHelper.call('scanQRCode', {
      needResult: 1,
      success: function(res) {
        scanPost(res.resultStr);
      },
    });
  };

  const handleChangePatient = item => {
    const oldPatientId = localStorage.getItem('patientId');
    if (!oldPatientId || oldPatientId !== item.id) {
      localStorage.setItem('patientId', item.id);
      queryTargetToday(item.id);
      setVisible(false);
      Toast.success('患者切换成功');
    }
  };

  const handleMore = message => {
    Modal.alert(null, message);
  };

  return (
    <>
      <NavBar
        className="nav-bar"
        mode="light"
        rightContent={[<img key="img" className="scan-icon" src={scan} onClick={handleScan} />]}
      >
        特殊儿童康复定点机构管理系统
      </NavBar>
      {patientList.length > 1 && (
        <Fab
          onClick={() => {
            setVisible(true);
          }}
          className="fab-btn"
          color="primary"
        >
          切换
        </Fab>
      )}

      <Modal
        popup
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        animationType="slide-up"
      >
        <List
          renderHeader={() => <div style={{ color: '#000', fontSize: 16 }}>切换患者</div>}
          className="popup-list"
        >
          {patientList?.map(item => (
            <List.Item
              key={item.id}
              onClick={() => handleChangePatient(item)}
              extra={
                localStorage.getItem('patientId') === item.id && (
                  <Icon type="check-circle" color="#83AC36" />
                )
              }
            >
              {item.name}
            </List.Item>
          ))}
        </List>
      </Modal>

      <div className={styles.outside}>
        {carouselList.length > 0 && (
          <Carousel
            selectedIndex={selectedIndex}
            cellSpacing={20}
            autoplay={true}
            infinite={true}
            autoplayInterval={5000}
          >
            {carouselList.map(item => (
              <a key={item.id}>
                <img
                  src={item.path}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
              </a>
            ))}
          </Carousel>
        )}

        {tabs.map((item, index) => (
          <Flex key={index} justify="start" className={styles.fast}>
            {item.map(sub => (
              <Flex.Item
                key={sub.name}
                onClick={() => {
                  router.push(sub.path);
                }}
                className={styles.item}
              >
                {sub.icon && (
                  <>
                    <img src={sub.icon} />
                    <p>{sub.name}</p>
                  </>
                )}
              </Flex.Item>
            ))}
          </Flex>
        ))}

        {/* 查看目标 */}
        {targetToday && (
          <div className={styles.card}>
            <div className={styles.title}>
              <div>查看目标</div>
              <span
                onClick={() => {
                  router.push({
                    pathname: '/home/target',
                  });
                }}
              >
                更多 <img src={more} />{' '}
              </span>
            </div>
            <Flex>
              <Flex.Item onClick={() => handleMore(longTimeTarget)}>
                <div className={styles.long}>
                  <div className={styles.top}>
                    <img src={chakanbubiao} />
                    长期目标:
                  </div>
                  <div className={styles.bottom}>{longTimeTarget || '暂无数据'}</div>
                </div>
              </Flex.Item>
              <Flex.Item onClick={() => handleMore(targetToday?.target)}>
                <div className={`${styles.long} ${styles.little}`}>
                  <div className={styles.top}>
                    <img src={chakanbubiao} />
                    短期目标:
                  </div>
                  <div className={styles.bottom}>{targetToday?.target || '暂无数据'}</div>
                </div>
              </Flex.Item>
            </Flex>

            <div className={styles.target}>
              <div>
                <img src={mubiao} />
                <span>当前目标：</span>
              </div>
              <div className="text-dots">
                内容：
                <p dangerouslySetInnerHTML={{ __html: targetToday?.content }}></p>
              </div>
              <div>时长：{targetToday?.duration}</div>
              <p className={styles.line}>
                点击查看今日培训指导视频
                <span
                  onClick={() => {
                    router.push({
                      pathname: '/home/punchCard',
                    });
                  }}
                >
                  打卡
                </span>
              </p>
            </div>
          </div>
        )}

        <div className={styles.card}>
          <div className={styles.title}>
            <div>干预培训</div>
            <span>
              更多 <img src={more} />{' '}
            </span>
          </div>

          <div className={styles.train}>
            <img src="http://placehold.it/600x300" />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.title}>
            <div>检核自评</div>
            <span>
              更多 <img src={more} />{' '}
            </span>
          </div>

          <div className={styles.train}>
            <img src="http://placehold.it/600x300" />
          </div>
        </div>
      </div>
    </>
  );
}
