# JPEGifier

## Usage
Make an HTTPS POST request to port 8000 with the following settings:
- URL: /jpegify
- Content-Type Header: "image/png" or "image/jpeg"

The server will reply with the JPEGified image.

## Requirements
- NodeJS
- Jimp