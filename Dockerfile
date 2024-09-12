# Use the latest Node.js image as the base image
FROM node:18

# Create a directory for the application code
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies using npm 
RUN npm install
# RUN npm install --save-dev

COPY . .

# Build the application
# RUN npm run build

# RUN apt-get update \
# 	&& apt-get install -y --no-install-recommends dialog \
# 	&& apt-get install -y --no-install-recommends openssh-server \
# 	&& echo "root:Docker!" | chpasswd

# RUN apt-get update && \
# 	apt-get install -yq tzdata && \
# 	ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && \
# 	dpkg-reconfigure -f noninteractive tzdata
ARG HOST
ARG MONGODB_ENCRYPTION_SECRET
ARG MONGODB_ENCRYPTION_SALT
ARG JWT_TOKEN_SECRET
ARG MONGO_URI
ARG NODE_ENV
ARG PORT

ENV TZ="Asia/Kolkata"

ENV HOST=$HOST
ENV MONGODB_ENCRYPTION_SECRET=$MONGODB_ENCRYPTION_SECRET
ENV MONGODB_ENCRYPTION_SALT=$MONGODB_ENCRYPTION_SALT
ENV JWT_TOKEN_SECRET=$JWT_TOKEN_SECRET
ENV MONGO_URI=$MONGO_URI

# Expose port 3000
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
# EXPOSE PORT=3000
EXPOSE $PORT

CMD ["node", "server.js"]
# Start pm2 using the ecosystem.config.js file
# RUN npm install pm2 -g
# COPY startup.sh /usr/local/bin/startup.sh
# RUN chmod +x /usr/local/bin/startup.sh
# ENTRYPOINT [ "/usr/local/bin/startup.sh" ]
