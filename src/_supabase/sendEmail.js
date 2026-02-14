import emailjs from "@emailjs/browser";

export const sendEmail = async ({
  email,
  userName,
  accountNumber,
  loginUrl,
  companyName,
}) => {
  try {
    await emailjs.send(
      "service_0zqhjrj",
      "template_qxk2tne",
      {
        email: email,
        user_name: userName,
        account_number: accountNumber,
        login_url: loginUrl,
        company_name: companyName,
      },
      "OQLSnmkohBV2wVepn",
    );

    console.log("Email sent ✅");
  } catch (error) {
    console.error("Email failed ❌", error);
  }
};
