<template>
  <!-- 文章列表 -->
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!--
      List 列表组件
      v-model="loading" 控制上拉加载更多的 loading 状态
      :finished="finished" 控制是否加载结束，如果没有数据了，则不会继续加载更多
      finished-text="没有更多了" 配置结束结果的提示文本
      @load="onLoad" 当快要触底的时候它会自动触发执行该方法
        我们要做的就是在 onLoad 函数中请求获取数据
      List 组件通过loading和finished两个变量控制加载状态
      当组件滚动到底部时，会触发load事件并将loading设置成true。
      此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置成false即可。
      若数据已全部加载完毕，则直接将finished设置成true即可。
      -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </van-pull-refresh>
  <!-- /文章列表 -->
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 列表数据
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        // 第1次使用 Date.now() 获取最新数据
        // 下一页的数据使用本次返回的数据中的 timestamp
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      // 2. 把请求获取到的数据添加到数组列表中
      const results = data.data.results
      this.list.push(...results)
      // 3. 加载状态结束
      this.loading = false
      // 4. 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把 finished 设置为 true，不再加载更多
        this.finished = true
      }
    },
    // 上拉加载更多调用 onLoad
    // List 会监听浏览器的滚动事件并计算列表的位置，当列表底部与可视区域的距离小于offset时，
    // List 会触发一次 load 事件。
    // List 初始化后会触发一次 load 事件，用于加载第一屏的数据
    // 为什么会连续触发 load 事件？
    // onLoad () {
    //   console.log(123)
    //   // 1. 请求获取数据
    //   setTimeout(() => {
    //     // 2. 把请求获取到的数据添加到数组列表中
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 3. 加载状态结束
    //     this.loading = false
    //     // 4. 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 2000)
    // },
    // 下拉刷新调用 onRefresh
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>

<style scoped></style>
