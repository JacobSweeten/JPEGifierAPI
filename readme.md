# JPEGifier

## Hosting
First, generate keys with genkeys.sh (will need to chmod first) or create a `keys` directory and install your server keys. Make sure to name them `key` and `key.crt`.

Then, install dependencies with `npm install` and run with `node index.js`. Tested on NodeJS version 16.13.0 and 20.7.0.

## Usage
Make an HTTPS POST request to port 8000 with the following settings:
- URL: /jpegify
- Content-Type Header: "image/png" or "image/jpeg"

The server will reply with the JPEGified image.

## Requirements
- NodeJS
- Jimp (via npm)
- Docker (Optional)

## Docker Commands
Follow the key generation steps from [Hosting](#hosting).

Build image: `docker build . -t jpegifier`

Run daemon: `docker run -d --name jpegifier -p8000:8000 jpegifier node index.js`

## Example Output
![](./example.png)

## Methodology
The methodology is simple. First, the image is scaled down to a fifth the size and scaled back up using the nearest-neighbor method. Then, a posterize filter is applied. It emulates the JPEG look pretty well, but it is not quite the same as exporting from Gimp at lowest settings. I find this to be a good enough approxmiation, especially for simple amusement.