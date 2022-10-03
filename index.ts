import moment from "moment-timezone";
moment.updateLocale("zh-cn", {
  week: {
    dow: 1,
  },
});

moment.tz.setDefault("Asia/Shanghai");

export default moment;
