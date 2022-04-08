export interface ValidationData<T = any>{
  body: T
}

export interface Validation {
  validate: (input: ValidationData) => Error
}
