const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const inquirer = require('inquirer')
const ora = require('ora')
const download = require('download-git-repo')
const prompts = require('./prompts')
const git = require('./git')

async function init (name, options) {
  console.log(`初始化项目: ${chalk.yellow(name)}`);
  if (fs.existsSync(path.resolve(process.cwd(), name))) {
    console.log(chalk.red('当前目录已经存在同名文件夹'))
    return
  }
  if (options.git) {
    options.initGit = true;
  }
  const answers = await inquirer.prompt(prompts);
  let projectInfo = { name, ...options, ...answers };
  downloadTemplate(projectInfo);
}

function downloadTemplate (projectInfo) {
  const spinner = new ora(`正在下载模板中`);
  spinner.start();

  download('github:wangqingqiang/webpack-demo', projectInfo.name, function(e) {
    if(!e) {
      spinner.succeed(`${chalk.green('模板下载成功!')}`);

      const dest = path.resolve(process.cwd(), projectInfo.name, 'package.json');
      try {
        spinner.start('正在配置项目信息');
        let data = fs.readFileSync(dest);
        data = JSON.parse(data.toString());
        const keys = [ 'name', 'version', 'description', 'author' ];
        keys.forEach(key => {
          data[key] = projectInfo[key];
        });
        const str = JSON.stringify(data, null, 4);
        fs.writeFileSync(dest, str);
        spinner.succeed(`${chalk.green('项目信息配置成功!')}`);

        if (projectInfo.initGit) {
          spinner.start('git init \n');
          process.chdir(path.resolve(process.cwd(), projectInfo.name));
          git.init(projectInfo.git);
          spinner.succeed(`${chalk.green('git init success!')}`);
        }

      } catch (error) {
        spinner.fail(chalk.red(error.message));
      }
    } else {
      spinner.fail(`${chalk.red('模板下载失败!')}  ${chalk.red(e.message)}`);
      spinner.info(e.url)
    }

  })
}

module.exports = init;