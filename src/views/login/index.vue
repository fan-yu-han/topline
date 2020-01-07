<template>
    <div >
        <!-- 导航栏 -->
        <van-nav-bar title="标题"/>
        <!-- 导航栏 -->

        <!-- 表单 -->
        <van-cell-group>
            <van-field
                v-model="user.mobile"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
            />

            <van-field
                v-model="user.code"
                label="验证码"
                placeholder="请输入验证码"
                required
            >
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
        </van-cell-group>

        <div class="btn-warp">
            <van-button type="info" @click="onLogin">登录</van-button>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }

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
      // 3.请求提交
      try {
        const res = await login(user)
        console.log(res)
      } catch (err) {
        console.log('登录失败', err)
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
