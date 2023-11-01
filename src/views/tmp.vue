<template>
  <header class="navbar-header">
    <div class="navbar">
      <img src="static/logo_sdu.webp" class="logo" alt="Logo">
      <div class=navbar-left>
        <router-link to="/index" class="navbar-left-button-home">
          <p>主页</p>
        </router-link>
        <router-link to="/index" class="navbar-left-button-time">
          <p>时空动态变化趋势</p>
        </router-link>
        <router-link to="/index" class="navbar-left-button-health">
          <p>健康效应</p>
          </router-link>
        <router-link to="/index" class="navbar-left-button-commercial">
          <p>经济效益</p>
          </router-link>
      </div>
    </div>
    <div class="navbar-dropdown">
      <div class="navbar-left-dropdown-home">
        <ul>
          <li>tmp-home</li>
          <li>tmp-home</li>
          <li>tmp-home</li>
          <li>tmp-home</li>
        </ul>
      </div>
      <div class="navbar-left-dropdown-time">
        <ul>
          <li>tmp-time</li>
          <li>tmp-time</li>
          <li>tmp-time</li>
          <li>tmp-time</li>
        </ul>
      </div>
      <div class="navbar-left-dropdown-health">
        <ul>
          <li><>tmp-health</li>
          <li>tmp-health</li>
          <li>tmp-health</li>
          <li>tmp-health</li>
        </ul>
      </div>
      <div class="navbar-left-dropdown-commercial">
        <ul>
          <li>tmp-commercial</li>
          <li>tmp-commercial</li>
          <li>tmp-commercial</li>
          <li>tmp-commercial</li>
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
    // 在Vue组件的mounted生命周期钩子中执行加载外部HTML的操作
    const buttonHome = document.querySelector('.navbar-left-button-home');
    const dropdownHome = document.querySelector('.navbar-left-dropdown-home');
    const buttonTime = document.querySelector('.navbar-left-button-time');
    const dropdownTime = document.querySelector('.navbar-left-dropdown-time');
    const buttonHealth = document.querySelector('.navbar-left-button-health');
    const dropdownHealth = document.querySelector('.navbar-left-dropdown-health');
    const buttonCommercial = document.querySelector('.navbar-left-button-commercial');
    const dropdownCommercial = document.querySelector('.navbar-left-dropdown-commercial');
    const navbar = document.querySelector('.navbar');

    const rect_home = buttonHome.getBoundingClientRect();
    const rect_time = buttonTime.getBoundingClientRect();
    const rect_health = buttonHealth.getBoundingClientRect()
    const rect_commercial = buttonCommercial.getBoundingClientRect()
    const rect_bar = navbar.getBoundingClientRect();

    dropdownHome.style.top = `${rect_home.height}px`
    dropdownTime.style.top = `${rect_time.height}px`
    dropdownHealth.style.top = `${rect_health.height}px`
    dropdownCommercial.style.top = `${rect_commercial.height}px`
    dropdownHome.style.left = `${rect_home.left + rect_bar.height + 1}px`
    dropdownTime.style.left = `${rect_time.left + rect_bar.height + 1}px`
    dropdownHealth.style.left = `${rect_health.left + rect_bar.height + 1}px`
    dropdownCommercial.style.left = `${rect_commercial.left + rect_bar.height + 1}px`
    dropdownHome.style.width = `${rect_home.width}px`
    dropdownTime.style.width = `${rect_time.width}px`
    dropdownHealth.style.width = `${rect_health.width}px`
    dropdownCommercial.style.width = `${rect_commercial.width}px`

    window.addEventListener('resize', () => {
      const rect_home = buttonHome.getBoundingClientRect();
      const rect_time = buttonTime.getBoundingClientRect();
      const rect_health = buttonHealth.getBoundingClientRect()
      const rect_commercial = buttonCommercial.getBoundingClientRect()

      dropdownHome.style.top = `${rect_home.height}px`
      dropdownTime.style.top = `${rect_time.height}px`
      dropdownHealth.style.top = `${rect_health.height}px`
      dropdownCommercial.style.top = `${rect_commercial.height}px`
      dropdownHome.style.left = `${rect_home.left}px`
      dropdownTime.style.left = `${rect_time.left}px`
      dropdownHealth.style.left = `${rect_health.left}px`
      dropdownCommercial.style.left = `${rect_commercial.left}px`
      dropdownHome.style.width = `${rect_home.width}px`
      dropdownTime.style.width = `${rect_time.width}px`
      dropdownHealth.style.width = `${rect_health.width}px`
      dropdownCommercial.style.width = `${rect_commercial.width}px`
    });

    buttonHome.addEventListener('mouseover', () => {
      dropdownHome.style.display = 'block';
    });
    dropdownHome.addEventListener('mouseover', () => {
      dropdownHome.style.display = 'block';
    });
    buttonHome.addEventListener('mouseout', () => {
      dropdownHome.style.display = 'none';
    });
    dropdownHome.addEventListener('mouseout', () => {
      dropdownHome.style.display = 'none';
    });

    buttonTime.addEventListener('mouseover', () => {
      dropdownTime.style.display = 'block';
    });
    dropdownTime.addEventListener('mouseover', () => {
      dropdownTime.style.display = 'block';
    });
    buttonTime.addEventListener('mouseout', () => {
      dropdownTime.style.display = 'none';
    });
    dropdownTime.addEventListener('mouseout', () => {
      dropdownTime.style.display = 'none';
    });

    buttonHealth.addEventListener('mouseover', () => {
      dropdownHealth.style.display = 'block';
    });
    dropdownHealth.addEventListener('mouseover', () => {
      dropdownHealth.style.display = 'block';
    });
    buttonHealth.addEventListener('mouseout', () => {
      dropdownHealth.style.display = 'none';
    });
    dropdownHealth.addEventListener('mouseout', () => {
      dropdownHealth.style.display = 'none';
    });

    buttonCommercial.addEventListener('mouseover', () => {
      dropdownCommercial.style.display = 'block';
    });
    dropdownCommercial.addEventListener('mouseover', () => {
      dropdownCommercial.style.display = 'block';
    });
    buttonCommercial.addEventListener('mouseout', () => {
      dropdownCommercial.style.display = 'none';
    });
    dropdownCommercial.addEventListener('mouseout', () => {
      dropdownCommercial.style.display = 'none';
    });


  },
  created() {

  }
};
</script>

