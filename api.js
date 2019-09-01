// https://koajs.com/
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// https://github.com/godaddy/kubernetes-client
const {Client} = require('kubernetes-client');
const client = new Client({ version: '1.10' });

router.get('/api/v1/namespaces', async (ctx, next) => {
  ctx.body = await client.api.v1.namespaces.get();
});
router.get('/api/v1/namespaces/:name/services', async (ctx, next) => {
  ctx.body = await apis.apps.v1.namespaces(ctx.params.name).services.get();
});
router.get('/api/v1/namespaces/:name/deployments', async (ctx, next) => {
  ctx.body = await apis.apps.v1.namespaces(ctx.params.name).deployments.get();
});
router.get('/api/v1/namespaces/:name/pods', async (ctx, next) => {
  ctx.body = await apis.apps.v1.namespaces(ctx.params.name).pods.get();
});
router.get(
  '/api/v1/namespaces/:name/replicationcontrollers',
  async (ctx, next) => {
    ctx.body = await apis.apps.v1
      .namespaces(ctx.params.name)
      .replicationcontrollers.get();
  }
);
router.get('/api/v1/nodes', async (ctx, next) => {
  ctx.body = await client.api.v1.nodes.get();
});
router.get('/api/v1/nodes/:name', async (ctx, next) => {
  ctx.body = await client.api.v1.nodes(ctx.params.name).get();
});

app.use(router.routes());

app.use(async ctx => {
  ctx.body = {
    name: 'This is k8s ui',
    api: ['/api/v1/namespaces', '/api/v1/nodes']
  };
});

app.listen(3001, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3001');
});
