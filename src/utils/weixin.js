/*
 *
 * 封装wx提供的JSSDK
 */

import request from '@/utils/request';

const SDK_URL = `${window.location.protocol}//res.wx.qq.com/open/js/jweixin-1.6.0.js`;
const SDK_URL_1 = `${window.location.protocol}//res2.wx.qq.com/open/js/jweixin-1.6.0.js`;

const JS_API = [
  'scanQRCode',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
  'getLocalImgData',
  'startRecord',
  'stopRecord',
  'getNetworkType',
  'openLocation',
  'getLocation',
];

const wxHelper = {
  _init() {
    if (this.initEd) {
      return Promise.resolve(window.wx);
    }

    return new Promise((resolve, _reject) => {
      let script = document.createElement('script');

      // other version js loaded;
      delete window.wx;
      delete window.jWeixin;

      script.onload = () => {
        this.initEd = true;
        resolve(window.wx);
      };

      script.onerror = () => {
        if (script.src === SDK_URL) {
          script.src = SDK_URL_1;
        } else {
          _reject();
        }
      };

      script.src = SDK_URL;
      document.body.appendChild(script);
      script = null;
    });
  },

  setConfig(wx, configParam) {
    const pageUrl = encodeURIComponent(location.href);
    return request(`/api/weixinTicket?&reqUrl=${pageUrl}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('获取信息失败...');
        }
        return res.json();
      })
      .then(res => {
        const { code, data: result, msg } = res;
        if (code - 0 !== 200) {
          return Promise.reject({ message: msg });
        }
        return new Promise((resolve, reject) => {
          const { appId, timestamp, nonceStr, signature } = result;
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
   * @param  {...any} args
   */
  call(method, configParam, ...args) {
    return this._init()
      .then(wx => {
        if (!wx) {
          throw new Error('wx jssdk unload');
        }
        return this.setConfig(wx, configParam);
      })
      .then(wx => {
        const fn = wx[method];
        if (!fn) {
          throw new Error(` do not contains the method of ${method}`);
        }
        return fn.apply(wx, args);
      })
      .catch(e => {
        throw e;
      });
  },
};

export default wxHelper;
