# First Statge we need to use node as our base image
FROM node:alpine3.14 as firststage 
# Create app directory that will contain the source code
RUN mkdir -p /app
# Set the working directory to /app
WORKDIR /app
# we use package.jason to insall dependecies so we coppied it to /app
COPY package*.json /app/
# Install dependencies (to install node_modules files)
RUN npm install \
    npm install bootstrap
# Copy the source code to the working directory
COPY . /app/
# Build the app in production mode
RUN npm run build --prod

# Second Stage we need to use nginx(WEB SERVER TO RUN OUR ANGULAR APP) as our base image
FROM nginxinc/nginx-unprivileged 
# Copy the build output from the first stage to the nginx public folder 
COPY --from=firststage /app/dist/front-end /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080