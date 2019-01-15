var {
	PORT,
	proxyTables
} = require(process.env.CONFIG ||  './local-config');
var express = require('express')
var createProxyServer = require('./utils/ProxyTable');
var history = require('connect-history-api-fallback');
var helmet = require('helmet');

/**
 * 
 * @param {express instance} _app 
 * 配置路由代理
 */
function initProxyTable(_app){
	proxyTables.map(proxy=>createProxyServer(_app,proxy));
}

/**
 * 
 * @param {express instance} _app 
 * @param {string} routeName 拦截路由名称
 * @param {string} dirName 对应文件夹名称
 * @param {boolean} useHistory 是否使用history模式（仅Vue使用），如需使用该功能需要将vue项目的路由模式配置为history。
 * 															如果有拦截路由名称，则vue路由中也必须配置该名称，打包资源也需要配置该名称
 * 														例：router index.js 
 * 																`base: '/admin',
																	 mode: 'history',`
																	config/index.js
																	`assetsPublicPath: '/admin/', `
 */
function createSubApp(_app,routeName,dirName,useHistory=false){
  let subApp = express();
  if(useHistory)subApp.use(history());
  subApp.use(express.static(__dirname + dirName));
  _app.use(routeName,subApp);
}

/**
 * 
 * 启动express应用
 */
function start(){
	let _app = express();
	_app.use(helmet());
  	_app.disable('x-powered-by');

	initProxyTable(_app);
  	createSubApp(_app,'/admin','/BE',true);
	createSubApp(_app,'/','/FE');
	
  	let server = _app.listen(PORT, () => {
    	let infos = server.address();
    	let host = infos.address;
    	let port = infos.port;
    	console.log('Server listen http://%s:%s', host, port);
  	})
}

start();