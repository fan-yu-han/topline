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
            v-for="(channel,index) in userChannels"
            :key="channel.id"

            @click="onUserChannelClick(index)"
        >
        <!-- 点击onUserChannelClick(index) 删除频道 -->
        <span
        slot="text"
        class="text"
        :class="{active:value===index}"
        >{{channel.name}}</span>
         <van-icon
                v-show="isEditShow && index !==0"
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
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},

  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
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
  watch: {
    // 当 userChannels 发生改变的时候，将该数据存储到本地存储
    userChannels () {
      setItem('user-channels', this.userChannels)
    }
  },
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
    },
    onUserChannelClick (index) {
      // 如果是编辑状态，则删除频道
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        // 如果是非编辑状态，则切换频道
        this.$emit('input', index) // 修改激活的标签
        this.$emit('close') // 关闭弹层
      }
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
      background: #f4f5f6;
      top: -10px;
      right: -5px;
      .close-icon {
        font-size: 16px;
      }
    }
  }
}
.text {
    font-size: 14px;

}
.active {
    color: red;
}
</style>
