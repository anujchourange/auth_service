const JWT = require("jsonwebtoken");
const createError = require("http-errors");

exports.signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "24h",
      issuer: "anuj.com",
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error(err.message);
        return reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

exports.verifyAccessToken = (req, res, next) => {
  console.log(req.headers);
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const authToken = req.headers["authorization"];
  const token = authToken.split(" ")[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      next(createError.Unauthorized(message));
    }
    req.userId = payload;
    next();
  });
};
/*
module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "anuj.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.error(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authToken = req.headers["authorization"];
    const bearerToken = authToken.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "anuj.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.error(err.message);
          return reject(createError.InternalServerError());
        }

        client
          .set(userId, token, { EX: 365 * 24 * 60 * 60 })
          .then(resolve(token))
          .catch((err) => {
            console.log(err.message);
            reject(createError.InternalServerError);
          });
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userId = payload.aud;
          client
            .get(userId)
            .then((result) => {
              if (refreshToken === result) return resolve(userId);
              reject(createError.Unauthorized());
            })
            .catch((err) => {
              console.log(err.message);
              reject(createError.InternalServerError());
            });
        }
      );
    });
  },
};
*/
