<template>
  <div class="login-container">
    <van-nav-bar title="登录" />

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        name="mobile"
        required
        type="number"
        maxlength="11"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji" />
        </template>
      </van-field>

      <!-- type: 指定输入框的类型 -->
      <!-- maxlength：指定输入的最大位数 -->
      <!-- required：是否显示必填的* -->
      <van-field
        v-model="user.code"
        placeholder="请输入验证码"
        name="code"
        required
        type="number"
        maxlength="6"
        :rules="rules.code"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma" />
        </template>

        <template #button>
          <van-count-down
            @finish="isShowTime = false"
            v-if="isShowTime"
            :time="5000"
            format="ss s"
          />
          <van-button
            v-else
            native-type="button"
            size="small"
            class="send-sms-btn"
            @click="sendSmsBtn"
            :disabled="isDisable"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
//引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。
import { login, getSend } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      isDisable: false,
      isShowTime: false,
      user: {
        mobile: "15968378091",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            // 校验规则如果不满足的提示消息
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码错误",
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
      // value自动从表单里面获取值
      // 获取到的值是：key >> 表单的name值  value >> 用户输入的值
      // await 后面写的是promise
      // 只有promise成功了的情况下才会继续执行

      // data数据满足接口文档的格式就可以
      // 如果捕获await的错误，用try catch
      // 192.168.14.62
      try {
        const res = await login(this.user);
        // >> 登录成功 提示用户
        Toast.success("登录成功");
        console.log(res);
      } catch (e) {
        // e >> 错误对象信息
        // if (e && e.response && e.response.data && e.response.data.message) {}

        // 使用可选链运算符进行数据是否存在的判断
        // 为什么要判断：如果直接从undefined后去属性，会直接报错，导致程序停止运行
        Toast.fail(e.response.data.message || "服务器端错误");
        // console.log(e);
      }
    },
    async sendSmsBtn() {
      // 通过传入表单name值，决定校验哪个表单 validate(name?: string | string[])
      // Promise：异步解决方案。解决了什么问题？回调地域 >> 链式调用形式 >> 每一次then返回一个新的Promise
      // async await >> 链式调用 (不够优雅) >> 看起来是同步形式

      // 分别try catch目的：不同的错误，不同去处理
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }

      try {
        this.isDisable = true;
        // 调用获取验证码的接口
        await getSend(this.user.mobile);
        // 展示倒计时
        this.isShowTime = true;
        // 获取成功后进行提示
        this.$toast.success("发送验证码成功");
      } catch (e) {
        // 如果获取失败了，进行错误的提示
        this.$toast.fail(e.response.data.message || "出错了");
        this.isShowTime = false;
      } finally {
        // 不管成功或失败都会执行的逻辑s
        this.isDisable = false;
      }
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
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    border: 4px solid #72dca5;
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
