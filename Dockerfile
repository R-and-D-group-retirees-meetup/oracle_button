FROM node:10.10.0
LABEL mainainer="hieki <ksakahieki@gmail.com>"

ENV ORA_ROOT /usr/src/oracle_button/
WORKDIR $ORA_ROOT

COPY ./package.json $ORA_ROOT

RUN yarn --version && \
    yarn install
