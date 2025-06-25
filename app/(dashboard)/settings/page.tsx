"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Bell, Shield, Database, Palette, Save, Building } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Hospital Settings
  const [hospitalSettings, setHospitalSettings] = useState({
    name: "City General Hospital",
    address: "123 Medical Center Drive, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@citygeneralhospital.com",
    website: "www.citygeneralhospital.com",
    timezone: "America/New_York",
    language: "en",
  })

  // User Profile Settings
  const [userSettings, setUserSettings] = useState({
    name: "Dr. Admin",
    email: "admin@hospital.com",
    phone: "+1 (555) 987-6543",
    role: "Administrator",
    department: "Administration",
  })

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    emergencyAlerts: true,
    appointmentReminders: true,
    systemUpdates: false,
  })

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  })

  // System Settings
  const [system, setSystem] = useState({
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: "7",
    debugMode: false,
  })

  const handleSave = async (section: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Settings Saved",
        description: `${section} settings have been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-card-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage hospital and system settings</p>
        </div>
        <Badge variant="outline" className="flex items-center">
          <Settings className="mr-1 h-3 w-3" />
          System Status: Online
        </Badge>
      </div>

      <Tabs defaultValue="hospital" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hospital" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Hospital
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Hospital Settings */}
        <TabsContent value="hospital">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Information</CardTitle>
              <CardDescription>Basic hospital details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hospital-name">Hospital Name</Label>
                  <Input
                    id="hospital-name"
                    value={hospitalSettings.name}
                    onChange={(e) => setHospitalSettings({ ...hospitalSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={hospitalSettings.website}
                    onChange={(e) => setHospitalSettings({ ...hospitalSettings, website: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={hospitalSettings.address}
                  onChange={(e) => setHospitalSettings({ ...hospitalSettings, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={hospitalSettings.phone}
                    onChange={(e) => setHospitalSettings({ ...hospitalSettings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={hospitalSettings.email}
                    onChange={(e) => setHospitalSettings({ ...hospitalSettings, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={hospitalSettings.timezone}
                    onValueChange={(value) => setHospitalSettings({ ...hospitalSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={hospitalSettings.language}
                    onValueChange={(value) => setHospitalSettings({ ...hospitalSettings, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => handleSave("Hospital")} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Your personal information and account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    value={userSettings.name}
                    onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-phone">Phone</Label>
                  <Input
                    id="user-phone"
                    value={userSettings.phone}
                    onChange={(e) => setUserSettings({ ...userSettings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={userSettings.department}
                    onChange={(e) => setUserSettings({ ...userSettings, department: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={userSettings.role} disabled className="bg-muted" />
              </div>
              <Button onClick={() => handleSave("Profile")} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">Critical emergency notifications</p>
                  </div>
                  <Switch
                    checked={notifications.emergencyAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emergencyAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders for upcoming appointments</p>
                  </div>
                  <Switch
                    checked={notifications.appointmentReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, appointmentReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about system updates</p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Notifications")} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input
                    id="password-expiry"
                    value={security.passwordExpiry}
                    onChange={(e) => setSecurity({ ...security, passwordExpiry: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-attempts">Max Login Attempts</Label>
                <Input
                  id="login-attempts"
                  value={security.loginAttempts}
                  onChange={(e) => setSecurity({ ...security, loginAttempts: e.target.value })}
                />
              </div>
              <Button onClick={() => handleSave("Security")} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>System-wide settings and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable maintenance mode for system updates</p>
                </div>
                <Switch
                  checked={system.maintenanceMode}
                  onCheckedChange={(checked) => setSystem({ ...system, maintenanceMode: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">Enable automatic data backups</p>
                </div>
                <Switch
                  checked={system.autoBackup}
                  onCheckedChange={(checked) => setSystem({ ...system, autoBackup: checked })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select
                    value={system.backupFrequency}
                    onValueChange={(value) => setSystem({ ...system, backupFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention (years)</Label>
                  <Input
                    id="data-retention"
                    value={system.dataRetention}
                    onChange={(e) => setSystem({ ...system, dataRetention: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable debug logging (development only)</p>
                </div>
                <Switch
                  checked={system.debugMode}
                  onCheckedChange={(checked) => setSystem({ ...system, debugMode: checked })}
                />
              </div>
              <Button onClick={() => handleSave("System")} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Light
                  </Button>
                  <Button variant="outline" size="sm">
                    Dark
                  </Button>
                  <Button variant="outline" size="sm">
                    System
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <p className="text-sm text-muted-foreground">Medical-focused color palette</p>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-medical-blue border-2 border-primary"></div>
                  <div className="w-8 h-8 rounded-full bg-medical-green"></div>
                  <div className="w-8 h-8 rounded-full bg-medical-teal"></div>
                  <div className="w-8 h-8 rounded-full bg-medical-navy"></div>
                </div>
              </div>
              <Button onClick={() => handleSave("Appearance")} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
