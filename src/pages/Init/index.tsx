import React from 'react';
import { Spin } from 'antd';

export default function Init() {
  return (
    <Spin
      spinning
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}
