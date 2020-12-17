import React, { useState, useEffect } from 'react';
import { Picker, NavBar, List, DatePicker, InputItem, Button, Toast, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './index.less';
import home from '@/assets/img/home.png';
import router from 'umi/router';

import { getParentSectionAll } from '@/pages/info/service';
import { saveBasicInfo, getPatientBasicInfo } from '../service';
import { queryCommonAllEnums, getSingleEnums } from '@/utils/utils';
import areaData from '@/utils/area';
import moment from 'moment';

const PersonalInfo = props => {
  const patientId = localStorage.getItem('patientId');

  const { getFieldProps, setFieldsValue, getFieldsError, validateFields } = props.form;
  const [genderTypeList, setGenderTypeList] = useState([]);
  const [ethnicList, setEthnicList] = useState([]);

  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  const [birthPlaceTypeList, setBirthPlaceTypeList] = useState([]); // 出生地点
  const [pregnancyWeeksList, setPregnancyWeeksList] = useState([]); // 出生孕周
  const [birthWeightList, setBirthWeightList] = useState([]); // 出生体重

  const queryPatientBasicInfo = async () => {
    const values = await getPatientBasicInfo({ patientId });
    const setValues = {
      birthPlaceType: [values.birthPlaceType],
      birthTime: values.birthTime ? new Date(values.birthTime) : null,
      birthWeightId: [values.birthWeightId],
      oldArea: [String(values.provinceCode), String(values.cityCode), String(values.regionCode)],
      household: values.household,
      createDocumentTime: values.createDocumentTime
        ? new Date(values.createDocumentTime)
        : new Date(),
      ethnic: [values.ethnic],
      idCardCode: values.idCardCode,
      nowArea: [
        String(values.nowProvinceCode),
        String(values.nowCityCode),
        String(values.nowRegionCode),
      ],
      nowPlace: values.nowPlace,
      postCode: values.postCode,
      pregnancyWeeksId: [values.pregnancyWeeksId],
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
    setGenderTypeList(res.filter(item => item.type === 3)); // 性别
    setEthnicList(res.filter(item => item.type === 4)); // 4 民族
    setBirthWeightList(res.filter(item => item.type === 2)); // 出生体重
    setPregnancyWeeksList(res.filter(item => item.type === 1)); // 出生孕周
    if (patientId) {
      queryPatientBasicInfo();
    }
  };

  const queryEnums = async () => {
    const newArr = await queryCommonAllEnums();
    setBirthPlaceTypeList(getSingleEnums('BirthPlaceType', newArr)); //出生地点类型
  };

  const onFinish = () => {
    validateFields(async (error, values) => {
      // 验证错误处理
      const errorObj = getFieldsError();
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
      // 验证通过
      const postData = {
        birthPlaceType: values.birthPlaceType[0],
        birthTime: moment(values.birthTime).valueOf(),
        birthWeightId: values.birthWeightId[0],
        provinceCode: values.oldArea[0],
        cityCode: values.oldArea[1],
        regionCode: values.oldArea[2],
        household: values.household,
        createDocumentTime: moment(values.createDocumentTime).valueOf(),
        ethnic: values.ethnic[0],
        idCardCode: values.idCardCode,
        nowProvinceCode: values.nowArea[0],
        nowCityCode: values.nowArea[1],
        nowRegionCode: values.nowArea[2],
        nowPlace: values.nowPlace,
        postCode: values.postCode,
        pregnancyWeeksId: values.pregnancyWeeksId[0],
        patientId,
      };
      const res = await saveBasicInfo(postData);
      if (res) {
        Toast.success('操作成功');
        queryPatientBasicInfo();
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
        <div className={styles.title}>个人信息</div>
        <List className={`${styles.list} picker-list`}>
          {/* <InputItem
            {...getFieldProps('name', {
              rules: [{ required: true, message: '请输入姓名' }],
            })}
            placeholder="请输入姓名"
          >
            姓名
          </InputItem>
          <Picker
            data={genderTypeList}
            cols={1}
            {...getFieldProps('gender', {
              rules: [{ required: true, message: '请选择性别' }],
            })}
            onDismiss={() => onDismiss('gender')}
          >
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker> */}
          <Picker
            data={ethnicList}
            cols={1}
            {...getFieldProps('ethnic', {
              rules: [{ required: true, message: '请选择民族' }],
            })}
            onDismiss={() => onDismiss('ethnic')}
          >
            <List.Item arrow="horizontal">民族</List.Item>
          </Picker>
          <DatePicker
            mode="date"
            maxDate={new Date()}
            {...getFieldProps('birthTime', {
              rules: [{ required: true, message: '请选择出生日期' }],
            })}
            onDismiss={() => onDismiss('birthTime')}
          >
            <List.Item arrow="horizontal">出生日期</List.Item>
          </DatePicker>
          <DatePicker mode="date" {...getFieldProps('createDocumentTime')}>
            <List.Item arrow="horizontal">建档日期</List.Item>
          </DatePicker>
          {/* <InputItem
            type="phone"
            {...getFieldProps('mobile', {
              rules: [{ required: true, message: '请输入联系电话' }],
            })}
            placeholder="请输入联系电话"
          >
            联系电话
          </InputItem> */}
          <InputItem
            {...getFieldProps('idCardCode', {
              rules: [{ required: true, message: '请输入身份证号码' }],
            })}
            placeholder="请输入身份证号码"
          >
            身份证号码
          </InputItem>
          <Picker
            title="请选择户籍地"
            data={areaData}
            {...getFieldProps('oldArea', {
              rules: [{ required: true, message: '请选择户籍地' }],
            })}
          >
            <List.Item arrow="horizontal">户籍地</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('household', {
              rules: [{ required: true, message: '请输入详细户籍地址' }],
            })}
            placeholder="请输入详细户籍地址"
          ></InputItem>

          <Picker
            data={areaData}
            title="请选择现居地"
            {...getFieldProps('nowArea', {
              rules: [{ required: true, message: '请选择现居地' }],
            })}
          >
            <List.Item arrow="horizontal">现居地</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('nowPlace', {
              rules: [{ required: true, message: '请输入详细现居住地址' }],
            })}
            placeholder="请输入详细现居住地址"
          ></InputItem>
          <InputItem
            type="number"
            {...getFieldProps('postCode', {
              rules: [{ required: true, message: '请输入邮政编码' }],
            })}
            placeholder="请输入邮政编码"
          >
            邮政编码
          </InputItem>
          <Picker
            data={birthPlaceTypeList}
            cols={1}
            {...getFieldProps('birthPlaceType', {
              rules: [{ required: true, message: '请选择出生地点' }],
            })}
            onDismiss={() => onDismiss('birthPlaceType')}
          >
            <List.Item arrow="horizontal">出生地点</List.Item>
          </Picker>
          <Picker
            data={pregnancyWeeksList}
            cols={1}
            {...getFieldProps('pregnancyWeeksId', {
              rules: [{ required: true, message: '请选择出生孕周' }],
            })}
            onDismiss={() => onDismiss('pregnancyWeeksId')}
          >
            <List.Item arrow="horizontal">出生孕周</List.Item>
          </Picker>
          <Picker
            data={birthWeightList}
            cols={1}
            {...getFieldProps('birthWeightId', {
              rules: [{ required: true, message: '请选择出生体重' }],
            })}
            onDismiss={() => onDismiss('birthWeightId')}
          >
            <List.Item arrow="horizontal">出生体重</List.Item>
          </Picker>
        </List>
        <Button style={{ marginTop: 20, color: '#fff' }} type="primary" onClick={onFinish}>
          提交
        </Button>
      </div>
    </>
  );
};

export default createForm()(PersonalInfo);
