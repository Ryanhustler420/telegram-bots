FROM node:18-alpine

ARG ADMIN_PASSWORD=abcdef
ARG NODE_ENV=development
ARG SUPABASE_URL=https://url.supabase.co
ARG SUPABASE_ANON_KEY=jwt.goes.here

ENV NODE_ENV=${NODE_ENV}

# Set environment variables
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}
ENV PORT=3000
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g nodemon
RUN npm install -g pm2

COPY . .

EXPOSE ${PORT}
CMD ["nodemon", "index.js"]