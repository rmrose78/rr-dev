// Reads coverage/coverage-summary.json (from `npm run test:coverage`) and
// writes badges/coverage.json in shields.io's "endpoint" schema. README
// points a shields.io URL at the raw file on GitHub, so the badge itself
// is rendered by shields.io on every view -- no SVG to commit or keep in
// sync, no extra npm dependency to maintain.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const summary = JSON.parse(
  readFileSync('coverage/coverage-summary.json', 'utf8')
)
const pct = summary.total.statements.pct

const color =
  pct >= 90
    ? 'brightgreen'
    : pct >= 80
      ? 'green'
      : pct >= 70
        ? 'yellow'
        : pct >= 50
          ? 'orange'
          : 'red'

mkdirSync('badges', { recursive: true })
writeFileSync(
  'badges/coverage.json',
  JSON.stringify(
    {
      schemaVersion: 1,
      label: 'coverage',
      message: `${pct}%`,
      color,
    },
    null,
    2
  ) + '\n'
)
