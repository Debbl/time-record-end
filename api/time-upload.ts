import type { Response } from "@netlify/functions/dist/function/response";
import type { Handler } from "@netlify/functions";
import type { Info } from "../vika/time/upload";
import vikaUpload from "../vika/time/upload";

const handler: Handler = async (event, context) => {
  const result: Response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };
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
