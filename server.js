const functions  = require('firebase-functions')
const { default: next } = require('next')

const config = require("./next.config");
const dev = process.env.NODE_ENV !== "production";

const app = next({
	dev: dev,
	conf: config,
});
const handle = app.getRequestHandler()

const server = functions.https.onRequest((req, res) => {
	console.log("File: " + req.originalUrl);
	return app.prepare().then(() => handle(req, res));
});

exports.nextjs = { server };
