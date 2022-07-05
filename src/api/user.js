// 引入封装好的axios;
import request from "@/utils/request.js";

//用户注册接口
export const UaerLogin = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

//获取验证码
export const Getcode = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
