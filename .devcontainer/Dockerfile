FROM node:22

WORKDIR /workspace

RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

CMD ["/bin/sh"]