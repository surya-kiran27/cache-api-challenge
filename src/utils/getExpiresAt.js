function getExpiresAt() {
  return Date.now() + (process.env.CACHE_TTL * 60000);
  // convert TTL(TIME TO LIVE) to milliseconds and add to current time
}

module.exports = getExpiresAt;
