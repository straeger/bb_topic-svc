mod = require('@nestjs/microservices');

(async () => {
  const client = new mod.ClientTCP({
    host: '127.0.0.1',
    port: 8080,
  });

  await client.connect();

  const pattern = { cmd: 'create' };
  const data = {
    name: 'test from client',
    description: 'Lorem Ipsum dollar sit amed',
  };
  const result = await client.send(pattern, data).toPromise();
  console.log(result);

  const pattern1 = { cmd: 'get' };
  const result1 = await client.send(pattern1, {}).toPromise();
  console.log(result1);
})();
