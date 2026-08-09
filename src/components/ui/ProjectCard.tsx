import { useState } from 'react'
import ImageLightboxModal from '@/components/ui/ImageLightboxModal'
import styles from './ProjectCard.module.scss'

type ProjectMedia =
  | { kind: 'image'; src: string; alt: string; focalPoint?: 'center' | 'top' }
  | { kind: 'placeholder'; text: string }

interface ProjectCardProps {
  eyebrow: string
  title: string
  problem: string
  approach: string
  outcome: string
  tags: string[]
  repoUrl: string
  liveUrl?: string
  media: ProjectMedia
  reverseMedia?: boolean
}

export default function ProjectCard({
  eyebrow,
  title,
  problem,
  approach,
  outcome,
  tags,
  repoUrl,
  liveUrl,
  media,
  reverseMedia,
}: ProjectCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const mediaHref = liveUrl ?? repoUrl
  const mediaLinkLabel = liveUrl ? 'View live site' : 'View on GitHub'
  const showSourceLink = Boolean(liveUrl)

  return (
    <>
      <article
        className={`${styles.card} ${reverseMedia ? styles.reverse : ''}`}
      >
        <div className={styles.bar}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.eyebrow}>{eyebrow}</span>
        </div>

        <div className={styles.split}>
          <div className={styles.media}>
            {media.kind === 'image' ? (
              <div className={styles.mediaContainer}>
                <a
                  className={styles.mediaLink}
                  href={mediaHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${mediaLinkLabel}: ${title}`}
                >
                  <img
                    className={`${styles.mediaImage} ${
                      media.focalPoint === 'top' ? styles.focalTop : ''
                    }`}
                    src={media.src}
                    alt={media.alt}
                    loading="lazy"
                  />
                  <p className={styles.mediaCaption}>{mediaLinkLabel} &rarr;</p>
                </a>

                <button
                  className={styles.lightboxBtn}
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label={`Expand ${title} demo image`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  Expand Demo
                </button>
              </div>
            ) : (
              <p className={styles.placeholder}>{media.text}</p>
            )}

            {showSourceLink && (
              <a
                className={styles.sourceLink}
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View source: ${title}`}
              >
                Source &#8599;
              </a>
            )}
          </div>

          <div className={styles.body}>
            <h3 className={styles.title}>{title}</h3>

            <p className={styles.label}>Problem</p>
            <p className={styles.text}>{problem}</p>

            <p className={styles.label}>Approach</p>
            <p className={styles.text}>{approach}</p>

            {/* eslint-disable jsx-a11y/no-redundant-roles */}
            <ul
              className={styles.tags}
              role="list"
              aria-label={`${title} tags`}
            >
              {tags.map((tag) => (
                <li key={tag} role="listitem" className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
            {/* eslint-enable jsx-a11y/no-redundant-roles */}

            <p className={styles.label}>Outcome</p>
            <p className={styles.outcome}>{outcome}</p>
          </div>
        </div>
      </article>

      {media.kind === 'image' && (
        <ImageLightboxModal
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          src={media.src}
          alt={media.alt}
          title={title}
          liveUrl={liveUrl}
          repoUrl={repoUrl}
        />
      )}
    </>
  )
}
