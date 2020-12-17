import React, { useState, useEffect } from 'react';
import { Picker, NavBar, List, DatePicker, InputItem, Button, Toast, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';

import styles from './index.less';

import home from '@/assets/img/home.png';
import router from 'umi/router';

import { getParentSectionAll, savePatientGrowInfo, getPatientGrowInfo } from '@/pages/info/service';
import { getCommonRegion } from '@/services/common';
import { queryCommonAllEnums, getSingleEnums } from '@/utils/utils';

const familyEnv = props => {
  const { getFieldProps, setFieldsValue, getFieldsError, validateFields } = props.form;
  const patientId = localStorage.getItem('patientId');

  const [mainList, setMainList] = useState([]);
  const [familyTypeList, setFamilyTypeList] = useState([]);
  const [communityTypeList, setCommunityTypeList] = useState([]);
  const [educationTypeList, setEducationTypeList] = useState([]);
  const [languageTypeList, setLanguageTypeList] = useState([]);
  const [economicTypeList, setEconomicTypeList] = useState([]);
  const [hukouTypeList, setHukouTypeList] = useState([]);
  const [medicalInsuranceTypeList, setMedicalInsuranceTypeList] = useState([]);

  const queryPatientGrowInfo = async () => {
    const values = await getPatientGrowInfo({ patientId });
    const setValues = {
      communityType: values.communityType ? [values.communityType] : null,
      economicType: values.economicType ? [values.economicType] : null,
      educationType: values.educationType ? [values.educationType] : null,
      familyType: values.familyType ? [values.familyType] : null,
      hukouType: values.hukouType ? [values.hukouType] : null,
      languageType: values.languageType ? [values.languageType] : null,
      mainCarefulId: values.mainCarefulId ? [values.mainCarefulId] : null,
      medicalInsuranceType: values.medicalInsuranceType ? [values.medicalInsuranceType] : null,
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
    setMainList(res.filter(item => item.type === 12)); // 主要照顾者
  };

  const queryEnums = async () => {
    const newArr = await queryCommonAllEnums();
    setFamilyTypeList(getSingleEnums('FamilyType', newArr)); // 家庭类型
    setCommunityTypeList(getSingleEnums('CommunityType', newArr)); //居住社区
    setEducationTypeList(getSingleEnums('EducationType', newArr)); //教养方式
    setLanguageTypeList(getSingleEnums('LanguageType', newArr)); //语言环境
    setEconomicTypeList(getSingleEnums('FamilyEconomicType', newArr)); //家庭经济状况
    setHukouTypeList(getSingleEnums('HukouType', newArr)); //户口类别
    setMedicalInsuranceTypeList(getSingleEnums('MedicalInsuranceType', newArr)); //医疗保险情况
    if (patientId) {
      queryPatientGrowInfo();
    }
  };

  const onFinish = () => {
    validateFields(async (error, values) => {
      const postData = {
        communityType: values.communityType ? values.communityType[0] : null,
        economicType: values.economicType ? values.economicType[0] : null,
        educationType: values.educationType ? values.educationType[0] : null,
        familyType: values.familyType ? values.familyType[0] : null,
        hukouType: values.hukouType ? values.hukouType[0] : null,
        languageType: values.languageType ? values.languageType[0] : null,
        mainCarefulId: values.mainCarefulId ? values.mainCarefulId[0] : null,
        medicalInsuranceType: values.medicalInsuranceType ? values.medicalInsuranceType[0] : null,
        patientId,
      };
      const res = await savePatientGrowInfo(postData);
      if (res) {
        Toast.success('操作成功');
        queryPatientGrowInfo();
      }
    });
  };

  const onDismiss = field => {
    setFieldsValue({
      [field]: null,
    });
  };

  useEffect(() => {
    queryParentSectionAll();
    queryEnums();
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
        <div className={styles.title}>成长环境</div>
        <List className={`${styles.list} picker-list`}>
          <Picker
            data={mainList}
            cols={1}
            {...getFieldProps('mainCarefulId', {
              rules: [{ required: true, message: '请选择主要照顾者' }],
            })}
            onDismiss={() => onDismiss('mainCarefulId')}
          >
            <List.Item arrow="horizontal">主要照顾者</List.Item>
          </Picker>

          <Picker
            data={familyTypeList}
            cols={1}
            {...getFieldProps('familyType', {
              rules: [{ required: true, message: '请选择家庭模式' }],
            })}
            onDismiss={() => onDismiss('familyType')}
          >
            <List.Item arrow="horizontal">家庭模式</List.Item>
          </Picker>

          <Picker
            data={communityTypeList}
            cols={1}
            {...getFieldProps('communityType', {
              rules: [{ required: true, message: '请选择居住社区' }],
            })}
            onDismiss={() => onDismiss('communityType')}
          >
            <List.Item arrow="horizontal">居住社区</List.Item>
          </Picker>

          <Picker
            data={educationTypeList}
            cols={1}
            {...getFieldProps('educationType', {
              rules: [{ required: true, message: '请选择教养方式' }],
            })}
            onDismiss={() => onDismiss('educationType')}
          >
            <List.Item arrow="horizontal">教养方式</List.Item>
          </Picker>

          <Picker
            data={languageTypeList}
            cols={1}
            {...getFieldProps('languageType', {
              rules: [{ required: true, message: '请选择语言环境' }],
            })}
            onDismiss={() => onDismiss('languageType')}
          >
            <List.Item arrow="horizontal">语言环境</List.Item>
          </Picker>

          <Picker
            data={economicTypeList}
            cols={1}
            {...getFieldProps('economicType', {
              rules: [{ required: true, message: '请选择家庭经济状况' }],
            })}
            onDismiss={() => onDismiss('economicType')}
          >
            <List.Item arrow="horizontal">家庭经济状况</List.Item>
          </Picker>

          <Picker
            data={hukouTypeList}
            cols={1}
            {...getFieldProps('hukouType', {
              rules: [{ required: true, message: '请选择户口类别' }],
            })}
            onDismiss={() => onDismiss('hukouType')}
          >
            <List.Item arrow="horizontal">户口类别</List.Item>
          </Picker>

          <Picker
            data={medicalInsuranceTypeList}
            cols={1}
            {...getFieldProps('medicalInsuranceType', {
              rules: [{ required: true, message: '请选择享受医疗保险情况' }],
            })}
            onDismiss={() => onDismiss('medicalInsuranceType')}
          >
            <List.Item arrow="horizontal">享受医疗保险情况</List.Item>
          </Picker>
        </List>
        <Button style={{ marginTop: 20, color: '#fff' }} type="primary" onClick={onFinish}>
          提交
        </Button>
      </div>
    </>
  );
};

export default createForm()(familyEnv);
