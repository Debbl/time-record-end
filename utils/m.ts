import * as moment from "moment";
import "moment/locale/zh-cn";

moment.updateLocale("zh-cn", {
  week: {
    dow: 1,
  },
});

export default moment;
