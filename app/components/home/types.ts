import type { LearningItem, Project } from '../../data/site-content'

export type SectionId = 'apresentacao' | 'especialidades' | 'experiencia' | 'formacao' | 'artigos' | 'projetos'
export type LearningFilter = 'all' | LearningItem['type']
export type ModalState = { type: 'contact' } | { type: 'project', project: Project } | null
