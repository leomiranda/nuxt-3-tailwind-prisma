import bcryptjs from 'bcryptjs';
import { userTransformer } from '~/server/transformers/user';
import { getUserByUsername } from '~/server/db/users';
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt';
import { createRefreshToken } from '~/server/db/refreshTokens';
import { createError, sendError } from 'h3';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { username, password } = body;

	if (!username || !password) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Missing required fields',
			})
		);
	}

	const user = await getUserByUsername(username);

	if (!user) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Invalid username or password',
			})
		);
	}

	const passwordMatch = await bcryptjs.compareSync(password, user.password);

	if (!passwordMatch) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Invalid username or password',
			})
		);
	}

	const { accessToken, refreshToken } = generateTokens(user);

	await createRefreshToken({
		userId: user.id,
		token: refreshToken,
	});

	sendRefreshToken(event, refreshToken);

	return {
		user: userTransformer(user),
		access_token: accessToken,
	};
});
