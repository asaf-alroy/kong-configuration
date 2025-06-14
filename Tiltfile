docker_build('kong:local-dev', '.', dockerfile='Dockerfile')

local_resource(
    'generate-kong-configmap',
    'node scripts/combine-kong-configs.cjs && bash scripts/generate-kong-configmap.sh',
    deps=['config/', 'scripts/generate-kong-configmap.sh'],
    labels=["scripts"]
)

k8s_yaml(kustomize('k8s/'))

local_resource(
    'restart-kong',
    'kubectl rollout restart deployment kong',
    deps=['k8s/'],
    resource_deps=['generate-kong-configmap'],
    labels=["scripts"]
)

k8s_resource(
    'kong',
    port_forwards=[8000, 8001],
    extra_pod_selectors=[{'app': 'kong'}],
    resource_deps=['restart-kong'],
    labels=["applications"]
)