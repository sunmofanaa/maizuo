<template>
    <div>
        login
        <button @click="handleLogin">登录</button>
    </div>
</template>
<script>
export default {
  methods: {
    handleLogin () {
      setTimeout(() => {
        localStorage.setItem('token', '后端返回的字段')
        // 1.获取query字段
        // 2.跳转到当时想要跳的页面去
        this.$router.push(this.$route.query.redirect)
      }, 1000)
    }
  }
}
</script>
