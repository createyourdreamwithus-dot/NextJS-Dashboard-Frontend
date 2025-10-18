export const API_BASE_URL = "https://api.crispyminds.com/api/v1";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    VERIFY_OTP: "/verify-otp",
  },

  CATEGORY: {
    CATEGORIES: "/categories",
  },
  SUBCATEGORY: {
    SUBCATEGORIES: "/categories",
  },

  ATTRIBUTES: {
    ATTRIBUTES: "/attributes",
  },
  LOCATION:{
    COUNTRIES:"/countries",
    STATES:"/states",
    DISTRICTS:"/districts"


  },
  UNITS: {
    UNITS: "/units",
  },
  BRANDS: {
    BRANDS: "/brands",
  },
} as const;
