import { prisma } from '.';

export const createTweet = (tweet) => {
	console.log('🚀 ~ file: tweets.js:4 ~ createTweet ~ tweet:', tweet);
	return prisma.tweet.create({ data: tweet });
};

export const getTweets = (params = {}) => {
	return prisma.tweet.findMany({
		...params,
	});
};
