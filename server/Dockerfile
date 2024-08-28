FROM node:20-bullseye-slim

WORKDIR /app

COPY package*.json ./
COPY ./prisma .

RUN npm i

RUN npx prisma generate
COPY . .
RUN npm run build
EXPOSE 3001


CMD ["npm", "start"]
