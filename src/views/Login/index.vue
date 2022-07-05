<template>
  <div class="login-container">
    <!-- 顶部 -->
    <van-nav-bar title="登录" />

    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
      >
        <template #left-icon> <ToutiaoIcon icon="shouji" /></template>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon><ToutiaoIcon icon="yanzhengma" /></template>
        <template #button>
          <van-count-down
            @finish="isShow = false"
            v-if="isShow"
            :time="3000"
            format=" ss 秒"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            size="small"
            type="primary"
            @click="sendSmsCode"
            :disabled="isDisabled"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <!-- 底部提交按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
//import ToutiaoIcon from "@/components/ToutiaoIcon.vue";
import { UaerLogin, Getcode } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "LoginPage",

  props: {},
  data() {
    return {
      isDisabled: false,
      isShow: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空！" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空！" },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式不正确",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      //如果要捕获await的错误 用try catch
      try {
        const res = await UaerLogin(this.user);
        console.log(res);
        Toast.success("你成功了!我的宝");
      } catch (e) {
        //使用可选链式运算符进行数据是否存在的判断
        //为什么要判断： 如果直接从undefined获取属性，会直接报错，导致程序停止
        Toast.fail(e?.response?.data?.message || "服务器登陆失败");
      }
    },
    //发送验证码
    async sendSmsCode() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isDisabled = true;
        //调用获取验证码接口
        await Getcode(this.user.mobile);
        // 展示倒计时？
        this.isShow = true;
        //获取成功后进行提示
        this.$toast.success("发生验证码成功");
      } catch (e) {
        //如果获取失败 ，进行错误的提示
        this.$toast.fail(e.response.data.message || "出错了");
        this.isShow = false;
      } finally {
        this.isDisabled = false;
      }

      //通过传入表单的name值 决定校验那个表单
      //Promise:异步解决方案 解决回调地狱-->链式调用-->每一次then返回一个新的promise
      //async await--->>链式调用不够优雅-->看起来像是同步形式

      //发送验证码请求
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 158px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