<style scoped>

a {
  color: inherit; /* 继承父元素的文本颜色 */
  text-decoration: none; /* 移除下划线 */
  cursor: pointer; /* 设置鼠标指针为指针样式，表示可以点击 */
}

a:hover{
  background-color: #f0f0f0;
}

.navbar {
  display: flex; /* 添加display属性 */
  position: fixed;
  align-items: flex-start; /* 垂直居中对齐 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 7%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.navbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.logo {
  float: left;
  height: 100%;
}

.navbar-left {
  width: 70%;
  z-index: 100;
  font-size: 20px;
  height: 100%;
}

.navbar-left-button-home {
  width: 11%;
  height: 100%;
  display: flex;
  float: left;
  justify-content: center;
  align-items: center;
  position: relative;
}

.navbar-left-button-time {
  float: left;
  width: 17%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.navbar-left-button-health {
  float: left;
  width: 13%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

ul {
  list-style: none;
  text-align: center; /* 让列表项中的文本内容水平居中显示 */
  padding: 0;
  margin: 0;
}

.navbar-left-button-commercial {
  float: left;
  width: 13%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.navbar-left-dropdown-home {
  display: none;
  position: fixed;
  text-align: center;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.navbar-left-dropdown-time {
  display: none;
  position: fixed;
  text-align: center;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.navbar-left-dropdown-health {
  display: none;
  position: fixed;
  text-align: center;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.navbar-left-dropdown-commercial {
  display: none;
  position: fixed;
  text-align: center;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

</style>
