import React, { Children } from 'react';

import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/lib/button';

export interface UxDropdownButtonProps<Item extends string | number>
  extends ButtonProps {
  items: Item[];
  onItemClick(item: Item): void;
}

export default function UxDropdownButton<
  Item extends string | number = string | number
>({
  items,
  onItemClick,
  icon: _icon,
  children,
  ...buttonProps
}: UxDropdownButtonProps<Item>) {
  const menu = (
    <Menu onClick={({ key }) => onItemClick(key as Item)}>
      {items.map(key => (
        <Menu.Item key={key}>{key}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button {...buttonProps}>
        {children} <DownOutlined />
      </Button>
    </Dropdown>
  );
}
