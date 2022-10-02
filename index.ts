import moment from "moment";

moment.locale("zh-cn");

console.log(moment().startOf("week").valueOf());
console.log(moment().endOf("week").valueOf());
