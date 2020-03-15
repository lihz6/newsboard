/**
 * 李鸿章 <poodll@163.com>
 * 6/27/2019, 3:57:15 PM
 */

import fetch from '_fetch';
import resolve from '_fetch/resolve';
import { Userflag } from '_base/Context';
export function signin(data) {
  // return fetch(`/x000/signin`, data);
  return resolve({ userflag: Userflag.LOGINED });
}

export function forgetPword({ username }) {
  return fetch(`/x000/forget-pword`, { username }).then(
    () => `登录密码已发送，请查收你的邮箱`
  );
}
