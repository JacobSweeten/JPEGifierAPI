const https = require("https");
const fs = require("fs");

const Jimp = require("jimp");

var privateKey = "";
var publicKey = "";

try
{
	privateKey = fs.readFileSync("./keys/key", "utf-8");
	publicKey = fs.readFileSync("./keys/key.crt", "utf-8");
}
catch(e)
{
	console.error("Failed to read key files.");
	process.exit(1);
}

httpConfig = {
	key: privateKey,
	cert: publicKey
};

const server = https.createServer(httpConfig, (req, res) => {
	if(req.url.toLowerCase().match(/^\/?jpegify$/))
	{
		if(!("content-type" in req.headers))
		{
			res.writeHead(400);
			res.end("400 Bad Request");
			return;
		}

		if(req.method != "POST" || !req.headers["content-type"].match(/image\/(png|jpeg)/))
		{
			res.writeHead(400);
			res.end("400 Bad Request");
			return;
		}

		var dataBuffer = undefined;

		req.on("data", (data) => {
			if(dataBuffer == undefined)
			{
				dataBuffer = data;
			}
			else
			{
				dataBuffer = Buffer.concat([dataBuffer, data]);
			}
		});

		req.on("end", async () => {
			try
			{
				var jimpImage = await Jimp.read(dataBuffer);
				jimpImage = jimpImage.quality(0);
				originalWidth = jimpImage.bitmap.width;
				originalHeight = jimpImage.bitmap.height
				jimpImage = jimpImage.resize(originalWidth / 5, originalHeight / 5);
				jimpImage = jimpImage.resize(originalWidth, originalHeight, Jimp.RESIZE_NEAREST_NEIGHBOR);

				jimpImage = jimpImage.posterize(5);
				outImg = await jimpImage.getBufferAsync(Jimp.MIME_JPEG);
				
				res.setHeader("Content-Type", "application/jpeg");
				res.writeHead(200);
				res.end(outImg);
				return;
			}
			catch(e)
			{
				console.log(e);
				res.writeHead(500);
				res.end("500 Internal Server Error");
				return;
			}
		});		
	}
	else
	{
		res.writeHead(400);
		res.end("400 Bad Request");
	}
});

server.listen(8000);