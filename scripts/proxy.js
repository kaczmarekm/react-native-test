const cors_proxy = require('cors-anywhere');

const run = async () => {
  const port = 8080;

  cors_proxy
    .createServer({
      originWhitelist: [],
      httpProxyOptions: {
        secure: false,
      },
    })
    .listen(port, 'localhost', () => {
      console.log(`Cors proxy running on localhost:${port}`);
    });
};

run();
