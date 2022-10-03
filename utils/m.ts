import moment from "moment";

moment.updateLocale("zh-CN", {
  week: {
    dow: 1,
  },
});

export default moment;
