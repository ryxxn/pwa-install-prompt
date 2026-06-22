<!-- markdownlint-disable MD024 -->

# Change Log

...

## [0.1.0] - 2025-04-08

### Added

- French translation support by [@BesrourMS](https://github.com/BesrourMS) in https://github.com/ryxxn/pwa-install-prompt/pull/2

## [0.2.0] - 2025-05-14

### Added

- Added `installAvailable` logic to determine PWA installability
- New fallback messages when installation is unavailable (`INSTALL_UNAVAILABLE`, `INSTALL_SKIP_BUTTON`)

## [0.2.1] - 2026-06-22

### Fixed

- `getFaviconHref` now also matches `shortcut icon` and `apple-touch-icon` links, not only an exact `rel="icon"`
- The modal now closes after `appinstalled` (only when its own hash is active, so an unrelated page hash is left untouched)
