export const kUSERS = {
  employee: "employee",
  admin: "admin",
  superAdmin: "super-admin",
};


export const kPERMISISON_NUMBER = new Map();
kPERMISISON_NUMBER.set(kUSERS.employee, 0);
kPERMISISON_NUMBER.set(kUSERS.admin, 1);
kPERMISISON_NUMBER.set(kUSERS.superAdmin, 2);


