<template>
  <div class="dw-footer-main" >
    <div>
      <span><a :href="footerInfo.siteUrl" style="color: #333;"><strong>{{ footerInfo.siteName }}</strong></a>&nbsp;</span>
      <span><a href="/" style="text-decoration: none;color: #333;">{{ footerInfo.siteIcp }}</a>&nbsp;{{ footerInfo.siteMail }}&nbsp;{{ footerInfo.sitePhone }}</span>
    </div>
    <div>
      <span>Powered by <a href="www.diaowen.net"><strong>DWSurvey</strong></a> {{ footerInfo.versionNumber }} Vue </span>
      <span> © {{ footerInfo.years }} <a href="www.diaowen.net"><strong>调问网</strong></a></span>
    </div>
  </div>
</template>
<script>

import API from '@/api/index.js'

export default {
  name: 'DwFooter',
  data () {
    return {
      footerInfo: {
        siteName: '调问网',
        siteUrl: 'http://www.diaowen.net',
        siteIcp: '京ICP备13050030号-3',
        siteMail: 'service@diaowen.net',
        sitePhone: '18888888888',
        versionInfo: 'DWSurvey OSS V5.0 Vue',
        versionNumber: 'OSS V5.0',
        versionBuilt: '20211128',
        years: '2012-2021'
      },
    }
  },
  mounted () {
    this.queryDWSurveyFooter()
  },
  methods: {
    queryDWSurveyFooter () {
      this.axios.get(API.surveyFooterInfo, {}).then((response) => {
        const resultData = response.data.data
        console.debug(resultData)
        this.footerInfo = resultData
      })
    }
  }
}
</script>

<style scoped>
.dw-footer-main{
  text-align: center;
  font-size: 12px;
  color: grey;
  line-height: 30px;
  padding-top: 0px;
  padding-bottom: 20px;
}
.dw-footer-main a{
  text-decoration: none;
  color: grey;
}
</style>
