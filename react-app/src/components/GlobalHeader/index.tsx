import React from 'react';
import { Row, Col, Avatar, Dropdown, Space, Menu } from 'antd';
import { getUserInfo, clearTokenAndToLogin } from '@src/utils/token';
import { CaretDownOutlined } from '@ant-design/icons';
import styles from './style.module.less';

const GlobalHeader: React.FC = () => {
  const useInfo: any = getUserInfo();
  const menu = (
    <Menu>
      <Menu.Item>个人中心</Menu.Item>
      <Menu.Item onClick={() => clearTokenAndToLogin()}>退出</Menu.Item>
    </Menu>
  );

  return (
    <Row className={styles.header}>
      <Col span={6} className="left">
        {/* <img
          width={50}
          alt="logo"
          src={require('../../assets/imgs/logo.png').default}
          className="icon"
        /> */}
      </Col>
      <Col span={12} className="title">
        漂亮的王小姐的系统
      </Col>
      <Col span={6} className="right">
        <Avatar size={40} src={useInfo.avatar} />
        <Dropdown overlay={menu} className="useName">
          <Space>
            {useInfo.name}
            <CaretDownOutlined />
          </Space>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default GlobalHeader;
