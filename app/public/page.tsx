"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Stethoscope,
  Users,
  Award,
  Building,
  Sun,
  Moon,
  Calendar,
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  HeartHandshake,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Patient",
    content:
      "The care I received at MediCare Hospital was exceptional. The staff was professional, caring, and made me feel comfortable throughout my treatment.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Patient",
    content:
      "Outstanding medical facilities and expert doctors. I'm grateful for the life-saving treatment I received here. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Patient",
    content:
      "From emergency care to follow-up appointments, every aspect of my experience was handled with utmost professionalism and care.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
]

const departments = [
  {
    name: "Cardiology",
    description: "Comprehensive heart and cardiovascular care",
    icon: Heart,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Heart Surgery", "Cardiac Catheterization", "ECG"],
  },
  {
    name: "Neurology",
    description: "Advanced brain and nervous system treatment",
    icon: Brain,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Brain Surgery", "Stroke Treatment", "Neurological Disorders"],
  },
  {
    name: "Orthopedics",
    description: "Bone, joint, and musculoskeletal care",
    icon: Bone,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Joint Replacement", "Sports Medicine", "Fracture Care"],
  },
  {
    name: "Ophthalmology",
    description: "Complete eye care and vision services",
    icon: Eye,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Cataract Surgery", "Retinal Treatment", "Vision Correction"],
  },
  {
    name: "Pediatrics",
    description: "Specialized care for children and adolescents",
    icon: Baby,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Child Care", "Vaccinations", "Growth Monitoring"],
  },
  {
    name: "Emergency",
    description: "24/7 emergency medical services",
    icon: Stethoscope,
    image: "/placeholder.svg?height=200&width=300",
    services: ["Emergency Care", "Trauma", "Critical Care"],
  },
]

