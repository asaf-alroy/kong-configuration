docker_build('kong:local-dev', '.', dockerfile='Dockerfile')

k8s_yaml(kustomize('k8s/'))

local_resource(
    'generate-kong-configmap',
    'node scripts/combine-kong-configs.mjs && node scripts/generate-kong-configmap.mjs',
    deps=['config/', 'scripts/generate-kong-configmap.mjs'],
    labels=["scripts"]
)

local_resource(
    'restart-kong',
    'kubectl rollout restart deployment kong',
    resource_deps=['kong'],
    deps=['k8s/'],
    labels=["scripts"]
)

k8s_resource(
    'kong',
    port_forwards=[8000, 8001],
    extra_pod_selectors=[{'app': 'kong'}],
    labels=["applications"]
)