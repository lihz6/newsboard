import React, { ReactNode, ReactEventHandler } from 'react';
// import { Link } from 'react-router-dom';
// import { Icon } from 'antd';
// import chunk from 'lodash/chunk';
// import classlist from '_util/classlist';

import './style.scss';
import UxDropdownButton from '_view/UxDropdownButton';

export enum Actions {
  DELETE = '删除',
  PUBLISH = '发布',
  WITHDRAW = '下架',
}

export interface NewsItemProps {
  photo?: string;
  title: string;
  abstract?: string;
  status: keyof typeof Actions;
  onClick?: ReactEventHandler<HTMLDivElement>;
}

export default function NewsItem({
  photo,
  title,
  abstract,
  status,
  onClick,
}: NewsItemProps) {
  return (
    <div className="news-item-main -glob-smtop" onClick={onClick}>
      <div className="news-item-photo">
        {photo ? (
          <div
            style={{
              backgroundImage: `url(${photo})`,
              width: '100%',
              height: '100%',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundColor: 'white',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ) : (
          title.slice(0, 1)
        )}
      </div>
      <div className="news-item-content">
        <div
          style={{
            fontSize: '1.1em',
          }}>
          {title}
        </div>
        <div>{abstract}</div>
      </div>
      <UxDropdownButton
        items={[Actions.DELETE, Actions.PUBLISH, Actions.WITHDRAW]}
        onItemClick={key => {
          console.log(key);
        }}>
        {`已${Actions[status]}`}
      </UxDropdownButton>
    </div>
  );
}
