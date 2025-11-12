import { useState } from 'react';
import { Search, Clock, Calendar, Star, Play, Download, Share2, Heart, Grid3x3, List } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LibraryItem {
  id: number;
  title: string;
  type: 'Juego' | 'Aplicación' | 'Ebook';
  image: string;
  bannerImage: string;
  playtime: string;
  lastPlayed: string;
  achievements?: {
    unlocked: number;
    total: number;
  };
  description: string;
  developer: string;
  releaseDate: string;
  tags: string[];
  rating: number;
  size: string;
}

const libraryItems: LibraryItem[] = [
  {
    id: 1,
    title: 'Cyberpunk Chronicles',
    type: 'Juego',
    image: 'https://images.unsplash.com/photo-1545579003-84eeef98a485?w=400',
    bannerImage: 'https://images.unsplash.com/photo-1545579003-84eeef98a485?w=1200',
    playtime: '45h 32min',
    lastPlayed: 'Hace 2 días',
    achievements: { unlocked: 28, total: 50 },
    description: 'Sumérgete en un futuro distópico lleno de tecnología avanzada y decisiones morales complejas. Explora una ciudad vibrante donde cada elección tiene consecuencias.',
    developer: 'NeonStudio',
    releaseDate: '15 Marzo 2024',
    tags: ['RPG', 'Acción', 'Mundo Abierto', 'Ciencia Ficción'],
    rating: 4.8,
    size: '85 GB'
  },
  {
    id: 2,
    title: 'Fantasy Quest',
    type: 'Juego',
    image: 'https://images.unsplash.com/photo-1633287453177-24823499b02c?w=400',
    bannerImage: 'https://images.unsplash.com/photo-1633287453177-24823499b02c?w=1200',
    playtime: '32h 15min',
    lastPlayed: 'Hace 5 días',
    achievements: { unlocked: 45, total: 75 },
    description: 'Embárcate en una épica aventura de fantasía medieval. Combate criaturas míticas, forma alianzas y descubre secretos ancestrales en un mundo mágico.',
    developer: 'DragonForge Games',
    releaseDate: '22 Enero 2024',
    tags: ['RPG', 'Fantasía', 'Aventura', 'Multijugador'],
    rating: 4.6,
    size: '62 GB'
  },
  {
    id: 3,
    title: 'Space Shooter Infinity',
    type: 'Juego',
    image: 'https://images.unsplash.com/photo-1738071665033-7ba9885c2c20?w=400',
    bannerImage: 'https://images.unsplash.com/photo-1738071665033-7ba9885c2c20?w=1200',
    playtime: '18h 47min',
    lastPlayed: 'Hace 1 semana',
    achievements: { unlocked: 15, total: 40 },
    description: 'Defiende la galaxia de invasores alienígenas en este intenso shooter espacial. Mejora tu nave, desbloquea armas poderosas y domina el espacio.',
    developer: 'Cosmic Games',
    releaseDate: '8 Febrero 2024',
    tags: ['Acción', 'Shooter', 'Espacial', 'Arcade'],
    rating: 4.4,
    size: '12 GB'
  },
  {
    id: 4,
    title: 'ProDesign Suite',
    type: 'Aplicación',
    image: 'https://images.unsplash.com/photo-1700887944225-f148dd124305?w=400',
    bannerImage: 'https://images.unsplash.com/photo-1700887944225-f148dd124305?w=1200',
    playtime: '156h 20min',
    lastPlayed: 'Hoy',
    description: 'Suite profesional de diseño gráfico con herramientas avanzadas para ilustración, edición de fotos, diseño UI/UX y creación de contenido multimedia.',
    developer: 'CreativeLabs',
    releaseDate: '10 Diciembre 2023',
    tags: ['Diseño', 'Productividad', 'Creatividad', 'Profesional'],
    rating: 4.9,
    size: '3.2 GB'
  },
  {
    id: 5,
    title: 'CodeMaster IDE',
    type: 'Aplicación',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400',
    bannerImage: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=1200',
    playtime: '203h 45min',
    lastPlayed: 'Hace 3 horas',
    description: 'Entorno de desarrollo integrado de última generación con IA asistida, depuración avanzada y soporte para más de 50 lenguajes de programación.',
    developer: 'DevTools Inc',
    releaseDate: '5 Noviembre 2023',
    tags: ['Programación', 'Desarrollo', 'Productividad', 'IA'],
    rating: 4.7,
    size: '1.8 GB'
  },
  {
    id: 6,
    title: 'Guía Completa de JavaScript',
    type: 'Ebook',
    image: 'https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?w=400',
    bannerImage: 'https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?w=1200',
    playtime: '45% leído',
    lastPlayed: 'Hace 1 día',
    description: 'Aprende JavaScript desde cero hasta nivel avanzado. Incluye ES6+, frameworks modernos, mejores prácticas y proyectos prácticos.',
    developer: 'TechBooks Publishing',
    releaseDate: '1 Octubre 2023',
    tags: ['Programación', 'JavaScript', 'Educación', 'Tutorial'],
    rating: 4.8,
    size: '125 MB'
  }
];

