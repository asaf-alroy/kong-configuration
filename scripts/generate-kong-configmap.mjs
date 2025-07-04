import { execSync } from 'child_process';
import fs from 'fs';

const output = 'output/kong-configmap.yaml';
const configMapName = 'kong-config';
const kongYml = 'config/kong.yml';

try {
    const stdout = execSync(
        `kubectl create configmap ${configMapName} --from-file=${kongYml} --dry-run=client -o yaml`
    );
    fs.writeFileSync(output, stdout);
    console.log('Successfully generated Kong ConfigMap');
    process.exit(0);
} catch (error) {
    console.error('Failed to generate Kong ConfigMap:', error.message);
    process.exit(1);
}