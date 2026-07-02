FROM node:lts-slim AS builder

WORKDIR /homesApp

RUN npm install -g @angular/cli

COPY ./homesApp/package*.json ./

RUN npm ci

COPY ./homesApp/ ./

RUN ng build --configuration=production

#Alterate calls from inside Angular services towards /api to make them point to localhost INSIDE the container, not to the host machine.
#This is because the backend server will be running inside the same container, so we need to point to localhost instead of the host machine's IP address.

COPY ./nginx.conf /nginx.conf

FROM nginx:stable AS runner

EXPOSE 80

COPY --from=builder /homesApp/dist /usr/share/nginx/html

COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf
