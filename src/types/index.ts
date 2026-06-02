export interface RegistrationFormData {
  nickname: string
  phone: string
  email: string
  portfolioUrl: string
  socialUrl: string
  wallSize: string
  shirtSize: string
  needsAccommodation: boolean
  night1?: boolean
  night2?: boolean
  consent: boolean
  portfolioFile?: File
}

export interface PhotoCollageImage {
  src: string
  alt: string
  width?: number
  height?: number
}
