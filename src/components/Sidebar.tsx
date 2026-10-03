import { useEffect, useState } from 'react'
import {
  Activity,
  Database,
  FileText,
  FolderKanban,
  HeartPulse,
  Layers3,
  LayoutDashboard,
  Menu,
  Network,
  User,
  X,
  Mail,
} from 'lucide-react'

const navigation = [
  { name: 'Overview', icon: LayoutDashboard, href: '#overview', id: 'overview' },
  { name: 'Asset Hub', icon: Database, href: '#assets', id: 'assets' },
  { name: 'Publishing', icon: FileText, href: '#publishing', id: 'publishing' },
  { name: 'Health Monitor', icon: HeartPulse, href: '#health', id: 'health' },
  { name: 'Entity Explorer', icon: Network, href: '#entities', id: 'entities' },
  {
    name: 'Architecture',
    icon: Layers3,
    href: '#architecture',
    id: 'architecture',
  },
  {
    name: 'Case Studies',
    icon: FolderKanban,
    href: '#case-studies',
    id: 'case-studies',
  },
  { name: 'About', icon: User, href: '#about', id: 'about' },
  {
  name: 'Contact',
  icon: Mail,
  href: '#contact',
  id: 'contact',
  },
]

function Sidebar() {
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0.05,
      },
    )

    navigation.forEach((item) => {
      const element = document.getElementById(item.id)

      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const navContent = (
    <>
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
            <Activity className="text-emerald-400" size={20} />
          </div>

          <div>
            <p className="font-semibold">Nestor Ponte</p>
            <p className="text-xs text-gray-500">ORM Engineering</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = activeSection === item.id

          return (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active
                  ? 'bg-emerald-400/10 text-emerald-400'
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon
                size={17}
                className={
                  active
                    ? 'text-emerald-400'
                    : 'transition group-hover:text-gray-300'
                }
              />

              {item.name}

              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
            </a>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-5">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-xs font-medium text-emerald-400">
              Environment
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            Sanitized portfolio data. No client information is exposed.
          </p>
        </div>
      </div>
    </>
  )

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/10 bg-[#090d12]/95 backdrop-blur-xl lg:flex">
        {navContent}
      </aside>

      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#080b10]/90 px-5 py-4 backdrop-blur-xl lg:hidden">
        <div>
          <p className="text-sm font-semibold">Nestor Ponte</p>
          <p className="text-xs text-gray-600">ORM Engineering</p>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-white/10 p-2 text-gray-300"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <aside className="absolute right-0 top-0 flex h-full w-[300px] flex-col border-l border-white/10 bg-[#090d12]">
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {navContent}
          </aside>
        </div>
      )}
    </>
  )
}

export default Sidebar