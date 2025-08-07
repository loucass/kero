export const payments = [
  {
    id: 1,
    userId: 1,
    serviceId: 1,
    status: "Pending",
    screenshot: null,
    fullName: "John Doe",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 3,
    serviceId: 2,
    status: "Approved",
    screenshot: null,
    fullName: "Robert Johnson",
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    userId: 5,
    serviceId: 3,
    status: "Rejected",
    screenshot: null,
    fullName: "Emily Davis",
    date: new Date(Date.now() - 172800000).toISOString(),
  },
];
