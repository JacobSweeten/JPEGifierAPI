mkdir keys
openssl req -x509 -newkey rsa:4096 -sha512 -days 3650 -nodes -keyout ./keys/key -out ./keys/key.crt
