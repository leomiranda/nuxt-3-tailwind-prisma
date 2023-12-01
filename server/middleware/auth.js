import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '../utils/jwt';
import { createError, sendError } from 'h3';
import { getUserById } from '../db/users';

export default defineEventHandler(async (event) => {
	const endpoints = ['/api/auth/user'];

	const isHandledByThisMiddleware = endpoints.some((endpoint) => {
		const pattern = new UrlPattern(endpoint);

		console.log(
			'🚀 ~ file: auth.js:12 ~ isHandledByThisMiddleware ~ event.node.req.url:',
			event.node.req.url
		);
		return pattern.match(event.node.req.url);
	});

	console.log(
		'🚀 ~ file: auth.js:19 ~ defineEventHandler ~ isHandledByThisMiddleware:',
		isHandledByThisMiddleware
	);
	if (!isHandledByThisMiddleware) {
		return;
	}
	console.log(
		'🚀 ~ file: auth.js:23 ~ defineEventHandler ~ event.node.req.headers:',
		event.node.req.headers
	);
	console.log(
		"🚀 ~ file: auth.js:31 ~ defineEventHandler ~ event.node.req.headers['authorization']:",
		event.node.req.headers['authorization']
	);

	console.log('headers', event.node.req.headers.authorization);

	const token = event.node.req.headers['authorization'].split(' ')[1];
	const decodedToken = decodeAccessToken(token);
	console.log('🚀 ~ file: auth.js:24 ~ defineEventHandler ~ decodedToken:', decodedToken);

	if (!decodedToken) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Unauthorized',
			})
		);
	}

	try {
		const userId = decodedToken.userId;
		console.log('🚀 ~ file: auth.js:52 ~ defineEventHandler ~ userId:', userId);
		const user = await getUserById(userId);
		console.log('🚀 ~ file: auth.js:34 ~ defineEventHandler ~ user:', user);

		event.context.auth = {
			user,
		};
	} catch (error) {
		return;
	}
});
