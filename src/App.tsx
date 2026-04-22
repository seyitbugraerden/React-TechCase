import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { AppSidebar } from '@/components/AppSidebar'
import { DirectoryOverview } from '@/components/DirectoryOverview'
import { ManufacturerDetail } from '@/components/ManufacturerDetail'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { manufacturers } from '@/data/manufacturers'
import type { AppRoute } from '@/types'
import { getRouteFromHash, listRoute, navigate } from './lib/utils'


function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash())
  const [searchTerm, setSearchTerm] = useState('')
  const [cityFilter, setCityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const deferredSearchTerm = useDeferredValue(searchTerm)

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/')
    }

    const syncRoute = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', syncRoute)

    return () => {
      window.removeEventListener('hashchange', syncRoute)
    }
  }, [])

  const selectedManufacturer =
    route.kind === 'detail'
      ? manufacturers.find(
          (manufacturer) => manufacturer.id === route.manufacturerId,
        ) ?? null
      : null

  useEffect(() => {
    if (route.kind === 'detail' && !selectedManufacturer) {
      startTransition(() => navigate(listRoute))
    }
  }, [route, selectedManufacturer])

  useEffect(() => {
    if (route.kind !== 'detail') {
      return
    }

    const resetScrollPosition = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    resetScrollPosition()
    const frameId = window.requestAnimationFrame(resetScrollPosition)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [route])

  const normalizedSearchTerm = deferredSearchTerm.trim().toLocaleLowerCase('tr')

  const filteredManufacturers = useMemo(() => {
    return manufacturers.filter((manufacturer) => {
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        manufacturer.name.toLocaleLowerCase('tr').includes(normalizedSearchTerm) ||
        manufacturer.city.toLocaleLowerCase('tr').includes(normalizedSearchTerm) ||
        manufacturer.category
          .toLocaleLowerCase('tr')
          .includes(normalizedSearchTerm) ||
        manufacturer.offerings.some((offering) =>
          offering.toLocaleLowerCase('tr').includes(normalizedSearchTerm),
        )

      const matchesCity =
        cityFilter === 'all' || manufacturer.city === cityFilter
      const matchesCategory =
        categoryFilter === 'all' || manufacturer.category === categoryFilter

      return matchesSearch && matchesCity && matchesCategory
    })
  }, [categoryFilter, cityFilter, normalizedSearchTerm])

  const cities = useMemo(
    () => [...new Set(manufacturers.map((manufacturer) => manufacturer.city))],
    [],
  )
  const categories = useMemo(
    () => [...new Set(manufacturers.map((manufacturer) => manufacturer.category))],
    [],
  )

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar currentView={route.kind} />

      <SidebarInset>
        <Header fixed>
          <div className='flex min-w-0 flex-1 items-center justify-between gap-3'>
            <div className='min-w-0'>
              <h1 className='truncate text-lg font-semibold'>
                {route.kind === 'list'
                  ? 'Üretici dizini ve karşılaştırma'
                  : selectedManufacturer?.name ?? 'Üretici profili'}
              </h1>
            </div>
          </div>
        </Header>

        <Main className='bg-muted/30'>
          {route.kind === 'list' ? (
            <DirectoryOverview
              manufacturers={filteredManufacturers}
              cities={cities}
              categories={categories}
              searchTerm={searchTerm}
              cityFilter={cityFilter}
              categoryFilter={categoryFilter}
              onSearchTermChange={setSearchTerm}
              onCityFilterChange={setCityFilter}
              onCategoryFilterChange={setCategoryFilter}
              onClearFilters={() => {
                setSearchTerm('')
                setCityFilter('all')
                setCategoryFilter('all')
              }}
              onOpenManufacturer={(manufacturerId) => {
                startTransition(() =>
                  navigate({ kind: 'detail', manufacturerId }),
                )
              }}
            />
          ) : selectedManufacturer ? (
            <ManufacturerDetail
              manufacturer={selectedManufacturer}
              onBack={() => {
                startTransition(() => navigate(listRoute))
              }}
            />
          ) : null}
        </Main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
