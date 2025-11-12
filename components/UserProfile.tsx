import { Trophy, Star, Users, Package, Settings, LogOut, Medal, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface UserProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    username: string;
    avatar?: string;
    level: number;
    xp: number;
    nextLevelXp: number;
  };
  onLogout: () => void;
}

const achievements = [
  { id: 1, title: 'Primer Paso', description: 'Completa tu primer juego', icon: Trophy, unlocked: true, rarity: 'común' },
  { id: 2, title: 'Coleccionista', description: 'Posee 10 juegos en tu biblioteca', icon: Package, unlocked: true, rarity: 'raro' },
  { id: 3, title: 'Maestro Gamer', description: 'Alcanza nivel 50', icon: Medal, unlocked: true, rarity: 'épico' },
  { id: 4, title: 'Explorador', description: 'Descubre 50 juegos diferentes', icon: Star, unlocked: false, rarity: 'común' },
  { id: 5, title: 'Legendario', description: 'Completa todos los logros de 5 juegos', icon: Award, unlocked: false, rarity: 'legendario' },
];

const friends = [
  { id: 1, name: 'Alex_Gaming', avatar: 'https://images.unsplash.com/photo-1699524826369-57870e627c43?w=100', status: 'online', playing: 'Cyberpunk Chronicles' },
  { id: 2, name: 'ProPlayer99', avatar: 'https://i.pravatar.cc/100?img=12', status: 'online', playing: 'Turbo Racer' },
  { id: 3, name: 'GameMaster', avatar: 'https://i.pravatar.cc/100?img=33', status: 'offline', playing: null },
  { id: 4, name: 'NinjaSkills', avatar: 'https://i.pravatar.cc/100?img=45', status: 'away', playing: null },
];

const inventory = [
  { id: 1, name: 'Cyberpunk Chronicles', type: 'Juego', image: 'https://images.unsplash.com/photo-1692827355562-c76b024de0b2?w=200', playtime: '45h' },
  { id: 2, name: 'Fantasy Quest', type: 'Juego', image: 'https://images.unsplash.com/photo-1758862493208-2046897d09d9?w=200', playtime: '32h' },
  { id: 3, name: 'ProDesign Suite', type: 'Aplicación', image: 'https://images.unsplash.com/photo-1572882724878-e17d310e6a74?w=200', playtime: '12h' },
  { id: 4, name: 'Guía JavaScript', type: 'Ebook', image: 'https://images.unsplash.com/photo-1595623654300-b27329804025?w=200', playtime: 'Leído' },
];

const rarityColors = {
  común: 'bg-gray-500',
  raro: 'bg-blue-500',
  épico: 'bg-purple-500',
  legendario: 'bg-yellow-500',
};

export function UserProfile({ open, onOpenChange, user, onLogout }: UserProfileProps) {
  const xpPercentage = (user.xp / user.nextLevelXp) * 100;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-[#1b2838] border-l border-[#2a475e] text-white p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-2 border-blue-500">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <SheetTitle className="text-2xl text-white">{user.username}</SheetTitle>
                    <Badge className="bg-blue-600">Nivel {user.level}</Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-[#2a475e]"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              {/* XP Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Experiencia</span>
                  <span className="text-gray-300">{user.xp} / {user.nextLevelXp} XP</span>
                </div>
                <Progress value={xpPercentage} className="h-2 bg-[#2a475e]" />
              </div>
            </SheetHeader>

            <Separator className="my-6 bg-[#2a475e]" />

            <Tabs defaultValue="achievements" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#2a475e]">
                <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-600">
                  Logros
                </TabsTrigger>
                <TabsTrigger value="friends" className="data-[state=active]:bg-blue-600">
                  Amigos
                </TabsTrigger>
                <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-600">
                  Inventario
                </TabsTrigger>
              </TabsList>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {achievements.filter(a => a.unlocked).length} de {achievements.length} desbloqueados
                  </span>
                </div>
                <div className="space-y-3">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`bg-[#2a475e] rounded-lg p-4 border border-[#3a5a7e] ${
                          !achievement.unlocked && 'opacity-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-lg ${rarityColors[achievement.rarity as keyof typeof rarityColors]} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-white">{achievement.title}</h4>
                              {achievement.unlocked && (
                                <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                                  ✓
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{achievement.description}</p>
                            <Badge variant="outline" className={`mt-2 text-xs border-current`}>
                              {achievement.rarity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Friends Tab */}
              <TabsContent value="friends" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{friends.length} amigos</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Users className="w-4 h-4 mr-2" />
                    Añadir amigo
                  </Button>
                </div>
                <div className="space-y-2">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="bg-[#2a475e] rounded-lg p-4 border border-[#3a5a7e] hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback className="bg-blue-600 text-white">
                              {friend.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#2a475e] ${
                              friend.status === 'online'
                                ? 'bg-green-500'
                                : friend.status === 'away'
                                ? 'bg-yellow-500'
                                : 'bg-gray-500'
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white">{friend.name}</h4>
                          {friend.playing ? (
                            <p className="text-sm text-blue-400 truncate">Jugando {friend.playing}</p>
                          ) : (
                            <p className="text-sm text-gray-400">
                              {friend.status === 'online' ? 'En línea' : friend.status === 'away' ? 'Ausente' : 'Desconectado'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Inventory Tab */}
              <TabsContent value="inventory" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{inventory.length} artículos</span>
                  <Button size="sm" variant="outline" className="border-[#3a5a7e] text-white hover:bg-[#2a475e]">
                    Ver biblioteca completa
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {inventory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#2a475e] rounded-lg overflow-hidden border border-[#3a5a7e] hover:border-blue-500 transition-colors cursor-pointer group"
                    >
                      <div className="aspect-[16/10] relative overflow-hidden bg-[#1b2838]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-3 space-y-2">
                        <h4 className="text-sm text-white truncate">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs border-blue-500 text-blue-400">
                            {item.type}
                          </Badge>
                          <span className="text-xs text-gray-400">{item.playtime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-6 bg-[#2a475e]" />

            <Button
              variant="outline"
              className="w-full border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