const doctors = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    experience: "15+ years",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
    qualifications: ["MD", "FACC", "Board Certified"],
  },
  {
    name: "Dr. Michael Brown",
    specialty: "Neurologist",
    experience: "12+ years",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=200",
    qualifications: ["MD", "PhD", "Board Certified"],
  },
  {
    name: "Dr. Emily Davis",
    specialty: "Pediatrician",
    experience: "10+ years",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
    qualifications: ["MD", "FAAP", "Board Certified"],
  },
]

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Heart Health",
    excerpt: "Learn essential tips to maintain a healthy heart and prevent cardiovascular diseases.",
    author: "Dr. Sarah Wilson",
    date: "2024-01-15",
    category: "Cardiology",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Understanding Pediatric Care",
    excerpt: "A comprehensive guide to children's health and when to seek medical attention.",
    author: "Dr. Emily Davis",
    date: "2024-01-12",
    category: "Pediatrics",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Mental Health Awareness",
    excerpt: "Breaking the stigma around mental health and promoting wellness in our community.",
    author: "Dr. Michael Brown",
    date: "2024-01-10",
    category: "Mental Health",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function PublicPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    })
    setContactForm({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Stethoscope className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MediCare Hospital</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </a>
              <a href="#departments" className="text-sm font-medium hover:text-primary transition-colors">
                Departments
              </a>
              <a href="#doctors" className="text-sm font-medium hover:text-primary transition-colors">
                Doctors
              </a>
              <a href="#blog" className="text-sm font-medium hover:text-primary transition-colors">
                Blog
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button asChild>
                <Link href="/login">Staff Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit">🏥 Leading Healthcare Provider</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Health is Our <span className="text-primary">Priority</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Providing exceptional medical care with state-of-the-art facilities, experienced doctors, and
                  compassionate service for over 25 years.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Emergency: (555) 911-HELP
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">25+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Expert Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10k+</div>
                  <div className="text-sm text-muted-foreground">Happy Patients</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Medical professionals"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background border rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">24/7 Emergency</div>
                    <div className="text-sm text-muted-foreground">Always Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Excellence in Healthcare</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine advanced medical technology with compassionate care to deliver the best possible outcomes for
              our patients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
              <p className="text-muted-foreground">Board-certified physicians with years of specialized experience</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Technology</h3>
              <p className="text-muted-foreground">State-of-the-art medical equipment and innovative treatments</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compassionate Care</h3>
              <p className="text-muted-foreground">Patient-centered approach with personalized treatment plans</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Emergency</h3>
              <p className="text-muted-foreground">Round-the-clock emergency services and critical care</p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="w-fit">About MediCare</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">Committed to Your Health & Well-being</h2>
              <p className="text-lg text-muted-foreground">
                For over 25 years, MediCare Hospital has been at the forefront of medical excellence, providing
                comprehensive healthcare services to our community. Our commitment to innovation, compassion, and
                quality care has made us a trusted healthcare partner.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Expert Team</div>
                    <div className="text-sm text-muted-foreground">50+ Specialists</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Accredited</div>
                    <div className="text-sm text-muted-foreground">JCI Certified</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Modern Facility</div>
                    <div className="text-sm text-muted-foreground">200+ Beds</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Patient Care</div>
                    <div className="text-sm text-muted-foreground">10k+ Treated</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img src="/placeholder.svg?height=600&width=500" alt="Hospital facility" className="w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Departments</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Comprehensive Medical Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our specialized departments offer world-class medical care across various specialties with experienced
              physicians and modern facilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={dept.image || "/placeholder.svg"}
                    alt={dept.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <dept.icon className="h-8 w-8 mb-2" />
                    <h3 className="text-xl font-bold">{dept.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{dept.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {dept.services.map((service, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Doctors</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Our Expert Physicians</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our team of board-certified physicians brings years of experience and dedication to providing exceptional
              patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                  <p className="text-primary font-medium mb-2">{doctor.specialty}</p>
                  <p className="text-muted-foreground text-sm mb-4">{doctor.experience}</p>

                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(doctor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">{doctor.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {doctor.qualifications.map((qual, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {qual}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Health Blog</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Latest Health Articles</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest health tips, medical insights, and wellness advice from our expert
              physicians.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-4 left-4">{post.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Patient Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Patients Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Read about the experiences of our patients and their families who have received care at MediCare Hospital.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl lg:text-2xl font-medium mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </Card>

            <Button
              variant="outline"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Contact Us</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions or need to schedule an appointment? We're here to help you with all your healthcare needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-muted-foreground">+1 (555) 123-4567</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-muted-foreground">info@medicare-hospital.com</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Address</div>
                      <div className="text-muted-foreground">
                        123 Healthcare Ave, Medical District
                        <br />
                        New York, NY 10001
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Hours</div>
                      <div className="text-muted-foreground">
                        Mon-Fri: 8:00 AM - 8:00 PM
                        <br />
                        Sat-Sun: 9:00 AM - 6:00 PM
                        <br />
                        Emergency: 24/7
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1642678901234!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hospital Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Stethoscope className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">MediCare</span>
              </div>
              <p className="text-muted-foreground">
                Providing exceptional healthcare services with compassion, innovation, and excellence for over 25 years.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  Facebook
                </Button>
                <Button variant="ghost" size="sm">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm">
                  LinkedIn
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
                <a href="#departments" className="block text-muted-foreground hover:text-primary transition-colors">
                  Departments
                </a>
                <a href="#doctors" className="block text-muted-foreground hover:text-primary transition-colors">
                  Our Doctors
                </a>
                <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                <div className="text-muted-foreground">Emergency Care</div>
                <div className="text-muted-foreground">Surgery</div>
                <div className="text-muted-foreground">Diagnostics</div>
                <div className="text-muted-foreground">Rehabilitation</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>123 Healthcare Ave</div>
                <div>New York, NY 10001</div>
                <div>+1 (555) 123-4567</div>
                <div>info@medicare-hospital.com</div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MediCare Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
