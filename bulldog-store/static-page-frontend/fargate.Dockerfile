FROM node:14

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  ./aws/install

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV NODE_ENV=production
ENV S3_BUCKET=test
ENV S3_PREFIX=
ENV API_URL=

CMD ./build.sh
