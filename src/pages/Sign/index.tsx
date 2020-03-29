import React, { useState, useEffect, useContext } from 'react';

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { FormProps } from 'antd/lib/form';
import { context } from '_base/Context';

import { signin } from '_fetch';
import coverImage from '_asset/images/th.jpeg';
export default function Sign() {
  const [logging, setLogging] = useState(false);
  const { setContextState } = useContext(context);
  const [form] = Form.useForm();
  useEffect(() => {
    document.title = '请登录';
  }, []);

  const handleSubmit: FormProps['onFinish'] = values => {
    setLogging(true);
    signin(values as any)
      .then(data => {
        setContextState(data);
        setLogging(false);
      })
      .catch(err => {
        message.error(err);
        setLogging(false);
      });
  };
  // const handleForgetPword = () => {
  //   forgetPword(form.getFieldValue('username'))
  //     .then(msg => {
  //       message.success(msg);
  //     })
  //     .catch(err => {
  //       message.error(err);
  //     });
  // };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${coverImage})`,
      }}>
      <Form
        className="-glob-box-shadow"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        form={form}
        style={{
          backgroundColor: 'white',
          minWidth: '320px',
          padding: '48px 32px',
        }}>
        <div
          style={{
            fontSize: '1.62em',
            textAlign: 'center',
            marginBottom: '32px',
          }}>
          · WELCOME ·
        </div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户' }]}>
          <Input
            name="username"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}>
          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住登录</Checkbox>
            </Form.Item>
            <Button type="link" onClick={handleForgetPword}>
              忘记密码
            </Button>
          </div> */}
          <Button
            type="primary"
            htmlType="submit"
            loading={logging}
            style={{ width: '100%' }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
