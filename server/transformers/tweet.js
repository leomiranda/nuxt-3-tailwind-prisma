import { mediaFileTransformer } from './mediaFiles';
import { userTransformer } from './user';
import humanTime from 'human-time';

export const tweetTransformer = (tweet) => {
	console.log('🚀 ~ file: tweet.js:16 ~ tweetTransformer ~ tweet:', tweet);
	return {
		id: tweet.id,
		text: tweet.text,
		mediaFiles: !!tweet.mediaFiles
			? tweet.mediaFiles.map((mediaFile) => mediaFileTransformer(mediaFile))
			: [],
		author: !!tweet.author ? userTransformer(tweet.author) : null,
		replies: !!tweet.replies ? tweet.replies.map((reply) => tweetTransformer(reply)) : [],
		replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
		repliesCount: !!tweet.replies ? tweet.replies.length : 0,
		postedAtHumanTime: humanTime(tweet.createdAt),
	};
};
