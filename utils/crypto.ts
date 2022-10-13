import crypto from "crypto";

const SECRET_KET = "Q@*!Lk[-_!38f$T";

function md5(content: string) {
  const md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
}

function genPassword(password: string) {
  const str = `password=${password}&key=${SECRET_KET}`;
  return md5(str);
}

export { genPassword };
