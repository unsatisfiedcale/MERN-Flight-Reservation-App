import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;

const AvgFare = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <InfoCircleOutlined style={{ color: "#74C0FC", fontSize: '24px' }} />
        <Text className="text-gray-800">Avg Fare:</Text>
      </div>
      <Text strong>$225</Text>
    </div>
  );
};

export default AvgFare;
