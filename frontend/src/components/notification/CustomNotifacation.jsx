import React, { useEffect } from 'react';
import { message } from 'antd';



const CustomNotification = ({ error, success }) => {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (error) {
            messageApi.error({
                content: error,
                duration: 2,
            });
        } else if (success) {
            messageApi.success({
                content: success,
                duration: 2,
            });
        } 
    }, [error, success, messageApi]);

    return <>{contextHolder}</>;
};

export default CustomNotification;
