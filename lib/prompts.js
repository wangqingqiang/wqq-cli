const semver = require('semver');
const git = require('./git')

module.exports = [
  {
    type: 'list',
    name: 'type',
    message: '请选择项目类型',
    default: 'react',
    choices: [
      { key: 'vue', name: 'Vue', value: 'vue' },
      { key: 'react', name: 'React', value: 'react' }
    ]
  }, {
    type: 'confirm',
    name: 'eslint',
    message: '是否启用esLint',
    default: true
  }, {
    type: 'input',
    name: 'version',
    message: '请输入版本号',
    default: '1.0.0',
    validate(version, answers) {
      if (!semver.valid(version)) {
        return '请输入合法的版本号'
      }
      return true;
    }
  }, {
    name: 'description',
    type: 'input',
    message: '请输入项目描述'
  }, {
    name: 'author',
    type: 'input',
    message: '请输入作者',
    default() {
      const info = git.info;
      return `${info.name} <${info.email}>`
    }
  }
]