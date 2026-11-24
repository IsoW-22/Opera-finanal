import {
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'

/**
 * Minimal client-side navigation layer (History API) — no router dependency.
 *
 * Routes are written app-relative (`/`, `/about`, `/contact`). On a sub-path
 * deployment (GitHub Pages: `/opera-finanal/`) they are transparently prefixed
 * with Vite's `BASE_URL`, so `Link`/`usePath`/`navigate` work identically in
 * dev (base `/`) and production (base `/opera-finanal/`).
 */

const BASE = import.meta.env.BASE_URL // '/' in dev, '/opera-finanal/' in the Pages build
const BASE_PATH = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE // '' | '/opera-finanal'

const listeners = new Set<() => void>()

function notify() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Browser path → app route: `/opera-finanal/about` → `/about`, `/opera-finanal/` → `/`. */
function toRoute(pathname: string) {
  if (BASE_PATH && (pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`))) {
    return pathname.slice(BASE_PATH.length) || '/'
  }
  return pathname || '/'
}

/** App route → browser path: `/about` → `/opera-finanal/about`, `/` → `/opera-finanal/`. */
function withBase(path: string) {
  if (path === '/' || path === '') return BASE
  return BASE + path.replace(/^\//, '')
}

function hrefFor(to: string) {
  const url = new URL(to, window.location.origin)
  return withBase(url.pathname) + url.search + url.hash
}

function getPath() {
  return toRoute(window.location.pathname)
}

export function usePath() {
  return useSyncExternalStore(subscribe, getPath, () => '/')
}

function scrollToTarget(hash: string, smooth: boolean) {
  if (hash.length > 1) {
    const target = document.querySelector(hash)
    if (target) {
      target.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' })
      return
    }
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin)
  const route = url.pathname
  const samePath = route === toRoute(window.location.pathname)

  if (samePath && url.hash === window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return
  }

  window.history.pushState(null, '', hrefFor(to))
  notify()
  requestAnimationFrame(() => scrollToTarget(url.hash, samePath))
}

function handlePopState() {
  notify()
  requestAnimationFrame(() => scrollToTarget(window.location.hash, true))
}

/** Rewrite legacy/entry URLs (`/about.html`, `/opera-finanal/index.html`) to clean routes. */
function normalizeLocation() {
  const { pathname, search, hash } = window.location
  const route = toRoute(pathname)
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '')
  const real = withBase(route) + search + hash
  if (real !== pathname + search + hash) window.history.replaceState(null, '', real)
}

export function installRouter() {
  normalizeLocation()
  window.addEventListener('popstate', handlePopState)
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children?: ReactNode
}

export function Link({ href, onClick, target, ...rest }: LinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (target && target !== '_self') return
    if (!href.startsWith('/')) return

    event.preventDefault()
    navigate(href)
  }

  return <a {...rest} href={hrefFor(href)} target={target} onClick={handleClick} />
}
