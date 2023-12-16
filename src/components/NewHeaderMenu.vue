<template>
  <header>
    <div class="bnt">
      <div class="topbnt_left">
        <ul>
            <router-link to="/analysis_predict" @click="refreshAndNavigate('/analysis_predict')">
              <li>分析与预测</li>
            </router-link>
            <router-link to="/weather" @click="refreshAndNavigate('/weather')">
              <li>其他因素分析</li>
            </router-link>
            <router-link to="/cluster" @click="refreshAndNavigate('/cluster')">
              <li>聚类分析</li>
            </router-link>
        </ul>
      </div>
      <h1 class="tith1">大气污染时空经济效益可视分析</h1>
      <div class="topbnt_right">
        <ul>
            <router-link to="/analysis_predict" @click="refreshAndNavigate('/analysis_predict')">
              <li>健康效应</li>
            </router-link>
            <router-link to="/analysis_predict" @click="refreshAndNavigate('/analysis_predict')">
              <li>经济效益</li>
            </router-link>
            <router-link to="/cluster" @click="refreshAndNavigate('/cluster')">
              <li>时空变化趋势</li>
            </router-link>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
  },
  mounted() {


  },
  created() {

  },
  methods: {
    refreshAndNavigate(route) {
      // 刷新页面
      const fullPath = this.$router.resolve(route).href;
      // 刷新页面并导航到指定路由
      window.location.href = fullPath;
      // 导航到指定路由

    },
  },


};
</script>

<style scoped>

a {
  color: inherit; /* 继承父元素的文本颜色 */
  text-decoration: none; /* 移除下划线 */
  cursor: pointer; /* 设置鼠标指针为指针样式，表示可以点击 */
}

a:hover {
  background-color: #f0f0f0;
}

li {
  position: relative;
  height: 35px;
  transition: background 0.5s; /* 添加过渡效果 */
  color: inherit;
}

li:hover {
  background: #f0f0f0;
}


ul {
  list-style: none;
  text-align: center; /* 让列表项中的文本内容水平居中显示 */
  padding: 0;
  margin: 0;
}

.bnt {
  position: absolute;
  top: 4%;
  left: 8%;
  height: 1%;
  width: 100%;
  display: inline-block;
}


.tith1 {
  position: absolute;
  left: 32.9%;
  top:-100%;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 18px;
}

.topbnt_left li {
  position: relative;
  left:0;
  background: url(/src/assets/image/bnt.png) center;
  font-size: 14px;
  line-height: 33px;
  background-repeat: no-repeat;
  width: 6%;
  height: 35px;
  float: left;
  text-align: center;
  margin-right: 1%
}
.topbnt_right li {
  position: relative;
  left:-14.5%;
  background: url(/src/assets/image/bnt.png) center;
  font-size: 14px;
  line-height: 33px;
  background-repeat: no-repeat;
  width: 6%;
  height: 35px;
  float: right;
  text-align: center;
  margin-right: 1%
}
</style>
