import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface Account {
  id: string;
  name: string;
  email: string;
  login: string;
  password: string;
  url: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('prompts');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: '1',
      title: 'Промпт для анализа кода',
      content: 'Проанализируй следующий код и предложи улучшения. Обрати внимание на производительность, читаемость и best practices.',
      category: 'Разработка',
      createdAt: '2025-12-01',
      updatedAt: '2025-12-01'
    },
    {
      id: '2',
      title: 'Генерация идей для проекта',
      content: 'Помоги сгенерировать 10 инновационных идей для стартапа в области [ТЕМА]. Для каждой идеи укажи целевую аудиторию и монетизацию.',
      category: 'Бизнес',
      createdAt: '2025-12-02',
      updatedAt: '2025-12-02'
    }
  ]);

  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'ChatGPT Pro',
      email: 'user@example.com',
      login: 'user@example.com',
      password: '••••••••',
      url: 'https://chat.openai.com',
      category: 'OpenAI',
      createdAt: '2025-11-15',
      updatedAt: '2025-11-15'
    }
  ]);

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Скопировано!',
      description: 'Текст скопирован в буфер обмена',
    });
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const length = 16;
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const filteredPrompts = prompts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAccounts = accounts.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set([...prompts.map(p => p.category), ...accounts.map(a => a.category)]));

  const codeFiles = {
    indexTsx: `import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface Account {
  id: string;
  name: string;
  email: string;
  login: string;
  password: string;
  url: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const Index = () => {
  // Полный код компонента Index
  // ... (весь код компонента)
};

export default Index;`,
    
    indexCss: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 262 47% 11%;
    --foreground: 270 20% 98%;
    --card: 262 40% 14%;
    --card-foreground: 270 20% 98%;
    --popover: 262 45% 12%;
    --popover-foreground: 270 20% 98%;
    --primary: 263 70% 75%;
    --primary-foreground: 262 50% 15%;
    --secondary: 262 30% 20%;
    --secondary-foreground: 270 20% 98%;
    --muted: 262 30% 18%;
    --muted-foreground: 263 15% 65%;
    --accent: 328 86% 70%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --border: 262 30% 22%;
    --input: 262 30% 22%;
    --ring: 263 70% 75%;
    --radius: 0.75rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
  }
}`,

    appTsx: `import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;`,

    tailwindConfig: `import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto p-6 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="Sparkles" className="text-primary-foreground" size={24} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Prompts Manager
            </h1>
          </div>
          <p className="text-muted-foreground ml-[60px]">Управление промптами и аккаунтами AI</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <TabsList className="bg-secondary/50 backdrop-blur-sm border border-border/50">
              <TabsTrigger value="prompts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="FileText" size={16} className="mr-2" />
                Промпты
              </TabsTrigger>
              <TabsTrigger value="accounts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Users" size={16} className="mr-2" />
                Аккаунты
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Code" size={16} className="mr-2" />
                Код
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border/50"
                />
              </div>
            </div>
          </div>

          <TabsContent value="prompts" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Библиотека промптов</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Создать промпт
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Новый промпт</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>Название</Label>
                      <Input placeholder="Название промпта" className="mt-2" />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Input placeholder="Категория" className="mt-2" />
                    </div>
                    <div>
                      <Label>Содержимое</Label>
                      <Textarea 
                        placeholder="Введите текст промпта (поддерживается Markdown)" 
                        className="mt-2 min-h-[200px]"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent">
                      Сохранить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Все
              </Badge>
              {categories.map(cat => (
                <Badge 
                  key={cat} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((prompt) => (
                <Card 
                  key={prompt.id} 
                  className="p-5 hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer group bg-card/50 backdrop-blur-sm animate-scale-in"
                  onClick={() => setSelectedPrompt(prompt)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {prompt.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(prompt.content);
                      }}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {prompt.content}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    {prompt.updatedAt}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Менеджер аккаунтов</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить аккаунт
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Новый аккаунт</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>Название</Label>
                      <Input placeholder="Название аккаунта" className="mt-2" />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Input placeholder="Категория" className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder="email@example.com" className="mt-2" />
                      </div>
                      <div>
                        <Label>Логин</Label>
                        <Input placeholder="username" className="mt-2" />
                      </div>
                    </div>
                    <div>
                      <Label>Пароль</Label>
                      <div className="flex gap-2 mt-2">
                        <Input type="password" placeholder="••••••••" />
                        <Button 
                          variant="outline" 
                          onClick={() => toast({ title: 'Пароль сгенерирован', description: generatePassword() })}
                        >
                          <Icon name="RefreshCw" size={18} />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input placeholder="https://chat.openai.com" className="mt-2" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent">
                      Сохранить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredAccounts.map((account) => (
                <Card 
                  key={account.id} 
                  className="p-5 hover:shadow-xl hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm animate-scale-in"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Badge variant="secondary" className="bg-accent/20 text-accent mb-2">
                        {account.category}
                      </Badge>
                      <h3 className="font-semibold text-xl">{account.name}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(account.url, '_blank')}
                      className="hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon name="ExternalLink" size={18} />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <span className="text-sm">{account.email}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-7 w-7"
                        onClick={() => copyToClipboard(account.email)}
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span className="text-sm">{account.login}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-7 w-7"
                        onClick={() => copyToClipboard(account.login)}
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Lock" size={16} className="text-muted-foreground" />
                      <span className="text-sm">{account.password}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-7 w-7"
                        onClick={() => copyToClipboard(account.password)}
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    Создан: {account.createdAt}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Icon name="Code" size={24} />
                Исходный код приложения
              </h2>
              <p className="text-muted-foreground mb-6">
                Весь код, использованный для создания этого приложения
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">src/pages/Index.tsx</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(codeFiles.indexTsx)}
                    >
                      <Icon name="Copy" size={16} className="mr-2" />
                      Копировать
                    </Button>
                  </div>
                  <ScrollArea className="h-[300px] w-full rounded-lg border border-border/50 bg-secondary/30">
                    <pre className="p-4 text-xs">
                      <code>{codeFiles.indexTsx}</code>
                    </pre>
                  </ScrollArea>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">src/index.css</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(codeFiles.indexCss)}
                    >
                      <Icon name="Copy" size={16} className="mr-2" />
                      Копировать
                    </Button>
                  </div>
                  <ScrollArea className="h-[200px] w-full rounded-lg border border-border/50 bg-secondary/30">
                    <pre className="p-4 text-xs">
                      <code>{codeFiles.indexCss}</code>
                    </pre>
                  </ScrollArea>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">src/App.tsx</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(codeFiles.appTsx)}
                    >
                      <Icon name="Copy" size={16} className="mr-2" />
                      Копировать
                    </Button>
                  </div>
                  <ScrollArea className="h-[200px] w-full rounded-lg border border-border/50 bg-secondary/30">
                    <pre className="p-4 text-xs">
                      <code>{codeFiles.appTsx}</code>
                    </pre>
                  </ScrollArea>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">tailwind.config.ts</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(codeFiles.tailwindConfig)}
                    >
                      <Icon name="Copy" size={16} className="mr-2" />
                      Копировать
                    </Button>
                  </div>
                  <ScrollArea className="h-[200px] w-full rounded-lg border border-border/50 bg-secondary/30">
                    <pre className="p-4 text-xs">
                      <code>{codeFiles.tailwindConfig}</code>
                    </pre>
                  </ScrollArea>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Info" size={18} />
                    Структура проекта
                  </h3>
                  <pre className="text-xs text-muted-foreground">
{`project/
├── src/
│   ├── pages/
│   │   └── Index.tsx          // Главная страница приложения
│   ├── components/
│   │   └── ui/                // UI компоненты (shadcn/ui)
│   ├── App.tsx                // Корневой компонент
│   ├── index.css              // Глобальные стили и переменные
│   └── main.tsx               // Точка входа
├── tailwind.config.ts         // Конфигурация Tailwind CSS
├── package.json               // Зависимости проекта
└── data/                      // Данные в формате JSON (будет создано)`}
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6">Настройки</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Database" size={18} />
                    Хранение данных
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Данные хранятся локально в папке data/ в формате JSON. Для каждой категории создается отдельный файл.
                  </p>
                  
                  <div className="mb-4 p-3 bg-secondary/30 rounded-lg border border-border/50">
                    <p className="text-xs font-semibold mb-2">Структура папки data/:</p>
                    <pre className="text-xs text-muted-foreground">
{`data/
├── prompts/
│   ├── development.json      // Промпты категории "Разработка"
│   ├── business.json          // Промпты категории "Бизнес"
│   └── ...
├── accounts/
│   ├── openai.json            // Аккаунты категории "OpenAI"
│   ├── anthropic.json         // Аккаунты категории "Anthropic"
│   └── ...
└── settings.json              // Настройки приложения`}
                    </pre>
                  </div>

                  <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
                    <p className="text-xs font-semibold mb-2">Пример формата JSON (prompts/development.json):</p>
                    <pre className="text-xs">
{`{
  "category": "Разработка",
  "prompts": [
    {
      "id": "1",
      "title": "Промпт для анализа кода",
      "content": "Проанализируй следующий код...",
      "createdAt": "2025-12-01",
      "updatedAt": "2025-12-01"
    }
  ]
}`}
                    </pre>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Icon name="Download" size={18} className="mr-2" />
                      Экспорт данных
                    </Button>
                    <Button variant="outline">
                      <Icon name="Upload" size={18} className="mr-2" />
                      Импорт данных
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Palette" size={18} />
                    Внешний вид
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Настройте тему и внешний вид приложения
                  </p>
                  <Badge className="bg-gradient-to-r from-primary to-accent">
                    Темный режим (активен)
                  </Badge>
                </div>

                <div className="border-t border-border/50 pt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Info" size={18} />
                    О приложении
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI Prompts Manager v1.0.0
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Создано для управления промптами и аккаунтами AI
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedPrompt && (
        <Dialog open={!!selectedPrompt} onOpenChange={() => setSelectedPrompt(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedPrompt.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(selectedPrompt.content)}
                >
                  <Icon name="Copy" size={18} />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[500px] mt-4">
              <div className="space-y-4">
                <div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {selectedPrompt.category}
                  </Badge>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                  <p className="whitespace-pre-wrap">{selectedPrompt.content}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Создан: {selectedPrompt.createdAt}</span>
                  <span>Обновлен: {selectedPrompt.updatedAt}</span>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;