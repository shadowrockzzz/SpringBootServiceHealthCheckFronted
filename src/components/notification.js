import { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import propertiesCofig from "../properties.cofig";
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'vssnreddy1@gmail.com',
//       pass: 'VSSNReddy@123'
//     }
//   });

// const sendEmail = async (to, subject, body) => {
//     const mailOptions = {
//       from: 'vssnreddy1@gmail.com',
//       to,
//       subject,
//       text: body
//     };

// transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log(`Email sent: ${info.response}`);
//       }
//     });
//   };

const sendEmail = async (toEmail, subject, message) => {
  try {
    await emailjs.send(
      propertiesCofig.sendEmailServiceKey,
      propertiesCofig.sendEmailTemplateKey,
      {
        to_email: toEmail,
        subject: subject,
        message: message,
      },
      propertiesCofig.sendEmailPublicKey
    );

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const getInactiveServices = async () => {
  const from = new Date(Date.now() - 60 * 1000 * 60 * 24); // one day ago
  const to = new Date();
  try {
    const response = await axios.get(
      propertiesCofig.baseAPIURI+"/inactive",
      {
        params: {
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching inactive services list:", error);
    return [];
  }
};

const removeDuplicates = (array) => {
  let array1 = [];
  for (let i in array) {
    array1.push(array[i].endpoint);
  }
  return [...new Set(array1)];
};

const NotificationComponent = () => {
  const [inactiveServices, setInactiveServices] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const services = await getInactiveServices();
      setInactiveServices(removeDuplicates(services));
    }, 1000000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(inactiveServices);

    if (inactiveServices.length > 0) {
      inactiveServices.forEach((endpoint) => {
        window.Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const notification = new Notification("Title", {
              body: `Service ${endpoint} is down`,
            });
          }
        });
      });
      sendEmail("vssnreddy1@gmail.com", "Test1", "Body Test");
    }
  }, [inactiveServices]);

  return null;
};

export default NotificationComponent;
