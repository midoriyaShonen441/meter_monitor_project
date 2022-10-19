FROM mongo:latest

RUN mkdir -p /mongo_seed
WORKDIR /mongo_seed

COPY . .

RUN chmod +x ./import.sh
CMD [ "./import.sh" ]