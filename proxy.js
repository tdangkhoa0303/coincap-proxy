require('dotenv').config();

const express = require('express');
const morgan = require("morgan");
const {createProxyMiddleware} = require('http-proxy-middleware');
const cors = require('cors');

// Create Express Server
const app = express();

// CORS Configuration
app.use(cors());

// Configuration
const PORT = process.env.PORT | 1402;
const API_SERVICE_URL = "https://pro-api.coinmarketcap.com";

// Logging
app.use(morgan('dev'));

// Proxy endpoints
app.use('/v1/cryptocurrency/listings/latest', createProxyMiddleware({
	target: API_SERVICE_URL,
	headers: {
		'X-CMC_PRO_API_KEY': process.env.COINCAP_API_KEY
	},
	changeOrigin: true,
}));

app.use('/', (_, res) => {
	res.send('Hello World')
});

// Start Proxy
app.listen(PORT, () => {
	console.log(`Starting Proxy on port ${PORT}`);
});