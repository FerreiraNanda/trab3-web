FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
FROM nginx:stable-alpine AS production
RUN rm -rf /etc/nginx/conf.d
COPY default.conf /etc/nginx/conf.d/

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]