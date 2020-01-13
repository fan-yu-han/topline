<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
         <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEditShow = !isEditShow"
      >{{ isEditShow ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <!-- 我的频道 -->
     <van-grid :gutter="10">
        <van-grid-item
            v-for="channel in userChannels"
            :key="channel.id"
            :text="channel.name"
        >
            <van-icon
                v-show="isEditShow"
                class="close-icon"
                slot="icon"
                name="close"
            />
        </van-grid-item>
    </van-grid>
    <!-- 剩余频道 -->
    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>

</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  components: {},

  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEditShow: false // 编辑的显示状态// 所有频道
    }
  },
  computed: {
    remainingChannels () {
      const { allChannels, userChannels } = this
      // 剩余频道 = 所有频道 - 我的频道
      const channels = []
      // 遍历所有频道
      allChannels.forEach(item => {
        // 如果我的频道中不包含当前被遍历的频道，则要
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    }
  }
}
</script>

<style scoped lang='less'>
.channel-edit {
  padding: 40px 0;
    ::v-deep .van-grid-item__content {
    position: relative;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: -10px;
      right: -5px;
      .close-icon {
        font-size: 16px;
      }
    }
  }
}
</style>
