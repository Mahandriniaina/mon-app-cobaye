FROM node:18-alpine
WORKDIR /app
COPY package*.json ./   
RUN npm ci --only=production
COPY . . 
EXPOSE 3000
ENV NODE _ENV=production
CMD ["node", "app.js"]