import { Vika } from "@vikadata/vika";
import type { Response } from "@netlify/functions/dist/function/response";

const vika = new Vika({ token: "uskwJCD2UzYxJ81qvxRfceO" });
const getResult = (): Response => ({
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
});

export { vika, getResult };
