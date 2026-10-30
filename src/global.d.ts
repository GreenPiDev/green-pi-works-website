import type { Project } from './data/projects'

declare global {
  interface Window {
    AssidProjectCarousel: {
      init: (root: HTMLElement | null, options: unknown) => void
      update?: (projects: Project[]) => void
    }
    openProjectTerminal?: (project: Project) => void
  }
}

export {}
