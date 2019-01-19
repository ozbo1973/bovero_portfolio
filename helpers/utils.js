export const getCookieFromReq = (req, cookieKey) => {
  const cookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith(`${cookieKey}`));

  if (!cookie) {
    return undefined;
  }
  return cookie.split("=")[1];
};

export const properName = val => {
  const label = val
    .split("")
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join("");
  return label;
};

export const pickObj = (obj, fields) => {
  if (!obj) {
    return undefined;
  }
  return Object.entries(obj).reduce((acc, nxt) => {
    if (fields.includes(nxt[0])) {
      acc[nxt[0]] = nxt[1];
    }
    return acc;
  }, {});
};
