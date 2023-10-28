<script>
import HeaderMenu from "@/components/HeaderMenu.vue";
import Starry from "@/components/Starry.vue";

export default {
  data() {
    return {
      accounts: JSON.parse(localStorage.getItem('accounts')) || [],
      username: "",
      password: "", // 初始化 password 字段
    };
  },
  components: {
    Starry,
    HeaderMenu
  },
  methods: {
    login() {
      // 模拟登录逻辑，检查用户名和密码
      // 检查账号是否已存在
      const existingAccount = this.accounts.find(account => account.username === this.username)
      if (existingAccount && (existingAccount.password === this.password)) {
        // 登录成功，将登录信息保存到本地缓存
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userName", this.username);
        // 跳转到首页
        alert("Login successful");
        this.$router.push("/index")
      } else {
        alert("Invalid username or password");
      }
    },
  },
};
</script>

<template>
  <header-menu></header-menu>
  <starry></starry>
  <!-- Your main content goes here -->
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="user-bar">
        <input type="text" id="username" v-model="username"  placeholder="Username" required>
      </div>
      <input type="password" id="password" v-model="password" placeholder="Password" required>
      <button type="submit">Register</button>
      <router-link to="/register" class="register">Register</router-link>
    </form>

  </div>
</template>

<style scoped>

input,
button {
  margin-bottom: 10px;
}

.background-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.login {
  position: fixed;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  max-width: 300px;
  margin: 0 auto;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1;
  transform: translate(-50%, -50%);
}

h2{
  color:#FF1361;
}

.register {
  display: inline-block;
  float: right;
  transform: translate(-50%, 0);
}
</style>