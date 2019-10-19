# displaynode
_node monitoring and blockchain explorer_

Find a [DEMO](standardize.network) on our website!

### Before you start:

This is a node.js application to monitor Jörmungandr testnet data. It can be used either on the same machine the Jörmungandr-node is running, or on every remote server in connection with a [querynode](https://github.com/standardize-network/querynode) instance. This is useful if you want to monitor your node locally, with Jörmungandr on a server somewhere, or if host the displaynode somewhere else, e.g. on a webserver.

## Set up your displaynode instance

```bash
# Clone the repo locally, or to a webserver
git clone https://github.com/standardize-network/displaynode.git

# install dependencies
cd displaynode
npm install
```

#### Standalone mode:

Displaynode is standalone by default, you only need to check wether youre Rest api is available on the default port `3101` and install it on the same machine as the Jörmungandr-node.

If your Rest api Port is different, change it in `nuxt.config.js` file, for `localapi`

```js
...
proxy: {
  '/api/': { target: 'http://QUERYNODE-IP:QUERYNODE-PORT', pathRewrite: {'^/api/': ''} },
  '/localapi/': { target: 'http://127.0.0.1:3101', pathRewrite: {'^/localapi/': ''} },
},
...
```

```bash
# starting your server
npm run dev

# or for productive use
npm run build && npm run start
```

#### Remote mode:

If you want displaynode on a seperate machine, you have to install [querynode](https://github.com/standardize-network/querynode) on the Jörmungandr-node machine and connect it to displaynode. The settings to switch between modes can be found in `/store/state.js` in an object that looks like this:

```js
settings: {
  refreshInterval: 20,
  refreshEnabled: true,
  nodeMonitorEnabled: true,
  explorerEnabled: true,
  standalone: true
},
```

Just set standalone to false and specify your querynode public IP like follows:

```bash
# specify your QUERYNODE public IP and PORT in the `nuxt.config.js` file
nano nuxt.config.js

# in this object:
proxy: {
  '/api/': { target: 'http://QUERYNODE-IP:QUERYNODE-PORT', pathRewrite: {'^/api/': ''} },
  '/localapi/': { target: 'http://127.0.0.1:3101', pathRewrite: {'^/localapi/': ''} },
},

# starting your server
npm run dev

# or for productive use
npm run build && npm run start
```

You can find your displaynode: **`http://localhost:8080`**, or just change `localhost` to your public IP in `package.json` file, when you're accessing it remote.
