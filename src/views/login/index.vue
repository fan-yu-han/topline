<template>
    <div class="login">
        <!-- 导航栏 -->
        <van-nav-bar title="标题"/>
        <!-- 导航栏 -->

        <!-- 表单 -->
        <van-cell-group>
            <van-field
                v-model="username"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
            />

            <van-field
                v-model="password"
                label="验证码"
                placeholder="请输入验证码"
                required
            >
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
        </van-cell-group>

        <div class="btn-warp">
            <van-button type="info">登录</van-button>
        </div>
    </div>
</template>

<script>
export default {

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
