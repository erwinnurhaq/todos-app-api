const cache = require('memory-cache');

const memCache = new cache.Cache();

const cacheMiddleware = (duration) => (req, res, next) => {
  const key = `__express__${req.originalUrl || req.url}${JSON.stringify(req.query)}${JSON.stringify(req.body)}`;
  const cacheContent = memCache.get(key);
  if (cacheContent) {
    return res.send(cacheContent);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      memCache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = cacheMiddleware