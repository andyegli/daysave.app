FROM node:22

WORKDIR /workspace

RUN apt-get update && apt-get install -y default-mysql-client npm && rm -rf /var/lib/apt/lists/*
RUN npm install -g npm@latest

EXPOSE 3000

CMD ["/bin/sh"]