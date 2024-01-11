import { exec } from 'child_process';
import chalk from 'chalk';

(async () => {
  function promisfyExec(cmd: string): Promise<Error | Record<'stdout' | 'stderr', string>> {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }

  try {
    const cliCmdRes = await promisfyExec('git rev-parse --abbrev-ref HEAD');
    const regex = new RegExp('^(fix|feature|hotfix|release|chore|style|refactor|)/[a-z-0-9\\.]{3,}$');

    if (cliCmdRes instanceof Error) {
      throw cliCmdRes;
    }

    const branchName = cliCmdRes.stdout.replace(/(\r\n|\n|\r)/gm, '');

    if (!regex.test(branchName)) {
      process.stderr.write(chalk.red(`
        the name of your branch does'nt respect imposed structure\n
        current name of your branch: ${branchName}\n
        ${chalk.yellow('- start branch name with prefix "fix|feature|hotfix|release" followed by a slash (ex: feature/)')}\n
        ${chalk.yellow('- after slash, add title of your branch in kebab-case. (ex: branch-name-in-kebab-case)')}\n
        ${chalk.whiteBright('full exemple:')}\n
        ${chalk.green('✅ ', 'feature/add-component-to-product')}\n
        ${chalk.green('✅ ', 'fix/product-design-in-search-module')}\n
        ${chalk.red('❌ ', 'add-Add-Component-To-Product')}\n
        ${chalk.red('❌ ', 'improve/addCompressionHTML')}\n
        ${chalk.red('more infos here: https://www.conventionalcommits.org/en/v1.0.0/')}`));

      process.exit(1);
    }

    process.stdout.write(chalk.green('check-branch-name: the name of your branch is ok, process exit without error'));
    process.exit(0);
  } catch(error: any) {
    process.stderr.write(chalk.red(error.message));
  }
})()
