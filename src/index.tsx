import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import './_sass/reset.scss';
import Context from '_base/Context';
import renderRouter from './pages';

import './_sass/cover.scss';

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Context>{renderRouter}</Context>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
