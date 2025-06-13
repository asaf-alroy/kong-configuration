#!/bin/bash
set -e

kubectl delete deployment kong --ignore-not-found
kubectl delete service kong-proxy --ignore-not-found
kubectl delete configmap kong-config --ignore-not-found

docker rmi kong:local-dev || true