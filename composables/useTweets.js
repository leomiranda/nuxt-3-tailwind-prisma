export default () => {
	const postTweet = (formData) => {
		const form = new FormData();

		form.append('text', formData.text);
		formData.mediaFiles.forEach((file, index) => {
			form.append(`media_file_${index}`, file);
		});

		return new Promise(async (resolve, reject) => {
			try {
				const data = await useFetchApi('/api/user/tweets', {
					method: 'POST',
					body: form,
				});
				console.log('🚀 ~ file: useTweets.js:13 ~ returnnewPromise ~ data:', data);

				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	return {
		postTweet,
	};
};
