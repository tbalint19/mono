import fs from "fs"
import path from "path"

export const collect = async(dir: string) => {
  const scripts: string[] = [];

  async function traverse(currentDir: string) {
    const files = await fs.promises.readdir(currentDir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(currentDir, file.name);

      if (file.isDirectory()) {
        const packageJsonPath = path.join(fullPath, 'package.json');

        if (file.name === 'node_modules') {
          continue;
        }
        
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf-8'));
          const packageName = packageJson.name;
          const packageScripts = packageJson.scripts;

          if (packageScripts) {
            for (const [scriptName, scriptCommand] of Object.entries(packageScripts)) {
              const workspaceScript = `npm run ${scriptName} --workspace=${packageName}`;
              scripts.push(workspaceScript);
            }
          }
        }

        await traverse(fullPath);
      }
    }
  }

  await traverse(dir);

  return scripts;
}

export const split = (commands: string[]) => {
  const workspaceMap: Record<string, string[]> = {};

  commands.forEach(command => {
    const parts = command.split(' ');
    
    const workspaceIndex = parts.findIndex(part => part.startsWith('--workspace='));

    if (workspaceIndex !== -1) {
      const workspaceName = parts[workspaceIndex].split('=')[1];

      const commandString = parts.join(' ');

      if (!workspaceMap[workspaceName]) {
        workspaceMap[workspaceName] = [];
      }
      workspaceMap[workspaceName].push(commandString);
    }
  });

  return workspaceMap;
}