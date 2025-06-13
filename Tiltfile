docker_build('kong:local-dev', '.', dockerfile='./docker/Dockerfile')

local_resource(
    'generate-kong-configmap',
    'cmd /c generate-kong-configmap.sh',
    deps=['config/kong.yml', 'generate-kong-configmap.sh'],
)

local_resource(
    'restart-kong',
    'kubectl rollout restart deployment kong',
    deps=['k8s/kong-configmap.yaml'],
    resource_deps=['generate-kong-configmap'],
)

k8s_yaml(['k8s/kong-configmap.yaml', 'k8s/kong-deployment.yaml'])

watch_file('config/kong.yml')

k8s_resource(
    'kong',
    port_forwards=[8000, 8001],
    extra_pod_selectors=[{'app': 'kong'}],
    resource_deps=['restart-kong']
)