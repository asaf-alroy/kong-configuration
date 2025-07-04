docker_build('kong:local-dev', '.', dockerfile='Dockerfile')

k8s_yaml(kustomize('k8s/'))

local_resource(
    'sync-to-db',
    'node scripts/sync-to-db.mjs',
    resource_deps=['kong'],
    deps=['config/kong.yml', 'scripts/sync-to-db.mjs'],
    labels=["sync"]
)

local_resource(
    'sync-from-admin',
    serve_cmd='node scripts/sync-from-admin.mjs',
    resource_deps=['kong'],
    deps=['scripts/sync-from-admin.mjs'],
    labels=["sync"]
)

local_resource(
    'generate-kong-configmap',
    'node scripts/generate-kong-configmap.mjs',
    deps=['config/kong.yml', 'scripts/generate-kong-configmap.mjs'],
    labels=["scripts"]
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