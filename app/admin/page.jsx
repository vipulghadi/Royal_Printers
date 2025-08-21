"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, ShoppingCart, Star, TrendingUp, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalReviews: 0,
    revenue: 0,
    avgRating: 0,
  })

  useEffect(() => {
    // Simulate fetching dashboard stats
    setStats({
      totalProducts: 24,
      totalCustomers: 156,
      totalOrders: 89,
      totalReviews: 67,
      revenue: 45600,
      avgRating: 4.3,
    })
  }, [])

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-orange-600",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Avg Rating",
      value: stats.avgRating,
      icon: TrendingUp,
      color: "text-pink-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Royal Printers Admin Panel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Order #RP-123456</span>
                <span className="text-muted-foreground">₹299</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Order #RP-123457</span>
                <span className="text-muted-foreground">₹199</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Order #RP-123458</span>
                <span className="text-muted-foreground">₹599</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Visiting Cards</span>
                <span className="text-muted-foreground">45 orders</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Custom Mugs</span>
                <span className="text-muted-foreground">32 orders</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>T-Shirts</span>
                <span className="text-muted-foreground">28 orders</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
