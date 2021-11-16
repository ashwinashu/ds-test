import { message } from "antd";

export const success = (messageData) => {
    message.success({
      content: messageData,
      style: {
        marginTop: "10vh",
      },
      duration: 3,
    });
  };

  export const error = (messageData) => {
    message.error({
      content: messageData,
      style: {
        marginTop: "10vh",
      },
      duration: 3,
    });
  };
