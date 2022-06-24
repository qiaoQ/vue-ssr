// nodejs的服务器
const express = require('express');
const fs = require('fs');
const path = require('path')
// 创建渲染器
// const renderer = require('vue-server-renderer').createRenderer();
const { createBundleRenderer } = require('vue-server-renderer');
// 打包好的文件
const serverBundle = require('../dist/server/vue-ssr-server-bundle.json');
const clientMainfest = require('../dist/client/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(path.resolve(__dirname, '../public/index.temp.html')),
  clientMainfest
})
// 创建express、vue实例
const app = express();

// 中间件处理静态文件请求
app.use(express.static(path.resolve(__dirname, '../dist/client')))

// 路由的处理交给vue
app.get('/', async (req, res) => {
  try{
    const context = {
      url: req.url,
      title: '积分商城',
    }

    const html = await renderer.renderToString(context);
    // eslint-disable-next-line no-console
    console.log(html);

    res.send(html)
  }catch(err) {
    console.log(err)
    res.status(500).send('服务器内部错误')
  }
})

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('服务器渲染成功')
})