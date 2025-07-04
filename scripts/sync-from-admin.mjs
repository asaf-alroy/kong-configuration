import { execSync } from 'child_process';

const OUTPUT_FILE = 'config/kong.yml';
const KONG_ADMIN_URL = 'http://localhost:8001';

const syncConfiguration = () => {
    execSync(`deck gateway dump --kong-addr ${KONG_ADMIN_URL} --output-file ${OUTPUT_FILE} --yes`, { encoding: 'utf8' });
}

setInterval(() => {
    try {
        syncConfiguration();
        console.log(`Configuration synced to ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('Failed to sync configuration:', error.message);
    }
}, 2000);