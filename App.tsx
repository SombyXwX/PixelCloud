"use client"

import { useState } from "react"
import { NavBar } from "./components/NavBar"
import { FeaturedCarousel } from "./components/FeaturedCarousel"
import { ProductCard } from "./components/ProductCard"
import { UserProfile } from "./components/UserProfile"
import { AuthModal } from "./components/AuthModal"
import { Library } from "./components/Library"
import { Button } from "./components/ui/button"
import { Badge } from "./components/ui/badge"
import { ShoppingCart as ShoppingCartComponent } from "./components/ShoppingCart"
import { ChevronRight, Flame, TrendingUp, Sparkles, Gamepad2, Smartphone, BookOpen } from "lucide-react"
const logo = "/pixel-cloud-logo.jpg"

type CartItem = {
  id: string
  title: string
  price: string
  quantity: number
  image: string
}

const specialOffers = [
  {
    id: 1,
    title: "Turbo Racer Ultimate",
    price: "€19.99",
    originalPrice: "€39.99",
    discount: "-50%",
    image:
      "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc2MjM0NTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Juego",
    rating: 4.6,
    tags: ["Carreras", "Multijugador", "Acción"],
  },
  {
    id: 2,
    title: "ProDesign Suite",
    price: "€49.99",
    originalPrice: "€99.99",
    discount: "-50%",
    image:
      "https://images.unsplash.com/photo-1572882724878-e17d310e6a74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGVzaWduJTIwdG9vbHN8ZW58MXx8fHwxNzYyMzMxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Aplicación",
    rating: 4.8,
    tags: ["Diseño", "Productividad", "Profesional"],
  },
  {
    id: 3,
    title: "Stellar Odyssey",
    price: "€34.99",
    originalPrice: "€49.99",
    discount: "-30%",
    image:
      "https://images.unsplash.com/photo-1687985826611-80b714011d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaS1maXxlbnwxfHx8fDE3NjIzMjU4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Juego",
    rating: 4.7,
    tags: ["Espacial", "Aventura", "RPG"],
  },
  {
    id: 4,
    title: "Guía Completa de JavaScript",
    price: "€12.99",
    originalPrice: "€24.99",
    discount: "-48%",
    image:
      "https://images.unsplash.com/photo-1595623654300-b27329804025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nfGVufDF8fHx8MTc2MjQzNTk1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Ebook",
    rating: 4.9,
    tags: ["Programación", "Web", "Tutorial"],
  },
  {
    id: 5,
    title: "TaskMaster Pro",
    price: "€29.99",
    originalPrice: "€59.99",
    discount: "-50%",
    image:
      "https://images.unsplash.com/photo-1760536928911-40831dacdbc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjBhcHAlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyNDM1OTUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Aplicación",
    rating: 4.7,
    tags: ["Productividad", "Gestión", "Equipos"],
  },
]

const popularGames = [
  {
    title: "Cyberpunk Chronicles",
    price: "€29.99",
    originalPrice: "€49.99",
    discount: "-40%",
    image:
      "https://images.unsplash.com/photo-1692827355562-c76b024de0b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBjeWJlcnB1bmt8ZW58MXx8fHwxNzYyMzU5ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Juego",
    rating: 4.8,
    tags: ["Cyberpunk", "RPG", "Acción"],
  },
  {
    title: "Fantasy Quest Adventures",
    price: "€39.99",
    originalPrice: "€53.32",
    discount: "-25%",
    image:
      "https://images.unsplash.com/photo-1758862493208-2046897d09d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhZHZlbnR1cmUlMjBmYW50YXN5fGVufDF8fHx8MTc2MjQzNTk1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Juego",
    rating: 4.9,
    tags: ["Fantasía", "Aventura", "Mundo Abierto"],
  },
  {
    title: "Turbo Racer Ultimate",
    price: "€19.99",
    originalPrice: "€39.99",
    discount: "-50%",
    image:
      "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc2MjM0NTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Juego",
    rating: 4.6,
    tags: ["Carreras", "Deportes", "Simulación"],
  },
  {
    title: "Stellar Odyssey",
    price: "€34.99",
    originalPrice: "€49.99",
    discount: "-30%",
    image:
      "https://images.unsplash.com/photo-1687985826611-80b714011d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaS1maXxlbnwxfHx8fDE3NjIzMjU4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Juego",
    rating: 4.7,
    tags: ["Espacial", "Exploración", "Sci-Fi"],
  },
]

