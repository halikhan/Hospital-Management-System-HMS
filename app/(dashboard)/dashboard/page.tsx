import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  UserCheck,
  Calendar,
  Bed,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  Clock,
  CheckCircle,
} from "lucide-react"

const stats = [
  {
    title: "Total Patients",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Doctors",
    value: "156",
    change: "+3%",
    trend: "up",
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Today's Appointments",
    value: "89",
    change: "-5%",
    trend: "down",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Available Beds",
    value: "23/150",
    change: "15%",
    trend: "up",
    icon: Bed,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "admission",
    message: "New patient admitted to ICU",
    time: "5 minutes ago",
    status: "urgent",
  },
  {
    id: 2,
    type: "appointment",
    message: "Appointment scheduled with Dr. Smith",
    time: "15 minutes ago",
    status: "normal",
  },
  {
    id: 3,
    type: "discharge",
    message: "Patient discharged from Room 205",
    time: "30 minutes ago",
    status: "completed",
  },
  {
    id: 4,
    type: "lab",
    message: "Lab results ready for Patient ID: P001",
    time: "1 hour ago",
    status: "normal",
  },
]

const upcomingAppointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Sarah Wilson",
    time: "10:00 AM",
    type: "Consultation",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Michael Brown",
    time: "11:30 AM",
    type: "Follow-up",
    status: "pending",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    doctor: "Dr. Emily Davis",
    time: "2:00 PM",
    type: "Surgery Consultation",
    status: "confirmed",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your hospital today.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            System Status
          </Button>
          <Button>
            <AlertCircle className="mr-2 h-4 w-4" />
            Emergency Alert
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your hospital</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    activity.status === "urgent"
                      ? "bg-red-100"
                      : activity.status === "completed"
                        ? "bg-green-100"
                        : "bg-blue-100"
                  }`}
                >
                  {activity.status === "urgent" ? (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  ) : activity.status === "completed" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Today's scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{appointment.patient}</p>
                  <p className="text-xs text-muted-foreground">{appointment.doctor}</p>
                  <p className="text-xs text-muted-foreground">{appointment.type}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">{appointment.time}</p>
                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
