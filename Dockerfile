FROM node:fermium
LABEL Nataliza González <nataliagonzalezjunco@gmail.com>

ENV TZ=America/Bogota
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /api-app
COPY ./package.json ./package.json
RUN npm install --production-only

COPY ./ ./
CMD npm start
EXPOSE 5000
