import {
  AppstoreOutlined,
  SettingOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import React from 'react';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

interface itemsOption {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'group';
}

const items: Array<itemsOption> = [
  {
    label: '首页',
    key: '/',
    icon: <AppstoreOutlined />,
  },
  {
    label: '资金管理',
    key: '2',
    icon: <DollarOutlined />,
    children: [
      {
        label: '资金流水',
        key: '/fundList',
      },
    ],
  },
  {
    label: '信息管理',
    key: '3',
    icon: <SettingOutlined />,
    children: [
      {
        label: '个人中心',
        key: '/personalCenter',
      },
    ],
  },
];

const App = () => {
  const navigate = useNavigate();
  const onClick = (e: any) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default App;
