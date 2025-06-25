"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, BookOpen, Filter, Calendar } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  status: "published" | "draft" | "archived"
  publishDate: string
  readTime: number
  tags: string[]
  image?: string
}

const mockBlogs: Blog[] = [
  {
    id: "B001",
    title: "Understanding Heart Health: A Comprehensive Guide",
    excerpt:
      "Learn about the importance of cardiovascular health and how to maintain a healthy heart through lifestyle changes and medical care.",
    content: "Full blog content here...",
    author: "Dr. Sarah Wilson",
    category: "Cardiology",
    status: "published",
    publishDate: "2024-01-15",
    readTime: 8,
    tags: ["heart", "health", "prevention"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "B002",
    title: "Mental Health Awareness in Healthcare Settings",
    excerpt: "Exploring the importance of mental health support for both patients and healthcare workers.",
    content: "Full blog content here...",
    author: "Dr. Michael Brown",
    category: "Mental Health",
    status: "published",
    publishDate: "2024-01-12",
    readTime: 6,
    tags: ["mental health", "awareness", "support"],
  },
  {
    id: "B003",
    title: "Advances in Pediatric Care",
    excerpt: "Recent developments in pediatric medicine and their impact on child healthcare outcomes.",
    content: "Full blog content here...",
    author: "Dr. Emily Davis",
    category: "Pediatrics",
    status: "draft",
    publishDate: "2024-01-20",
    readTime: 10,
    tags: ["pediatrics", "children", "medical advances"],
  },
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { hasPermission } = useAuth()

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || blog.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage blog posts for the hospital website</p>
        </div>
        {hasPermission("blogs:create") && (
          <Link href="/blogs/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogs.length}</div>
            <p className="text-xs text-muted-foreground">All blog posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogs.filter((b) => b.status === "published").length}</div>
            <p className="text-xs text-muted-foreground">Live posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogs.filter((b) => b.status === "draft").length}</div>
            <p className="text-xs text-muted-foreground">Unpublished</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">New posts</p>
          </CardContent>
        </Card>
      </div>

      {/* Blog List */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage all blog posts and articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("published")}>Published</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("draft")}>Draft</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("archived")}>Archived</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Read Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{blog.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</div>
                      </div>
                    </TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{blog.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(blog.status)}>{blog.status.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{new Date(blog.publishDate).toLocaleDateString()}</TableCell>
                    <TableCell>{blog.readTime} min</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/blogs/${blog.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          {hasPermission("blogs:update") && (
                            <DropdownMenuItem asChild>
                              <Link href={`/blogs/${blog.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                          )}
                          {hasPermission("blogs:delete") && (
                            <DropdownMenuItem onClick={() => handleDelete(blog.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
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
