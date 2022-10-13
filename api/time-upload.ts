import type { Handler } from "@netlify/functions";
import type { Info } from "../vika/time/upload";
import vikaUpload from "../vika/time/upload";
import { getResult, passToken } from "../vika/config";

const handler: Handler = async (event) => {
  const result = getResult();
  // 非 POST 请求
  if (event.httpMethod !== "POST") {
    result.body = JSON.stringify({
      code: 200,
      msg: "请使用 POST 方法请求",
      data: null,
      mpa: {},
    });
    return result;
  }

  const isPassToken = await passToken(event);
  if (!isPassToken) {
    result.body = JSON.stringify({
      code: 403,
      msg: "error",
      data: null,
      mpa: {},
    });
    return result;
  }

  const info: Info = JSON.parse(event.body) as Info;
  if (
    !info.username ||
    !info.startTime ||
    !info.endTime ||
    !info.time ||
    !info.timeStamp
  ) {
    result.body = JSON.stringify({
      code: 200,
      msg: "参数不完整",
      data: null,
      mpa: {},
    });
  }
  const response = await vikaUpload(info);
  if (response.success) {
    result.body = JSON.stringify({
      code: 200,
      msg: "ok",
      data: null,
      mpa: {},
    });
    return result;
  }
  result.body = JSON.stringify({
    code: 200,
    msg: "error",
    data: null,
    mpa: {},
  });
  return result;
};

export { handler };
