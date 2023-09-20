# JPEGifier

## Hosting
Install dependencies with `npm install` and run with `node index.js`. Tested on NodeJS version 16.13.0.

## Usage
Make an HTTPS POST request to port 8000 with the following settings:
- URL: /jpegify
- Content-Type Header: "image/png" or "image/jpeg"

The server will reply with the JPEGified image.

## Requirements
- NodeJS
- Jimp (via npm)
- Docker (Optional)