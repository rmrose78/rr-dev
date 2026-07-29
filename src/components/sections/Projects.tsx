import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import ProjectCard from '@/components/ui/ProjectCard'
import styles from './Projects.module.scss'

const PROJECTS = [
  {
    id: 'researchpulse',
    eyebrow: 'researchpulse',
    title:
      "A discovery tool for trending biomedical research, built on top of PubMed's 35+ million articles.",
    problem:
      "PubMed indexes more than 35 million biomedical articles, and finding what's actually relevant and trending is the real challenge, especially for people who need to act on research, not just search for it.",
    approach:
      'Full-stack build with a discovery-first search experience, saved collections, and a UI that treats triage as a first-class workflow, not an afterthought.',
    tags: ['TypeScript', 'Full-Stack', 'Research Tooling'],
    outcome:
      "The project that pushed this portfolio's own accessibility and testing discipline. The jest-axe and Playwright patterns running on rr-dev were ported back from here.",
    repoUrl: 'https://github.com/rmrose78/researchpulse',
    liveUrl: 'https://researchpulsehq.com/',
    media: {
      kind: 'image' as const,
      src: '/projects/researchpulse-demo.gif',
      alt: 'ResearchPulse demo: searching and saving trending biomedical research articles',
      // Native ratio is 8:5, not 16:9 -- cropping is unavoidable in a 16:9
      // box. Anchor to the top so the cover-crop trims from the bottom
      // instead of splitting the difference and cutting into the search
      // UI near the top of frame.
      focalPoint: 'top' as const,
    },
    reverseMedia: false,
  },
  {
    id: 'elpa-website',
    eyebrow: 'elpa-website',
    title:
      "A donated rebuild for an organization whose entire web presence hadn't moved since 2007.",
    problem:
      "The original site was built in Microsoft FrontPage and hadn't been touched since 2007: no mobile support, manual FTP deploys.",
    approach:
      "Full rebuild on the same modern stack as this site, mobile-first, with an accessible modal system for the organization's building history archive, using the same AI-assisted accessibility workflow applied across this portfolio.",
    tags: ['SCSS', 'React', 'Nonprofit'],
    outcome:
      "Scoped and built as a first phase: layout, structure, and an accessible modal system for the organization's building history archive. Final gallery content and the donations integration are next, on the client's timeline.",
    repoUrl: 'https://github.com/rmrose78/elpa-website',
    liveUrl: 'https://eaglelakepreservationalliance.netlify.app/',
    media: {
      kind: 'image' as const,
      src: '/projects/elpa-website-demo.gif',
      alt: 'Eagle Lake Preservation Alliance site: hero, credentials, and accomplishments sections',
    },
    reverseMedia: true,
  },
]

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const

export default function Projects() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className={styles.projects}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Fieldwork</p>
          <h2 className={styles.title} id="projects-heading">
            Built, tested, shipped.
          </h2>
        </div>

        <div className={styles.metaIntro}>
          <p className={styles.metaLabel}>
            <span className={styles.metaDot} aria-hidden="true" />
            About this site
          </p>
          <p className={styles.metaText}>
            Built to the same standard as the case studies below: Jest
            test coverage, Lighthouse and real-browser accessibility
            sweeps on every component, and an AI-assisted review workflow
            that speeds up checks without skipping manual verification.
            {' '}
            <a
              href="https://github.com/rmrose78/rr-dev"
              target="_blank"
              rel="noreferrer"
              className={styles.metaLink}
            >
              View source on GitHub &rarr;
            </a>
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={revealVariants}
              initial={reducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <ProjectCard
                eyebrow={project.eyebrow}
                title={project.title}
                problem={project.problem}
                approach={project.approach}
                tags={project.tags}
                outcome={project.outcome}
                repoUrl={project.repoUrl}
                liveUrl={'liveUrl' in project ? project.liveUrl : undefined}
                media={project.media}
                reverseMedia={project.reverseMedia}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
