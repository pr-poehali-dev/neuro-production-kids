import { useState, useRef } from 'react';
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
    tag: 'Своя музыка',
    title: 'Пишу свой первый трек',
    text: 'Ребёнок создаёт полноценную песню в Suno, пробует клонирование голоса и придумывает звуки, которых раньше не существовало. Первое «я это сделал сам».',
    icon: 'Music',
  },
  {
    day: '02',
    tag: 'Своя идея',
    title: 'Придумываю историю',
    text: 'Учится формулировать идею и объяснять её нейросети — как настоящий режиссёр. Пишет сценарий будущего клипа вместе с ИИ.',
    icon: 'PenLine',
  },
  {
    day: '03',
    tag: 'Свой стиль',
    title: 'Рисую мир своего клипа',
    text: 'Придумывает визуальный стиль, персонажей и локации, собирает раскадровку — прежде чем нажать «снято».',
    icon: 'Image',
  },
  {
    day: '04',
    tag: 'Своё видео',
    title: 'Снимаю без камеры',
    text: 'Оживляет свои картинки и генерирует видео с помощью ИИ. Управляет камерой и движением так, как раньше могли только студии.',
    icon: 'Clapperboard',
  },
  {
    day: '05',
    tag: 'Своя магия',
    title: 'Собираю всё в готовый клип',
    text: 'Монтирует, синхронизирует с музыкой, добавляет переходы и цвет — ребёнок видит, как разрозненные кадры превращаются в фильм.',
    icon: 'Scissors',
  },
  {
    day: '06',
    tag: 'Своя витрина',
    title: 'Упаковываю работу для портфолио',
    text: 'Собирает сайт-визитку и презентацию проекта — то, что можно показать друзьям, школе или будущей комиссии.',
    icon: 'LayoutTemplate',
  },
  {
    day: '07',
    tag: 'Своя премьера',
    title: 'Показываю миру готовый проект',
    text: 'Финальный релиз и премьера — момент, когда ребёнок официально становится автором, а не зрителем.',
    icon: 'Rocket',
  },
];

const results = [
  {
    icon: 'Trophy',
    title: 'Готовая работа для портфолио',
    text: 'Не набросок и не «домашка» — законченный клип, который можно показать друзьям, школе или приёмной комиссии.',
  },
  {
    icon: 'Sparkles',
    title: 'Гордость за свой труд',
    text: 'Ребёнок впервые проходит путь «от идеи до результата» и своими глазами видит: он это создал сам.',
  },
  {
    icon: 'BrainCircuit',
    title: 'Мышление автора, а не зрителя',
    text: 'Вместо бесконечного скролла — навык превращать идеи в реальные проекты. Это остаётся с ним навсегда.',
  },
  {
    icon: 'Heart',
    title: 'Гордость родителей',
    text: 'Вы увидите не сертификат «для галочки», а настоящую работу — и повод искренне сказать «я горжусь тобой».',
  },
];

