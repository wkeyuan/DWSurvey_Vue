<template>
  <div>问卷加载中</div>
</template>

<script>
export default {
  name: 'DwAnswer',
  mounted () {
    this.loadAnswer()
  },
  methods: {
    loadAnswer () {
      const sid = this.$route.params.sid
      window.location.href='/static/diaowen/answer-p.html?sid='+sid
    }
  }
}
</script>
<style scoped>

</style>
