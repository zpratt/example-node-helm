# example-node-helm

## Getting started

1. `helm create node-app -n node-app-example`
2. `kind create cluster --config cluster-config.yaml`
3. `docker build . -t example-node-helm:1.0.0`
4. `kind load docker-image example-node-helm:1.0.0`
5. `helmfile apply`