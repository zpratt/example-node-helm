#!/bin/sh

set -eu

echo "INFO: Generating private key"
openssl genrsa -out /tmp/private-key.pem 2048

echo "INFO: Generating CSR"
openssl req -new -key /tmp/private-key.pem \
  -subj "/CN=example-node-helm-node-app.example-node-helm.svc" \
  -out "/tmp/server.csr" \
  -config ./csr.conf

export CSR_CONTENT=$(base64 < "/tmp/server.csr" | tr -d '\n')

cat csr.yaml | envsubst > /tmp/update.yaml

echo "INFO: Creating CSR"
kubectl apply -f /tmp/update.yaml
