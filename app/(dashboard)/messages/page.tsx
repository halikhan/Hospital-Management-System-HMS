"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Mail, MailOpen, Trash2, Reply, Forward, Archive, Clock, User } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  priority: "low" | "medium" | "high"
  createdAt: string
  department: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    subject: "Appointment Request",
    message:
      "I would like to schedule an appointment with a cardiologist. I have been experiencing chest pain and would like to get it checked.",
    status: "new",
    priority: "high",
    createdAt: "2024-01-15T10:30:00Z",
    department: "Cardiology",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 (555) 987-6543",
    subject: "Insurance Inquiry",
    message: "I wanted to know if my insurance plan covers the MRI scan that was recommended by my doctor.",
    status: "read",
    priority: "medium",
    createdAt: "2024-01-14T14:20:00Z",
    department: "Billing",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.j@email.com",
    phone: "+1 (555) 456-7890",
    subject: "Medical Records Request",
    message: "I need to request copies of my medical records for the past year. How can I obtain these documents?",
    status: "replied",
    priority: "low",
    createdAt: "2024-01-13T09:15:00Z",
    department: "Medical Records",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 321-0987",
    subject: "Emergency Contact Update",
    message: "I need to update my emergency contact information in your system. My previous contact has changed.",
    status: "new",
    priority: "medium",
    createdAt: "2024-01-12T16:45:00Z",
    department: "Registration",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 654-3210",
    subject: "Prescription Refill",
    message: "I need to refill my blood pressure medication. The prescription number is RX123456.",
    status: "archived",
    priority: "medium",
    createdAt: "2024-01-11T11:30:00Z",
    department: "Pharmacy",
  },
]

export default function MessagesPage() {
  const { hasPermission } = useAuth()
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getMessagesByStatus = (status: string) => {
    return filteredMessages.filter((message) => message.status === status)
  }

  const getAllMessages = () => filteredMessages

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, status: "read" as const } : msg)))
    toast({
      title: "Success",
      description: "Message marked as read",
    })
  }

  const handleArchiveMessage = (messageId: string) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, status: "archived" as const } : msg)))
    toast({
      title: "Success",
      description: "Message archived",
    })
  }

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((msg) => msg.id !== messageId))
    toast({
      title: "Success",
      description: "Message deleted",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Mail className="h-4 w-4" />
      case "read":
        return <MailOpen className="h-4 w-4" />
      case "replied":
        return <Reply className="h-4 w-4" />
      case "archived":
        return <Archive className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!hasPermission("messages:read")) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">Access Denied</h3>
          <p className="mt-1 text-sm text-muted-foreground">You don't have permission to view messages.</p>
        </div>
      </div>
    )
  }

  const MessageCard = ({ message }: { message: Message }) => (
    <Card
      className={`cursor-pointer transition-colors hover:bg-muted/50 ${message.status === "new" ? "border-l-4 border-l-blue-500" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getStatusIcon(message.status)}
            <div>
              <CardTitle className="text-base">{message.name}</CardTitle>
              <CardDescription className="text-sm">{message.email}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
            {hasPermission("messages:update") && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleMarkAsRead(message.id)}>
                    <MailOpen className="mr-2 h-4 w-4" />
                    Mark as Read
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="mr-2 h-4 w-4" />
                    Forward
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleArchiveMessage(message.id)}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteMessage(message.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{message.subject}</h4>
          <Badge variant="outline">{message.department}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            {message.phone}
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {formatDate(message.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Messages Management</h1>
          <p className="text-muted-foreground">Manage contact form submissions and inquiries</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{messages.filter((m) => m.status === "new").length} New</Badge>
          <Badge variant="outline">{messages.length} Total</Badge>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Messages ({getAllMessages().length})</TabsTrigger>
          <TabsTrigger value="new">New ({getMessagesByStatus("new").length})</TabsTrigger>
          <TabsTrigger value="read">Read ({getMessagesByStatus("read").length})</TabsTrigger>
          <TabsTrigger value="replied">Replied ({getMessagesByStatus("replied").length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({getMessagesByStatus("archived").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {getAllMessages().map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          {getMessagesByStatus("new").map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {getMessagesByStatus("read").map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </TabsContent>

        <TabsContent value="replied" className="space-y-4">
          {getMessagesByStatus("replied").map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          {getMessagesByStatus("archived").map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
