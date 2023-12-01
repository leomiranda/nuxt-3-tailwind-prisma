import { prisma } from '.';
import bcryptjs from 'bcryptjs';

export const createUser = (userData) => {
	const finalUserData = {
		...userData,
		password: bcryptjs.hashSync(userData.password, 10),
	};
	return prisma.user.create({
		data: finalUserData,
	});
};

export const getUserByUsername = (username) => {
	return prisma.user.findUnique({
		where: {
			username,
		},
	});
};

export const getUserById = (id) => {
	return prisma.user.findUnique({
		where: {
			id,
		},
	});
};
