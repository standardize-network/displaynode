# displaynode
_node monitoring and blockchain explorer_

### Before you start:

Display node is meant to be used together with [querynode](https://github.com/standardize-network/querynode)!
The querynode instance retrieves data from the Jörmungandr Rest API and the display node is receiving them. We will make it optional to use it standalone in near future.

The displaynode can be used locally, to check your node stats and Blockchain info or as a Website, to make it publicly available.

## Set up your displaynode instance

```bash
# Clone the repo locally, or to a webserver
git clone https://github.com/standardize-network/displaynode.git

# specify your QUERYNODE public IP and PORT in the `nuxt.config.js` file
cd displaynode
nano nuxt.config.js

# in this object:
proxy: {
  '/api/': { target: 'http://QUERYNODE-IP:QUERYNODE-PORT', pathRewrite: {'^/api/': ''} },
},

# install dependencies
npm install

# starting your server
npm run dev
```

You can find your displaynode: **`http://localhost:8080`**, or just change `localhost` in `package.json` file.
