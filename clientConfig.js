// clientConfig.js

export const clients = {
  clarityrocks: {
    name: "ClarityRocks",
    logo: "images/logo.png", // Make sure this file exists
    primaryColor: "#F04E23", // EOS red-orange
    secondaryColor: "#FF7900", // EOS orange
    backgroundImage: "images/background.svg", // Or use background.png
    welcomeMessage: "Welcome to ClarityRocks! Let’s create SMART Rocks that get done.",
    features: {
      rockBuilder: true,
      exportOptions: ["PDF", "Clipboard"],
      milestoneTracking: true,
      animation: true
    },
    footerText: "© 2025 ClarityRocks. Powered by Business Intuition Incorporated.",
    links: {
      help: "https://clarityrocks.help",
      terms: "https://clarityrocks.help/terms",
      privacy: "https://clarityrocks.help/privacy"
    }
  }
};
