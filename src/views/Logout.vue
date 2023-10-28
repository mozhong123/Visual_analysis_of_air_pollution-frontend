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
    logout() {
      // 模拟登录逻辑，检查用户名和密码
      // 检查账号是否已存在
      localStorage.setItem("loggedIn", "false");
      // 跳转到首页
      alert("Logout successful");
      this.$router.push("/index")
    }
  },
  created() {
    this.logout();
  }
}
</script>

<template>

</template>

<style scoped>

</style>