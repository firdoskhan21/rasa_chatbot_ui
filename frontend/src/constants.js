export const taskDescriptions = {
  task1_darkpattern: {
    type: "Hard to Cancel (Covers Obstruction)",
    internal_pattern: "hard_to_cancel-obstruction",
    title: "Cancel Internet Service Subscription",
    description: `
You have subscried to an yearly pack Internet subscription and now you want to cancel your internet service subscription after using it for 1 month. 
The reasong for cancelation is the high cost of usage that you have faced in the last month. Engage with the chatbot and attempt to cancel your subscription.  Bay saying the reason that you find it expensing. Below are some examples on how you can start the conversation.\n
Hint: \n
1. Inform the chatbot that you want to cancel your subscription.\n
2. When asked for the reason, provide your reason and follow the instructions to complete the task. \n`,
  },
  task1_regular: {
    type: "Subscription Cancellation (Regular Scenario)",
    internal_pattern: "hard_to_cancel-obstruction-regular",
    title: "Cancel Internet Service Subscription",
    description: `
    You have subscried to an yearly pack Internet subscription and now you want to cancel your internet service subscription after using it for 1 month. 
    Engage with the chatbot and attempt to cancel your subscription. Below are some examples on how you can start the conversation.\n
    
    Hint: \n
    1. Inform the chatbot that you want to cancel your subscription.\n
    2. When asked for the reason, provide your explanation and follow the instructions to complete the task. \n`,
  },
  task2_darkpattern: {
    type: "Account Deletion (Cofirmshaming- Social Engineering)",
    internal_pattern: "confirmshaming-social_engineering",
    title: "Account Deletion",
    description: `
You want to delete your account on a Health care application to do that ask help from the chatbot.
`,
  },
  task2_regular: {
    type: "Account Deletion (Regular)",
    internal_pattern: "confirmshaming-social_engineering-regular",
    title: "Account Deletion",
    description: `
You want to delete your account on a Health care application to do that ask help from the chatbot.
`,
  },

  task3_darkpattern: {
    internal_pattern: "nagging-forced_action",
    type: "Forced Action (Including Subtle Nagging)",
    title: "Update Email Address with the Help of Chatbot",
    description: `

You need specific help with your account that is on a website and to do that you need to initiate a coversation with the chatbot for support. 
The chatbot will assist you in managing your account.\n

Ask for help with your account mainly to changing email address and phone number.\n
After completing the coversation click 'Submit coversation'.
`,
  },
  task3_regular: {
    type: "Forced Action (Including Subtle Nagging) - Regular",
    internal_pattern: "nagging-forced_action-regular",
    title: "Update Email Address with the Help of Chatbot",
    description: `
    You need specific help with your account that is on a website and to do that you need to initiate a coversation with the chatbot for support. 
    The chatbot will assist you in managing your account.\n
    
    Hint:
    Ask for help with your account mainly to change email address and phone number.\n
    After completing the coversation click 'Submit coversation'.`,
  },
};

// Ensure to update your flow in the backend database to include these new tasks as well.

export const server_endpoints = {
  // backend_server: "http://localhost:5001/api",
  backend_server: "https://rasa-chatbot-ui.onrender.com/api",
  rasa_chatbot_uri: "https://firdoskhan21.github.io/rasa_chatbot_ui",
};
