export enum kUSERS {
  employee = "employee",
  company = "company",
  admin = "admin",
  superAdmin = "super-admin",
};

export const kADMIN_TYPES = [
  kUSERS.admin,
  kUSERS.superAdmin,
];

export const kPERMISISON_NUMBER = new Map();
kPERMISISON_NUMBER.set(kUSERS.employee, 0);
kPERMISISON_NUMBER.set(kUSERS.company, 0);
kPERMISISON_NUMBER.set(kUSERS.admin, 1);
kPERMISISON_NUMBER.set(kUSERS.superAdmin, 2);

export const kUSER_STATES = {
  active: "active",
  inactive: "inactive",
};