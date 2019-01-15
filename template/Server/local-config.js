let FE_ADDRESS = 'http://192.168.0.1:7007';
let BE_ADDRESS = 'http://192.168.0.1:8008';

module.exports = exports = {
	FE_ADDRESS,
	BE_ADDRESS,
    proxyTables: [
        {
            target: FE_ADDRESS,
            pathRwrite: {
                '/api': '/api'
            }
        },{
            target: BE_ADDRESS,
            pathRwrite: {
                '/adminApi': '/adminApi'
            }
        }
    ],
    PORT: 7777
}