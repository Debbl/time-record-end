import moment from "moment";

moment.locale("zh-cn");

console.log(moment().startOf("month"));
console.log(moment().endOf("month"));

export default moment;
