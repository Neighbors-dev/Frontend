interface LoginTokenType {
  accessToken: {
    value: string
    expiresIn: number
  }
  refreshToken: {
    value: string
    expiresIn: number
  }
}
