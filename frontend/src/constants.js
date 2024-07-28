export const taskDescriptions = {
  task1_darkpattern: {
    type: "Hard to Cancel (Covers Obstruction)",
    internal_pattern: "hard_to_cancel-obstruction",
    title: "Cancel Internet Service Subscription",
    description: `
You have subscried to an yearly pack Internet subscription and now you want to cancel your internet service subscription after using it for 1 month. 
The reasong for cancelation is the high cost of usage that you have faced in the last month. Engage with the chatbot and attempt to cancel your subscription.  Bay saying the reason that you find it expensing. Below are some examples on how you can start the conversation.\n`,
  },
  task1_regular: {
    type: "Subscription Cancellation (Regular Scenario)",
    internal_pattern: "hard_to_cancel-obstruction-regular",
    title: "Cancel Internet Service Subscription",
    description: `
    You have subscried to an yearly pack Internet subscription and now you want to cancel your internet service subscription after using it for 1 month. 
    The reasong for cancelation is the high cost of usage that you have faced in the last month. Engage with the chatbot and attempt to cancel your subscription.  Bay saying the reason that you find it expensing. Below are some examples on how you can start the conversation.\n`,
  },
  task2_darkpattern: {
    type: "Account Deletion (Cofirmshaming- Social Engineering)",
    internal_pattern: "confirmshaming-social_engineering",
    title: "Account Deletion",
    description: `
You want to delete your account on a Health care application. The reason for your account deletion is that you dont need it anymore and hence want to delete it.
Try to get help from the Chatbot to delete your account.`,
  },
  task2_regular: {
    type: "Account Deletion (Regular)",
    internal_pattern: "confirmshaming-social_engineering-regular",
    title: "Account Deletion",
    description: `
    You want to delete your account on a Health care application. The reason for your account deletion is that you dont need it anymore and hence want to delete it.
    Try to get help from the Chatbot to delete your account.
`,
  },

  task3_darkpattern: {
    internal_pattern: "nagging-forced_action",
    type: "Forced Action (Including Subtle Nagging)",
    title: "Update Email Address with the Help of Chatbot",
    description: `
Use the Chatbot to update your Email address of your Account with an E-commerce site.
`,
  },
  task3_regular: {
    type: "Forced Action (Including Subtle Nagging) - Regular",
    internal_pattern: "nagging-forced_action-regular",
    title: "Update Email Address with the Help of Chatbot",
    description: `
    Use the Chatbot to update your Email address of your Account with an E-commerce site.`,
  },
};

// Ensure to update your flow in the backend database to include these new tasks as well.

export const server_endpoints = {
  backend_server: "http://localhost:5001/api",
  // backend_server: "https://rasa-chatbot-ui.onrender.com/api",
  rasa_chatbot_uri: "https://firdoskhan21.github.io/rasa_chatbot_ui",
};
