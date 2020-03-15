/**
 * ```
 * 李鸿章 <poodll@163.com>
 * 12/20/2019, 1:48:10 AM
 * ```
 * doc comment for the file goes here
 */

/** Happy Coding */
import fetch from '_fetch';
import resolve from '_fetch/resolve';

export function fetchFrom(path: string, search: string) {
  if (__DEVE__) {
    return resolve(true);
  }
  return fetch(`${path}${search}`);
}
