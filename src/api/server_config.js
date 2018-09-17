
// interface Fn {
//   envMode: 
// }
var fn = {};
// var isMock = false;
var config = {
  ci: 'http://172.25.6.255:8080',
  test: 'http://10.100.160.147/tenIndicators'
};
fn.envMode = function(mode) {
  // 因为这里开发环境和生产环境都是使用同一个ip所以其实这个没必要,,
  if (mode === 'development') {
    return devUrl;
  }
  // isMock = false;
  return devUrl;
};
var devUrl = config['test'];
// var serverIpAddress = fn.envMode(process.env.MODE_ENV.trim());
var serverIp = fn.envMode(process.env.NODE_ENV.trim());
console.log(serverIp);
// exports.isMock = isMock;
// exports.config = config;
// exports.devUrl = devUrl;
export let serverIpAddress = serverIp;