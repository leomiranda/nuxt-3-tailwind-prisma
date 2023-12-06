import { prisma } from '.';

export const createTweet = (tweet) => {
	return prisma.tweet.create({ data: tweet });
};

export const getTweets = (params = {}) => {
	return prisma.tweet.findMany({
		...params,
	});
};

export const getTweetById = (tweetId, params = {}) => {
	return prisma.tweet.findUnique({
		...params,
		where: {
			...params.where,
			id: tweetId,
		},
	});
};
