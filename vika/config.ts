import type { IFieldValue, IRecord } from "@vikadata/vika";
import { Vika } from "@vikadata/vika";
import type { Response } from "@netlify/functions/dist/function/response";
import type { Event } from "@netlify/functions/dist/function/event";
import * as dotenv from "dotenv";
import { verifyToken } from "../utils/jwt";
dotenv.config({
  path: "../.env",
});

const vika = new Vika({ token: process.env.VIKA_TOKEN });

const getResult = (): Response => ({
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
});

const passToken = async (event: Event) => {
  const { authorization } = event.headers;
  if (!authorization) return false;
  const [, token] = authorization.split(" ");
  try {
    await verifyToken(token);
  } catch (error) {
    return false;
  }
  return true;
};

const getFormatTime = (totalTimeStamp: number) => {
  const timeArr = ["00", "00", "00"];
  let totalTimeStampTemp = Math.floor(totalTimeStamp / 1000);
  let flag = 2;
  while (totalTimeStampTemp > 0) {
    timeArr[flag--] = String(Math.floor(totalTimeStampTemp % 60)).padStart(
      2,
      "0"
    );
    totalTimeStampTemp = Math.floor(totalTimeStampTemp / 60);
  }
  return timeArr.join(":");
};

const getFormatUserTime = (records: IRecord[]) => {
  const map = new Map<IFieldValue, number>();
  for (const record of records) {
    const username = record.fields.username;
    const stamp = record.fields.timeStamp;
    map.set(username, (map.get(username) || 0) + Number(stamp));
  }
  const data: {
    username: IFieldValue;
    time: string;
    totalTimeStampTemp: number;
  }[] = [];
  for (const [key, value] of map) {
    data.push({
      username: key,
      time: getFormatTime(value),
      totalTimeStampTemp: value,
    });
  }
  return data;
};

export { vika, getResult, getFormatTime, getFormatUserTime, passToken };
