export const config = {
  // 默认是get 字符串写法
  // queryIndexConfig: 'indicator/libraries/userid', // 查询 默认不传参数,要是要弄成hash 的需要加type 并且传的参数必须是数组
  addIndexConfig: {
    // 增
    url: 'indicator/libraries/userid',
    method: 'post',
  },
  delIndexConfig: {
    // 删除
    url: 'indicator/libraries/user',
    method: 'delete',
  },
  changeIndexConfig: {
    url: 'indicator/libraries/userid',
    method: 'put',
  },
  searchManUserIndexConfig: {
    // 维护人查询接口
    url: 'indicator/manuser/userid',
    method: 'get',
  },
  enumSearch: {
    url: 'indicator/enumdata/userid',
    method: 'get',
  },
  queryVersionMain: {
    url: 'indicator/version',
    method: 'get',
  },
  delVersionMain: {
    url: 'indicator/version',
    method: 'delete',
  },
  addVersionMain: {
    url: 'indicator/version/',
    method: 'post',
  },
  editVersionMain: {
    url: 'indicator/version',
    method: 'put',
  },
  queryDispatch: {
    url: 'indicator/dispatch',
    method: 'get',
  },
  delDispatch: {
    url: 'indicator/dispatch',
    method: 'delete',
  },
  addDispatch: {
    url: 'indicator/dispatch',
    method: 'post',
  },
  editDispatch: {
    url: 'indicator/dispatch',
    method: 'put',
  },
  queryDispatchItem: {
    url: 'indicator/dispatchitem',
    method: 'get',
  },
  editDispatchItem: {
    url: 'indicator/dispatchitem',
    method: 'put',
  },
  issueDispatch: {
    // 发起指标指派
    url: 'indicator/dispatchstart',
    method: 'put',
  },
  cancelDispatch: {
    // 撤回指标指派
    url: 'indicator/dispatchcancle',
    method: 'put',
  },
  // find: 'xxx/yyy/zzz',
  // getAddress: {
  //   url: 'xxx/xxx/xxx',
  //   method: 'get'
  // },
  // query: {
  //   url: 'xxx/xxx/xxx',
  //   method: 'post'
  // },
  // check: {
  //   url: 'xxx/xxx/xxx',
  //   method: 'post',
  //   options: {}
  // }
};
