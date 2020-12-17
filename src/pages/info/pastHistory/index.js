import React, { useState, useEffect } from 'react';
import { Picker, NavBar, List, DatePicker, InputItem, Button, Toast, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';

import styles from './index.less';

import home from '@/assets/img/home.png';
import router from 'umi/router';

import {
  getParentSectionAll,
  getAllVaccine,
  getAllBirthDangerInfo,
  getAllInfection,
  getAllTouching,
  getPregnancyInfo,
  savePatientPastHistory,
  getPatientPatientPastHistoryInfo,
} from '@/pages/info/service';
import { getCommonRegion } from '@/services/common';
import { queryCommonAllEnums, getSingleEnums } from '@/utils/utils';

const haveOrNoList = [
  {
    label: '没有',
    value: false,
  },
  {
    label: '有',
    value: true,
  },
];

const yesAndNoList = [
  {
    label: '否',
    value: false,
  },
  {
    label: '是',
    value: true,
  },
];

const pastHistory = props => {
  const { getFieldProps, setFieldsValue, getFieldsError, validateFields } = props.form;
  const patientId = localStorage.getItem('patientId');

  const [baseInfoDangerTypeList, setBaseInfoDangerTypeList] = useState([]); // 高危因素
  const [patientDiseaseList, setPatientDiseaseList] = useState([]); // 病症
  const [patientPastRecoveryConnectBosList, setPatientPastRecoveryConnectBosList] = useState([]); // 既往医疗康复情况
  const [patientAllergyConnectList, setPatientAllergyConnectList] = useState([]); // 过敏史
  const [pastList, setPastList] = useState([]); // 接触史
  const [cRanList, setCRanList] = useState([]); // 传染病
  const [pregnancyList, setPregnancyList] = useState([]); // 所有妊娠期疾病情况

  const [abnormalActionList, setAbnormalActionList] = useState([]); // 异常行为
  const [isBehaviorUnusual, setIsBehaviorUnusual] = useState(false);

  const queryPatientPatientPastHistoryInfo = async () => {
    const values = await getPatientPatientPastHistoryInfo({ patientId });
    const setValues = {
      abnormalInfoId: values.abnormalInfoId ? [values.abnormalInfoId] : null,
      allergyId: values.allergyId ? [String(values.allergyId)] : null,
      CHILDBIRTH_WAY: values.childbirthWayInfoId ? [values.childbirthWayInfoId] : null, //分娩方式
      BABY_DISEASE_INFO: values.diseaseInfoInfoId ? [values.diseaseInfoInfoId] : null, //疾病筛查情况
      HEARING_INFO: values.hearingInfoId ? [values.hearingInfoId] : null, // 听力筛查情况
      infectionId: values.infectionId ? [values.infectionId] : null,
      isBehaviorUnusual: values.isBehaviorUnusual === null ? null : [values.isBehaviorUnusual], //行为是否异常
      isCah: values.isCah === null ? null : [values.isCah],
      isCongenitalHypothyroidism:
        values.isCongenitalHypothyroidism === null ? null : [values.isCongenitalHypothyroidism],
      isG6PD: values.isG6PD === null ? null : [values.isG6PD],
      isPku: values.isPku === null ? null : [values.isPku],
      SPECIAL_ON_BIRTH: values.onBirthInfoId ? [values.onBirthInfoId] : null,
      pastRecoveryInfo: values.pastRecoveryInfo ? [values.pastRecoveryInfo] : null,
      pregnancyInfoId: values.pregnancyInfoId ? [values.pregnancyInfoId] : null,
      touchId: values.touchId ? [values.touchId] : null,
      patientId,
    };
    setIsBehaviorUnusual(values.isBehaviorUnusual ? true : false);
    setFieldsValue(setValues);
  };

  // 获取下拉信息
  const queryParentSectionAll = async () => {
    const res = await getParentSectionAll();
    res?.map(item => {
      item.label = item.name;
      item.value = item.id;
      return item;
    });

    setPatientDiseaseList(res.filter(item => item.type === 7)); // 病症
    setPatientAllergyConnectList(res.filter(item => item.type === 5)); // 过敏史
    setAbnormalActionList(res.filter(item => item.type === 9)); // 异常行为
  };

  const queryEnums = async () => {
    const newArr = await queryCommonAllEnums();
    const danger = getSingleEnums('BaseInfoDangerType', newArr);
    const res = await getAllBirthDangerInfo();
    danger.map(item => {
      item.children = [];
      res.map(sub => {
        if (item.code === sub.type) {
          sub.label = sub.info;
          sub.value = sub.id;
          item.children.push(sub);
        }
        return sub;
      });
      return item;
    });
    setBaseInfoDangerTypeList(danger); //高危因素类型
    setPatientPastRecoveryConnectBosList(getSingleEnums('PastRecoveryInfoType', newArr)); // 既往医疗康复情况类型
    if (patientId) {
      queryPatientPatientPastHistoryInfo();
    }
  };

  // 传染病
  const queryAllInfection = async () => {
    const res = await getAllInfection();
    const options = res.map(item => {
      item.label = item.name;
      item.value = item.id;
      return item;
    });
    setCRanList(options);
  };

  // 接触史
  const queryAllTouching = async () => {
    const res = await getAllTouching();
    const options = res.map(item => {
      item.label = item.name;
      item.value = item.id;
      return item;
    });
    setPastList(options);
  };

  // 所有妊娠期疾病情况
  const queryPregnancyInfo = async () => {
    const res = await getPregnancyInfo();
    const options = res.map(item => {
      item.label = item.name;
      item.value = item.id;
      return item;
    });
    setPregnancyList(options);
  };

  const onFinish = () => {
    validateFields(async (error, values) => {
      // 验证错误处理
      const errorObj = getFieldsError();
      console.log(errorObj);
      let errors = Object.values(errorObj).filter(item => item);
      let errorsName = [];
      errors.forEach(item => {
        item.forEach(sub => {
          errorsName.push(sub);
        });
      });
      if (errorsName.length > 0) {
        Toast.info(errorsName[0]);
        return;
      }
      console.log(values);
      // 验证通过
      const postData = {
        abnormalInfoId: values.abnormalInfoId ? values.abnormalInfoId[0] : null,
        allergyId: values.allergyId ? values.allergyId[0] : null,
        childbirthWayInfoId: values.CHILDBIRTH_WAY ? values.CHILDBIRTH_WAY[0] : null, //分娩方式
        diseaseInfoInfoId: values.BABY_DISEASE_INFO ? values.BABY_DISEASE_INFO[0] : null, //疾病筛查情况
        hearingInfoId: values.HEARING_INFO ? values.HEARING_INFO[0] : null, // 听力筛查情况
        infectionId: values.infectionId ? values.infectionId[0] : null,
        isBehaviorUnusual: values.isBehaviorUnusual ? values.isBehaviorUnusual[0] : null, //行为是否异常
        isCah: values.isCah[0],
        isCongenitalHypothyroidism: values.isCongenitalHypothyroidism[0],
        isG6PD: values.isG6PD[0],
        isPku: values.isPku[0],
        onBirthInfoId: values.SPECIAL_ON_BIRTH ? values.SPECIAL_ON_BIRTH[0] : null,
        pastRecoveryInfo: values.pastRecoveryInfo ? values.pastRecoveryInfo[0] : null,
        pregnancyInfoId: values.pregnancyInfoId ? values.pregnancyInfoId[0] : null,
        touchId: values.touchId ? values.touchId[0] : null,
        patientId,
      };
      const res = await savePatientPastHistory(postData);
      if (res) {
        Toast.success('操作成功');
        queryPatientPatientPastHistoryInfo();
      }
    });
  };

  const onDismiss = field => {
    setFieldsValue({
      [field]: [],
    });
  };

  useEffect(() => {
    queryParentSectionAll();
    queryEnums();
    queryAllInfection();
    queryAllTouching();
    queryPregnancyInfo();
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
        儿童康复系统
      </NavBar>
      <div className={styles.outside}>
        <div className={styles.title}>既往史</div>
        <List className={`${styles.list} picker-list`}>
          <Picker
            data={pregnancyList}
            cols={1}
            {...getFieldProps('pregnancyInfoId', {
              // rules: [{ required: true, message: '请选择母亲妊娠期疾病情况' }],
            })}
            onDismiss={() => onDismiss('pregnancyInfoId')}
          >
            <List.Item arrow="horizontal">母亲妊娠期疾病情况</List.Item>
          </Picker>
          {baseInfoDangerTypeList.map(item => (
            <Picker
              key={item.code}
              data={item.children}
              cols={1}
              {...getFieldProps(item.codeEn, {
                // rules: [{ required: true, message: `请选择${item.codeCn}` }],
              })}
              onDismiss={() => onDismiss(item.codeEn)}
            >
              <List.Item arrow="horizontal">{item.codeCn}</List.Item>
            </Picker>
          ))}
          {/* {patientDiseaseList.map(item => (
            <Picker
              key={item.id}
              data={haveOrNoList}
              cols={1}
              {...getFieldProps(item.name, {
                rules: [{ required: true, message: `请选择${item.name}` }],
              })}
              onDismiss={() => onDismiss(item.codeEn)}
            >
              <List.Item arrow="horizontal">{item.name}</List.Item>
            </Picker>
          ))} */}

          <Picker
            data={haveOrNoList}
            cols={1}
            {...getFieldProps('isCah', {
              rules: [{ required: true, message: `请选择先天性肾上腺皮质增生症` }],
            })}
            onDismiss={() => onDismiss('isCah')}
          >
            <List.Item arrow="horizontal">先天性肾上腺皮质增生症</List.Item>
          </Picker>

          <Picker
            data={haveOrNoList}
            cols={1}
            {...getFieldProps('isCongenitalHypothyroidism', {
              rules: [{ required: true, message: `请选择先天甲状腺功能降低` }],
            })}
            onDismiss={() => onDismiss('isCongenitalHypothyroidism')}
          >
            <List.Item arrow="horizontal">先天甲状腺功能降低</List.Item>
          </Picker>

          <Picker
            data={haveOrNoList}
            cols={1}
            {...getFieldProps('isG6PD', {
              rules: [{ required: true, message: `请选择G6PD缺乏症` }],
            })}
            onDismiss={() => onDismiss('isG6PD')}
          >
            <List.Item arrow="horizontal">G6PD缺乏症</List.Item>
          </Picker>

          <Picker
            data={haveOrNoList}
            cols={1}
            {...getFieldProps('isPku', {
              rules: [{ required: true, message: `请选择苯丙酮尿症` }],
            })}
            onDismiss={() => onDismiss('isPku')}
          >
            <List.Item arrow="horizontal">苯丙酮尿症</List.Item>
          </Picker>

          <Picker
            data={patientPastRecoveryConnectBosList}
            cols={1}
            {...getFieldProps('pastRecoveryInfo', {
              // rules: [{ required: true, message: '请选择既往医疗康复情况' }],
            })}
            onDismiss={() => onDismiss('pastRecoveryInfo')}
          >
            <List.Item arrow="horizontal">既往医疗康复情况</List.Item>
          </Picker>
          <Picker
            data={patientAllergyConnectList}
            cols={1}
            {...getFieldProps('allergyId', {
              // rules: [{ required: true, message: '请选择过敏史' }],
            })}
            onDismiss={() => onDismiss('allergyId')}
          >
            <List.Item arrow="horizontal">过敏史</List.Item>
          </Picker>
          <Picker
            data={pastList}
            cols={1}
            {...getFieldProps('touchId', {
              // rules: [{ required: true, message: '请选择接触史' }],
            })}
            onDismiss={() => onDismiss('touchId')}
          >
            <List.Item arrow="horizontal">接触史</List.Item>
          </Picker>
          <Picker
            data={cRanList}
            cols={1}
            {...getFieldProps('infectionId', {
              // rules: [{ required: true, message: '请选择传染病' }],
            })}
            onDismiss={() => onDismiss('infectionId')}
          >
            <List.Item arrow="horizontal">传染病</List.Item>
          </Picker>
          <Picker
            data={yesAndNoList}
            cols={1}
            {...getFieldProps('isBehaviorUnusual', {
              rules: [{ required: true, message: '请选择行为是否异常' }],
            })}
            onDismiss={() => onDismiss('isBehaviorUnusual')}
            onOk={value => {
              setIsBehaviorUnusual(value[0]);
            }}
          >
            <List.Item arrow="horizontal">行为是否异常</List.Item>
          </Picker>
          {isBehaviorUnusual && (
            <Picker
              data={abnormalActionList}
              cols={1}
              {...getFieldProps('abnormalInfoId', {
                rules: [isBehaviorUnusual && { required: true, message: '请选择异常行为' }],
              })}
              onDismiss={() => onDismiss('abnormalInfoId')}
            >
              <List.Item arrow="horizontal">异常行为</List.Item>
            </Picker>
          )}
        </List>
        <Button style={{ marginTop: 20, color: '#fff' }} type="primary" onClick={onFinish}>
          提交
        </Button>
      </div>
    </>
  );
};

export default createForm()(pastHistory);
