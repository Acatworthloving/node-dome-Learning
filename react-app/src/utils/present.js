/**
 * 弹出框封装文件
 */

import { notification, Modal, message } from 'antd';
import React from 'react';
import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
const { confirm } = Modal;

/**
 * thisIsFunction
 * 弹出Notification提示框
 *
 * @param	description 消息内容
 * @param	message 消息标题
 * @param	type 消息类型 success,info,warning,error
 * @author Jessie
 * @return    array
 * @date        2021-5-30
 */
export const openNotification = (message, type, description, duration) => {
  notification[type || 'success']({
    message: message || '',
    description: description || '',
    duration: duration || 4.5,
  });
};

/**
 * thisIsFunction
 * 弹出提示框
 *
 * @param	description 消息内容
 * @param	title 消息标题
 * @param	type 消息类型 success,info,warning,error
 * @author Jessie
 * @return    array
 * @date        2021-5-30
 */
export const openMessage = (title, type, duration) => {
  message[type || 'success']({
    content: title,
    className: `message_${type || 'success'}`,
    duration: duration || 3,
  });
};

/**
 * thisIsFunction
 * 确认弹出框
 *
 * @param	description 消息内容
 * @param	title 消息标题
 * @param	type 消息类型 info,warning,error
 * @author Jessie
 * @return    array
 * @date        2021-5-30
 */
export const openConfirmModal = (
  title,
  type,
  description,
  closable,
  cancelText,
  okText
) => {
  const typeString = type || 'error';
  const iconObject = {
    info: <CheckCircleFilled />,
    error: <ExclamationCircleFilled />,
    warning: <QuestionCircleFilled />,
  };
  return new Promise(function (resolve, reject) {
    confirm({
      title: title,
      className: `confirm_modal_${typeString}`,
      icon: iconObject[typeString],
      content: description || false,
      closable: closable || false,
      cancelText: cancelText || '取消',
      okText: okText || '确定',
      onOk() {
        resolve(true);
      },
      onCancel(e) {
        if (e['triggerCancel']) {
          reject(false);
        } else {
          e();
          reject(true);
        }
      },
    });
  });
};
