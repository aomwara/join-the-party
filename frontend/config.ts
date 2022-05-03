export const environment = process.env.NEXT_PUBLIC_UI_ENV
  ? process.env.NEXT_PUBLIC_UI_ENV.toLocaleLowerCase()
  : "development";

export const apiEndpoints = {
  section: {
    auth: {
      login: "/api/users/login",
      register: "/api/users/register",
      check: "/api/users/check",
    },
    user: {
      profile: "/api/users/profile",
    },
  },
};

const AR_API = () => {
  switch (environment) {
    case "development":
      return "http://localhost:8000";
    case "production":
      return "";
    default:
      return "http://localhost:8000";
  }
};

export const apiHost = {
  default: AR_API(),
};
