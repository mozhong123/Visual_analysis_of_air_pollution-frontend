<script>
import HeaderMenu from "@/components/HeaderMenu.vue";
import Starry from "@/components/Starry.vue";

export default {
  components: {
    Starry,
    HeaderMenu
  },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      // 获取输入的用户名和密码
      const username = this.username;
      const password = this.password;

      // 从本地缓存中获取已注册的账号信息，如果不存在则创建一个空数组
      const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

      // 检查账号是否已存在
      const existingAccount = accounts.find(account => account.username === username);
      if (existingAccount) {
        alert('Username already exists. Please choose a different username.');
        return;
      }
      // 添加新账号到数组
      accounts.push({username, password});

      // 将更新后的账号信息保存到本地缓存中
      localStorage.setItem('accounts', JSON.stringify(accounts));

      // 注册成功后的逻辑，例如跳转到登录页面
      console.log('Registration successful!');
      this.$router.push("/index")
    }
  }
};
</script>

<template>
  <header-menu></header-menu>
  <starry></starry>
  <div class="registration-form">
    <h2>Registration</h2>
    <form @submit.prevent="handleSubmit">
      <div class="user-bar">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username"  placeholder="Username" required>
      </div>
      <br>
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="password" placeholder="Password" required>
      <br>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>

h2{
  color:#FF1361;
}

.registration-form {
  //max-width: 300px;
  margin: 0 auto;
  position: fixed;
  justify-content: space-around; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1;
  transform: translate(-50%, -50%);
}
.user-bar{
  display: inline-block;
}
</style>