module.exports = {
    name: 'Node-Server',
    script: './index.js',
    env: {
        NODE_ENV: "production",
        CONFIG: './pro-config.js'
    },
    env_development: {
        NODE_ENV: "development",
        CONFIG: './dev-config.js'
    }
}