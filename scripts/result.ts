export interface Result<T> {
  value?: T
  error?: Error
  isSucceeded: boolean
}

export interface ResultSuccess<T> {
  value: T
  isSucceeded: boolean
}

export interface ResultFailed {
  error: Error
  isSucceeded: boolean
}

export const Succeeded = <T>(value: T): ResultSuccess<T> => {
  return {
    value: value,
    isSucceeded: true
  }
}
export const Failed = (e: Error): ResultFailed => {
  return {
    error: e,
    isSucceeded: false
  }
}