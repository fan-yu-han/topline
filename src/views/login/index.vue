<template>
    <div >
        <!-- 导航栏 -->
        <van-nav-bar title="标题"/>
        <!-- 导航栏 -->

        <!-- 表单 -->
        <ValidationObserver  ref="form">
          <ValidationProvider name="手机号" rules="required|mobile">
            <van-field
                v-model="user.mobile"
                left-icon="phone"
                clearable
                label="手机号"
                placeholder="请输入手机号">
            </van-field>

          </ValidationProvider>
          <ValidationProvider name="验证码" rules="required|code">
            <van-field
                v-model="user.code"
                left-icon="lock"
                label="验证码"
                placeholder="请输入验证码" >

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
          </ValidationProvider>
        </ValidationObserver>

        <div class="btn-warp">
            <van-button type="info" @click="onLogin">登录</van-button>
        </div>
    </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'
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
      const success = await this.$refs.form.validate()

      if (!success) {
      // 这里加定时器的原因是因为获取验证失败的结果有延迟问题，并不是我们的原因
        setTimeout(() => {
          const errors = this.$refs.form.errors
          // forEach 无法停止
          // find 方法会遍历数组，对每个元素执行方法中的条件判定
          // const item = Object.values(errors).find(item => item[0])
          // 找到第1个有错误的字段并弹出提示
          for (let key in errors) {
            const item = errors[key]
            if (item[0]) {
              this.$toast(item[0])
              return
            }
          }
        }, 100)
        return
      }
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      // 3.请求提交
      try {
        const res = await login(user)

        // 讲登录状态存储到 Vuex 容器中
        this.$store.commit('setUser', res.data.data)

        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')

        // 跳转到首页
        this.$router.push('/')
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
      // 参数1：要验证的数据
      // 参数2：验证规则
      // 参数3：一个可选的配置对象，例如配置错误消息字段名称 name
      // 返回值：{ valid, errors, ... }
      //          valid: 验证是否成功，成功 true，失败 false
      //          errors：一个数组，错误提示消息
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }

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
