import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import ProjectCard from './ProjectCard'

const baseProps = {
  eyebrow: 'researchpulse',
  title: 'A discovery tool for trending biomedical research.',
  problem: 'PubMed indexes millions of articles.',
  approach: 'Full-stack build with a discovery-first search experience.',
  outcome: 'Patterns from it were ported back into rr-dev.',
  tags: ['TypeScript', 'Full-Stack'],
  repoUrl: 'https://github.com/rmrose78/researchpulse',
}

describe('ProjectCard', () => {
  it('renders title, problem/approach/outcome copy, and tags', () => {
    // Arrange & Act
    render(
      <ProjectCard {...baseProps} media={{ kind: 'placeholder', text: 'x' }} />
    )

    // Assert
    expect(screen.getByText(baseProps.title)).toBeInTheDocument()
    expect(screen.getByText(baseProps.problem)).toBeInTheDocument()
    expect(screen.getByText(baseProps.approach)).toBeInTheDocument()
    expect(screen.getByText(baseProps.outcome)).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Full-Stack')).toBeInTheDocument()
  })

  it('renders an image with alt text for image media', () => {
    // Arrange & Act
    render(
      <ProjectCard
        {...baseProps}
        media={{ kind: 'image', src: '/projects/demo.gif', alt: 'Demo GIF' }}
      />
    )

    // Assert
    expect(screen.getByRole('img', { name: 'Demo GIF' })).toHaveAttribute(
      'src',
      '/projects/demo.gif'
    )
  })

  it('renders the eyebrow in a status bar above the media/body split', () => {
    // Arrange & Act
    render(
      <ProjectCard {...baseProps} media={{ kind: 'placeholder', text: 'x' }} />
    )

    // Assert
    expect(screen.getByText(baseProps.eyebrow)).toBeInTheDocument()
  })

  it('renders a caption strip under image media, not under a placeholder', () => {
    // Arrange & Act
    const { container, rerender } = render(
      <ProjectCard
        {...baseProps}
        media={{ kind: 'image', src: '/projects/demo.gif', alt: 'Demo GIF' }}
      />
    )

    // Assert
    const caption = container.querySelector('.mediaCaption')
    expect(caption).toBeTruthy()

    // Act
    rerender(
      <ProjectCard
        {...baseProps}
        media={{ kind: 'placeholder', text: 'Screenshot coming soon' }}
      />
    )

    // Assert
    expect(container.querySelector('.mediaCaption')).not.toBeInTheDocument()
  })

  it('makes the media panel a real link to the repo when there is no live site, with no separate source link', () => {
    // Arrange & Act
    render(
      <ProjectCard
        {...baseProps}
        media={{ kind: 'image', src: '/projects/demo.gif', alt: 'Demo GIF' }}
      />
    )

    // Assert
    const mediaLink = screen.getByRole('link', { name: /view on github/i })
    expect(mediaLink).toHaveAttribute('href', baseProps.repoUrl)
    expect(mediaLink).toHaveAttribute('target', '_blank')
    expect(mediaLink).toHaveAttribute('rel', 'noreferrer')
    expect(screen.getByText(/view on github/i)).toBeInTheDocument()

    // A second repo link would just repeat the one above, so it shouldn't
    // exist when there's no live site to justify a compact "source" link.
    expect(
      screen.queryByRole('link', { name: /view source/i })
    ).not.toBeInTheDocument()
  })

  it('makes the media panel link to the live site when one is provided, with a distinct compact source link to the repo', () => {
    // Arrange & Act
    render(
      <ProjectCard
        {...baseProps}
        liveUrl="https://example.com"
        media={{ kind: 'image', src: '/projects/demo.gif', alt: 'Demo GIF' }}
      />
    )

    // Assert
    const mediaLink = screen.getByRole('link', { name: /view live site/i })
    expect(mediaLink).toHaveAttribute('href', 'https://example.com')
    expect(screen.getByText(/view live site/i)).toBeInTheDocument()

    const sourceLink = screen.getByRole('link', { name: /view source:/i })
    expect(sourceLink).toHaveAttribute('href', baseProps.repoUrl)
    expect(sourceLink).toHaveAttribute('target', '_blank')
    expect(sourceLink).toHaveAttribute('rel', 'noreferrer')

    // The two links must be distinguishable by accessible name alone.
    expect(mediaLink.getAttribute('aria-label')).not.toEqual(
      sourceLink.getAttribute('aria-label')
    )
  })

  it('renders visible placeholder text (not an image) for placeholder media', () => {
    // Arrange & Act
    render(
      <ProjectCard
        {...baseProps}
        media={{ kind: 'placeholder', text: 'Screenshot coming soon' }}
      />
    )

    // Assert
    expect(screen.getByText('Screenshot coming soon')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('has no accessibility violations, image and placeholder media, with and without a live site', async () => {
    // Arrange
    const { container, rerender } = render(
      <ProjectCard
        {...baseProps}
        media={{ kind: 'image', src: '/projects/demo.gif', alt: 'Demo GIF' }}
      />
    )

    // Act
    const imageResults = await axe(container)

    // Assert
    expect(imageResults).toHaveNoViolations()

    // Act
    rerender(
      <ProjectCard
        {...baseProps}
        liveUrl="https://example.com"
        media={{ kind: 'image', src: '/projects/demo.gif', alt: 'Demo GIF' }}
      />
    )
    const imageWithLiveUrlResults = await axe(container)

    // Assert
    expect(imageWithLiveUrlResults).toHaveNoViolations()

    // Act
    rerender(
      <ProjectCard
        {...baseProps}
        media={{ kind: 'placeholder', text: 'Screenshot coming soon' }}
      />
    )
    const placeholderResults = await axe(container)

    // Assert
    expect(placeholderResults).toHaveNoViolations()

    // Act
    rerender(
      <ProjectCard
        {...baseProps}
        liveUrl="https://example.com"
        media={{ kind: 'placeholder', text: 'Screenshot coming soon' }}
      />
    )
    const placeholderWithLiveUrlResults = await axe(container)

    // Assert
    expect(placeholderWithLiveUrlResults).toHaveNoViolations()
  })
})
