<template>
    <div >
        <!-- 导航栏 -->
        <van-nav-bar title="标题"/>
        <!-- 导航栏 -->

        <!-- 表单 -->
        <van-cell-group>
            <van-field
                v-model="user.mobile"
                left-icon="phone"
                clearable
                label="手机号"
                placeholder="请输入手机号"
            />

            <van-field
                v-model="user.code"
                left-icon="lock"
                label="验证码"
                placeholder="请输入验证码"
            >
                <van-count-down
                    v-if="isCountDownShow"
                    slot="button"
                    :time="1000 * 60"
                    format="ss 秒"
                    @finish="isCountDownShow = false"
                />
                <van-button slot="button"
                  v-else
                 size="small"
                 type="primary"
                 @click="OnSendSmsCode">
                 发送验证码
                 </van-button>
            </van-field>
        </van-cell-group>

        <div class="btn-warp">
            <van-button type="info" @click="onLogin">登录</van-button>
        </div>
    </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 表单通过验证 开始 lodding
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      // 3.请求提交
      try {
        const res = await login(user)
        console.log(res)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
      //   4.根据接口返回结果执行后续处理
    },
    async OnSendSmsCode () {
      // 1.获取手机号
      const { mobile } = this.user
      // 2 校验手机号是否有效

      // 3 发送验证码
      try {
        // 显示倒计时
        this.isCountDownShow = true
        // 发送
        await getSmsCode(mobile)
      } catch (err) {
        console.log(err)

        // 发送失败关闭倒计时 提前写前面
        this.isCountDownShow = false

        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }

        this.$toast('发送失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.btn-warp{

    padding: 27px 16px;
    .van-button{
        width: 100%;
        border-radius: 5px
    }
}
</style>
