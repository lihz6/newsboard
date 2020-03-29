import fetch from '_fetch';
import resolve from '_fetch/resolve';

export function fetchFrom(newsId: string) {
  if (__DEVE__) {
    return resolve(true);
  }
  return fetch(newsId);
}

export function saveTo(artical) {
  if (__DEVE__) {
    return resolve(true);
  }
  return fetch('');
}
