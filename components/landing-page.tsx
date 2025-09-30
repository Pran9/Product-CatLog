"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star, ShoppingBag, Zap, Shield, Globe, Sparkles, TrendingUp, Award } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const { user, signInWithGoogle } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 text-center">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              New: AI-Powered Product Recommendations
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-balance mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-fade-in-up">
              Discover. Shop. Love.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance leading-relaxed animate-fade-in-up delay-200">
              Experience the future of online shopping with our curated collection of premium products, intelligent
              recommendations, and seamless checkout process.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-400">
              {user ? (
                <Link href="/catalog">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-10 py-7 text-xl rounded-full shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                  >
                    Explore Products
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={signInWithGoogle}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-10 py-7 text-xl rounded-full shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                >
                  Start Shopping
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-7 text-xl rounded-full border-2 border-border hover:bg-accent/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text mb-3 group-hover:scale-110 transition-transform">
                10K+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Premium Products</div>
            </div>
            <div className="text-center p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text mb-3 group-hover:scale-110 transition-transform">
                50K+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Happy Customers</div>
            </div>
            <div className="text-center p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text mb-3 group-hover:scale-110 transition-transform">
                99.9%
              </div>
              <div className="text-sm text-muted-foreground font-medium">Satisfaction Rate</div>
            </div>
            <div className="text-center p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text mb-3 group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-sm text-muted-foreground font-medium">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              Award-Winning Platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Why choose our platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience shopping reimagined with cutting-edge features designed for the modern consumer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-10 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                Smart Shopping Cart
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered cart that learns your preferences and suggests complementary products for a personalized
                shopping experience.
              </p>
            </div>

            <div className="group p-10 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30">
              <div className="h-16 w-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                Lightning Performance
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Blazing-fast load times and seamless navigation powered by next-generation web technologies.
              </p>
            </div>

            <div className="group p-10 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                Bank-Grade Security
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your data and transactions are protected with military-grade encryption and advanced fraud detection.
              </p>
            </div>

            <div className="group p-10 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30">
              <div className="h-16 w-16 bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                Trending Insights
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Stay ahead with real-time market trends and personalized recommendations based on your shopping
                behavior.
              </p>
            </div>

            <div className="group p-10 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                Global Marketplace
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Access premium products from verified sellers worldwide with seamless international shipping and
                support.
              </p>
            </div>

            <div className="group p-10 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30">
              <div className="h-16 w-16 bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                Premium Experience
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Curated selection of luxury products with white-glove service and exclusive member benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 border-t border-border/50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto max-w-4xl px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            Join the Revolution
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
            Ready to transform your shopping?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join millions of satisfied customers who have discovered the future of online shopping with our platform.
          </p>
          {!user && (
            <Button
              size="lg"
              onClick={signInWithGoogle}
              className="bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-8 text-xl rounded-full shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 animate-pulse-subtle"
            >
              Start Your Journey
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}
