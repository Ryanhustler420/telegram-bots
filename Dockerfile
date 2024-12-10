FROM node:18-alpine

ARG ADMIN_PASSWORD=abcdef
ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

# Set environment variables
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}
ENV PORT=3000

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g pm2

COPY . .

EXPOSE ${PORT}
CMD ["node", "index.js"]