let FE_ADDRESS = 'http://192.168.0.1:7007';
let BE_ADDRESS = 'http://192.168.0.1:8008';

module.exports = exports = {
	FE_ADDRESS,
	BE_ADDRESS,
    DB_ADDRESS,
    proxyTables: [
        {
            target: FE_ADDRESS,
            pathRwrite: {
                '/api': ''
            }
        },{
            target: BE_ADDRESS,
            pathRwrite: {
                '/adminApi': ''
            }
        }
    ],
    PORT: 80
}