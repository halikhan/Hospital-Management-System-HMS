"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Package2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  costPerUnit: number
  supplier: string
  lastRestocked: string
  expiryDate?: string
  status: "in-stock" | "low-stock" | "out-of-stock" | "expired"
}

const mockInventory: InventoryItem[] = [
  {
    id: "INV001",
    name: "Surgical Gloves (Box)",
    category: "Medical Supplies",
    currentStock: 150,
    minStock: 50,
    maxStock: 500,
    unit: "boxes",
    costPerUnit: 25.99,
    supplier: "MedSupply Co.",
    lastRestocked: "2024-01-15",
    status: "in-stock",
  },
  {
    id: "INV002",
    name: "Paracetamol 500mg",
    category: "Medications",
    currentStock: 25,
    minStock: 100,
    maxStock: 1000,
    unit: "bottles",
    costPerUnit: 8.5,
    supplier: "PharmaCorp",
    lastRestocked: "2024-01-10",
    expiryDate: "2025-06-30",
    status: "low-stock",
  },
  {
    id: "INV003",
    name: "X-Ray Film",
    category: "Radiology",
    currentStock: 0,
    minStock: 20,
    maxStock: 200,
    unit: "sheets",
    costPerUnit: 15.75,
    supplier: "RadiTech",
    lastRestocked: "2023-12-20",
    status: "out-of-stock",
  },
  {
    id: "INV004",
    name: "Insulin Syringes",
    category: "Medical Supplies",
    currentStock: 300,
    minStock: 100,
    maxStock: 1000,
    unit: "pieces",
    costPerUnit: 0.85,
    supplier: "MedSupply Co.",
    lastRestocked: "2024-01-18",
    status: "in-stock",
  },
  {
    id: "INV005",
    name: "Antibiotics (Expired)",
    category: "Medications",
    currentStock: 45,
    minStock: 50,
    maxStock: 500,
    unit: "bottles",
    costPerUnit: 12.3,
    supplier: "PharmaCorp",
    lastRestocked: "2023-08-15",
    expiryDate: "2024-01-01",
    status: "expired",
  },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "out-of-stock":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "expired":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100)
  }

  const totalItems = inventory.length
  const lowStockItems = inventory.filter((item) => item.status === "low-stock").length
  const outOfStockItems = inventory.filter((item) => item.status === "out-of-stock").length
  const expiredItems = inventory.filter((item) => item.status === "expired").length
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * item.costPerUnit, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage hospital inventory and supplies</p>
        </div>
        <Link href="/inventory/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Inventory items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">Items unavailable</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(lowStockItems > 0 || outOfStockItems > 0 || expiredItems > 0) && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Inventory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {lowStockItems > 0 && (
                <p className="text-yellow-700 dark:text-yellow-300">• {lowStockItems} items are running low on stock</p>
              )}
              {outOfStockItems > 0 && (
                <p className="text-red-700 dark:text-red-300">• {outOfStockItems} items are out of stock</p>
              )}
              {expiredItems > 0 && (
                <p className="text-gray-700 dark:text-gray-300">• {expiredItems} items have expired</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Complete list of hospital inventory and supplies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost/Unit</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {item.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            {item.currentStock} {item.unit}
                          </span>
                          <span className="text-muted-foreground">
                            {getStockPercentage(item.currentStock, item.maxStock).toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={getStockPercentage(item.currentStock, item.maxStock)} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>${item.costPerUnit.toFixed(2)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{new Date(item.lastRestocked).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/inventory/${item.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/inventory/${item.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Item
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package2 className="mr-2 h-4 w-4" />
                            Restock
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
