import React, { ReactNode } from 'react';
import { Spin } from 'antd';

export interface SpinViewProps {
  children: ReactNode;
  spinning: boolean;
}

export default function SpinView({ spinning, children }: SpinViewProps) {
  if (spinning) {
    return (
      <Spin spinning style={{ minHeight: '6.2em' }}>
        {/* HACK: to mount children and hide the broken view. */}
        <div style={{ height: '0', visibility: 'hidden' }}>{children}</div>
      </Spin>
    );
  }
  return children as JSX.Element;
}
