import React, { useState, useEffect } from 'react';
import {
  Picker,
  NavBar,
  List,
  DatePicker,
  InputItem,
  Button,
  Toast,
  Icon,
  Modal,
} from 'antd-mobile';
import { createForm } from 'rc-form';
import router from 'umi/router';

import styles from './index.less';
import home from '@/assets/img/home.png';
import mother from '@/assets/img/mother_avatar.png';
import father from '@/assets/img/father_avatar.png';
import main from '@/assets/img/main_avatar.png';
import phone from '@/assets/img/phone.png';

const ICON_AVATAR = {
  1: father,
  2: mother,
  3: main,
};
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

import {
  getParentSectionAll,
  getAllFamilyMember,
  addFamilyMemberInfo,
  delFamilyMemberInfo,
  getProfessionTree,
} from '@/pages/info/service';
import { getCommonRegion } from '@/services/common';
import { queryCommonAllEnums, getSingleEnums } from '@/utils/utils';

const familyMember = props => {
  const patientId = localStorage.getItem('patientId');
  const initMemberList = [
    {
      name: '',
      birthYear: null,
      educationDegreeId: null,
      profession: null,
      mainCarefulId: null,
      mobile: '',
      patientId,
      type: 1,
    },
    {
      name: '',
      birthYear: null,
      educationDegreeId: null,
      profession: null,
      mainCarefulId: null,
      mobile: '',
      patientId,
      type: 2,
    },
    {
      name: '',
      birthYear: null,
      educationDegreeId: null,
      profession: null,
      mainCarefulId: null,
      mobile: '',
      patientId,
      type: 3,
    },
  ];
  const { getFieldProps, setFieldsValue, getFieldsError, validateFields } = props.form;
  const [showEdit, setShowEdit] = useState(false);
  const [type, setType] = useState(0);
  const [clicked, setClicked] = useState();
  const [professionList, setProfessionList] = useState([]); // 职业
  const [educationList, setEducationList] = useState([]); // 文化程度
  const [memberList, setMemberList] = useState(initMemberList); // 家庭成员
  const [mainList, setMainList] = useState([]);

  const queryAllFamilyMember = async () => {
    const res = await getAllFamilyMember({ patientId });
    if (res) {
      if (res.length != 0) {
        const newList = initMemberList.map(item => {
          res.forEach(sub => {
            if (item.type === sub.type) {
              item = sub;
            }
          });
          return item;
        });
        setMemberList(newList);
      } else {
        setMemberList(initMemberList);
      }
    }
  };

  const queryParentSectionAll = async () => {
    const res = await getParentSectionAll();
    res?.map(item => {
      item.label = item.name;
      item.value = item.id;
      return item;
    });
    setEducationList(res.filter(item => item.type === 16)); // 文化程度
    setMainList(res.filter(item => item.type === 12)); // 主要照顾者

    if (patientId) {
      queryAllFamilyMember();
    }
  };

  const queryProfessionTree = async () => {
    const res = await getProfessionTree();
    const deal = data => {
      return data.map(item => {
        item.label = item.name;
        item.value = item.id;
        if (item.children) {
          deal(item.children);
        }
        return item;
      });
    };
    if (res) {
      setProfessionList(deal(res));
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
      console.log(values);
      // 修改时用id
      let id = null;
      memberList.forEach(item => {
        if (item.type === type) {
          id = item.id;
        }
      });
      // 验证通过
      const postData = {
        id,
        birthYear: new Date(values.birthYear).getFullYear(),
        educationDegreeId: values.educationDegreeId[0],
        mainCarefulId: values.mainCarefulId ? values.mainCarefulId[0] : null,
        mobile: values.mobile.replace(/\s*/g, ''),
        name: values.name,
        professionLargeId: values.profession[0],
        professionMediumId: values.profession[1],
        professionSmallId: values.profession[2],
        patientId,
        type,
      };

      const res = await addFamilyMemberInfo(postData);
      if (res) {
        Toast.success('操作成功');
        setShowEdit(false);
        queryAllFamilyMember();
      }
    });
  };
  const onRemove = async () => {
    let id = '';
    memberList.forEach(item => {
      if (item.type === type) {
        id = item.id;
      }
    });
    if (id) {
      Modal.alert('删除资料', '您确定删除该资料吗？', [
        { text: '取消', onPress: () => {} },
        {
          text: '确定',
          onPress: async () => {
            const res = await delFamilyMemberInfo({
              id,
            });
            if (res) {
              Toast.success('操作成功');
              setShowEdit(false);
              queryAllFamilyMember();
            }
          },
        },
      ]);
    } else {
      Toast.fail('暂无资料，无法删除');
    }
  };

  const onCancel = () => {
    setShowEdit(false);
    setType(0);
  };

  const onDismiss = field => {
    setFieldsValue({
      [field]: null,
    });
  };

  const onMainChange = val => {
    const obj = {
      父亲: 1,
      母亲: 2,
    };
    let mainName = '';
    mainList.forEach(item => {
      if (item.id === val[0]) {
        mainName = item.name;
      }
    });
    let values = null;
    memberList.forEach(item => {
      if (item.type === obj[mainName]) {
        values = item;
      }
    });
    if (values) {
      const setValue = {
        birthYear: values.birthYear ? new Date(values.birthYear, 1, 1, 0, 0, 0) : null,
        educationDegreeId: [values.educationDegreeId],
        profession: [values.professionLargeId, values.professionMediumId, values.professionSmallId],
        mainCarefulId: val,
        mobile: values.mobile,
        name: values.name,
        type: 3,
      };
      setFieldsValue(setValue);
    } else {
      setFieldsValue({
        name: '',
        birthYear: null,
        educationDegreeId: null,
        profession: null,
        mainCarefulId: null,
        mobile: '',
        type: 3,
      });
    }
  };

  const openEdit = values => {
    setType(values.type);
    setShowEdit(true);
    const setValue = {
      birthYear: values.birthYear ? new Date(values.birthYear, 1, 1, 0, 0, 0) : null,
      educationDegreeId: values.educationDegreeId ? [values.educationDegreeId] : null,
      profession: values.professionLargeId
        ? [values.professionLargeId, values.professionMediumId, values.professionSmallId]
        : null,
      mainCarefulId: values.mainCarefulId ? [values.mainCarefulId] : null,
      mobile: values.mobile,
      name: values.name,
      patientId,
      type,
    };
    setFieldsValue(setValue);
  };

  useEffect(() => {
    queryProfessionTree();
    queryParentSectionAll();
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
        家庭成员
      </NavBar>

      <div className={styles.outside}>
        {!showEdit && (
          <>
            {memberList.map(item => {
              return (
                <div key={item.type} onClick={() => openEdit(item)} className={styles.familyCard}>
                  <div className={styles.left}>
                    <h2>
                      {item.type === 1 && '父亲资料'}
                      {item.type === 2 && '母亲资料'}
                      {item.type === 3 && '主要照顾者'}
                    </h2>
                    <img src={ICON_AVATAR[item.type]} />
                    <p>年龄：{item.age}岁</p>
                  </div>
                  <div className={styles.right}>
                    <div>姓名：{item.name}</div>
                    <div>
                      职业：{item.professionLargeName}-{item.professionMediumName}
                    </div>
                    <div>文化程度：{item.educationDegreeName}</div>
                    <div>
                      <img className={styles.phone} src={phone} /> {item.mobile}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <div className={showEdit ? 'show' : 'hide'}>
          <List className={`${styles.list} picker-list`}>
            <div className={type === 3 ? 'show' : 'hide'}>
              <Picker
                data={mainList}
                cols={1}
                {...getFieldProps('mainCarefulId', {
                  rules: [type === 3 && { required: true, message: '请选择主要照顾者' }],
                })}
                onDismiss={() => onDismiss('mainCarefulId')}
                onOk={onMainChange}
              >
                <List.Item arrow="horizontal">主要照顾者</List.Item>
              </Picker>
            </div>

            <InputItem
              {...getFieldProps('name', {
                rules: [{ required: true, message: '请输入姓名' }],
              })}
              placeholder="请输入姓名"
            >
              {type === 1 && '父亲姓名'}
              {type === 2 && '母亲姓名'}
              {type === 3 && '姓名'}
            </InputItem>

            <InputItem
              type="phone"
              {...getFieldProps('mobile', {
                rules: [{ required: true, message: '请输入联系电话' }],
              })}
              placeholder="请输入联系电话"
            >
              联系电话
            </InputItem>
            <DatePicker
              mode="year"
              format={date => date.getFullYear()}
              minDate={new Date(1970, 1, 1, 0, 0, 0)}
              maxDate={new Date()}
              {...getFieldProps('birthYear', {
                rules: [{ required: true, message: '请选择出生年份' }],
              })}
              onDismiss={() => onDismiss('birthYear')}
            >
              <List.Item arrow="horizontal">出生年份</List.Item>
            </DatePicker>

            <Picker
              data={professionList}
              cols={2}
              {...getFieldProps('profession', {
                rules: [{ required: true, message: '请选择职业' }],
              })}
              onDismiss={() => onDismiss('profession')}
            >
              <List.Item arrow="horizontal">职业</List.Item>
            </Picker>

            <Picker
              data={educationList}
              cols={1}
              {...getFieldProps('educationDegreeId', {
                rules: [{ required: true, message: '请选择教育程度' }],
              })}
              onDismiss={() => onDismiss('educationDegreeId')}
            >
              <List.Item arrow="horizontal">教育程度</List.Item>
            </Picker>
          </List>

          <Button style={{ marginTop: 20, color: '#fff' }} type="primary" onClick={onFinish}>
            保存
          </Button>
          <Button style={{ marginTop: 20, color: '#fff' }} type="warning" onClick={onRemove}>
            删除
          </Button>
          <Button style={{ marginTop: 20, color: '#000' }} onClick={onCancel}>
            取消
          </Button>
        </div>
      </div>
    </>
  );
};

export default createForm()(familyMember);
