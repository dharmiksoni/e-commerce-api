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

ENV TZ="Asia/Kolkata"

ENV HOST=127.0.0.1
ENV MONGODB_ENCRYPTION_SECRET=hybr1d
ENV MONGODB_ENCRYPTION_SALT=9dc92f87026d98e0b7aaefc4ecc89f7d
ENV JWT_TOKEN_SECRET=XLkopAmoEbeG9N0esV4O3hp9QWUZBc7c
ENV MONGO_URI='mongodb+srv://colonel:ZbJjxAExOCLZqcJh@hybr1d.rvbmqrl.mongodb.net/hybr1d?retryWrites=true&w=majority'

# Expose port 3000
ENV PORT=3001
ENV NODE_ENV='production'
# EXPOSE PORT=3000
EXPOSE 2222 80 3001

CMD ["node", "server.js"]
# Start pm2 using the ecosystem.config.js file
# RUN npm install pm2 -g
# COPY startup.sh /usr/local/bin/startup.sh
# RUN chmod +x /usr/local/bin/startup.sh
# ENTRYPOINT [ "/usr/local/bin/startup.sh" ]
