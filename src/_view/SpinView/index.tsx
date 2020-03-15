/**
 * ```
 * 李鸿章 <poodll@163.com>
 * 12/18/2019, 12:11:48 AM
 * ```
 * doc comment for the file goes here
 */

/** Happy Coding */
import React, { ReactNode } from 'react';
import { Spin } from 'antd';

export interface SpinViewProps {
  children: ReactNode;
  spinning: boolean;
}

export default function SpinView({ spinning, children }: SpinViewProps) {
  if (spinning) {
    return (
      <Spin spinning>
        {/* HACK: to mount children and hide the broken view. */}
        <div style={{ height: '0', visibility: 'hidden' }}>{children}</div>
      </Spin>
    );
  }
  return children as JSX.Element;
}
