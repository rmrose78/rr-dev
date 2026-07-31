// Guards against a future project entry with no live deploy, only a repo --
// every entry today has one, so this is exercised via a unit test on the
// helper itself rather than the real PROJECTS data in Projects.tsx.
export function getLiveUrl(project: { liveUrl?: string }): string | undefined {
  return project.liveUrl
}
