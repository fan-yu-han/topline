<template>
   <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!--
      tab 组件
        v-model="active" 控制被激活的标签
        title 标签标题
     -->
    <van-tabs v-model="active">
      <van-tab
      :title="channel.name"
      v-for="channel in userChannels"
      :key="channel.id"
      >
        <!-- 文章列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
            />
          </van-list>
        </van-pull-refresh>
        <!-- /文章列表 -->
      </van-tab>

    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      userChannels: [] // 用户频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    // 上拉加载更多调用 onLoad
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 2000)
    },
    // 下拉刷新调用 onRefresh
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
    }
  }
}
</script>

<style scoped></style>
