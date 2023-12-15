FROM node:18-alpine
COPY . .
WORKDIR /app
RUN npm install
CMD ["npm", "start"]
EXPOSE 5000