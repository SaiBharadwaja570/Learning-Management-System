import React, { useState } from 'react'
import { 
  Compass, 
  Search, 
  Target, 
  BookOpen, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Play,
  Star,
  CheckCircle,
  Zap,
  Brain,
  Route,
  Award,
  Clock,
  BarChart3
} from 'lucide-react'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const popularSkills = [
    'Web Development', 'Data Science', 'Digital Marketing', 'UI/UX Design',
    'Machine Learning', 'Photography', 'Public Speaking', 'Project Management'
  ]
  
  const features = [
    {
      icon: <Route className="w-8 h-8" />,
      title: "Personalized Roadmaps",
      description: "Get custom learning paths tailored to your goals, experience level, and available time"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Curated Resources",
      description: "Access handpicked courses, books, articles, and tools from across the web"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with milestones and achievement tracking"
    }
  ]
  
  const steps = [
    {
      number: "01",
      title: "Tell Us What You Want to Learn",
      description: "Enter any skill, topic, or career goal - from coding to cooking to career transitions"
    },
    {
      number: "02", 
      title: "Get Your Custom Roadmap",
      description: "Receive a structured learning path with timeline, milestones, and difficulty progression"
    },
    {
      number: "03",
      title: "Access Curated Resources",
      description: "Find the best courses, books, tutorials, and tools for each step of your journey"
    },
    {
      number: "04",
      title: "Track Your Progress",
      description: "Mark completed milestones and get motivated to continue your learning adventure"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-300">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SkillCompass
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              How it Works
            </a>
            <a href="#explore" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Explore Skills
            </a>
            <a href="#about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              About
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Login
            </button>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-indigo-200">
            <Zap className="w-4 h-4 mr-2" />
            Create your learning roadmap in under 2 minutes
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Learn Anything with a
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Clear Roadmap</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get personalized learning paths, curated resources, and step-by-step guidance for any skill you want to master.
          </p>
          
          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to learn? (e.g., React, Python, Digital Marketing...)"
                className="block w-full pl-14 pr-32 py-6 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center">
                  Generate Roadmap
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Popular Skills */}
          <div className="mb-16">
            <p className="text-gray-500 mb-6 text-lg">Popular learning paths:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSkills.map((skill, index) => (
                <button
                  key={index}
                  className="bg-white/60 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 px-6 py-3 rounded-full transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20" id="how-it-works">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Learning Journey, Simplified
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From confusion to clarity in four simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                  <div className="text-6xl font-bold text-indigo-200 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-indigo-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to Learn Effectively
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Powerful features designed to accelerate your learning journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-indigo-100 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">25K+</div>
              <div className="text-gray-600">Learning Paths Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Skills Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-indigo-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Learning Adventure?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of learners who've transformed their skills with personalized roadmaps
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center">
              Create Your Roadmap
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
          
          <p className="text-gray-400 mt-6 text-sm">
            Free to start • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">SkillCompass</span>
            </div>
            
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Help</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SkillCompass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home