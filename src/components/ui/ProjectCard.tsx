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
  const mediaHref = liveUrl ?? repoUrl
  const mediaLinkLabel = liveUrl ? 'View live site' : 'View on GitHub'
  // When there's no live site, the media panel's own link already points at
  // the repo (mediaHref falls back to repoUrl above), so a second repo link
  // would just repeat it. Only render the compact source link when the
  // media panel is pointed somewhere else (the live site), so the repo
  // stays reachable without a redundant line.
  const showSourceLink = Boolean(liveUrl)

  return (
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
            // The media panel's caption used to read "> {eyebrow}" and look
            // clickable without being a link -- now it actually is one, so
            // the caption text names its real destination instead of
            // repeating the eyebrow.
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
          ) : (
            <p className={styles.placeholder}>{media.text}</p>
          )}

          {/* Only rendered when there's a live site, so the repo stays
              reachable without repeating the media panel's own link. */}
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
  )
}
