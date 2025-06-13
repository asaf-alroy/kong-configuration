#!/bin/bash
set -e

# Generate ConfigMap manifest from config/kong.yml
kubectl create configmap kong-config \
  --from-file=kong.yml=config/kong.yml \
  --dry-run=client -o yaml > k8s/kong-configmap.yaml

echo "ConfigMap manifest generated at k8s/kong-configmap.yaml"