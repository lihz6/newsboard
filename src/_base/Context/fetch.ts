/**
 * ```
 * 李鸿章 <poodll@163.com>
 * 7/1/2019, 4:13:34 PM
 * ```
 * doc comment for the file goes here
 */

/** Happy Coding */
import { Fetch, Userflag } from '.';
import fetch from '_fetch';
import resolve from '_fetch/resolve';
export const getContext = (): Promise<Fetch> => {
  // return fetch(`/core/context`);
  return resolve({ userflag: Userflag.LOGINED }, 500);
};
