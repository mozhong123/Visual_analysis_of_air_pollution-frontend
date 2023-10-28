<template>
  <div>
    <div class="navbar">
      <ul>
        <li v-for="item in headerMenu" :key="item.id" class="nav-item">
          <div @mouseover="showDropdown(item.id)" @mouseleave="hideDropdown(item.id)">
            <router-link v-if="item.id!==4" :to="item.path">{{ item.title }}</router-link>
            <div v-if="item.id===4" class="auth-buttons">
              <router-link v-if="!loginStatus.loggedIn" :to="'/login'">Login</router-link>
              <router-link v-if="loginStatus.loggedIn" :to="'/profile'">
                {{ loginStatus.username }}
              </router-link>
            </div>
            <div v-show="filteredViewable(item.id)" class="dropdown">
              <ul v-for="subItem in filteredSubItems(item.id)" :key="subItem.id">
                <li v-if="subItem.to&&subItem.viewable">
                  <router-link :to=subItem.to>{{ subItem.val }}</router-link>
                </li>
                <li v-if="!subItem.to&&subItem.viewable">{{ subItem.val }}</li>
              </ul>
            </div>
          </div>
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
        {id: 0, title: "主页", path: "/c/home"},
        {id: 1, title: "时空动态变化趋势", path: "/c/experiment"},
        {id: 2, title: "健康效应", path: "/c/resources"},
        {id: 3, title: "经济效益", path: "/c/course"},
        {id: 4, title: "user", path: ""}
      ],
      loginStatus: {
        loggedIn: false,
        username: ""
      },
      dropdownMenu: [
        {id: 0, content: [{id: 0, val: 'logout', viewable: true}], viewable: false},
        {id: 1, content: [{id: 0, val: 'logout', viewable: true}], viewable: false},
        {id: 2, content: [{id: 0, val: 'logout', viewable: true}], viewable: false},
        {id: 3, content: [{id: 0, val: 'logout', viewable: true}], viewable: false},
        {id: 4, content: [{id: 0, val: 'logout', to: '/logout', viewable: false}], viewable: false},
      ],
    };
  },
  mounted() {
    // 在Vue组件的mounted生命周期钩子中执行加载外部HTML的操作
  },
  created() {
    // 在这里可以添加逻辑来检查用户是否已登录，如果已登录则设置 this.isLoggedIn 为 true
    // 如果用户已登录，还可以获取用户的用户名，然后设置 this.username
    // 从本地浏览器缓存中获取登录状态和用户名
    const isLoggedIn = localStorage.getItem('loggedIn');
    const username = localStorage.getItem('userName');
    console.log(isLoggedIn)
    console.log(username)
    // 检查本地浏览器缓存中是否存在登录状态和用户名
    if (isLoggedIn === 'true' && username) {
      // 如果存在，设置isLoggedIn为true，并将用户名赋值给this.username
      this.loginStatus.loggedIn = true;
      this.loginStatus.username = username;
    } else {
      // 如果不存在，isLoggedIn为false，用户名为空字符串
      this.loginStatus.loggedIn = false;
      this.loginStatus.loggedIn = '';
    }
    this.dropdownMenu.find(item => item.id === 4).content.
    find(item => item.id === 0).viewable = this.loginStatus.loggedIn;
  },
  methods: {
    showDropdown(route) {
      this.dropdownMenu.find(item => item.id === route).viewable = true;
    },
    hideDropdown(route) {
      this.dropdownMenu.find(item => item.id === route).viewable = false;
    },
  },
  computed: {
    filteredSubItems() {
      return (selectedItemId) => {
        return this.dropdownMenu.find(item => item.id === selectedItemId).content;
      };
    },
    filteredViewable() {
      return (selectedItemId) => {
        return this.dropdownMenu.find(item => item.id === selectedItemId).viewable;
      };
    },
  },
};
</script>

<style scoped>
.navbar {
  display: inline-block; /* 添加display属性 */
  position: fixed;
  justify-content: space-evenly; /* 元素之间的空间平均分配 */
  align-items: center; /* 垂直居中对齐 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 5%;
  font-size: 25px;
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
  z-index: 99;
}

.nav-item {
  z-index: 100;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
//height: 100%; padding: 0; margin: 0;
}

li {
  display: inline-block;
  min-width: 130px;
  height: 100%;
  font-size: 1em;
  margin: 0;
}

/* 为活动链接添加样式 */
li.active {
  font-weight: bold;
}

.auth-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center; /* 垂直居中对齐 */
  position: relative;
  cursor: pointer;
  min-width: 130px;
  padding: 0;
  margin: 0;
}

.dropdown {
  display: block;
  position: relative;
  justify-content: space-between;
  top: 100%;
  height: 100%;
  left: 0;
  background-color: #FF1361;
  min-width: 130px;
  width: 100%;
}

.dropdown div {
  color: white;
  padding: 8px 0;
  cursor: pointer;
  z-index: 98;
}

.menu-item:hover .dropdown {
  display: block;
}
</style>
