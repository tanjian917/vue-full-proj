module.exports = {
    name: 'CwtchServer',
    script: './index.js',
    env: {
        // 生产环境
        NODE_ENV: "production",
        CONFIG: './pro-config.js'
    },
    env_development: {
        // 外网测试环境
        NODE_ENV: "development",
        CONFIG: './dev-config.js'
    },
    env_localhost: {
        // 局域网测试环境
        NODE_ENV: "development",
        CONFIG: './local-config.js'
    }
}