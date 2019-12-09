FROM alpine:3.10.3

RUN apk --no-cache update \
  && apk --no-cache upgrade --available \
  && sync \
  && apk add --no-cache openssl curl gettext \
  && curl -L -o /usr/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/v1.16.3/bin/linux/amd64/kubectl \
  && chmod +x /usr/bin/kubectl \
  && mkdir -p /usr/src/util

WORKDIR /usr/src/util

COPY csr.conf .
COPY csr.yaml .
COPY make-csr.sh .

ENTRYPOINT ["./make-csr.sh"]