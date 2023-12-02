import formidable from 'formidable';
import { createMediaFile } from '~/server/db/mediaFiles';
import { createTweet } from '~/server/db/tweets';
import { tweetTransformer } from '~/server/transformers/tweet';

export default defineEventHandler(async (event) => {
	const form = formidable({});

	const response = await new Promise((resolve, reject) => {
		form.parse(event.node.req, (err, fields, files) => {
			if (err) {
				reject(err);
			}
			resolve({ fields, files });
		});
	});

	const { fields, files } = response;

	const userId = event?.context?.auth?.user?.id;

	const tweetData = {
		text: fields.text[0],
		authorId: userId,
	};

	const tweet = await createTweet(tweetData);

	const filePromises = Object.keys(files).map(async (key) => {
		const file = files[key][0];
		const cloudinaryResource = await uploadToCloudinary(file.filepath);
		console.log('🚀 ~ file: index.post.js:32 ~ filePromises ~ response:', cloudinaryResource);

		return createMediaFile({
			url: cloudinaryResource.secure_url,
			providerPublicId: cloudinaryResource.public_id,
			userId,
			tweetId: tweet.id,
		});
	});

	await Promise.all(filePromises);

	return {
		tweet: tweetTransformer(tweet),
	};
});
