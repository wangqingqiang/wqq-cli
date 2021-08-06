/**
 * 获取当前分支名
 * git symbolic-ref -q --short HEAD
 * 
 * 获取当前分支对应的远程分支,@{u} 是 @{upstream} 的简写
 * git rev-parse --abbrev-ref --symbolic-full-name @{u}
 * 
 * 获取本地某个分支对应的远程分支
 * git rev-parse --abbrev-ref [branchName]@{upstream}
 */

const exec = require('child_process').execSync;

const info = {};

try {
  const name = exec('git config --get user.name');
  const email = exec('git config --get user.email');
  info.name = name && name.toString().trim();
  info.email = email && email.toString().trim();
} catch (e) {}

function init (message) {
  message = typeof message === 'string' ? message : 'project init';
  exec(`git init && git add . && git commit -m '${ message }'`);
}
module.exports = {
  info,
  init
}
