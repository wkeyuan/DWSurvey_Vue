<template>
  <div class="dw-footer-main" >
    <div>
      <span>Powered by <a href="http://www.diaowen.net"><strong>DWSurvey</strong></a> {{ footerInfo.versionNumber }} Vue </span>
    </div>
  </div>
</template>
<script>

import API from '@/api/index.js'

export default {
  name: 'DwFooterSm',
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
      }
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
  padding-top: 20px;
  padding-bottom: 20px;
}
.dw-footer-main a{
  text-decoration: none;
  color: grey;
}
</style>
