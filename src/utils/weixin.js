/*
 *
 * 封装wx提供的JSSDK
 */

import request from '@/utils/request';
import wx from 'weixin-js-sdk';

const JS_API = ['scanQRCode'];

const wxHelper = {
  setConfig() {
    const pageUrl = encodeURIComponent(location.href.split('#')[0]);
    return request(`/api/open/signature?&url=${pageUrl}`)
      .then(res => {
        return new Promise((resolve, reject) => {
          const { appId, timestamp, nonceStr, signature } = res;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名
            jsApiList: JS_API, // 必填，需要使用的JS接口列表
          });
          wx.error(res => {
            reject(res);
          });
          wx.ready(() => {
            resolve(wx);
          });
        });
      })
      .catch(ex => {
        throw ex;
      });
  },

  /**
   *
   * @param {*} method 将要调用的方法名
   * @param {*} configParam wx配置对象。
   */
  call(method, configParam) {
    return this.setConfig()
      .then(wx => {
        const fn = wx[method];
        if (!fn) {
          throw new Error(` Do not contains the method of ${method}`);
        }
        return fn.call(wx, configParam);
      })
      .catch(e => {
        throw e;
      });
  },
};

export default wxHelper;