export function Library() {
  const [selectedItem, setSelectedItem] = useState<LibraryItem>(libraryItems[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'Todos' | 'Juego' | 'Aplicación' | 'Ebook'>('Todos');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'Todos' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const achievementProgress = selectedItem.achievements 
    ? (selectedItem.achievements.unlocked / selectedItem.achievements.total) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1821] via-[#1b2838] to-[#0d1821] pt-6">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="flex gap-6 h-[calc(100vh-120px)]">
          {/* Left Sidebar - Library List */}
          <div className="w-[400px] bg-[#1b2838]/50 rounded-lg border border-[#2a475e] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-[#2a475e]">
              <h2 className="text-2xl text-white mb-4">Mi Biblioteca</h2>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar en biblioteca..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-[#2a475e] border-[#3a5a7e] text-white placeholder:text-gray-400"
                />
              </div>

              {/* Filter Tabs */}
              <Tabs value={filterType} onValueChange={(v) => setFilterType(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-[#2a475e] h-9">
                  <TabsTrigger value="Todos" className="data-[state=active]:bg-blue-600 text-xs">
                    Todos
                  </TabsTrigger>
                  <TabsTrigger value="Juego" className="data-[state=active]:bg-blue-600 text-xs">
                    Juegos
                  </TabsTrigger>
                  <TabsTrigger value="Aplicación" className="data-[state=active]:bg-blue-600 text-xs">
                    Apps
                  </TabsTrigger>
                  <TabsTrigger value="Ebook" className="data-[state=active]:bg-blue-600 text-xs">
                    Ebooks
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* View Mode Toggle */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`flex-1 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4 mr-2" />
                  Lista
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                >
                  <Grid3x3 className="w-4 h-4 mr-2" />
                  Grid
                </Button>
              </div>
            </div>

            {/* Items List */}
            <ScrollArea className="flex-1">
              <div className={viewMode === 'list' ? 'p-2' : 'p-4 grid grid-cols-2 gap-3'}>
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`${
                      viewMode === 'list' 
                        ? 'flex items-center gap-3 p-3 rounded-lg transition-all w-full text-left mb-2'
                        : 'rounded-lg overflow-hidden transition-all'
                    } ${
                      selectedItem.id === item.id
                        ? 'bg-blue-600/20 border-2 border-blue-500'
                        : 'bg-[#2a475e]/50 border-2 border-transparent hover:border-[#3a5a7e]'
                    }`}
                  >
                    {viewMode === 'list' ? (
                      <>
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-12 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm truncate">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs border-blue-500 text-blue-400">
                              {item.type}
                            </Badge>
                            <span className="text-xs text-gray-400">{item.playtime}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="aspect-[16/10] relative overflow-hidden">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2 bg-[#1b2838]">
                          <h3 className="text-white text-xs truncate">{item.title}</h3>
                          <Badge variant="outline" className="text-xs border-blue-500 text-blue-400 mt-1">
                            {item.type}
                          </Badge>
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Panel - Item Details */}
          <div className="flex-1 bg-[#1b2838]/50 rounded-lg border border-[#2a475e] overflow-hidden flex flex-col">
            <ScrollArea className="flex-1">
              {/* Banner Image */}
              <div className="relative h-[400px] overflow-hidden">
                <ImageWithFallback
                  src={selectedItem.bannerImage}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b2838] via-[#1b2838]/50 to-transparent" />
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-end gap-4">
                    <ImageWithFallback
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-32 h-20 object-cover rounded-lg border-2 border-[#2a475e]"
                    />
                    <div className="flex-1">
                      <h1 className="text-4xl text-white mb-2">{selectedItem.title}</h1>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-blue-600">{selectedItem.type}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-white">{selectedItem.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Action Buttons */}
                <div className="flex gap-3 mb-8">
                  <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    {selectedItem.type === 'Ebook' ? 'Leer' : selectedItem.type === 'Aplicación' ? 'Abrir' : 'Jugar'}
                  </Button>
                  <Button variant="outline" className="border-[#3a5a7e] text-white hover:bg-[#2a475e]">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="border-[#3a5a7e] text-white hover:bg-[#2a475e]">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="border-[#3a5a7e] text-white hover:bg-[#2a475e]">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#2a475e]/50 rounded-lg p-4 border border-[#3a5a7e]">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Tiempo de uso</span>
                    </div>
                    <p className="text-white text-xl">{selectedItem.playtime}</p>
                  </div>
                  <div className="bg-[#2a475e]/50 rounded-lg p-4 border border-[#3a5a7e]">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Última vez</span>
                    </div>
                    <p className="text-white text-xl">{selectedItem.lastPlayed}</p>
                  </div>
                  <div className="bg-[#2a475e]/50 rounded-lg p-4 border border-[#3a5a7e]">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Tamaño</span>
                    </div>
                    <p className="text-white text-xl">{selectedItem.size}</p>
                  </div>
                </div>

                {/* Achievements (if applicable) */}
                {selectedItem.achievements && (
                  <div className="bg-[#2a475e]/50 rounded-lg p-6 border border-[#3a5a7e] mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl text-white">Logros</h3>
                      <span className="text-gray-400">
                        {selectedItem.achievements.unlocked} / {selectedItem.achievements.total}
                      </span>
                    </div>
                    <Progress value={achievementProgress} className="h-3 bg-[#1b2838]" />
                    <p className="text-gray-400 text-sm mt-2">
                      {achievementProgress.toFixed(0)}% completado
                    </p>
                  </div>
                )}

                <Separator className="my-8 bg-[#2a475e]" />

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl text-white mb-4">Descripción</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedItem.description}</p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Desarrollador</h4>
                    <p className="text-white">{selectedItem.developer}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Fecha de lanzamiento</h4>
                    <p className="text-white">{selectedItem.releaseDate}</p>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-sm text-gray-400 mb-3">Etiquetas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-[#3a5a7e] text-gray-300 hover:border-blue-500 hover:text-blue-400 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
