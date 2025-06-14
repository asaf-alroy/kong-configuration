#!/bin/bash
set -e

kubectl create configmap kong-config \
  --from-file=kong.yml=output/kong.yml \
  --dry-run=client -o yaml > k8s/kong-configmap.yaml