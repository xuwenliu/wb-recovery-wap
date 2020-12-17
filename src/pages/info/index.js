import React, { useState, useEffect } from 'react';
import {
  Carousel,
  Flex,
  NavBar,
  List,
  Icon,
  InputItem,
  Toast,
  Picker,
  Button,
  ImagePicker,
} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './index.less';

import home from '@/assets/img/home.png';
import nan from '@/assets/img/nan.png';
import nv from '@/assets/img/nv.png';
import gerenxinxi from '@/assets/img/gerenxinxi.png';
import gerenshi from '@/assets/img/gerenshi.png';
import jiwangshi from '@/assets/img/jiwangshi.png';
import jiatingchengyuan from '@/assets/img/jiatingchengyuan.png';
import shengzhanghuanjing from '@/assets/img/shengzhanghuanjing.png';

import router from 'umi/router';
import { getParentSectionAll, saveSubject, getPatientSubjectInfo } from '@/pages/info/service';
import { fileUpload } from '@/services/common';

const listData = [
  { thumb: gerenxinxi, name: '个人信息', pathname: '/info/personalInfo' },
  { thumb: gerenshi, name: '个人史', pathname: '/info/personalHistory' },
  { thumb: jiwangshi, name: '既往史', pathname: '/info/pastHistory' },
  { thumb: jiatingchengyuan, name: '家庭成员', pathname: '/info/familyMember' },
  { thumb: shengzhanghuanjing, name: '成长环境', pathname: '/info/familyEnv' },
];

const Info = ({ location, form }) => {
  const patientId = localStorage.getItem('patientId');

  const { getFieldProps, setFieldsValue, setFields, getFieldsError, validateFields } = form;
  const [genderTypeList, setGenderTypeList] = useState([]);
  const [patientInfo, setPatientInfo] = useState();
  const [showAdd, setShowAdd] = useState(() => {
    return patientId ? false : true;
  });
  const [files, setFiles] = useState([]);
  // 获取下拉信息
  const queryParentSectionAll = async () => {
    const res = await getParentSectionAll();
    res?.map(item => {
      item.label = item.name;
      item.value = item.id;
      return item;
    });
    setGenderTypeList(res.filter(item => item.type === 3)); // 性别
  };

  const queryPatientSubjectInfo = async () => {
    const res = await getPatientSubjectInfo({
      patientId,
    });
    setPatientInfo(res);
  };
  useEffect(() => {
    if (patientId) {
      queryPatientSubjectInfo();
    }
    queryParentSectionAll();
  }, [patientId]);

  const onDismiss = field => {
    setFieldsValue({
      [field]: null,
    });
  };

  const handleAdd = () => {
    setShowAdd(true);
    setPatientInfo(null);
    setFieldsValue({
      name: '',
      gender: null,
    });
  };
  const handleBack = () => {
    if (patientId) {
      setShowAdd(false);
      queryPatientSubjectInfo();
    } else {
      router.goBack();
    }
  };
  const handleEdit = () => {
    setShowAdd(true);
    const setValue = {
      gender: [patientInfo.gender],
      name: patientInfo.name,
    };
    setFieldsValue(setValue);
    setFiles([{ url: patientInfo.avatarPath }]);
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
      if (!files[0]?.url) {
        Toast.info('请上传头像');
        return;
      }
      // 验证通过
      console.log(values);
      const postData = {
        id: patientInfo?.id,
        name: values.name,
        gender: values.gender[0],
        avatarPath: files[0].url,
      };
      const res = await saveSubject(postData);
      if (res) {
        Toast.success('操作成功');
        if (postData.id) {
          handleBack();
          queryPatientSubjectInfo();
        } else {
          router.goBack();
        }
      }
    });
  };

  const handleUpload = async (files, operationType, index) => {
    if (operationType === 'add') {
      const formData = new FormData();
      formData.append('file', files[0].file);
      const res = await fileUpload(formData);
      if (res) {
        files = files.map(item => {
          item.url = res;
          item.id = +new Date();
          return item;
        });
        setFiles(files);
      } else {
        Toast.error('上传失败');
      }
    }
    if (operationType === 'remove') {
      setFiles(files);
    }
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
        {!showAdd && (
          <>
            <div className={styles.avatar} onClick={handleEdit}>
              <div className={styles.avatarBox}>
                <img className={styles.gender} src={patientInfo?.genderName === '男' ? nan : nv} />
                <img className={styles.avatarImg} src={patientInfo?.avatarPath} />
              </div>
              <div className={styles.name}>{patientInfo?.name}</div>
            </div>
            <List className={styles.list}>
              {listData.map(item => (
                <List.Item
                  key={item.name}
                  thumb={item.thumb}
                  arrow="horizontal"
                  onClick={() => {
                    router.push(item.pathname);
                  }}
                >
                  {item.name}
                </List.Item>
              ))}
            </List>

            <Button style={{ marginTop: 20, color: '#fff' }} type="primary" onClick={handleAdd}>
              添加患者
            </Button>
          </>
        )}
        <div className={showAdd ? 'show' : 'hide'}>
          <div className={styles.title}>{patientInfo?.id ? '修改' : '添加'}患者</div>
          <List className={`${styles.list} picker-list`}>
            <InputItem
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
            </Picker>
            <List.Item>
              头像
              <ImagePicker
                length={1}
                files={files}
                selectable={files.length === 0}
                onChange={handleUpload}
                style={{ width: 100, float: 'right' }}
              />
            </List.Item>
          </List>
          <Button style={{ marginTop: 20, color: '#fff' }} type="primary" onClick={onFinish}>
            提交
          </Button>
          <Button style={{ marginTop: 20 }} onClick={handleBack}>
            取消
          </Button>
        </div>
      </div>
    </>
  );
};

export default createForm()(Info);
