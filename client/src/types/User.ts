export interface UserDoc {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicUserDoc {
  _id: string;
  fullName: string;
}
