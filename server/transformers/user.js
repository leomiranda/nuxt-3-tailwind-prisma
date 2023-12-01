export const userTransformer = (user) => {
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		name: user.name,
		profileImage: user.profileImage,
	};
};
