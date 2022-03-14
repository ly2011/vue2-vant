<template>
  <div id="app">
    <keep-alive>
      <router-view
        class="view-router"
        v-if="$route.meta.keepAlive"
      ></router-view>
    </keep-alive>
    <router-view
      class="view-router"
      v-if="!$route.meta.keepAlive"
    ></router-view>
    <i-tabbar v-if="$route.meta.tabbar" />
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapState } from 'vuex'
import { environment, statusBarColor } from '@/config'
import nativeApi from '@/utils/nativeApi'

export default {
  watch: {
    accessToken: {
      immediate: true,
      handler (val) {
        if (val) {
        }
      }
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state?.user?.loginInfo?.accessToken,
    })
  },

  async created () {
    // 全局后退方法
    this.$root.goBack = this.goBack
    // 初始化路由
    this.initRouter()
    // 解决safari、微信浏览器下拉回弹效果
    // this.fixAppScoll()
    // 美信云环境下初始化应用
    this.initApp()

    /**
     * 监听返回键
     */
    document.addEventListener('backbutton', () => {
      this.goBack()
    }, false)
  },
  methods: {
    ...mapActions({
      changeUser: 'changeUser',
    }),
    initRouter () {
      // 路由初始化
      const { routes } = this.$router.options
      const arr = []
      for (let i = 0; i < routes.length; i++) {
        if (!routes[i].hasOwnProperty('meta') || !routes[i].meta.hasOwnProperty('keepAlive') || !routes[i].meta.keepAlive) {
          arr.push(routes[i].name)
        }
      }
      if (arr.length > 0) {
        this.exclude = arr.join(',')
      }
    },
    /**
     * 后退方法
     */
    goBack () {
      const { path } = this.$route
      const extra = this.$store.state.extra.extra
        ? this.$store.state.extra.extra
        : {}
      if (path === '/' || extra.action === this.$route.name) {
        if (environment !== 'local') {
          nativeApi.exit()
        }
      } else {
        this.$router.back()
      }
    },
    /**
     * 解决safari、微信浏览器下拉回弹效果
     */
    fixAppScoll () {
      const overscroll = function (el) {
        el.addEventListener('touchstart', () => {
          const top = el.scrollTop
          const totalScroll = el.scrollHeight
          const currentScroll = top + el.offsetHeight
          if (top === 0) {
            el.scrollTop = 1
          } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1
          }
        })

        el.addEventListener('touchmove', (evt) => {
          if (el.offsetHeight < el.scrollHeight) {
            evt._isScroller = true
          }
        })
      }

      overscroll(document.querySelector('#app'))
      document.body.addEventListener('touchmove', (evt) => {
        if (!evt._isScroller) {
          evt.preventDefault()
        }
      })
    },
    async initApp () {
      /**
       * 获取用户信息
       */
      const user = await nativeApi.getUser()

      this.changeUser(user)

      if (!user) {
        return
      }

      if (environment !== 'local') { // 底座环境下
        /**
         * 隐藏悬浮
         */
        nativeApi.hideFloat()
        /**
         * 隐藏导航
         */
        nativeApi.hideNav()
        /**
         * 状态栏变色
         */
        nativeApi.changeColor(statusBarColor)
        /**
         * 禁用webview橡皮筋效果
         */
        nativeApi.setBounces('0')
      }
    }
  }
}
</script>
