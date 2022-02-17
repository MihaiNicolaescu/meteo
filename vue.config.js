module.exports = {
    devServer: {
      open: process.platform === 'darwin',
      //host: '192.168.1.102',
      port: 8081,
      https: true,
      hotOnly: false,
      //disableHostCheck: false,
    },
  }