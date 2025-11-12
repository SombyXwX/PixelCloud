import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedItem {
  id: number;
  title: string;
  description: string;
  price: string;
  discount: string;
  originalPrice: string;
  image: string;
  category: string;
  rating: number;
}

const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    title: 'Cyberpunk Chronicles',
    description: 'Sumérgete en un mundo futurista lleno de acción y decisiones que cambiarán tu destino.',
    price: '€29.99',
    discount: '-40%',
    originalPrice: '€49.99',
    image: 'https://images.unsplash.com/photo-1692827355562-c76b024de0b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBjeWJlcnB1bmt8ZW58MXx8fHwxNzYyMzU5ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Juego',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Fantasy Quest Adventures',
    description: 'Explora reinos mágicos, derrota dragones y conviértete en la leyenda que siempre quisiste ser.',
    price: '€39.99',
    discount: '-25%',
    originalPrice: '€53.32',
    image: 'https://images.unsplash.com/photo-1758862493208-2046897d09d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhZHZlbnR1cmUlMjBmYW50YXN5fGVufDF8fHx8MTc2MjQzNTk1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Juego',
    rating: 4.9
  },
  {
    id: 3,
    title: 'Stellar Odyssey',
    description: 'Viaja por el cosmos, descubre civilizaciones alienígenas y desbloquea los secretos del universo.',
    price: '€34.99',
    discount: '-30%',
    originalPrice: '€49.99',
    image: 'https://images.unsplash.com/photo-1687985826611-80b714011d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaS1maXxlbnwxfHx8fDE3NjIzMjU4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Juego',
    rating: 4.7
  },
];

export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const currentItem = featuredItems[currentIndex];

  return (
    <div className="relative w-full h-[600px] overflow-hidden group">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={currentItem.image}
          alt={currentItem.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1821] via-[#0d1821]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1821] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1920px] mx-auto px-6 flex items-center">
        <div className="max-w-2xl space-y-6">
          <Badge className="bg-blue-600 hover:bg-blue-700">
            {currentItem.category}
          </Badge>
          
          <h1 className="text-6xl text-white">
            {currentItem.title}
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            {currentItem.description}
          </p>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-white">{currentItem.rating}</span>
            <span className="text-gray-400">/ 5.0</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="destructive" className="text-lg px-3 py-1">
                {currentItem.discount}
              </Badge>
              <span className="text-gray-400 line-through text-lg">
                {currentItem.originalPrice}
              </span>
              <span className="text-3xl text-green-400">
                {currentItem.price}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Comprar ahora
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-[#2a475e] hover:text-white">
              <Play className="w-4 h-4 mr-2" />
              Ver tráiler
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
