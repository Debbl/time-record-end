import moment from "moment";

moment.updateLocale("zh-cn", {
  week: {
    dow: 1,
  },
});

export default moment;
