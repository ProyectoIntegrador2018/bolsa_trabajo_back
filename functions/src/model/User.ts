export interface User {
  id: string,
  createdBy: string,
  email: string,
  type: string,
  username: string,
  state: string,
  enrollmentFormId?: string,
}