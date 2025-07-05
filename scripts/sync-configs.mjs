import { execSync } from 'child_process';
import fs from 'fs';

const KONG_ADMIN_URL = 'http://localhost:8001';
const KONG_CONFIG_FILE = 'config/kong.yml';
const CONFIGMAP_OUTPUT = 'output/kong-configmap.yaml';
const CONFIGMAP_NAME = 'kong-config';

const syncConfigs = () => {
    try {
        console.log(`Syncing configuration from Kong admin to ${KONG_CONFIG_FILE}`);
        execSync(`deck gateway dump --kong-addr ${KONG_ADMIN_URL} --output-file ${KONG_CONFIG_FILE} --yes`, { encoding: 'utf8' });
        console.log(`Configuration synced to ${KONG_CONFIG_FILE}`);
        
        console.log('Generating Kong ConfigMap');
        const stdout = execSync(`kubectl create configmap ${CONFIGMAP_NAME} --from-file=${KONG_CONFIG_FILE} --dry-run=client -o yaml`);
        fs.writeFileSync(CONFIGMAP_OUTPUT, stdout);
        console.log('Successfully generated Kong ConfigMap');
    } catch (error) {
        console.error('Failed to sync configurations:', error.message);
    }
};

setInterval(() => {
    syncConfigs();
}, 2000);
