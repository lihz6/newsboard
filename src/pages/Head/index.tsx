import React, { useContext } from 'react';

import { Layout, Menu, Avatar, Button } from 'antd';
import {
  RedditOutlined,
  HomeOutlined,
  MailOutlined,
  VideoCameraAddOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { context, AppStatus } from '_base/Context';

export default function Head() {
  const { setContextState } = useContext(context);
  return (
    <Layout.Header
      className="-glob-box-shadow"
      style={{
        display: 'flex',
        padding: '0',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
      }}>
      <div
        style={{
          display: 'flex',
        }}>
        <div
          style={{
            width: '128px',
            background: '#1890ff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <RedditOutlined
            style={{
              fontSize: 'xx-large',
            }}
          />
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['news']}
          style={{
            lineHeight: '64px',
          }}>
          <Menu.Item key="home" disabled>
            <HomeOutlined />
            Home
          </Menu.Item>
          <Menu.Item key="news">
            <MailOutlined />
            News
          </Menu.Item>
          <Menu.Item key="video" disabled>
            <VideoCameraAddOutlined />
            Video
          </Menu.Item>
          <Menu.Item key="mail" disabled>
            <NotificationOutlined />
            Events
          </Menu.Item>
        </Menu>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Avatar icon={<UserOutlined />} />
        <Button
          icon={<LogoutOutlined />}
          onClick={() => {
            setContextState({ appStatus: AppStatus.UNKNOWN });
          }}
          size="small"
          type="dashed"
          style={{
            margin: '0 16px',
          }}>
          退出
        </Button>
      </div>
    </Layout.Header>
  );
}
