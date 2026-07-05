import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';

const HERO_BG =
  'https://cdn.poehali.dev/projects/b5c18b42-9c2b-4b90-aeb9-19f35261f023/files/2671d952-ab70-439e-9459-9ce2f96d3206.jpg';

const program = [
  {
    day: '01',
    tag: 'Audio Production',
    title: 'Аудиопродакшн и саунд-дизайн',
    text: 'Генерируем полноценные музыкальные треки в Suno, клонируем голоса для профессиональной озвучки и создаём уникальные звуковые эффекты для атмосферы.',
    icon: 'Music',
  },
  {
    day: '02',
    tag: 'Pre-production',
    title: 'Идея, сценарий и ДНК нейросетей',
    text: 'Понимаем, как мыслит «цифровой режиссёр». Учимся ставить задачи нейросетям на естественном языке. Разрабатываем концепцию ролика и пишем крепкий сценарий с помощью ИИ.',
    icon: 'PenLine',
  },
  {
    day: '03',
    tag: 'Visual Concept',
    title: 'Концепт-арт и раскадровка',
    text: 'Создаём визуальный фундамент. Работаем с генерацией изображений (Nano Banana и др.), придумываем стиль, персонажей, локации и собираем детальный storyboard.',
    icon: 'Image',
  },
  {
    day: '04',
    tag: 'Video Production',
    title: 'Видеогенерация',
    text: 'Мотор, снято! Оживляем концепт-арты и генерируем видео с нуля в Runway и VEO. Учимся управлять движением камеры и динамикой объектов.',
    icon: 'Clapperboard',
  },
  {
    day: '05',
    tag: 'Post-production',
    title: 'ИИ-монтаж и постпродакшн',
    text: 'Собираем магию воедино: динамичные склейки, синхронизация с битом, ИИ-переходы, титры и финальная цветокоррекция, чтобы клип выглядел дорого.',
    icon: 'Scissors',
  },
  {
    day: '06',
    tag: 'Packaging',
    title: 'Упаковка медиа-проекта',
    text: 'Готовим проект к показу. Создаём стильные сайты-портфолио в Lovable и собираем профессиональные питч-деки в Gamma для инвесторов и заказчиков.',
    icon: 'LayoutTemplate',
  },
  {
    day: '07',
    tag: 'Release',
    title: 'Релиз и премьера',
    text: 'Финальный экспорт. Знакомимся с автоматизацией (Cursor, n8n) для дистрибуции контента. Подведение итогов и большая премьера готовых ИИ-клипов!',
    icon: 'Rocket',
  },
];

const results = [
  {
    icon: 'BrainCircuit',
    title: 'Мышление продюсера',
    text: 'Ребёнок умеет доводить идею до готового продукта — навык, который ценится в любой профессии будущего.',
  },
  {
    icon: 'Film',
    title: 'Готовый клип в портфолио',
    text: 'На выходе — собственный музыкальный ИИ-клип или короткометражка, которую не стыдно показать.',
  },
  {
    icon: 'Sparkles',
    title: 'Владение ИИ-инструментами',
    text: 'Suno, Runway, VEO, Gamma — те же инструменты, что используют студии и агентства прямо сейчас.',
  },
  {
    icon: 'Presentation',
    title: 'Навык презентации',
    text: 'Умение упаковать и защитить свой проект — как настоящий автор перед заказчиком.',
  },
];

const faq = [
  {
    q: 'Нужен ли ребёнку опыт в видео или программировании?',
    a: 'Нет. Интенсив построен от нуля: мы объясняем всё на простом языке. Достаточно любопытства и компьютера с интернетом.',
  },
  {
    q: 'С какого возраста подходит?',
    a: 'Программа рассчитана на детей от 10 лет. Материал подаётся понятно и увлекательно, с поддержкой на каждом шаге.',
  },
  {
    q: 'Какое оборудование нужно?',
    a: 'Компьютер или ноутбук со стабильным интернетом. Все инструменты работают в браузере — ничего сложного устанавливать не нужно.',
  },
  {
    q: 'Что будет на выходе?',
    a: 'Готовый музыкальный клип или короткометражка, сайт-портфолио и презентация проекта. Реальный результат, а не «сертификат ради сертификата».',
  },
  {
    q: 'Формат обучения?',
    a: 'Онлайн, 7 дней. Каждый день — новый этап настоящего киностудийного пайплайна с практикой и обратной связью.',
  },
];

