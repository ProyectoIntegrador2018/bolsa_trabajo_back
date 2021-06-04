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

export const kUSER_TYPES = [
  kUSERS.employee,
  kUSERS.company,
];

export const kALL_TYPES = [
  ...kADMIN_TYPES,
  ...kUSER_TYPES
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

export enum kMATCH_STATES {
  pending = "pending",
  declined = "declined",
  active = "active",
  notHired = "notHired",
  hired = "hired",
};
export function getMatchStates(): Array<kMATCH_STATES> {
  return [
    kMATCH_STATES.pending,
    kMATCH_STATES.declined,
    kMATCH_STATES.active,
    kMATCH_STATES.notHired,
    kMATCH_STATES.hired,
  ];
}