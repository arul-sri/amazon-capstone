import AWS from 'aws-sdk';
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

AWS.config.update({ 
    region: process.env.REACT_APP_AWS_REGION,
});

const sesClient = new SESClient({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
});

const createSendEmailCommand = (toAddress, fromAddress, content) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: content,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Amazon Badge Tool: Image Review Results",
      },
    },
    Source: fromAddress,
  });
};

const sendEmail = async (toAddress, content) => {
  const sendEmailCommand = createSendEmailCommand(
    toAddress,
    "teamamazonbadgetool@gmail.com",
    content
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (e) {
    console.error("Failed to send email.");
    return e;
  }
};

export { sendEmail };