const Index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Заполните имя и email');
      return;
    }
    setSubmitted(true);
    toast.success('Заявка принята! Проверьте почту для подтверждения.');
  };

  const scrollToForm = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 grain opacity-[0.15] pointer-events-none" />

        <div className="container relative z-10 py-24">
          <div className="grid lg:grid-cols-[1.3fr_auto] gap-12 items-center">
            <div className="max-w-4xl">
              <div className="reveal flex flex-wrap items-center gap-3 mb-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="px-3 py-1.5 border border-border rounded-full">Онлайн · 7 дней</span>
                <span className="px-3 py-1.5 border border-border rounded-full">Дети от 10 лет</span>
                <span className="px-3 py-1.5 border border-primary/40 rounded-full text-primary">Навыки будущего</span>
              </div>

              <h1 className="reveal font-display uppercase leading-[0.95] text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight" style={{ animationDelay: '0.05s' }}>
                Нейро<span className="text-primary">продакшн</span>
              </h1>
              <p className="reveal mt-6 text-xl sm:text-2xl text-foreground/90 max-w-2xl text-balance" style={{ animationDelay: '0.15s' }}>
                Создание музыки и видео с помощью ИИ за 7 дней. Ребёнок проходит полный цикл кинопроизводства — от идеи до премьеры готового клипа.
              </p>
              <p className="reveal mt-4 text-base text-muted-foreground max-w-xl" style={{ animationDelay: '0.25s' }}>
                Не «кружок ради галочки», а профессия завтрашнего дня в руках вашего ребёнка уже сегодня.
              </p>

              <div className="reveal mt-10 flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.35s' }}>
                <Button size="lg" onClick={scrollToForm} className="h-14 px-8 text-base font-semibold glow-lime hover:scale-[1.03] transition-transform">
                  Записаться на интенсив
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })} className="h-14 px-8 text-base border-border bg-transparent hover:bg-secondary">
                  Смотреть программу
                </Button>
              </div>
            </div>

            <div className="reveal justify-self-center" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-[220px] sm:w-[260px] rounded-2xl overflow-hidden border border-border glow-lime aspect-[9/16]">
                <iframe
                  src="https://www.youtube.com/embed/1DZ-yf9bVkQ"
                  title="Нейропродакшн — видео"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-card/50">
        <div className="container py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm uppercase tracking-[0.15em] text-muted-foreground">
          <span className="flex items-center gap-2"><Icon name="Award" size={16} className="text-accent" /> Спикер Forbes</span>
          <span className="flex items-center gap-2"><Icon name="GraduationCap" size={16} className="text-accent" /> Резидент Сколково</span>
          <span className="flex items-center gap-2"><Icon name="Clapperboard" size={16} className="text-accent" /> 8 лет в медиапродакшене</span>
          <span className="flex items-center gap-2"><Icon name="Trophy" size={16} className="text-accent" /> 500+ выпускников</span>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" className="container py-24 lg:py-32">
        <div className="max-w-2xl mb-16">
          <span className="text-primary uppercase tracking-[0.25em] text-sm">Программа</span>
          <h2 className="font-display uppercase text-4xl sm:text-6xl mt-4 leading-none">
            Пайплайн настоящей киностудии
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            Подготовка → Производство → Монтаж → Релиз. Ровно тот процесс, по которому работают продакшены по всему миру.
          </p>
        </div>

        <div className="grid gap-px bg-border border border-border rounded-lg overflow-hidden md:grid-cols-2">
          {program.map((d) => (
            <div key={d.day} className="group bg-card p-8 lg:p-10 hover:bg-secondary transition-colors">
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-6xl text-primary/30 group-hover:text-primary/70 transition-colors">{d.day}</span>
                <div className="flex items-center gap-2 text-accent">
                  <Icon name={d.icon} size={22} />
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{d.tag}</span>
                </div>
              </div>
              <h3 className="font-display uppercase text-2xl mb-3 leading-tight">{d.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{d.text}</p>
            </div>
          ))}
          <div className="bg-primary text-primary-foreground p-8 lg:p-10 flex flex-col justify-center">
            <Icon name="PartyPopper" size={32} className="mb-4" />
            <h3 className="font-display uppercase text-2xl mb-2">Премьера работ</h3>
            <p className="opacity-80">Каждый ученик выходит с готовым проектом и уверенностью автора.</p>
          </div>
        </div>
      </section>

      {/* TEACHER */}
      <section id="teacher" className="border-y border-border bg-card/30">
        <div className="container py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary uppercase tracking-[0.25em] text-sm">Преподаватель</span>
            <h2 className="font-display uppercase text-4xl sm:text-6xl mt-4 leading-none">
              Учит тот, кто<br /><span className="text-primary">делает сам</span>
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              За плечами — годы в реальном медиапродакшене, десятки коммерческих проектов и глубокая экспертиза в нейросетях. Ребёнок учится не по учебнику, а у практика, который каждый день создаёт то, чему учит.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: 'Newspaper', t: 'Публикации в Forbes', d: 'Эксперт по ИИ и креативным индустриям' },
                { icon: 'GraduationCap', t: 'Резидентство в Сколково', d: 'Развитие технологий медиапроизводства' },
                { icon: 'Briefcase', t: '8+ лет в продакшене', d: 'Клипы, реклама, короткометражки' },
                { icon: 'Users', t: '500+ выпускников', d: 'Дети и подростки по всей стране' },
              ].map((item) => (
                <div key={item.t} className="flex gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">{item.t}</div>
                    <div className="text-sm text-muted-foreground">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <blockquote className="border-l-2 border-primary pl-8 py-2">
              <p className="font-display text-2xl sm:text-3xl leading-snug text-balance">
                «Через пять лет умение управлять нейросетями будет так же базово, как умение печатать. Мы даём детям это преимущество раньше остальных.»
              </p>
              <footer className="mt-6 text-muted-foreground uppercase tracking-[0.15em] text-sm">
                — Основатель интенсива
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="container py-24 lg:py-32">
        <div className="max-w-2xl mb-16">
          <span className="text-primary uppercase tracking-[0.25em] text-sm">Результат</span>
          <h2 className="font-display uppercase text-4xl sm:text-6xl mt-4 leading-none">
            Что ребёнок унесёт с собой
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((r) => (
            <div key={r.title} className="border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center text-accent mb-6">
                <Icon name={r.icon} size={24} />
              </div>
              <h3 className="font-display uppercase text-xl mb-3 leading-tight">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-card/30">
        <div className="container py-24 lg:py-32 grid lg:grid-cols-[0.5fr_1fr] gap-16">
          <div>
            <span className="text-primary uppercase tracking-[0.25em] text-sm">Вопросы</span>
            <h2 className="font-display uppercase text-4xl sm:text-5xl mt-4 leading-none">
              Частые вопросы
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display uppercase text-lg hover:text-primary hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" className="relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-[0.12] pointer-events-none" />
        <div className="container py-24 lg:py-32 relative">
          <div className="max-w-xl mx-auto text-center">
            <video
              src="https://cdn.poehali.dev/projects/b5c18b42-9c2b-4b90-aeb9-19f35261f023/bucket/videos/logo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 rounded-full object-cover"
            />
            <span className="text-primary uppercase tracking-[0.25em] text-sm">Запись</span>
            <h2 className="font-display uppercase text-4xl sm:text-6xl mt-4 leading-none">
              Дайте ребёнку <span className="text-primary">фору</span> в будущем
            </h2>
            <p className="text-muted-foreground mt-5 text-lg">
              Оставьте заявку — мы отправим подтверждение и детали старта на вашу почту.
            </p>
          </div>

          {submitted ? (
            <div className="max-w-md mx-auto mt-12 text-center border border-primary/40 rounded-lg p-10 glow-lime">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                <Icon name="MailCheck" size={30} />
              </div>
              <h3 className="font-display uppercase text-2xl mb-3">Заявка отправлена</h3>
              <p className="text-muted-foreground">
                Мы отправили письмо на <span className="text-foreground">{email}</span>. Подтвердите email по ссылке из письма, чтобы забронировать место.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 space-y-4">
              <Input
                placeholder="Имя ребёнка или ваше"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 bg-card border-border text-base"
              />
              <Input
                type="email"
                placeholder="Email для подтверждения"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-card border-border text-base"
              />
              <Button type="submit" size="lg" className="w-full h-14 text-base font-semibold glow-lime hover:scale-[1.02] transition-transform">
                Записаться на интенсив
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground text-center pt-2">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display uppercase tracking-[0.2em] text-foreground">Нейропродакшн</span>
          <span>Интенсив по созданию музыки и видео с ИИ · 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;