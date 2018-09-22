FROM node:10.10.0

ENV ORA_ROOT /usr/src/oracle_button/
WORKDIR $ORA_ROOT

COPY ./package.json /usr/src/oracle_button/

RUN yarn --version && \
    yarn install
