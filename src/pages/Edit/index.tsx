import React, { useState, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import withPath from '_base/withPath';
import SpinView from '_view/SpinView';

import { fetchFrom } from './fetch';
import { Form, Input, Upload, Button } from 'antd';
import UxEditableTags from '_view/UxEditableTags';
import { UploadOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form';
export const defaultParams = { newsId: 'new' };

export default withPath(
  PAGEPATH,
  defaultParams
)(
  ({
    match: {
      params: { newsId },
    },
    history,
  }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (newsId === 'new') {
        return setLoading(false);
      }
      fetchFrom('').then(() => {
        setLoading(false);
      });
    }, [newsId]);
    const handleSubmit: FormProps['onFinish'] = values => {
      console.log(values);
      history.goBack();
    };
    return (
      <SpinView spinning={loading}>
        <div
          style={{
            overflow: 'auto',
            paddingBottom: '32px',
          }}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '16px',
              margin: '16px 0',
            }}>
            <Form
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
              onFinish={handleSubmit}>
              <Form.Item
                name={['artical', 'title']}
                label="标题"
                rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name={['artical', 'digest']}
                label="摘要"
                rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name={['artical', 'author']}
                label="作者"
                rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name={['artical', 'tags']}
                label="标签"
                valuePropName="tags"
                rules={[{ required: true }]}>
                <UxEditableTags addLabel="新增标签" />
              </Form.Item>
              <Form.Item
                name={['artical', 'keywords']}
                label="关键词"
                valuePropName="tags"
                rules={[{ required: true }]}>
                <UxEditableTags addLabel="新增关键词" />
              </Form.Item>
              <Form.Item
                name={['artical', 'publishAt']}
                label="发布时间"
                rules={[{ required: true }]}>
                <Input style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name={['artical', 'cover']}
                label="封面"
                rules={[{ required: true }]}>
                <div>
                  <Input
                    style={{ marginBottom: '16px' }}
                    placeholder="从 URL 自动下载"
                  />
                  <Upload action="" listType="picture">
                    <Button>
                      <UploadOutlined /> 本地上传
                    </Button>
                  </Upload>
                </div>
              </Form.Item>
              <Form.Item
                name={['artical', 'content']}
                wrapperCol={{ offset: 2 }}>
                <Editor />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 2 }}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </SpinView>
    );
  }
);

function Editor({ value, onChange }: { value?: string; onChange?: any }) {
  return (
    <CKEditor
      style={{
        height: '100%',
      }}
      editor={ClassicEditor}
      data={value}
      onChange={(_event, editor) => {
        const data = editor.getData();
        onChange?.(data);
      }}
    />
  );
}
