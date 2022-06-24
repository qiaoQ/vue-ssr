const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('lodash/merge');
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const target = TARGET_NODE ? 'server' : 'client';

module.exports = {
  css: {
    extract: false,
  },
  outputDir: './dist/' + target,
  configureWebpack: () => ({
    // 将入口指向应用程序的server / client文件
    entry: `./src/entry-${target}.js`,
    devtool: 'inline-source-map',
    // 这允许webpack以Node适用方式处理动态导入
    // 并且还会在变异Vue组件时告知‘vue-loader‘输送面向服务器代码（server-oriented code）
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    output: {
      // 此处告知server bundle使用Node风格导出模块
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    // 外置化应用程序依赖模块们可以使服务器构建速度更快，并生成小的bundle文件
    externals: TARGET_NODE ? nodeExternals({
    // 不要外置化webpack处理的依赖模块
    // 可以在这里添加更多的文件类型。例如，未处理‘*.vue’原始文件
    // 你还应该修改‘global’（例如polyfill）的依赖模块列入白名单
      allowlist: [/\.css$/]
    }): undefined,
    optimization: {
      splitChunks: undefined,
    },
    // 这是服务器的整个输出构建为单个JSON文件的插件
    // 服务端默认文件名为 'vue-ssr-server-bundle.json'
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    config.module
    .rule('vue')
    .use('vue-loader')
    .tap(options => {
      merge(options, {
        optimizeSSR: false
      })
    })
  },
  // dll 配置
	pluginOptions: {
		dll: {
			entry: ['vue', 'vue-router'],
      open: false, // process.env.NODE_ENV === 'development',
      inject: true,
		}
	}
}