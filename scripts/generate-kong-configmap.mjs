import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execAsync = promisify(exec);

const output = 'k8s/kong-configmap.yaml';
const configMapName = 'kong-config';
const kongYml = 'output/kong.yml';

async function generateConfigMap() {
    try {
        const { stdout } = await execAsync(
            `kubectl create configmap ${configMapName} --from-file=${kongYml} --dry-run=client -o yaml`
        );
        fs.writeFileSync(output, stdout);
        console.log('Successfully generated Kong ConfigMap');
        process.exit(0);
    } catch (error) {
        console.error('Failed to generate Kong ConfigMap:', error.message);
        process.exit(1);
    }
}

generateConfigMap(); 