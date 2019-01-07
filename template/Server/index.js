var {
  FE_ADDRESS,
  BE_ADDRESS,
  PORT
} = require(process.env.CONFIG || './dev-config');
var express = require('express')
var app = express();
var history = require('connect-history-api-fallback');
var createProxyServer = require('./utils/ProxyTable');  // 设置代理
var createRouteApp = require('./utils/RouteApp'); // 创建子路由

/**
 * 
 * connect-history-api-fallback
 * 路由配置顺序非常重要,权重根据URL从高到底进行配置
 *
 */

console.log("FE_ADDRESS", FE_ADDRESS);
console.log("BE_ADDRESSַַ", BE_ADDRESS);

var DEBUG = false;

/**
 * 
 * @param {express instance} _app express实例
 */
function initalizeProxyInfo(_app){
  // 前台接口代理
  createProxyServer(_app,{
    target: FE_ADDRESS,
    pathRwrite:{
      '/FEApi': DEBUG?'/FEApi':'/api'
    }
  });

  // 后台接口代理
  createProxyServer(_app,{
    target: BE_ADDRESS,
    pathRwrite:{
      '/adminApi': DEBUG?'/adminApi':'/'
    }
  });
}


function start(){
  // Http代理请求设置
  initalizeProxyInfo(app);

  // 后台管理管理系统
  createRouteApp(app,{routeName: '/2r23e494txafa6p5',dirName: '/BE/',useHistory: true});

  // 前台页面
  app.use(history());
  app.use(express.static(__dirname + '/FE'));

  // 所有请求都无法匹配,跳转到首页
  app.all('*',(req, res, next) => res.redirect('/'));


  let server = app.listen(PORT, () => {
    let infos = server.address();
    let host = infos.address;
    let port = infos.port;
    console.log('Server listen http://%s:%s', host, port);
  })
}

start();