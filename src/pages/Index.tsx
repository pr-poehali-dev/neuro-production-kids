import { useState, useRef, useEffect } from 'react';
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

const videoWorks = [
  {
    src: '/videos/showcase-clip.mp4',
    title: 'Создано на марафоне НЕЙРОпродакшн',
    author: 'Андрей, 12 лет',
    orientation: 'vertical' as const,
  },
  {
    src: '/videos2/showcase-clip-2.mp4',
    title: 'Создано на марафоне НЕЙРОпродакшн',
    author: 'Полина, 14 лет',
    orientation: 'horizontal' as const,
  },
];

function VideoWorkCard({
  src,
  title,
  author,
  orientation,
}: {
  src: string;
  title: string;
  author: string;
  orientation: 'vertical' | 'horizontal';
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.muted = false;
      el.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (!playing) {
      setShowOverlay(true);
      return;
    }
    const t = setTimeout(() => setShowOverlay(false), 1200);
    return () => clearTimeout(t);
  }, [playing]);

  const handleContainerClick = () => {
    if (playing) setShowOverlay((v) => !v);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    containerRef.current?.requestFullscreen?.();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative rounded-lg overflow-hidden border border-border bg-black ${
        orientation === 'vertical'
          ? 'w-[220px] sm:w-[280px] lg:w-[320px] aspect-[9/16]'
          : 'h-[220px] sm:h-[280px] lg:h-[320px] aspect-video'
      }`}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        loop
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        className="w-full h-full object-cover"
      />
      {(title || author) && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            playing && !showOverlay ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-display uppercase text-lg leading-tight">{title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{author}</p>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleFullscreen}
        className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-background/60 hover:bg-background/80 flex items-center justify-center transition-opacity duration-500 ${
          playing && !showOverlay ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Icon name="Maximize" size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        className={`absolute inset-0 flex items-center justify-center bg-background/20 hover:bg-background/30 transition-opacity duration-500 ${
          playing && !showOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Icon name={playing ? 'Pause' : 'Play'} size={28} className={playing ? '' : 'ml-1'} />
        </span>
      </button>
    </div>
  );
}

