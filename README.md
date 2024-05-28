# 大气污染时空经济效益可视分析
山东大学计算机科学与技术学院数据班大数据分析与实践（可视化）课程大作业：大气污染时空经济效益可视分析（前端）Vue3+百度地图API+ECharts
## 项目详细介绍见:
https://github.com/mozhong123/Visual_analysis_of_air_pollution-backend
## 开发基本流程如下：                 
## 参考链接：https://xie.infoq.cn/article/056d8e9c078ac6a327b66bf3e#
## 省流版：
### 点击fork将项目fork到自己仓库
### 在本机合适的文件夹下右键选择git bash here
### 输入git clone xxx    (xxx为自己仓库的链接)
### 然后输入git remote add upstream https://github.com/mozhong1231/Visual_analysis_of_air_pollution
### 自行修改代码
### git status查看哪些文件被修改
### git add .用来添加所有被修改的文件，也可以用git add 文件名 添加单个文件，无关文件不要提交
### 添加完之后用git commit -m '自行修改的注释'  进行提交
### 在push之前一定要看看远程仓库有无更新，有更新先在自己仓库中点击Sync fork，然后点击update branch，再git pull origin master将新的commit拉到本地
### 再用git push origin master推送到自己的远程仓库
### 如果git的各种操作报错timeout，可以上网搜索让git默认使用代理，以后都挂着梯子提交即可
### 如果别人和自己修改了同一份文件导致冲突无法pull或push：参考链接：https://blog.csdn.net/wowoniuzailushang/article/details/78517744#
### push成功后，点击contribute下面的open pull request提交pr，在title写好本次更新的内容。如果分支被merge了会有邮件发到邮箱，如果有需要修改的地方我会comment，对照着修改即可
### 另，只要pr一直开着，后续的提交就会默认被合并到这个pr里，无需新开或关闭pr

# 项目结构如下：
## src 目录: 这是你的源代码目录，包含了你的 Vue 组件、JavaScript 文件、样式和模板文件。
main.js: 这是应用的入口文件，通常用来创建 Vue 实例、引入全局依赖（如路由器和状态管理），并将根组件挂载到 DOM 中。<br>
App.vue: 这是根组件，它包含应用的整体结构、布局和全局样式。<br>
components 目录: 这是存放可重用组件的目录。<br>
views 目录: 这是存放页面级组件的目录，通常对应着不同的路由。<br>
router 目录: 这是存放路由配置的目录，通常包括路由的定义和路由守卫。<br>
assets 目录: 这是存放静态资源文件，如图像、样式和字体的目录。<br>
## public 目录: 这是存放静态文件的目录，这些文件不会被 Webpack 处理，而是直接复制到构建目录。通常包括 index.html 作为主 HTML 模板，以及其他不需要经过构建过程的文件。
## package.json: 这是项目的配置文件，包括项目名称、依赖、脚本等信息。
## vue.config.js: 这是自定义 Vue CLI 配置的文件，你可以在这里配置构建、开发服务器、代理、自定义 webpack 配置等。
