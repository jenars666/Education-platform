import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, Users, Clock, Award, BookOpen, Zap, 
  MessageCircle, Briefcase, Lightbulb, Shield, Laptop, 
  CheckCircle, Target, Rocket, Globe, Star, ArrowUpRight, Menu, X,
  Quote, Loader2
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModuleTab, setActiveModuleTab] = useState("core");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fetch live mentors & reviews from DB
  const { data: liveMentors } = trpc.mentors.getPublic.useQuery();
  const { data: liveReviews } = trpc.reviews.getPublic.useQuery();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Handle scroll event for nav bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const moduleCategories = {
    core: [
      { title: t('module.1.title'), desc: t('module.1.desc'), icon: Users, color: "#2563EB", lightColor: "#DBEAFE" },
      { title: t('module.2.title'), desc: t('module.2.desc'), icon: Lightbulb, color: "#1E40AF", lightColor: "#EFF6FF" },
      { title: t('module.3.title'), desc: t('module.3.desc'), icon: BookOpen, color: "#3B82F6", lightColor: "#F0F9FF" }
    ],
    classroom: [
      { title: t('module.6.title'), desc: t('module.6.desc'), icon: Target, color: "#3B82F6", lightColor: "#F0F9FF" },
      { title: t('module.7.title'), desc: t('module.7.desc'), icon: Shield, color: "#2563EB", lightColor: "#DBEAFE" },
      { title: t('module.9.title'), desc: t('module.9.desc'), icon: CheckCircle, color: "#3B82F6", lightColor: "#F0F9FF" }
    ],
    digital: [
      { title: t('module.8.title'), desc: t('module.8.desc'), icon: Laptop, color: "#1E40AF", lightColor: "#EFF6FF" },
      { title: t('module.11.title'), desc: t('module.11.desc'), icon: Lightbulb, color: "#1E40AF", lightColor: "#EFF6FF" },
      { title: t('module.12.title'), desc: t('module.12.desc'), icon: MessageCircle, color: "#3B82F6", lightColor: "#F0F9FF" }
    ],
    career: [
      { title: t('module.10.title'), desc: t('module.10.desc'), icon: Briefcase, color: "#2563EB", lightColor: "#DBEAFE" },
      { title: t('module.14.title'), desc: t('module.14.desc'), icon: Globe, color: "#1E40AF", lightColor: "#EFF6FF" },
      { title: t('module.15.title'), desc: t('module.15.desc'), icon: Award, color: "#3B82F6", lightColor: "#F0F9FF" }
    ]
  };

  const whyChooseUs = [t('why.1'), t('why.2'), t('why.3'), t('why.4'), t('why.5')];
  const outcomes = [t('why.outcome.1'), t('why.outcome.2'), t('why.outcome.3'), t('why.outcome.4')];
  const audienceItems = [t('audience.1'), t('audience.2'), t('audience.3'), t('audience.4')];
  const audienceThemes = [
    {
      card: "from-blue-50 to-sky-50 border-blue-200/80 hover:border-blue-300",
      glow: "bg-blue-200/50",
      iconWrap: "from-blue-100 to-sky-100 ring-blue-200/80",
      icon: "text-blue-700",
      title: "group-hover:text-blue-900"
    },
    {
      card: "from-amber-50 to-orange-50 border-amber-200/80 hover:border-amber-300",
      glow: "bg-amber-200/50",
      iconWrap: "from-amber-100 to-orange-100 ring-amber-200/80",
      icon: "text-amber-700",
      title: "group-hover:text-amber-900"
    },
    {
      card: "from-emerald-50 to-teal-50 border-emerald-200/80 hover:border-emerald-300",
      glow: "bg-emerald-200/50",
      iconWrap: "from-emerald-100 to-teal-100 ring-emerald-200/80",
      icon: "text-emerald-700",
      title: "group-hover:text-emerald-900"
    },
    {
      card: "from-indigo-50 to-violet-50 border-indigo-200/80 hover:border-indigo-300",
      glow: "bg-indigo-200/50",
      iconWrap: "from-indigo-100 to-violet-100 ring-indigo-200/80",
      icon: "text-indigo-700",
      title: "group-hover:text-indigo-900"
    }
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Fallback data used while the API is loading or if it returns empty
  const fallbackMentors = [
    { name: 'Priya Sharma', title: 'Curriculum & Teaching Methods Specialist', description: 'Expert in teaching pedagogy with focus on modern curriculum design and innovative engagement techniques.', experience: '10+ Years', focus: 'Curriculum Design', image_url: '/expert_profile_1_1776280727429.png', tag1: 'Lesson Planning', tag2: 'Engagement' },
    { name: 'Gajesh Kumar', title: 'Classroom Management & Leadership Coach', description: 'Trained thousands of teachers in effective classroom leadership, behavioural management, and student motivation.', experience: '12+ Years', focus: 'Classroom Leadership', image_url: '/expert_profile_2_1776280747423.png', tag1: 'Management', tag2: 'Leadership' },
    { name: 'Ananya Iyer', title: 'Digital Pedagogy & EdTech Innovator', description: 'Pioneers digital-first teaching methods using smart tools and interactive platforms for next generation educators.', experience: '5+ Years', focus: 'Digital Pedagogy', image_url: '/expert_profile_1_1776280727429.png', tag1: 'EdTech', tag2: 'Innovation' },
  ];

  const fallbackReviews = [
    { name: 'Sarah Johnson', role: 'Secondary Teacher', content: 'This program transformed my teaching approach completely! The mentors are incredibly knowledgeable and supportive.', rating: 5 },
    { name: 'Vikram Desai', role: 'Primary Educator', content: 'Best investment in my teaching career. The practical techniques I learned are now part of my daily routine. Highly recommended!', rating: 5 },
    { name: 'Aisha Patel', role: 'Aspiring Teacher', content: 'Even as someone just starting out, I found the course material very accessible and the community incredibly welcoming.', rating: 5 },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Dynamic Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-sm py-3" : "bg-transparent py-6"
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 rotate-3">
              <span className="text-white font-black text-lg sm:text-xl leading-none">E</span>
            </div>
            <span className="font-black text-lg sm:text-xl md:text-2xl tracking-tighter text-slate-900 border-none">Educators<span className="text-blue-600 font-medium whitespace-nowrap">Point.</span></span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10">
            {['home', 'about', 'courses', 'experts'].map((item) => (
              <a 
                key={item} 
                href={item === 'home' ? '#' : `#${item}`} 
                className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
              >
                {t(`nav.${item}`)}
              </a>
            ))}
            <div className="h-4 w-px bg-slate-200" />
            <LanguageSelector />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl px-8 h-12 shadow-xl shadow-slate-900/10"
                onClick={() => window.location.href = '/enroll'}
              >
                {t('nav.enroll')}
              </Button>
            </motion.div>
          </div>

          <div className="lg:hidden flex items-center gap-2 sm:gap-4">
             <div className="scale-90 sm:scale-100 origin-right">
               <LanguageSelector />
             </div>
             <Button variant="ghost" size="icon" className="rounded-xl w-8 h-8 sm:w-10 sm:h-10 mr-[5mm] sm:mr-0" onClick={() => setIsMobileMenuOpen(true)}>
               <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
             </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed inset-0 z-[110] bg-white pt-24 px-6 pb-6 flex flex-col"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-6 right-6 rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-8 h-8 text-slate-900" />
              </Button>
              
              <div className="space-y-6 flex-1 flex flex-col justify-center">
                {['home', 'about', 'courses', 'experts'].map((item) => (
                  <a 
                    key={item} 
                    href={item === 'home' ? '#' : `#${item}`} 
                    className="text-3xl font-black text-slate-900 uppercase tracking-tighter"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(`nav.${item}`)}
                  </a>
                ))}
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl h-16 shadow-xl text-xl"
                onClick={() => window.location.href = '/enroll'}
              >
                {t('nav.enroll')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modern Hero Section */}
      <section className="relative flex items-center pt-28 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[0.03] blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/[0.03] blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.02)_0,transparent_70%)] lg:hidden" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start w-full"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-50/80 backdrop-blur-sm text-blue-600 px-4 md:px-5 py-2 md:py-2.5 rounded-[1.5rem] md:rounded-full font-bold text-[9.5px] sm:text-[11px] md:text-xs uppercase tracking-wider md:tracking-[0.2em] mb-6 md:mb-8 ring-1 ring-blue-100 shadow-sm text-center leading-snug lg:text-left"
              >
                <span>{t('hero.badge')}</span>
              </motion.div>

              <h1 className="text-[32px] md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-5 w-full">
                <span className="block">{t('hero.title1')}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 my-1 pb-1">{t('hero.title2')}</span>
                <span className="block">{t('hero.title3')}</span>
              </h1>

              <p className="text-[15px] md:text-lg text-slate-500 mb-8 max-w-xl font-medium leading-relaxed px-4 lg:px-0">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2 px-4 lg:px-0">
                <Button 
                  size="lg" 
                  onClick={() => window.location.href = '/enroll'}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 sm:py-7 rounded-2xl sm:rounded-full font-bold shadow-xl shadow-blue-600/20 transition-all text-base w-full sm:w-auto border border-blue-500/30"
                >
                  {t('hero.cta1')}
                  <ArrowUpRight className="ml-2 w-5 h-5 opacity-80" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-200 bg-white text-slate-700 px-8 py-6 sm:py-7 rounded-2xl sm:rounded-full font-bold transition-all hover:bg-slate-50 hover:text-blue-600 text-base shadow-sm w-full sm:w-auto"
                >
                  {t('hero.cta2')}
                </Button>
              </div>

              <div className="mt-10 md:mt-12 grid grid-cols-3 gap-2 sm:gap-8 border border-slate-100 lg:border-t lg:border-l-0 lg:border-r-0 lg:border-b-0 bg-slate-50 lg:bg-transparent p-5 lg:p-0 rounded-3xl lg:rounded-none lg:pt-8 w-full xl:w-[110%] shadow-sm lg:shadow-none mx-4 lg:mx-0">
                <div className="text-center lg:text-left group flex flex-col items-center lg:items-start justify-center">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">8</div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{t('hero.stat1')}</div>
                </div>
                <div className="text-center lg:text-left group border-l border-r border-slate-200 lg:border-none flex flex-col items-center lg:items-start justify-center">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">100%</div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{t('hero.stat2')}</div>
                </div>
                <div className="text-center lg:text-left group flex flex-col items-center lg:items-start justify-center">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">500+</div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{t('hero.stat3')}</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: heroY, opacity: heroOpacity }}
              className="relative mt-8 lg:mt-0 px-6 lg:px-0 hidden lg:block"
            >
              <div className="relative z-10 w-full max-w-[500px] mx-auto lg:ml-auto aspect-[4/5] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(37,99,235,0.15)] ring-1 ring-slate-900/5 group border-[6px] lg:border-8 border-white bg-slate-100">
                <img 
                  src="/hero_learning_platform_1776280702808.png" 
                  alt="Elite Learning Environment" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Floating Dashboard Element */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:block absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Status</div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">Verified Quality</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-blue-600 rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between text-[8px] font-bold text-slate-400">
                    <span>98% POSITIVE</span>
                    <span>ACTIVE</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="hidden lg:block absolute top-10 -right-6 z-20 bg-blue-600 p-5 rounded-2xl shadow-xl shadow-blue-600/20 text-white"
              >
                <Star className="w-6 h-6 text-white mb-3 fill-white" />
                <div className="text-lg font-bold">Premium</div>
                <div className="text-[9px] font-bold uppercase tracking-widest opacity-80">Learning Experience</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Simple & Trustable Layout */}
      <section id="about" className="py-12 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-3 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 md:px-4 py-1.5 rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-4 md:mb-6 ring-1 ring-blue-100">
              <Globe className="w-3 h-3" />
              Our Mission
            </div>
            <h2 className={`${language === 'ta' ? 'text-xl sm:text-3xl md:text-4xl' : 'text-2xl sm:text-4xl md:text-5xl'} font-bold text-slate-900 mb-4 md:mb-6 leading-tight tracking-tight`}>
              {t('about.title')}
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {[
              { icon: BookOpen, title: t('about.card1.title'), desc: t('about.card1.desc') },
              { icon: Users, title: t('about.card2.title'), desc: t('about.card2.desc') },
              { icon: Award, title: t('about.card3.title'), desc: t('about.card3.desc') }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 sm:p-5 md:p-10 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group text-center flex flex-col items-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h3 className="text-[11px] sm:text-sm md:text-xl font-bold text-slate-900 mb-1.5 md:mb-4 leading-tight">{item.title}</h3>
                <p className="text-slate-500 leading-snug md:leading-relaxed text-[9px] sm:text-xs md:text-sm font-medium line-clamp-4 md:line-clamp-none">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section id="courses" className="py-14 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-block bg-blue-50 text-blue-600 px-5 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-widest ring-1 ring-blue-100">
              Curriculum 2026
            </div>
            <h2 className={`${language === 'ta' ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold text-slate-900 mb-6 tracking-tight leading-tight sm:text-balance break-words`}>{t('courses.title')}</h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">{t('courses.subtitle')}</p>
          </motion.div>

          <Tabs value={activeModuleTab} onValueChange={setActiveModuleTab} className="w-full">
            <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm mb-6 md:mb-8">
              <TabsTrigger value="core" className="whitespace-normal text-center px-3 py-3 text-xs sm:text-sm font-bold text-slate-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300">Core Teaching Skills</TabsTrigger>
              <TabsTrigger value="classroom" className="whitespace-normal text-center px-3 py-3 text-xs sm:text-sm font-bold text-slate-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300">Classroom Management</TabsTrigger>
              <TabsTrigger value="digital" className="whitespace-normal text-center px-3 py-3 text-xs sm:text-sm font-bold text-slate-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300">Digital & Innovation</TabsTrigger>
              <TabsTrigger value="career" className="whitespace-normal text-center px-3 py-3 text-xs sm:text-sm font-bold text-slate-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300">Career Growth</TabsTrigger>
            </TabsList>

            {Object.entries(moduleCategories).map(([category, modules]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {modules.map((module, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="group p-6 sm:p-7 border border-slate-100 bg-white hover:bg-slate-950 transition-all duration-700 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative cursor-default h-full">
                        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-bl-[4rem] sm:rounded-bl-[5rem] translate-x-8 -translate-y-8 group-hover:bg-blue-600/10 transition-all duration-700" />
                        
                        <div 
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1rem] sm:rounded-[1.2rem] flex items-center justify-center mb-5 sm:mb-6 relative z-10 transition-transform group-hover:scale-110 duration-500"
                          style={{ backgroundColor: module.lightColor }}
                        >
                          <module.icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: module.color }} />
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white mb-3 sm:mb-4 transition-colors relative z-10 tracking-tight">{module.title}</h3>
                        <p className="text-slate-500 group-hover:text-slate-400 font-medium leading-relaxed transition-colors relative z-10 text-sm sm:text-base">{module.desc}</p>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-8 md:py-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[540px] h-[220px] bg-[radial-gradient(circle,rgba(59,130,246,0.14)_0%,rgba(59,130,246,0)_72%)]" />
          <div className="absolute -bottom-24 right-[-10%] w-[360px] h-[200px] bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,rgba(37,99,235,0)_74%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-5 md:mb-6"
          >
            <h2 className={`${language === 'ta' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'} font-extrabold text-slate-900 mb-2 tracking-tight leading-tight sm:text-balance break-words`}>
              {t('audience.title')}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {t('audience.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {audienceItems.map((item, index) => {
              const theme = audienceThemes[index % audienceThemes.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card className={`group relative h-full bg-gradient-to-b ${theme.card} backdrop-blur-sm border rounded-xl md:rounded-2xl p-4 md:p-5 text-center shadow-[0_6px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_14px_28px_rgba(37,99,235,0.16)] hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full ${theme.glow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className={`w-8 h-8 md:w-9 md:h-9 mx-auto mb-3 rounded-lg bg-gradient-to-b ${theme.iconWrap} ring-1 shadow-inner flex items-center justify-center`}>
                      <Users className={`w-3.5 h-3.5 md:w-4 md:h-4 ${theme.icon}`} />
                    </div>
                    <h3 className={`text-sm md:text-[15px] font-semibold text-slate-900 leading-snug ${theme.title} transition-colors`}>{item}</h3>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`${language === 'ta' ? 'text-2xl sm:text-3xl md:text-3xl lg:text-4xl' : 'text-3xl sm:text-3xl md:text-4xl lg:text-5xl'} font-bold text-slate-900 mb-8 tracking-tight leading-tight sm:text-balance break-words`}>{t('why.title')}</h2>
              <div className="grid gap-3">
                {whyChooseUs.map((item, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 group cursor-default"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {index + 1}
                    </div>
                    <p className="text-slate-800 font-bold text-base md:text-lg tracking-tight">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-blue-600 rounded-[4rem] px-8 py-16 md:p-20 text-white shadow-3xl shadow-blue-600/30 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              
              <Target className="w-12 h-12 mb-6 text-blue-200 opacity-50" />
              <h3 className={`${language === 'ta' ? 'text-xl sm:text-2xl md:text-2xl' : 'text-2xl sm:text-2xl md:text-3xl'} font-bold mb-6 tracking-tight leading-[1.1] sm:text-balance break-words`}>{t('why.outcome')}</h3>
              <p className="text-blue-100 mb-8 text-base md:text-lg font-medium leading-relaxed opacity-90">{t('why.outcome.intro')}</p>
              
              <ul className="space-y-6">
                {outcomes.map((outcome, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 text-base md:text-lg font-bold"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/50 flex items-center justify-center ring-4 ring-white/10 shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    {outcome}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experts Section — Live from Database */}
      <section id="experts" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-50/60 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-block bg-white text-blue-700 px-5 py-2 rounded-full font-bold text-xs mb-5 uppercase tracking-[0.18em] border border-blue-100 shadow-sm">
              Mentors You Can Trust
            </div>
            <h2 className={`${language === 'ta' ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold text-slate-900 mb-5 tracking-tight leading-tight sm:text-balance break-words`}>
              {t('experts.title')}
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              {t('experts.subtitle')}
            </p>
          </motion.div>

          <div className="flex gap-5 md:gap-6 overflow-x-auto pb-3 -mx-2 px-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {(liveMentors && liveMentors.length > 0 ? liveMentors : fallbackMentors).map((expert, idx) => (
              <motion.div
                key={expert.name + idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="min-w-[285px] md:min-w-[330px] snap-start"
              >
                <Card className="h-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-500">
                  <div className="relative p-6 pb-4">
                    <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-3xl bg-gradient-to-b from-blue-100/70 to-blue-50/20" />
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm bg-slate-100">
                        <img src={expert.image_url || '/expert_profile_1_1776280727429.png'} alt={expert.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight truncate">{expert.name}</h3>
                        <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mt-1 line-clamp-2">{expert.title}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-1 flex flex-col h-[calc(100%-7.5rem)]">
                    {expert.description && (
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{expert.description}</p>
                    )}

                    <div className="space-y-2.5 mb-5">
                      {expert.experience && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>{expert.experience} experience</span>
                        </div>
                      )}
                      {expert.focus && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <Target className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{expert.focus}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2.5">
                      {expert.tag1 && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-700 px-3 py-1.5 text-xs font-bold border border-blue-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {expert.tag1}
                        </span>
                      )}
                      {expert.tag2 && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1.5 text-xs font-bold border border-indigo-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                          {expert.tag2}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews / Testimonials Section — Live from Database */}
      {(liveReviews && liveReviews.length > 0 || fallbackReviews.length > 0) && (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-[-5%] w-[320px] h-[320px] bg-blue-100/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-[-5%] w-[280px] h-[280px] bg-indigo-100/30 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 md:mb-14"
            >
              <div className="inline-block bg-amber-50 text-amber-700 px-5 py-2 rounded-full font-bold text-xs mb-5 uppercase tracking-[0.18em] border border-amber-100 shadow-sm">
                Student Testimonials
              </div>
              <h2 className={`${language === 'ta' ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-bold text-slate-900 mb-5 tracking-tight leading-tight`}>
                What Our Students Say
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Real stories from real educators who transformed their teaching careers with us.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(liveReviews && liveReviews.length > 0 ? liveReviews : fallbackReviews).map((review, idx) => (
                <motion.div
                  key={review.name + idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                >
                  <Card className="h-full bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50/60 rounded-bl-[3rem] -translate-y-2 translate-x-2 group-hover:bg-amber-50 transition-colors" />
                    <Quote className="w-8 h-8 text-amber-300 mb-4 relative z-10" />
                    <p className="text-slate-700 text-[15px] leading-relaxed mb-6 font-medium relative z-10">
                      "{review.content}"
                    </p>
                    <div className="mt-auto flex items-center gap-3 relative z-10">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {review.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900 text-sm truncate">{review.name}</div>
                        <div className="text-xs text-slate-500 font-medium">{review.role}</div>
                      </div>
                      <div className="flex gap-0.5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Site Footer */}
      <footer className="bg-slate-950 text-slate-200">
        <div className="container mx-auto px-6 py-14 md:py-16">
          <div className="grid grid-cols-1 gap-10 border-b border-slate-800 pb-10 md:pb-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <a href="#" className="inline-flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <span className="text-white font-black text-xl leading-none">E</span>
                </div>
                <span className="font-black text-2xl tracking-tight text-white">
                  Educators<span className="text-blue-400 font-medium">Point.</span>
                </span>
              </a>
              <p className="mt-6 max-w-md text-sm md:text-base text-slate-300 leading-relaxed">
                {t('footer.tagline')}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href="/#about"
                  aria-label="Our community"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                >
                  <Users className="w-5 h-5" />
                </a>
                <a
                  href="/#courses"
                  aria-label="Our courses"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <a
                  href="/#experts"
                  aria-label="Our experts"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                >
                  <Rocket className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold text-white">{t('footer.links')}</h4>
              <ul className="mt-5 space-y-3">
                {['about', 'courses', 'experts'].map((i) => (
                  <li key={i}>
                    <a href={`/#${i}`} className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
                      {t(`nav.${i}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="text-sm font-semibold text-white">{t('footer.support')}</h4>
              <ul className="mt-5 space-y-3">
                <li>
                  <a href="/enroll" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="mailto:support@educatorspoint.com" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">
                    support@educatorspoint.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 md:pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {t('footer.copyright')}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-slate-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Safety</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Ethics</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
