FROM lambci/lambda:build-nodejs8.10
RUN yum install -y wget
COPY build_eccodes.sh .
RUN chmod +x build_eccodes.sh
RUN ./build_eccodes.sh
COPY package.json .
RUN npm install
ADD . .
WORKDIR /var/task
CMD npm run test