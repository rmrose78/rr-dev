// import.meta.env is a Vite build-time construct, not valid CommonJS -- Jest
// can't compile it under ts-jest's CJS transform. Isolating every
// import.meta.env read behind this module lets jest.config.js swap in a
// test-only stand-in (env.jest.ts) via moduleNameMapper, so ts-jest never
// has to see the real import.meta syntax.
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
