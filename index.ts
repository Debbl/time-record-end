import moment from "moment";

moment.updateLocale("zh-cn", {
  week: {
    dow: 1,
  },
});
console.log(moment().startOf("week"));
console.log(moment().endOf("week"));

export default moment;
