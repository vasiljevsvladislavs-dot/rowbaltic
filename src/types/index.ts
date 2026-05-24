export interface RegistrationFormData {
  nickname: string
  phone: string
  email: string
  portfolioUrl: string
  socialUrl: string
  wallSize: string
  shirtSize: string
  isBalticArtist: boolean
  fullName?: string
  personalCode?: string
  consent: boolean
  portfolioFile?: File
}

export interface PhotoCollageImage {
  src: string
  alt: string
  width?: number
  height?: number
}
