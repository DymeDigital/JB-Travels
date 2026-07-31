/**
 * Module-level flags that track intro animation state for this page session.
 *
 * Module variables reset on every hard reload/fresh page load, but survive
 * client-side (SPA) navigations — exactly what we need:
 *   • Hard reload / first visit → both false → animations play.
 *   • Logo click back to home (SPA nav) → both true → animations skipped.
 *
 * Two flags are needed because the loader completes BEFORE Hero mounts,
 * so using a single flag would cause Hero to skip its animation on first load.
 */

/** Set when the loading screen finishes — used by HomeClient to skip the loader. */
let _introComplete = false;

/** Set when Hero animations have played — used by Hero to skip re-animating. */
let _heroAnimated = false;

export function isIntroComplete(): boolean {
  return _introComplete;
}

export function setIntroComplete(): void {
  _introComplete = true;
}

export function isHeroAnimated(): boolean {
  return _heroAnimated;
}

export function setHeroAnimated(): void {
  _heroAnimated = true;
}
