import type { AppRoute } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const listRoute: AppRoute = { kind: 'list' }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRouteFromHash(): AppRoute {
  if (typeof window === 'undefined') {
    return listRoute
  }

  const hash = window.location.hash.replace(/^#/, '') || '/'
  const detailMatch = hash.match(/^\/manufacturer\/([\w-]+)$/)

  if (detailMatch) {
    return { kind: 'detail', manufacturerId: detailMatch[1] }
  }

  return listRoute
}

export function navigate(route: AppRoute) {
  const nextHash =
    route.kind === 'list' ? '#/' : `#/manufacturer/${route.manufacturerId}`

  if (window.location.hash === nextHash) {
    window.dispatchEvent(new Event('hashchange'))
    return
  }

  window.history.pushState(null, '', nextHash)
  window.dispatchEvent(new Event('hashchange'))
}