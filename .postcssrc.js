module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      //根据设计稿的尺寸/10 得到rootvalue
      //我们自己的设计稿75
      //vant组件的rootvalue 要设计为37.5
      rootValue: (arg) => {
        return arg.file.includes("vant") ? 37.5 : 75;
      },
      propList: ["*"],
    },
  },
};
