import React, { useState, useEffect } from 'react';
import { Picker, NavBar, List, DatePicker, InputItem, Button, Toast, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';

import styles from './index.less';

import home from '@/assets/img/home.png';
import router from 'umi/router';

import { getParentSectionAll, getAllVaccine } from '@/pages/info/service';
import { getCommonRegion } from '@/services/common';
import { queryCommonAllEnums, getSingleEnums } from '@/utils/utils';
import { savePersonHistory, getPatientPersonHistoryInfo } from '../service';
const isFeverList = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];
const personalHistory = props => {
  const { getFieldProps, setFieldsValue, getFieldsError, validateFields } = props.form;
  const patientId = localStorage.getItem('patientId');

  const [canTimeList, setCanTimeList] = useState([]); // 成长时间
  const [supportTypeList, setSupportTypeList] = useState([]); // 喂养方式
  const [allVaccineList, setAllVaccineList] = useState([]); // 疫苗
  const [patientFamilyDiseaseHistoryList, setPatientFamilyDiseaseHistoryList] = useState([]); // 家族史
  const [familyHistoryList, setFamilyHistoryList] = useState([]); // 家族情况
  const [familyInfectiousDiseaseList, setFamilyInfectiousDiseaseList] = useState([]); // 传染病

  const queryPatientPersonHistoryInfo = async () => {
    const values = await getPatientPersonHistoryInfo({ patientId });
    const setValues = {
      caTalkTimeId: [values.caTalkTimeId],
      canClimbTimeId: [values.caTalkTimeId],
      canGainGroundTimeId: [values.canGainGroundTimeId],
      canLaughTimeId: [values.canLaughTimeId],
      canSitTimeId: [values.canSitTimeId],
      canTurnOverTimeId: [values.canTurnOverTimeId],
      canWalkTimeId: [values.canWalkTimeId],
      familyDiseaseHistoryId: [values.familyDiseaseHistoryId],
      familyInfectiousDiseaseType: [values.familyInfectiousDiseaseType],
      familyInfoType: [values.familyInfoType],
      isFever: [values.isFever],
      supportTypeId: [values.supportTypeId],
      vaccineId: [values.vaccineId],
      patientId,
    };
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
    setPatientFamilyDiseaseHistoryList(res.filter(item => item.type === 6)); // 家族史
    setCanTimeList(res.filter(item => item.type === 11)); // 成长时间
    setSupportTypeList(res.filter(item => item.type === 10)); // 喂养方式
    if (patientId) {
      queryPatientPersonHistoryInfo();
    }
  };

  const queryEnums = async () => {
    const newArr = await queryCommonAllEnums();
    setFamilyInfectiousDiseaseList(getSingleEnums('FamilyInfectiousDiseaseType', newArr)); //传染病
    setFamilyHistoryList(getSingleEnums('FamilyInfoType', newArr)); // 家族史
  };

  // 所有疫苗
  const queryAllVaccine = async () => {
    const res = await getAllVaccine();
    const options = res?.map(item => {
      item.label = item.name;
      item.value = item.id;
      return item;
    });
    setAllVaccineList(options);
  };

  const onFinish = () => {
    validateFields(async (error, values) => {
      console.log(values);
      // 验证通过
      const postData = {
        caTalkTimeId: values.caTalkTimeId[0],
        canClimbTimeId: values.caTalkTimeId[0],
        canGainGroundTimeId: values.canGainGroundTimeId[0],
        canLaughTimeId: values.canLaughTimeId[0],
        canSitTimeId: values.canSitTimeId[0],
        canTurnOverTimeId: values.canTurnOverTimeId[0],
        canWalkTimeId: values.canWalkTimeId[0],
        familyDiseaseHistoryId: values.familyDiseaseHistoryId[0],
        familyInfectiousDiseaseType: values.familyInfectiousDiseaseType[0],
        familyInfoType: values.familyInfoType[0],
        isFever: values.isFever[0],
        supportTypeId: values.supportTypeId[0],
        vaccineId: values.vaccineId[0],
        patientId,
      };
      const res = await savePersonHistory(postData);
      if (res) {
        Toast.success('操作成功');
        queryPatientPersonHistoryInfo();
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
    queryAllVaccine();
    setFieldsValue({
      createDocumentTime: new Date(),
    });
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
        <div className={styles.title}>个人史</div>
        <List className={`${styles.list} picker-list`}>
          <Picker
            data={supportTypeList}
            cols={1}
            {...getFieldProps('supportTypeId')}
            onDismiss={() => onDismiss('supportTypeId')}
          >
            <List.Item arrow="horizontal">喂养方式</List.Item>
          </Picker>
          <Picker
            data={isFeverList}
            cols={1}
            {...getFieldProps('isFever')}
            onDismiss={() => onDismiss('isFever')}
          >
            <List.Item arrow="horizontal">高热抽搐</List.Item>
          </Picker>
          <Picker
            data={canTimeList}
            cols={1}
            {...getFieldProps('canGainGroundTimeId')}
            onDismiss={() => onDismiss('canGainGroundTimeId')}
          >
            <List.Item arrow="horizontal">会抬头时间</List.Item>
          </Picker>
          <Picker
            data={canTimeList}
            cols={1}
            {...getFieldProps('canTurnOverTimeId')}
            onDismiss={() => onDismiss('canTurnOverTimeId')}
          >
            <List.Item arrow="horizontal">会翻身时间</List.Item>
          </Picker>
          <Picker
            data={canTimeList}
            cols={1}
            {...getFieldProps('canClimbTimeId')}
            onDismiss={() => onDismiss('canClimbTimeId')}
          >
            <List.Item arrow="horizontal">会爬行时间</List.Item>
          </Picker>
          <Picker
            data={canTimeList}
            cols={1}
            {...getFieldProps('canLaughTimeId')}
            onDismiss={() => onDismiss('canLaughTimeId')}
          >
            <List.Item arrow="horizontal">会笑时间</List.Item>
          </Picker>
          <Picker
            data={canTimeList}
            cols={1}
            {...getFieldProps('canSitTimeId')}
            onDismiss={() => onDismiss('canSitTimeId')}
          >
            <List.Item arrow="horizontal">会坐时间</List.Item>
          </Picker>
          <Picker
            data={canTimeList}
            cols={1}
            {...getFieldProps('canWalkTimeId')}
            onDismiss={() => onDismiss('canWalkTimeId')}
          >
            <List.Item arrow="horizontal">会走时间</List.Item>
          </Picker>
          <Picker
            data={canTimeList}
            cols={1}
            {...getFieldProps('caTalkTimeId')}
            onDismiss={() => onDismiss('caTalkTimeId')}
          >
            <List.Item arrow="horizontal">会说话时间</List.Item>
          </Picker>
          <Picker
            data={allVaccineList}
            cols={1}
            {...getFieldProps('vaccineId')}
            onDismiss={() => onDismiss('vaccineId')}
          >
            <List.Item arrow="horizontal">疫苗接种</List.Item>
          </Picker>
          <Picker
            data={patientFamilyDiseaseHistoryList}
            cols={1}
            {...getFieldProps('familyDiseaseHistoryId')}
            onDismiss={() => onDismiss('familyDiseaseHistoryId')}
          >
            <List.Item arrow="horizontal">家族病史</List.Item>
          </Picker>
          <Picker
            data={familyHistoryList}
            cols={1}
            {...getFieldProps('familyInfoType')}
            onDismiss={() => onDismiss('familyInfoType')}
          >
            <List.Item arrow="horizontal">家族情况</List.Item>
          </Picker>
          <Picker
            data={familyInfectiousDiseaseList}
            cols={1}
            {...getFieldProps('familyInfectiousDiseaseType')}
            onDismiss={() => onDismiss('familyInfectiousDiseaseType')}
          >
            <List.Item arrow="horizontal">家族传染病</List.Item>
          </Picker>
        </List>
        <Button style={{ marginTop: 20, color: '#fff' }} type="primary" onClick={onFinish}>
          提交
        </Button>
      </div>
    </>
  );
};

export default createForm()(personalHistory);
