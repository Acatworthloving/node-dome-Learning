import React, { useState } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  Cascader,
  DatePicker,
  Upload,
  Row,
  Col,
  message,
} from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import styles from './style.module.less';
const { TextArea } = Input;

const PersonalCenter: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        console.log('url', url);
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const onFormLayoutChange = (value: any) => {
    console.log(value);
  };

  const labelList = [
    '撩人',
    '快乐憨憨',
    '沉迷帅哥',
    '硬核少女',
    '治愈',
    '危险迷人',
    '贼能喝',
    '吃货',
    '有点东西',
    '熬夜女王',
    '富婆',
    '游戏很菜',
    '马路杀手',
    '柔情似水',
  ];

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className={styles.personalCenter}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="头像" valuePropName="fileList">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="身份">
          <span>admin</span>
        </Form.Item>
        <Form.Item label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item label="名称">
          <Input />
        </Form.Item>
        <Form.Item label="性别">
          <Radio.Group>
            <Radio value="male"> 男 </Radio>
            <Radio value="female"> 女 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="出生日期">
          <DatePicker />
        </Form.Item>
        <Form.Item label="标签">
          <Checkbox.Group>
            <Row>
              {labelList.map((item) => (
                <Col span={6}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="籍贯">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="个性签名">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalCenter;
