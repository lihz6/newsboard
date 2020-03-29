import React, { useState, useEffect } from 'react';

import withPath from '_base/withPath';
import SpinView from '_view/SpinView';

import { fetchFrom } from './fetch';
import { Layout, Input, Pagination, Button, Form } from 'antd';
import NewsItem from '_view/NewsItem';
import Edit from 'pages/Edit';
import { PlusOutlined } from '@ant-design/icons';
export const defaultParams = { page: 1, size: '10' };
export const defaultQuery = { keyword: '', order: 1 };

export default withPath(
  PAGEPATH,
  defaultParams,
  defaultQuery
)(
  ({
    match: { params, query, pathOf },
    location: { pathname, search },
    history,
  }) => {
    console.log('params', params);
    console.log('query', query);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetchFrom(pathname, search).then(() => {
        setLoading(false);
      });
    }, [pathname, search]);

    return (
      <SpinView spinning={loading}>
        <Layout style={{ backgroundColor: 'white' }}>
          <Layout.Sider width={240} theme="light" style={{ padding: '16px' }}>
            <Form>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    history.push(Edit.pathOf({ newsId: 'new' }));
                  }}>
                  新建文章
                </Button>
              </Form.Item>
              <Form.Item>
                <Input placeholder="搜索新闻稿..." />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button>重置</Button>
                &nbsp;&nbsp;
                <Button type="primary">搜索</Button>
              </Form.Item>
            </Form>
          </Layout.Sider>
          <Layout>
            <Layout.Content
              style={{
                flex: 'auto',
                overflow: 'auto',
                padding: '16px 0 0 16px',
              }}>
              {Array.from({ length: 100 }).map((_, index) => (
                <NewsItem
                  key={index}
                  title="标题"
                  status="DELETE"
                  onClick={() => {
                    history.push(Edit.pathOf({ newsId: 'newsId' }));
                  }}
                />
              ))}
            </Layout.Content>
            <Layout.Footer>
              <Pagination />
            </Layout.Footer>
          </Layout>
        </Layout>
      </SpinView>
    );
  }
);
