import { prisma } from '.';

export const createTweet = (tweet) => {
	return prisma.tweet.create({ data: tweet });
};
