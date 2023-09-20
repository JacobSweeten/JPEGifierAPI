# JPEGifier

## Hosting
Install dependencies with `npm install` and run with `node index.js`. Tested on NodeJS version 16.13.0 and 20.7.0.

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
Build image: `docker build . -t jpegifier`

Run daemon: `docker run -d --name jpegifier -p8000:8000 jpegifier node index.js`

## Example Output
![](./example.png)