module.exports = (client) => {
	client.channels.cache.find(c => c.id === "700328938609574049").send("I am online")
}