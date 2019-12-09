# example-node-helm

## Getting started

1. `helm create node-app -n node-app-example`
2. `kind create cluster --config cluster-config.yaml`
3. `docker build . -t example-node-helm:1.0.0`
4. `kind load docker-image example-node-helm:1.0.0`
5. `cd init-with-csr && docker build . -t init-with-csr:1.0.7`
6. `kind load docker-image init-with-csr:1.0.7`
7. `cd ..`
8. `helmfile apply`
9. `kubectl certificate approve test-csr`
10. view the approved certificate: `kubectl get csr test-csr -o jsonpath='{.status.certificate}' | base64 -D`

## Notes

* the key will be needed to create the tls secret for the webhook after the cert was extracted
  * this is generated in the init container and written to the tmp filesystem
* it might be possible to use a helm pre-install hook to do all this magic before the main deployment is ran
  * according to the helm docs, a job can be ran as part of the pre-install and post-install processes
* looks like a webhook can be created with an empty ca bundle

## Idea

* an init container for a job can create the CSR and then write the key to a mounted volume
* the main container of a job can then mount the volume where the key was written and wait until the CSR is approved
* once the CSR is approved:
  * a secret containing the key and signed cert can be created
  * the cluster ca bundle can then be extracted and patched into the webhook configuration
  * this might be possible to as a post install step..
    * if the post install job can list config maps in kube-system and patch webhooks, then it will be able to complete the setup

## Problems

* init containers do not get a separate service account to run in therefore, the separate permissions needed to create the CSR need to be apply to a job instead
  * might be able to use a service account projection with more research as an alternative
