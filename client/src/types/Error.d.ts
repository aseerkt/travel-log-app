export type FormError = {
  path: string;
  message: string;
};

export type NormError = {
  message: string;
};

export type ResError = {
  errors?: FormError[];
} & Partial<NormError>;
