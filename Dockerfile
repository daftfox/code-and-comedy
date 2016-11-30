FROM node:7.1

COPY . /opt/code-and-comedy
WORKDIR /opt/code-and-comedy

RUN  chmod u+x entrypoint.sh

EXPOSE 3001
  
CMD ["./entrypoint.sh"]