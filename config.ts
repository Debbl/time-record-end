import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
  override: true,
});

const VIKA_TOKEN = process.env.VIKA_TOKEN;

const USER_DATA_SHEET = "dstf2Lur3r2D7Zpz0v";

export { VIKA_TOKEN, USER_DATA_SHEET };
