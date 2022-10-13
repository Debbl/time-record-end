import jwt from "jsonwebtoken";

const SECRET_KET = "Q@*!Lk[-_!38f$T";

function createToken(payload: object | string) {
  return jwt.sign(payload, SECRET_KET, {
    expiresIn: "30d",
  });
}

function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KET, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export { createToken, verifyToken };
