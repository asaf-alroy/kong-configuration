# Tiltfile for local Kong Gateway development

# 1. Build the Kong image
docker_build('kong:local-dev', '.', dockerfile='./docker/Dockerfile')

# 2. Generate the ConfigMap from kong.yml before applying manifests
local_resource(
    'generate-kong-configmap',
    'cmd /c generate-kong-configmap.sh',
    deps=['config/kong.yml', 'generate-kong-configmap.sh'],
)

# 2b. Rollout restart Kong deployment after ConfigMap changes
local_resource(
    'restart-kong',
    'kubectl rollout restart deployment kong',
    deps=['k8s/kong-configmap.yaml'],
    resource_deps=['generate-kong-configmap'],
)

# 3. Apply Kubernetes manifests (ensure ConfigMap is generated first)
k8s_yaml(['k8s/kong-configmap.yaml', 'k8s/kong-deployment.yaml'])

# 4. Watch for changes in kong.yml and regenerate ConfigMap
watch_file('config/kong.yml')


# 6. Show useful Tilt UI links
k8s_resource(
    'kong',
    port_forwards=[8000, 8001],
    extra_pod_selectors=[{'app': 'kong'}],
    resource_deps=['restart-kong']
)

# 7. (Optional) Add documentation or instructions for developers
print("Tilt is running. Edit config/kong.yml and Tilt will update your cluster!")