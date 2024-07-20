# Base Stage
FROM node:20.12.0-alpine AS base

RUN yarn workspaces focus --production --all

ENV WORKSPACE=${WORKSPACE}

CMD yarn workspace $WORKSPACE start
