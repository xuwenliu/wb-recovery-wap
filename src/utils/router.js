import router from 'umi/router';

function push(params) {
  router.push(params);
}

function goBack() {
  router.goBack();
}

function replace(params) {
  router.replace(params);
}

export default {
  push,
  goBack,
  replace,
};
