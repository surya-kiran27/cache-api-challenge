function getEnvironment() {
  switch (process.env.NODE_ENV) {
    case "local":
      return "./env/local.env";
    case "development":
      return "./env/dev.env";
    case "production":
      return "./env/prod.env";
    default:
      return "./env/local.env";
  }
}
module.exports = getEnvironment;
