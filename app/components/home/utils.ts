import { FiFileText, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import type { SocialLink } from '../../data/site-content'

export const socialIcons: Record<SocialLink['kind'], IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  resume: FiFileText
}

export function createDialogTitleId(title: string) {
  return `modal-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}
