# Step 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# Step 2: Serve the app using Nginx
FROM nginx:latest

# Copy the built Angular files to the Nginx HTML directory
COPY --from=build /app/dist/jobhunterfrontend /usr/share/nginx/html

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 5000 instead of 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
