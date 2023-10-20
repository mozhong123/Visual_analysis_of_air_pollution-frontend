<template>
  <div>
    <div class="navbar">
      <ul>
        <li v-for="item in headerMenu" :key="item.id">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerMenu: [
        { id: 0, title: "主页", path: "/c/home" },
        { id: 1, title: "时空动态变化趋势", path: "/c/experiment" },
        { id: 2, title: "健康效应", path: "/c/resources" },
        { id: 3, title: "经济效益", path: "/c/course" }
      ]
    };
  },
  mounted() {
    // 在Vue组件的mounted生命周期钩子中执行加载外部HTML的操作
  },
};
</script>

<style scoped>
.navbar {
  display: inline-block; /* 添加display属性 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  font-size: 25px; /* 设置字体大小为20像素 */
  background-color: rgba(10, 0, 20, 0.8); /* 更深的颜色 */
}
.navbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(-225deg, #231557 0%, #43107a 29%, #FF1361 100%);
  z-index: -1;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline;
  margin: 0 100px;
}

/* 为活动链接添加样式 */
li.active {
  font-weight: bold;
}
</style>
