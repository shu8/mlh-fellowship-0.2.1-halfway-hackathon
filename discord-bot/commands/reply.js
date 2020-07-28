const fetch = require("node-fetch");
const config = require("../config");
const { EC2_BOT_REPLY_URL } = require("../constants");

module.exports = {
	name: "reply",
	description: "Sends a reply through the bot",
	async execute(message, args) {
		const reply = args.join(" ");

		try {
			await fetch(EC2_BOT_REPLY_URL, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					secret: config.sendMessageSecret,
					message: reply,
				}),
			});
		} catch (error) {
			message.channel.send("Uh oh, something failed miserably.");
			console.log(error);
		}
	},
};