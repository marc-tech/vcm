const {program} = require('commander');
const chalk = require('chalk');
const pm2 = require('pm2');

program.version('0.0.1');

const pm2App = {
  name: 'vcm-app',
  cwd: `${__dirname}/front/`,
  script: `${__dirname}/front/node_modules/@vue/cli-service/bin/vue-cli-service.js`,
  args: 'serve',
};

program
  .command('start')
  .description('Start the UI panel & API project as background process')
  .action((source, destination) => {
    pm2.delete(pm2App.name, () => {
      process.stdout.write(chalk.yellow('Front => '));
      pm2.start(pm2App, function (err, apps) {
        console.log(chalk.green('started'));
        pm2.disconnect();
      });
    });
  });

program
  .command('restart')
  .description('Restart background process')
  .action((source, destination) => {
    process.stdout.write(chalk.yellow('Front => '));
    pm2.restart(pm2App.name, (err, proc) => {
      console.log(chalk.green('restarted'));
      pm2.disconnect();
    });
  });

program
  .command('status')
  .description('Show status of background process')
  .action((source, destination) => {
    console.log(chalk.yellow('================='));
    console.log(chalk.yellow('Status'));
    console.log(chalk.yellow('=================\n'));
    pm2.list((err, list) => {
      list.forEach((process) => {
        console.log(
          chalk.magenta(process.pid),
          chalk.cyan(process.name),
          process.pm2_env &&
            (process.pm2_env.status === 'online'
              ? chalk.green(process.pm2_env.status)
              : chalk.red(process.pm2_env.status))
        );
      });
      pm2.disconnect();
    });
  });

program
  .command('stop')
  .description('Stop background process')
  .action((source, destination) => {
    pm2.delete(pm2App.name, () => {
      console.log('VCM - APP stoped');
      pm2.delete(pm2Api.name, () => {
        console.log('VCM - API stoped');
        pm2.disconnect();
    });

  });

export function cli(args) {
  program.parse(args);
}
