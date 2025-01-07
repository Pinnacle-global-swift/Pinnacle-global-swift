'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutGrid,
  WalletCards,
  ArrowLeftRight,
  Receipt,
  PieChart,
  Target,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronRight,
  User,
  MoreVertical,
  Menu,
  X,
  CreditCard,
  Users,
  ArrowDownRight,
  FileText,
  Shield
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from 'next-themes'
import { api } from '@/lib/api'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutGrid },
  { name: 'Transfer', href: '/dashboard/transfer', icon: ArrowLeftRight },
  { name: 'Deposit', href: '/dashboard/deposit', icon: WalletCards },
  { name: 'Withdraw', href: '/dashboard/withdraw', icon: ArrowDownRight },
  { name: 'Loan', href: '/dashboard/loan', icon: FileText },
  { name: 'KYC', href: '/dashboard/kyc', icon: Shield },
  { name: 'Transactions', href: '/dashboard/transactions', icon: Receipt },
  { name: 'Cards', href: '/dashboard/cards', icon: CreditCard }, // Updated from Expenses
  { name: 'Settings', href: '/dashboard/settings', icon: Settings }
]

export default function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [accountInfo, setAccountInfo] = useState<any>(null)
  const [accountUser, setAccountUser] = useState<any>(null)

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { theme } = useTheme()

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsSidebarOpen(window.innerWidth >= 1024)
  //   }

  //   window.addEventListener('resize', handleResize)
  //   handleResize()

  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle clicking outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar')
      const menuButton = document.getElementById('menu-button')

      if (
        window.innerWidth < 1024 &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.getUserDetails() // Call the API method
        setAccountUser(data?.data?.user) // Set the fetched data to state
      } catch (err: any) {
        setError(err.message || 'Failed to fetch account info') // Handle error
      } finally {
        setLoading(false) // Stop loading indicator
      }
    }

    fetchAccountInfo() // Call the function when the component mounts
  }, [])

  return (
    <div
      className={cn(
        'min-h-screen   transition-colors  duration-300',
        theme === 'dark' ? 'dark:bg-gradient-dark' : 'light:bg-gradient-light'
      )}
    >
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id='sidebar'
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-lg transform transition-transform duration-300 ease-in-out',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='p-6 bg-gradient-to-r from-blue-600 to-indigo-600'>
            <h1 className='text-xl font-bold  text-white'>
              Pinnacle Global Bank
            </h1>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 space-y-1 overflow-y-auto py-4'>
            {navigation.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className='w-5 h-5 mr-3' />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className='p-4 border-t'>
            <div className='flex items-center space-x-3'>
              <div className='flex-shrink-0'>
                <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center'>
                  <User className='w-6 h-6 text-white' />
                </div>
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-foreground'>
                  {accountUser?.fullName}
                </p>
                <p className='text-xs text-muted-foreground'>View profile</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <MoreVertical className='w-4 h-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>
                    <Link
                      href='/login'
                      className='flex items-center bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-md'
                    >
                      <LogOut className='w-4 h-4 mr-2' />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='lg:pl-64 flex flex-col min-h-screen'>
        {/* Header */}
        <header className='bg-background  border-b sticky top-0 z-40'>
          <div className='flex items-center justify-between px-4 py-4 lg:px-8'>
            <div className='flex items-center space-x-4'>
              <Button
                id='menu-button'
                variant='ghost'
                size='icon'
                className='lg:hidden'
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  <X className='w-6 h-6' />
                ) : (
                  <Menu className='w-6 h-6' />
                )}
              </Button>
              <h2 className='text-xl font-semibold text-foreground'>
                Dashboard
              </h2>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='relative hidden md:block'>
                <Input
                  type='search'
                  placeholder='Search...'
                  className='w-64 pl-10'
                  onFocus={() => setIsSearching(true)}
                  onBlur={() => setIsSearching(false)}
                />
                <Search className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
              </div>
              <ThemeToggle />
              <Link href='/dashboard/notifications' passHref>
                <Button variant='ghost' size='icon' asChild>
                  <span>
                    <Bell className='w-5 h-5' />
                    <span className='sr-only'>Notifications</span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className='flex-grow p-4 lg:p-8 overflow-auto'>{children}</main>
      </div>
    </div>
  )
}
