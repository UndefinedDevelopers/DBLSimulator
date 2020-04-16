module.exports = (client) => {
	async () => {
		const bootchannel = client.channels.cache.find(c => c.id === "700328938609574049")
		let fetched;
		do {
			fetched = await bootchannel.fetchMessages({limit: 100});
			bootchannel.bulkDelete(fetched);
		}
		while(fetched.size >= 2);
	}
 	bootchannel.send("Looks like I am back online!")
}