import type { ComponentType } from 'react'
import {
  BadgeCheck,
  Building2,
  ClipboardList,
  Clock3,
  Factory,
  FileStack,
  Send,
  Settings2,
  Smartphone,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'

type AppSidebarProps = {
  currentView: 'list' | 'detail'
}

type SidebarSectionItem = {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
  activeOn?: 'list' | 'detail'
}

type SidebarSection = {
  title: string
  items: SidebarSectionItem[]
}

const sections: SidebarSection[] = [
  {
    title: 'Ana Ekranlar',
    items: [
      {
        label: 'Üretici Listesi',
        href: '#/',
        icon: Factory,
        activeOn: 'list',
      },
      {
        label: 'Üretici Detayı',
        href: '#/manufacturer/atlas-textile',
        icon: FileStack,
        activeOn: 'detail',
      },
      {
        label: 'Talep Formu',
        href: '#/manufacturer/atlas-textile',
        icon: Send,
        activeOn: 'detail',
      },
    ],
  },
  {
    title: 'Teknik Kapsam',
    items: [
      {
        label: 'Responsive Yapı',
        href: '#',
        icon: Smartphone,
      },
      {
        label: 'Form Validasyonu',
        href: '#',
        icon: BadgeCheck,
      },
      {
        label: 'Örnek Veri',
        href: '#',
        icon: ClipboardList,
      },
    ],
  },
  {
    title: 'Proje Notları',
    items: [
      {
        label: 'Termin Süreleri',
        href: '#',
        icon: Clock3,
      },
      {
        label: 'UI Bileşenleri',
        href: '#',
        icon: Settings2,
      },
      {
        label: 'Teslim Akışı',
        href: '#',
        icon: ClipboardList,
      },
    ],
  },
]

export function AppSidebar({
  currentView,
}: AppSidebarProps) {
  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <div className='rounded-[1.25rem] border border-sidebar-border bg-sidebar-accent/55 p-3'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'>
              <Building2 className='size-5' />
            </div>
            <div className='grid min-w-0 flex-1 text-sm'>
              <span className='truncate font-semibold'>Firma Adı</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = item.activeOn === currentView

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <a href={item.href}>
                        <Icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
