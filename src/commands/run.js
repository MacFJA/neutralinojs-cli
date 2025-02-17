const chalk = require('chalk');
const logwatcher = require('../modules/logwatcher');
const filewatcher = require('../modules/filewatcher');
const runner = require('../modules/runner');
const commons = require('../commons');

module.exports.register = (program) => {
    program
        .command('run')
        .option('--mode <mode>')
        .option('--disable-auto-reload')
        .option('--arch <arch>')
        .action(async (command) => {
            commons.checkCurrentProject();
            let argsOpt = "";
            
            if(!command.disableAutoReload)
                argsOpt += "--debug-mode";
            
            if(command.mode)
                argsOpt += ` --mode=${command.mode}`;

            if(!command.disableAutoReload)
                filewatcher.start();

            logwatcher.start();
            try {
                await runner.runApp({argsOpt, arch: command.arch});
            }
            catch(error) {
                console.log(`${chalk.bgRed.white('ERROR')} ${error}`);
            }
            filewatcher.stop();
            logwatcher.stop();
        });
}

