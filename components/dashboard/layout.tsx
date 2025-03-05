"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutGrid,
  WalletCards,
  ArrowLeftRight,
  Receipt,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  MoreVertical,
  Menu,
  X,
  CreditCard,
  ArrowDownRight,
  FileText,
  Shield,
  HomeIcon,
  CreditCardIcon,
  DiamondIcon as GoldIcon,
  MessageSquare,
} from "lucide-react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { api } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutGrid },
  { name: "Transfer", href: "/dashboard/transfer", icon: ArrowLeftRight },
  { name: "Deposit", href: "/dashboard/deposit", icon: WalletCards },
  { name: "Withdraw", href: "/dashboard/withdraw", icon: ArrowDownRight },
  { name: "Loan", href: "/dashboard/loan", icon: FileText },
  { name: "KYC", href: "/dashboard/kyc", icon: Shield },
  { name: "Transactions", href: "/dashboard/transactions", icon: Receipt },
  { name: "Cards", href: "/dashboard/cards", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

const bottomNavigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon, className: "text-gray-600" },
  { name: "My Card", href: "/dashboard/cards", icon: CreditCardIcon, className: "text-gray-600" },
  { name: "Buy Gold", href: "/dashboard/buy-gold", icon: GoldIcon, className: "text-gray-600" },
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare, className: "text-gray-600" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const bottomNavRef = useRef<HTMLDivElement>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [accountInfo, setAccountInfo] = useState<any>(null)
  const [accountUser, setAccountUser] = useState<any>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { theme } = useTheme()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Hide bottom navigation on larger screens
    const handleResize = () => {
      if (bottomNavRef.current) {
        bottomNavRef.current.style.display = window.innerWidth < 768 ? "flex" : "none"
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Call on mount

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle clicking outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      const menuButton = document.getElementById("menu-button")

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

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await api.getUserDetails() // Call the API method
        setAccountUser(data?.data?.user) // Set the fetched data to state
      } catch (err: any) {
        setError(err.message || "Failed to fetch account info") // Handle error
      } finally {
        setLoading(false) // Stop loading indicator
      }
    }

    fetchAccountInfo() // Call the function when the component mounts
  }, [])

  useEffect(() => {
    setIsNavigating(true)
    // Simulate a delay to show the loading indicator
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname]) // Removed searchParams from dependencies

  const handleLogout = () => {
    // Clear cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "expiry=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;" // Clear expiry cookie as well
    // Redirect to login
    router.push("/login")
  }

  // Enhanced navigation click handler
  const handleNavigationClick = () => {
    const isMobile = window.innerWidth < 1024
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Progress Indicator */}
      {isNavigating && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-100 z-50">
          <div className="h-full w-1/3 bg-blue-500 animate-loading rounded-r-full" />
        </div>
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-lg transform transition-all duration-300 ease-out dark:bg-gray-800 dark:border-gray-700",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GoldIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Pinnacle Global
                <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                  Wealth Management
                </span>
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-6">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavigationClick}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    "group hover:bg-blue-50/50 hover:text-blue-600 dark:hover:bg-gray-700/50 dark:hover:text-gray-200",
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold dark:bg-gray-700 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-400",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 mr-3 shrink-0 transition-colors",
                      isActive
                        ? "text-blue-500 dark:text-gray-200"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-gray-200",
                    )}
                  />
                  <span className="truncate">{item.name}</span>
                  {item.name === "KYC" && (
                    <span className="ml-auto px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                      Action Needed
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Profile - Improved */}
          <div className="sticky bottom-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-100 dark:border-gray-700">
            <div className="p-3">
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                {loading ? (
                  <div className="flex items-center gap-3 p-1">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ) : error ? (
                  <div className="p-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    {error}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      {accountUser?.avatar ? (
                        <Image
                          src={accountUser.avatar}
                          alt={accountUser?.fullName || "User"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center ring-2 ring-white dark:ring-gray-700">
                          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-800 flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-200 rounded-full animate-ping" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {accountUser?.fullName || "Guest User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {accountUser?.email || "Premium Member"}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg"
                      >
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/10"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Button
                id="menu-button"
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                {pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
              </h2>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              {!isMobile && (
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 pr-4 rounded-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:ring-1 focus:ring-blue-500 w-48 lg:w-64 transition-all"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                </div>
              )}

              <ThemeToggle />

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 relative"
                asChild
              >
                <Link href="/dashboard/notifications">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-1 lg:p-8 bg-gray-50 dark:bg-gray-900">
          <div className="w-full px-1 lg:max-w-screen-xl lg:mx-auto bg-white dark:bg-gray-800 rounded-none lg:rounded-xl shadow-none lg:shadow-sm border-0 lg:border border-gray-100 dark:border-gray-700 p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