const showcase = [
  {
    img: 'https://cdn.poehali.dev/projects/b5c18b42-9c2b-4b90-aeb9-19f35261f023/files/7c9126c0-3429-499f-b336-a66e61936f5a.jpg',
    title: 'Музыкальный ИИ-клип',
    author: 'Работа ученика, 12 лет',
  },
  {
    img: 'https://cdn.poehali.dev/projects/b5c18b42-9c2b-4b90-aeb9-19f35261f023/files/b18d2812-0f40-448c-8076-6041a12e7358.jpg',
    title: 'Короткометражка в жанре sci-fi',
    author: 'Работа ученика, 14 лет',
  },
  {
    img: 'https://cdn.poehali.dev/projects/b5c18b42-9c2b-4b90-aeb9-19f35261f023/files/0185e6c1-3565-4ce8-99e1-d3e6fc82011c.jpg',
    title: 'Фэнтези-история',
    author: 'Работа ученицы, 11 лет',
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
  {
    q: 'А что если у ребёнка не получится?',
    a: 'Каждый шаг разбит на маленькие понятные задачи с поддержкой наставника. Результат — не «идеальный блокбастер», а завершённая собственная работа, и это получается у каждого ученика.',
  },
  {
    q: 'Сколько стоит интенсив?',
    a: 'Оставьте заявку — мы вышлем актуальную стоимость и варианты рассрочки на почту в течение дня.',
  },
];

const Index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [programMuted, setProgramMuted] = useState(true);
  const programVideoRef = useRef<HTMLVideoElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error('Заполните имя, email и телефон');
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
                От зрителя <span className="text-primary">к автору</span> за 7 дней
              </h1>
              <p className="reveal mt-6 text-xl sm:text-2xl text-foreground/90 max-w-2xl text-balance" style={{ animationDelay: '0.15s' }}>
                Ваш ребёнок пройдёт путь настоящей киностудии и создаст свой собственный музыкальный клип с помощью ИИ — не скопирует чужое, а сделает своё.
              </p>
              <p className="reveal mt-4 text-base text-muted-foreground max-w-xl" style={{ animationDelay: '0.25s' }}>
                На финише — не сертификат «для галочки», а готовая работа для портфолио и повод для настоящей родительской гордости.
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

      {/* PROBLEM */}
      <section className="container py-24 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-primary uppercase tracking-[0.25em] text-sm">Знакомая ситуация?</span>
          <h2 className="font-display uppercase text-3xl sm:text-5xl mt-4 leading-tight text-balance">
            Ребёнок часами смотрит, во что играют и что снимают другие
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
            Ролики, стримы, короткие видео — контент льётся бесконечно, а ребёнок остаётся зрителем. Но что если направить этот же интерес в другую сторону — и научить его не смотреть чужое, а создавать своё?
          </p>
          <p className="font-display uppercase text-xl sm:text-2xl mt-8 text-primary">
            За 7 дней — из зрителя в автора собственного проекта
          </p>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" className="container py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-primary uppercase tracking-[0.25em] text-sm">Путь ребёнка</span>
            <h2 className="font-display uppercase text-4xl sm:text-6xl mt-4 leading-none">
              7 дней от идеи до премьеры
            </h2>
            <p className="text-muted-foreground mt-5 text-lg">
              Подготовка → Производство → Монтаж → Релиз. Ровно тот процесс, по которому работают продакшены по всему миру.
            </p>
          </div>
          <div className="relative w-full sm:w-[280px] aspect-square rounded-xl overflow-hidden border border-border">
            <video
              ref={programVideoRef}
              src="https://cdn.poehali.dev/projects/b5c18b42-9c2b-4b90-aeb9-19f35261f023/bucket/videos/logo.mp4"
              autoPlay
              muted={programMuted}
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setProgramMuted((m) => !m)}
              className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <Icon name={programMuted ? 'VolumeX' : 'Volume2'} size={18} />
            </button>
          </div>
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
            <span className="text-primary uppercase tracking-[0.25em] text-sm">Наставник</span>
            <h2 className="font-display uppercase text-4xl sm:text-6xl mt-4 leading-none">
              Проводник, а <br /><span className="text-primary">не лектор</span>
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              Наставник не читает лекции — он ведёт ребёнка за руку через каждый шаг: от первой идеи до готового проекта. За плечами — годы в реальном медиапродакшене и десятки коммерческих работ, но главная задача здесь одна — довести именно вашего ребёнка до результата, которым он будет гордиться.
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

      {/* SHOWCASE */}
      <section className="border-t border-border bg-card/30">
        <div className="container py-24 lg:py-32">
          <div className="max-w-2xl mb-16">
            <span className="text-primary uppercase tracking-[0.25em] text-sm">Их гордость</span>
            <h2 className="font-display uppercase text-4xl sm:text-6xl mt-4 leading-none">
              Работы, а не обещания
            </h2>
            <p className="text-muted-foreground mt-5 text-lg">
              Так выглядят проекты, которые ученики уносят с собой в портфолио — и с гордостью показывают дома.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {showcase.map((s) => (
              <div key={s.title} className="group relative aspect-square rounded-lg overflow-hidden border border-border">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display uppercase text-lg leading-tight">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{s.author}</p>
                </div>
              </div>
            ))}
          </div>
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
              Через 7 дней вы будете <span className="text-primary">гордиться</span> им
            </h2>
            <p className="text-muted-foreground mt-5 text-lg">
              Места в потоке ограничены — наставник ведёт каждого ученика лично. Оставьте заявку, и мы пришлём подтверждение и детали старта на почту.
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
              <Input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-14 bg-card border-border text-base"
              />
              <Input
                placeholder="Telegram (необязательно)"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
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