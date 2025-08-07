export const users = [
  {
    id: 1,
    role: "normal",
    name: "John Doe",
    referralId: "MARK123",
    referredBy: null,
  },
  {
    id: 2,
    role: "marketing",
    name: "Jane Smith",
    referralId: "MARK456",
    referredBy: null,
  },
  {
    id: 3,
    role: "normal",
    name: "Robert Johnson",
    referralId: "MARK789",
    referredBy: 2,
  },
  {
    id: 4,
    role: "admin",
    name: "Admin User",
    referralId: "ADMIN",
    referredBy: null,
  },
  {
    id: 5,
    role: "normal",
    name: "Emily Davis",
    referralId: "MARK101",
    referredBy: 2,
  },
];
