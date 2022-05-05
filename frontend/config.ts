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
    party: {
      getAll: "/api/party",
      getById: "/api/party",
      create: "/api/party",
    },
    join: {
      join: "/api/join",
      getMeJoin: "/api/join/me",
    },
  },
};

const AR_API = () => {
  switch (environment) {
    case "development":
      return "https://api-party.aom.engineer";
    case "production":
      return "";
    default:
      return "https://api-party.aom.engineer";
  }
};

export const apiHost = {
  default: AR_API(),
};
