# 开发基本流程如下：                 
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