const popularApps = [
  {
    title: "ProDesign Suite",
    price: "€49.99",
    originalPrice: "€99.99",
    discount: "-50%",
    image:
      "https://images.unsplash.com/photo-1572882724878-e17d310e6a74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGVzaWduJTIwdG9vbHN8ZW58MXx8fHwxNzYyMzMxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Aplicación",
    rating: 4.8,
    tags: ["Diseño", "Creatividad", "Profesional"],
  },
  {
    title: "TaskMaster Pro",
    price: "€29.99",
    originalPrice: "€59.99",
    discount: "-50%",
    image:
      "https://images.unsplash.com/photo-1760536928911-40831dacdbc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjBhcHAlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyNDM1OTUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Aplicación",
    rating: 4.7,
    tags: ["Gestión", "Productividad", "Negocios"],
  },
]

const popularEbooks = [
  {
    title: "Biblioteca del Conocimiento",
    price: "€9.99",
    image:
      "https://images.unsplash.com/photo-1709159057219-80439fbeddce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnklMjByZWFkaW5nfGVufDF8fHx8MTc2MjQxMzc1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Ebook",
    rating: 4.8,
    tags: ["Educación", "Referencia", "Aprendizaje"],
  },
  {
    title: "Guía Completa de JavaScript",
    price: "€12.99",
    originalPrice: "€24.99",
    discount: "-48%",
    image:
      "https://images.unsplash.com/photo-1595623654300-b27329804025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nfGVufDF8fHx8MTc2MjQzNTk1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Ebook",
    rating: 4.9,
    tags: ["Programación", "Tutorial", "Desarrollo"],
  },
]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [currentView, setCurrentView] = useState<"store" | "library">("store")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [user, setUser] = useState({
    username: "",
    avatar: "https://images.unsplash.com/photo-1699524826369-57870e627c43?w=100",
    level: 42,
    xp: 3250,
    nextLevelXp: 5000,
  })

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setShowProfile(true)
    } else {
      setShowAuthModal(true)
    }
  }

  const handleLogin = (username: string) => {
    setUser({ ...user, username })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowProfile(false)
    setUser({ ...user, username: "" })
  }

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [
        ...prev,
        {
          id: product.id || Math.random().toString(),
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]
    })
  }

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1821] via-[#1b2838] to-[#0d1821]">
      <NavBar
        onProfileClick={handleProfileClick}
        onStoreClick={() => setCurrentView("store")}
        onLibraryClick={() => setCurrentView("library")}
        currentView={currentView}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} onLogin={handleLogin} />

      {isAuthenticated && (
        <UserProfile open={showProfile} onOpenChange={setShowProfile} user={user} onLogout={handleLogout} />
      )}

      {showCart && (
        <ShoppingCartComponent
          open={showCart}
          onOpenChange={setShowCart}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}

      {currentView === "library" ? (
        <Library />
      ) : (
        <>
          {/* Featured Carousel */}
          <FeaturedCarousel />

          {/* Special Offers Section */}
          <section className="max-w-[1920px] mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Flame className="w-7 h-7 text-orange-500" />
                <h2 className="text-3xl text-white">Ofertas Especiales</h2>
                <Badge className="bg-red-600 hover:bg-red-700">¡Tiempo limitado!</Badge>
              </div>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-[#2a475e]">
                Ver todas
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#2a475e] scrollbar-track-transparent">
              {specialOffers.map((offer) => (
                <div key={offer.id} className="min-w-[320px]">
                  <ProductCard {...offer} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          </section>

          {/* Games Section */}
          <section className="max-w-[1920px] mx-auto px-6 py-12 border-t border-[#2a475e]/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-7 h-7 text-purple-500" />
                <h2 className="text-3xl text-white">Juegos Populares</h2>
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  Tendencia
                </Badge>
              </div>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-[#2a475e]">
                Explorar juegos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularGames.map((game, index) => (
                <ProductCard key={index} {...game} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </section>

          {/* Mixed Content Grid */}
          <section className="max-w-[1920px] mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-green-500" />
                <h2 className="text-3xl text-white">Más Vendidos</h2>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  Top ventas
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Large Featured Card */}
              <div className="lg:col-span-2 lg:row-span-2">
                <div className="h-full bg-gradient-to-br from-[#1b2838] to-[#2a475e] rounded-lg p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1692827355562-c76b024de0b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBjeWJlcnB1bmt8ZW58MXx8fHwxNzYyMzU5ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center"></div>
                  </div>
                  <div className="relative z-10 space-y-4">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">Destacado del mes</Badge>
                    <h3 className="text-4xl text-white">Cyberpunk Chronicles</h3>
                    <p className="text-gray-300 text-lg max-w-lg">
                      El juego más esperado del año. Explora un mundo futurista donde tus decisiones importan.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <Badge variant="destructive" className="text-lg px-3 py-1">
                        -40%
                      </Badge>
                      <span className="text-gray-400 line-through text-lg">€49.99</span>
                      <span className="text-3xl text-green-400">€29.99</span>
                    </div>
                  </div>
                  <div className="relative z-10 flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">Comprar ahora</Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-[#3a5a7e] hover:text-white bg-transparent"
                    >
                      Más info
                    </Button>
                  </div>
                </div>
              </div>

              {/* Smaller cards */}
              {popularApps.map((app, index) => (
                <ProductCard key={`app-${index}`} {...app} onAddToCart={handleAddToCart} />
              ))}
              {popularEbooks.map((ebook, index) => (
                <ProductCard key={`ebook-${index}`} {...ebook} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </section>

          {/* Apps Section */}
          <section className="max-w-[1920px] mx-auto px-6 py-12 border-t border-[#2a475e]/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Smartphone className="w-7 h-7 text-blue-500" />
                <h2 className="text-3xl text-white">Aplicaciones Destacadas</h2>
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  Productividad
                </Badge>
              </div>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-[#2a475e]">
                Ver todas las apps
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularApps.map((app, index) => (
                <ProductCard key={index} {...app} onAddToCart={handleAddToCart} />
              ))}
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-dashed border-blue-500/30 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-blue-500/50 transition-colors cursor-pointer">
                <Sparkles className="w-12 h-12 text-blue-400" />
                <h3 className="text-xl text-white">Explora más aplicaciones</h3>
                <p className="text-gray-400">Descubre herramientas increíbles para mejorar tu productividad</p>
                <Button className="bg-blue-600 hover:bg-blue-700">Explorar catálogo</Button>
              </div>
            </div>
          </section>

          {/* Ebooks Section */}
          <section className="max-w-[1920px] mx-auto px-6 py-12 pb-24 border-t border-[#2a475e]/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-yellow-500" />
                <h2 className="text-3xl text-white">Ebooks Recomendados</h2>
                <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                  Aprende
                </Badge>
              </div>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-[#2a475e]">
                Ver biblioteca completa
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularEbooks.map((ebook, index) => (
                <ProductCard key={index} {...ebook} onAddToCart={handleAddToCart} />
              ))}
              <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-2 border-dashed border-yellow-500/30 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-yellow-500/50 transition-colors cursor-pointer">
                <BookOpen className="w-12 h-12 text-yellow-400" />
                <h3 className="text-xl text-white">Miles de libros disponibles</h3>
                <p className="text-gray-400">Expande tu conocimiento con nuestra colección</p>
                <Button className="bg-yellow-600 hover:bg-yellow-700">Ver todos los ebooks</Button>
              </div>
              <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-2 border-dashed border-green-500/30 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-green-500/50 transition-colors cursor-pointer">
                <Sparkles className="w-12 h-12 text-green-400" />
                <h3 className="text-xl text-white">Suscripción Premium</h3>
                <p className="text-gray-400">Acceso ilimitado a toda la biblioteca</p>
                <Button className="bg-green-600 hover:bg-green-700">Conocer más</Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      {currentView === "store" && (
        <footer className="border-t border-[#2a475e] bg-[#1b2838]">
          <div className="max-w-[1920px] mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={logo || "/placeholder.svg"} alt="Pixel Cloud Logo" className="h-10 w-auto" />
                  <span className="text-white tracking-wide">PIXEL CLOUD</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Tu destino digital para aplicaciones, juegos y ebooks de calidad.
                </p>
              </div>

              <div>
                <h4 className="text-white mb-4">Explorar</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Juegos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Aplicaciones
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Ebooks
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Ofertas
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white mb-4">Soporte</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Centro de ayuda
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Contacto
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Política de reembolso
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Términos de servicio
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Privacidad
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#2a475e] text-center text-gray-400 text-sm">
              © 2025 Pixel Cloud. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
