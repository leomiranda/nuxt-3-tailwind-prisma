import { createError, sendError } from 'h3';
import { getRefreshTokenByToken } from '~/server/db/refreshTokens';
import { getUserById } from '~/server/db/users';
import { decodeRefreshToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
	const cookies = parseCookies(event);
	const refreshToken = cookies?.refresh_token;

	if (!refreshToken) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Unauthorized',
			})
		);
	}

	const databaseRefreshToken = await getRefreshTokenByToken(refreshToken);

	if (!databaseRefreshToken) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Unauthorized',
			})
		);
	}

	const token = decodeRefreshToken(refreshToken);

	try {
		const user = await getUserById(token.userId);
		const { accessToken } = generateTokens(user);

		return {
			access_token: accessToken,
		};
	} catch (error) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Unauthorized',
			})
		);
	}

	return {
		access_token,
	};
});
