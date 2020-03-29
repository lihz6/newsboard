import React, { ReactNode, ReactEventHandler } from 'react';
// import { Link } from 'react-router-dom';
// import { Icon } from 'antd';
// import chunk from 'lodash/chunk';
// import classlist from '_util/classlist';

import './style.scss';
import { Form, Button } from 'antd';
import { FormProps } from 'antd/lib/form';

// @ts-ignore
export interface UxSearchFormProps extends FormProps {
  // ...
}

export default function UxSearchForm({
  initialValues,
  onFinish,
}: UxSearchFormProps) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="inline"
      initialValues={{ initialValues }}
      onFinish={onFinish as any}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
          }}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

UxSearchForm.Item = Form.Item;