const testimonials = [
  {
    text: 'Я плакала на премьере. Сын всегда был "тем, кто смотрит видео", а тут вдруг встал и показал СВОЁ. Своими руками, свою историю. Это было как будто я увидела его повзрослевшим за одну неделю.',
    name: 'Марина',
    role: 'мама Тимура, 12 лет',
  },
  {
    text: 'Дочь показала клип бабушке — и та смотрела молча, а потом обняла её со слезами. Такого отклика я не ожидала ни от одного кружка за три года. Она теперь называет себя "режиссёром".',
    name: 'Елена',
    role: 'мама Софии, 11 лет',
  },
  {
    text: 'Честно, записывали от отчаяния — сын целыми днями сидел в телефоне. А через неделю он с горящими глазами объяснял мне, что такое раскадровка. Впервые за долгое время я гордился им так открыто.',
    name: 'Дмитрий',
    role: 'папа Артёма, 13 лет',
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

  useEffect(() => {
    const el = programVideoRef.current;
    if (!el) return;
    el.muted = programMuted;
    el.play().catch(() => {});
  }, [programMuted]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error('Заполните имя, email и телефон');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('https://functions.poehali.dev/cceeb029-3d43-44bb-96e4-c656f1287ba2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, telegram }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      toast.success('Заявка принята! Мы свяжемся с вами в ближайшее время.');
    } catch {
      toast.error('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
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
                Ваш ребёнок своими руками создаст клип, придумает персонажа, напишет музыку и оживит анимацию с помощью ИИ — и увидит своё имя в титрах готовой работы.
              </p>
              <p className="reveal mt-4 text-base text-muted-foreground max-w-xl" style={{ animationDelay: '0.25s' }}>
                На финише — не сертификат «для галочки», а готовая работа для портфолио и повод для настоящей родительской гордости.
              </p>

              <div className="reveal mt-10 flex flex-col gap-4" style={{ animationDelay: '0.35s' }}>
                <Button size="lg" onClick={scrollToForm} className="h-14 px-8 text-base font-semibold glow-lime hover:scale-[1.03] transition-transform w-fit">
                  Записаться на интенсив
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="outline" onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })} className="h-14 px-8 text-base border-border bg-transparent hover:bg-secondary">
                    Смотреть работы учеников
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })} className="h-14 px-8 text-base border-border bg-transparent hover:bg-secondary">
                    Смотреть программу
                  </Button>
                </div>
              </div>
            </div>

            <div className="reveal justify-self-center" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-[280px] sm:w-[340px] lg:w-[380px] rounded-2xl overflow-hidden border border-border glow-lime aspect-[9/16]">
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
              Наставник не читает лекции — он ведёт ребёнка за руку через каждый шаг: от первой идеи до готового проекта. За плечами — педагогическое образование, годы в реальном медиапродакшене и десятки коммерческих работ, но главная задача здесь одна — довести именно вашего ребёнка до результата, которым он будет гордиться.
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
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border border-border glow-lime">
              <img
                src="https://cdn.poehali.dev/projects/b5c18b42-9c2b-4b90-aeb9-19f35261f023/bucket/35671561-9666-4b7f-ae0d-7f1531143933.jpeg"
                alt="Основатель интенсива"
                className="w-full h-full object-cover"
              />
            </div>
            <blockquote className="mt-8 border-l-2 border-primary pl-8 py-2">
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

      {/* TRUST */}
      <section className="container py-24 lg:py-32">
        <div className="max-w-2xl mb-16">
          <span className="text-primary uppercase tracking-[0.25em] text-sm">Спокойствие родителей</span>
          <h2 className="font-display uppercase text-4xl sm:text-6xl mt-4 leading-none">
            Почему это безопасно доверить нам
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: 'ShieldCheck',
              title: 'Только безопасные ИИ-сервисы',
              text: 'Работаем в проверенных инструментах с настроенной модерацией контента — без случайных роликов и чужого мусора в ленте.',
            },
            {
              icon: 'UserCheck',
              title: 'Живой наставник на каждом занятии',
              text: 'Ребёнок никогда не остаётся один на один с нейросетью — рядом всегда взрослый с опытом реального медиапродакшена.',
            },
            {
              icon: 'MessagesSquare',
              title: 'Отчёт для родителей после каждого дня',
              text: 'Вы видите прогресс и результат ребёнка на каждом этапе, а не получаете сюрприз в последний день.',
            },
            {
              icon: 'RotateCcw',
              title: 'Гарантия возврата',
              text: 'Если после первого занятия почувствуете, что не подходит — вернём деньги без лишних вопросов.',
            },
          ].map((t) => (
            <div key={t.title} className="border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Icon name={t.icon} size={24} />
              </div>
              <h3 className="font-display uppercase text-lg mb-3 leading-tight">{t.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.text}</p>
            </div>
          ))}
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
      <section id="showcase" className="border-t border-border bg-card/30">
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
          <div className="flex flex-col items-center gap-10">
            {videoWorks.map((v) => (
              <VideoWorkCard
                key={v.src}
                src={v.src}
                title={v.title}
                author={v.author}
                orientation={v.orientation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-24 lg:py-32">
        <div className="max-w-2xl mb-16">
          <span className="text-primary uppercase tracking-[0.25em] text-sm">Отзывы родителей</span>
          <h2 className="font-display uppercase text-4xl sm:text-6xl mt-4 leading-none">
            Их слова говорят громче
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`border border-border rounded-lg p-8 lg:p-10 flex flex-col ${i === 1 ? 'lg:scale-[1.05] bg-primary text-primary-foreground border-primary glow-lime' : 'bg-card'}`}
            >
              <Icon name="Quote" size={32} className={i === 1 ? 'opacity-70 mb-6' : 'text-primary/40 mb-6'} />
              <p className={`font-display text-xl sm:text-2xl leading-snug text-balance flex-1 ${i === 1 ? '' : ''}`}>
                {t.text}
              </p>
              <footer className={`mt-8 pt-6 border-t ${i === 1 ? 'border-primary-foreground/20' : 'border-border'}`}>
                <div className="font-semibold">{t.name}</div>
                <div className={`text-sm uppercase tracking-[0.1em] mt-1 ${i === 1 ? 'opacity-80' : 'text-muted-foreground'}`}>{t.role}</div>
              </footer>
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
              Через 7 дней вы будете <span className="text-primary">гордиться</span> им
            </h2>
            <p className="text-muted-foreground mt-5 text-lg">
              Места в потоке ограничены — наставник ведёт каждого ученика лично. Оставьте заявку, и мы свяжемся с вами удобным для вас способом.
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
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14 text-base font-semibold glow-lime hover:scale-[1.02] transition-transform">
                {isSubmitting ? 'Отправляем...' : 'Записаться на интенсив'}
                {!isSubmitting && <Icon name="ArrowRight" size={18} className="ml-2" />}
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