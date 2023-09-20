const https = require("https");
const fs = require("fs");

imageFile = fs.readFileSync("./image.jpg");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

httpsOptions = {
	host: "localhost",
	port: 8000,
	path: "/jpegify",
	method: "POST",
	headers: {
		"Content-Type": "image/jpeg"
	}
}

req = https.request(httpsOptions, (res) => {

	var dataBuffer = undefined;

	res.on("data", (data) => {
		if(dataBuffer == undefined)
		{
			dataBuffer = data;
		}
		else
		{
			dataBuffer = Buffer.concat([dataBuffer, data]);
		}
	});

	res.on("end", () => {
		fs.writeFileSync("./out.jpeg", dataBuffer);
	});
});

req.write(imageFile);
req.end();