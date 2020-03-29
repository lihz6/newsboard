// see `.env.development` and `.env.production`
import fetch from './_fetch';
import { AppStatus } from '_base/Context';
export const host = process.env.REACT_APP_HOST!;
const headers = {
  'X-Admin-Token': null,
  'X-Admin-Id': null,
};
const fetcher = fetch(host);

export default function(path: string, data?: any) {
  return fetcher(path, data, headers);
}
export function signin({ username, password }) {
  return fetcher('/api/admins/token/create', {
    account: username,
    password,
  }).then(({ err, msg, data }) => {
    if (err === 0) {
      headers['X-Admin-Token'] = data.token;
      headers['X-Admin-Id'] = data.id;
      return { appStatus: AppStatus.LOGINED };
    }
    throw msg;
  });
}
