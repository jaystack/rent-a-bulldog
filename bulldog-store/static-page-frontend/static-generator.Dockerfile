FROM node:14

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  ./aws/install

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV S3_BUCKET=bulldoglocaltest
ENV S3_PREFIX=
ENV API_URL=https://bulldog-api.jaystack.codes

CMD ./build.sh
