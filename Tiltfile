docker_build('kong:local-dev', 'docker')

k8s_yaml(kustomize('k8s/'))

local_resource(
    'sync-to-db',
    'deck gateway sync --kong-addr http://localhost:8001 --state config/kong.yml',
    resource_deps=['kong'],
    labels=["sync"]
)

local_resource(
    'sync-configs',
    serve_cmd='node scripts/sync-configs.mjs',
    resource_deps=['kong', 'sync-to-db'],
    deps=['scripts/sync-configs.mjs'],
    labels=["sync"]
)

k8s_resource(
    'postgres',
    labels=["database"]
)

k8s_resource(
    'kong',
    resource_deps=['postgres'],
    port_forwards=[8000, 8001, 8002],
    extra_pod_selectors=[{'app': 'kong'}],
    labels=["applications"]
)