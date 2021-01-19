import React, { useState, useEffect } from 'react';
import {
  List,
  DatePicker,
  NavBar,
  Icon,
  Picker,
  ImagePicker,
  Toast,
  Button,
  InputItem,
} from 'antd-mobile';
import styles from './index.less';
import { createForm } from 'rc-form';

import more from '@/assets/img/more.png';
import home from '@/assets/img/home.png';
import moment from 'moment';
import router from 'umi/router';

import NoData from '@/components/NoData';

import { fileUpload } from '@/services/common';
import { saveSign, getSignList } from './service';

const size = 5;
const punchCard = props => {
  const patientId = localStorage.getItem('patientId');

  const [files, setFiles] = useState([]);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const { getFieldProps, setFieldsValue, getFieldsError, validateFields } = props.form;

  const querySignList = async () => {
    const res = await getSignList({
      body: patientId,
      page: 0,
      size,
    });
    if (res) {
      setList(res.data);
      setHasMore(size < res.total);
    }
  };

  useEffect(() => {
    querySignList();
  }, []);
  const handleUpload = async (files, operationType, index) => {
    if (operationType === 'add') {
      const formData = new FormData();
      formData.append('file', files[0].file);
      const res = await fileUpload(formData);
      if (res) {
        files = files.map(item => {
          item.url = res.url;
          item.name = res.name;
          item.id = +new Date();
          return item;
        });
        setFiles(files);
      } else {
        Toast.fail('上传失败');
      }
    }
    if (operationType === 'remove') {
      setFiles(files);
    }
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
        Toast.info('请上传图片');
        return;
      }
      // 验证通过
      const postData = {
        content: values.content,
        imgPath: files[0]?.url,
        mpPatientId: patientId,
        time: moment(values.time).valueOf(),
      };

      const res = await saveSign(postData);
      if (res) {
        Toast.success('操作成功');
        querySignList();
      }
    });
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
        训练打卡
      </NavBar>

      <div className={styles.outside}>
        <div className={styles.card}>
          <div className={styles.title}>
            <div>今日培训</div>
            <span>
              更多 <img src={more} />
            </span>
          </div>
          <div className={styles.train}>
            <img src="http://placehold.it/600x300" />
          </div>
        </div>

        <List className={`${styles.list} picker-list`}>
          <InputItem
            {...getFieldProps('content', {
              rules: [{ required: true, message: '请输入打卡内容' }],
            })}
            placeholder="请输入打卡内容"
          >
            <span className="must">*</span>打卡内容
          </InputItem>
          <DatePicker
            mode="datetime"
            title="选择时间"
            {...getFieldProps('time', {
              rules: [{ required: true, message: '请选择打卡时间' }],
            })}
          >
            <List.Item arrow="horizontal">
              <span className="must">*</span>打卡时间
            </List.Item>
          </DatePicker>
          <List.Item>
            <span className="must">*</span>上传图片
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
          上传打卡
        </Button>

        <div className={styles.card}>
          <div className={styles.title}>
            <div>打卡记录</div>
            {hasMore && (
              <span
                onClick={() => {
                  router.push('/home/punchCard/list');
                }}
              >
                更多 <img src={more} />
              </span>
            )}
          </div>
          {list.length === 0 && <NoData />}
          {list.length !== 0 && (
            <List>
              {list.map(item => (
                <List.Item key={item.id} multipleLine>
                  {moment(item.time).format('YYYY-MM-DD HH:mm')}{' '}
                  <List.Item.Brief>{item.content}</List.Item.Brief>
                </List.Item>
              ))}
            </List>
          )}
        </div>
      </div>
    </>
  );
};

export default createForm()(punchCard);
