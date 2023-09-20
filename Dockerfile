FROM debian

# Install NodeJS and create directories (See https://github.com/nodesource/distributions)
RUN apt update && \
	apt install -y ca-certificates curl gnupg && \
	mkdir -p /etc/apt/keyrings && \
	curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
	NODE_MAJOR=20 && \
	echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
	apt update && \
	apt install -y nodejs && \
	mkdir /server && \
	mkdir /server/keys

COPY index.js /server/index.js
COPY package.json /server/package.json
COPY keys/key server/keys/key
COPY keys/key.crt server/keys/key.crt

WORKDIR /server

RUN npm install