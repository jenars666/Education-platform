import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronRight, Users, Clock, Award, BookOpen, Zap, 
  MessageCircle, Briefcase, Lightbulb, Shield, Laptop, 
  CheckCircle, Target, Rocket, Globe, Star, ArrowUpRight, Menu, X
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  const modules = [
    { title: t('module.1.title'), desc: t('module.1.desc'), icon: Users, color: "#2563EB", lightColor: "#DBEAFE" },
    { title: t('module.2.title'), desc: t('module.2.desc'), icon: Lightbulb, color: "#1E40AF", lightColor: "#EFF6FF" },
    { title: t('module.3.title'), desc: t('module.3.desc'), icon: BookOpen, color: "#3B82F6", lightColor: "#F0F9FF" },
    { title: t('module.4.title'), desc: t('module.4.desc'), icon: Zap, color: "#2563EB", lightColor: "#DBEAFE" },
    { title: t('module.5.title'), desc: t('module.5.desc'), icon: Rocket, color: "#1E40AF", lightColor: "#EFF6FF" },
    { title: t('module.6.title'), desc: t('module.6.desc'), icon: Target, color: "#3B82F6", lightColor: "#F0F9FF" },
    { title: t('module.7.title'), desc: t('module.7.desc'), icon: Shield, color: "#2563EB", lightColor: "#DBEAFE" },
    { title: t('module.8.title'), desc: t('module.8.desc'), icon: Laptop, color: "#1E40AF", lightColor: "#EFF6FF" },
    { title: t('module.9.title'), desc: t('module.9.desc'), icon: CheckCircle, color: "#3B82F6", lightColor: "#F0F9FF" },
    { title: t('module.10.title'), desc: t('module.10.desc'), icon: Briefcase, color: "#2563EB", lightColor: "#DBEAFE" },
    { title: t('module.11.title'), desc: t('module.11.desc'), icon: Lightbulb, color: "#1E40AF", lightColor: "#EFF6FF" },
    { title: t('module.12.title'), desc: t('module.12.desc'), icon: MessageCircle, color: "#3B82F6", lightColor: "#F0F9FF" },
    { title: t('module.13.title'), desc: t('module.13.desc'), icon: Users, color: "#2563EB", lightColor: "#DBEAFE" },
    { title: t('module.14.title'), desc: t('module.14.desc'), icon: Globe, color: "#1E40AF", lightColor: "#EFF6FF" },
    { title: t('module.15.title'), desc: t('module.15.desc'), icon: Award, color: "#3B82F6", lightColor: "#F0F9FF" }
  ];

  const whyChooseUs = [t('why.1'), t('why.2'), t('why.3'), t('why.4'), t('why.5')];
  const outcomes = [t('why.outcome.1'), t('why.outcome.2'), t('why.outcome.3'), t('why.outcome.4')];

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
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 rotate-3">
              <span className="text-white font-black text-xl italic leading-none">E</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900">Educators<span className="text-blue-600 font-medium">Point.</span></span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10">
            {['about', 'courses', 'experts', 'success'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
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

          <div className="lg:hidden flex items-center gap-4">
             <LanguageSelector />
             <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setIsMobileMenuOpen(true)}>
               <Menu className="w-6 h-6 text-slate-900" />
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
              
              <div className="flex flex-col gap-8 text-center mt-10 flex-grow">
                {['about', 'courses', 'experts', 'success'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-black uppercase tracking-widest text-slate-900"
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
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[0.03] blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/[0.03] blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.02)_0,transparent_70%)] lg:hidden" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-8 ring-1 ring-blue-100 shadow-sm"
              >
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                <span>{t('hero.badge')}</span>
              </motion.div>

              <h1 className={`${language === 'ta' ? 'text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl' : 'text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'} font-black text-slate-900 leading-[1.05] sm:leading-[1.1] mb-8 tracking-tighter sm:text-balance break-words`}>
                {t('hero.title1')} <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic font-serif font-normal lowercase break-words py-1 block sm:inline">{t('hero.title2')}</span> <br className="hidden sm:block" />
                {t('hero.title3')}
              </h1>

              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-lg">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Button 
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-2xl px-10 h-16 md:h-20 shadow-xl shadow-blue-600/20 group transition-all duration-300"
                    onClick={() => window.location.href = '/enroll'}
                  >
                    {t('hero.cta1')}
                    <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </motion.div>
                <Button variant="ghost" className="w-full sm:w-auto text-slate-500 hover:text-slate-900 text-lg font-bold rounded-2xl h-16 md:h-20 px-8 transition-all hover:bg-slate-100/50">
                  {t('hero.cta2')}
                </Button>
              </div>

              <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 border-t border-slate-100 pt-10 w-full">
                <div className="text-center group">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">8</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{t('hero.stat1')}</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{t('hero.stat2')}</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">500+</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{t('hero.stat3')}</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: heroY, opacity: heroOpacity }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/10 ring-1 ring-slate-900/5 group">
                <img 
                  src="/hero_learning_platform_1776280702808.png" 
                  alt="Elite Learning Environment" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Floating Dashboard Element */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 z-20 bg-white p-8 rounded-[2rem] shadow-2xl shadow-slate-900/10 border border-slate-100 max-w-[280px]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="text-green-500 w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Enrollment Status</div>
                    <div className="text-lg font-black text-slate-900">Verified Quality</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-blue-600 rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>98% POSITIVE FEEDBACK</span>
                    <span>ACTIVE</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-10 -right-10 z-20 bg-blue-600 p-8 rounded-[2rem] shadow-2xl shadow-blue-600/30 text-white"
              >
                <Star className="text-white fill-white w-8 h-8 mb-4 animate-pulse" />
                <div className="text-2xl font-black italic">Premium</div>
                <div className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Learning Experience</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Bento Style */}
      <section id="about" className="py-20 md:py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 text-center lg:text-left"
            >
              <h2 className={`${language === 'ta' ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-black text-slate-900 mb-8 leading-[1.15] tracking-tight italic sm:text-balance break-words`}>
                {t('about.title')}
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                {t('about.subtitle')}
              </p>
            </motion.div>

            <div className="lg:col-span-2 grid md:grid-cols-2 gap-10">
               {[
                { icon: BookOpen, title: t('about.card1.title'), desc: t('about.card1.desc'), color: "blue" },
                { icon: Users, title: t('about.card2.title'), desc: t('about.card2.desc'), color: "indigo" },
                { icon: Award, title: t('about.card3.title'), desc: t('about.card3.desc'), color: "violet" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-8 sm:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:bg-slate-900 transition-all duration-500 cursor-default flex flex-col items-center text-center ${idx === 0 ? "md:col-span-2 md:flex-row md:text-left md:items-center gap-8 md:gap-10" : "gap-6"}`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-[1.5rem] sm:rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0">
                    <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                  </div>
                  <div>
                     <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white mb-3 sm:mb-4 transition-colors tracking-tight">{item.title}</h3>
                     <p className="text-slate-500 group-hover:text-slate-400 font-medium leading-relaxed transition-colors text-sm sm:text-base">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section id="courses" className="py-20 md:py-40 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-32"
          >
            <div className="inline-block bg-blue-50 text-blue-600 px-5 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-widest ring-1 ring-blue-100">
              Curriculum 2026
            </div>
            <h2 className={`${language === 'ta' ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-black text-slate-900 mb-6 tracking-tight leading-tight sm:text-balance break-words`}>{t('courses.title')}</h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">{t('courses.subtitle')}</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {modules.map((module, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group p-8 sm:p-10 border border-slate-100 bg-white hover:bg-slate-950 transition-all duration-700 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative cursor-default h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-bl-[4rem] sm:rounded-bl-[5rem] translate-x-8 -translate-y-8 group-hover:bg-blue-600/10 transition-all duration-700" />
                  
                  <div 
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1rem] sm:rounded-[1.2rem] flex items-center justify-center mb-8 sm:mb-10 relative z-10 transition-transform group-hover:scale-110 duration-500"
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
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-20 md:py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`${language === 'ta' ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'} font-black text-slate-900 mb-10 tracking-tight leading-tight sm:text-balance break-words`}>{t('why.title')}</h2>
              <div className="grid gap-6">
                {whyChooseUs.map((item, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group cursor-default"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-black shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {index + 1}
                    </div>
                    <p className="text-slate-800 font-black text-lg md:text-xl tracking-tight">{item}</p>
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
              
              <Target className="w-20 h-20 mb-10 text-blue-200 opacity-50" />
              <h3 className={`${language === 'ta' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'} font-black mb-10 tracking-tight leading-[1.1] sm:text-balance break-words`}>{t('why.outcome')}</h3>
              <p className="text-blue-100 mb-12 text-lg md:text-xl font-medium leading-relaxed opacity-90">{t('why.outcome.intro')}</p>
              
              <ul className="space-y-8">
                {outcomes.map((outcome, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-6 text-lg md:text-xl font-black"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/50 flex items-center justify-center ring-4 ring-white/10 shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    {outcome}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experts Section - Modern Elite Profile */}
      <section id="experts" className="py-20 md:py-40 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-32"
          >
             <div className="inline-block bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-widest ring-1 ring-indigo-100">
               Elite Faculty
            </div>
            <h2 className={`${language === 'ta' ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-black text-slate-900 mb-6 tracking-tight leading-tight sm:text-balance break-words`}>{t('experts.title')}</h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t('experts.subtitle')}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { name: t('expert.1.name'), title: t('expert.1.title'), desc: t('expert.1.desc'), tag1: t('expert.1.tag1'), tag2: t('expert.1.tag2'), img: '/expert_profile_1_1776280727429.png' },
              { name: 'Gajesh Kumar', title: t('expert.2.title'), desc: t('expert.2.desc'), tag1: t('expert.2.tag1'), tag2: t('expert.2.tag2'), img: '/expert_profile_2_1776280747423.png' },
              { name: t('expert.3.name'), title: t('expert.3.title'), desc: t('expert.3.desc'), tag1: t('expert.3.tag1'), tag2: t('expert.3.tag2'), img: '/expert_profile_1_1776280727429.png' }
            ].map((expert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-900/5 transition-all duration-500 group overflow-hidden bg-white text-center h-full flex flex-col items-center">
                  <div className="mb-10 relative">
                    <div className="w-44 h-44 rounded-[2.5rem] mx-auto overflow-hidden ring-1 ring-slate-100 shadow-xl group-hover:scale-105 transition-all duration-700 ease-out">
                      <img src={expert.img} className="w-full h-full object-cover" alt={expert.name} />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 px-6 py-2 rounded-full shadow-lg text-[10px] font-black uppercase tracking-widest text-white ring-4 ring-white whitespace-nowrap">
                      Top Mentor
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">{expert.name}</h3>
                  <p className="text-blue-600 font-black text-xs mb-8 uppercase tracking-[0.2em]">{expert.title}</p>
                  <p className="text-slate-500 mb-10 leading-relaxed font-medium line-clamp-3">{expert.desc}</p>
                  
                  <div className="flex justify-center gap-3 mt-auto">
                    <span className="bg-slate-50 text-slate-500 text-[10px] px-5 py-2.5 rounded-xl font-black uppercase tracking-widest ring-1 ring-slate-100">{expert.tag1}</span>
                    <span className="bg-slate-50 text-slate-500 text-[10px] px-5 py-2.5 rounded-xl font-black uppercase tracking-widest ring-1 ring-slate-100">{expert.tag2}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA with Geometric Accents */}
      <section id="success" className="py-20 md:py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center text-balance">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-950 rounded-[4rem] px-6 py-20 md:p-32 text-white relative shadow-3xl shadow-slate-900/40 overflow-hidden"
          >
            {/* Background design */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[200px] translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[200px] -translate-x-1/2 translate-y-1/2" />
            </div>

            <h2 className={`${language === 'ta' ? 'text-2xl sm:text-3xl md:text-5xl lg:text-5xl' : 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl'} font-black mb-8 leading-tight tracking-tight w-full max-w-4xl mx-auto sm:text-balance break-words`}>
              {t('cta.title')}
            </h2>
            <p className="text-lg md:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium leading-relaxed italic">
              {t('cta.subtitle')}
            </p>
            
            <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-full sm:w-fit mx-auto"
            >
              <Button 
                className="bg-white text-slate-950 text-lg sm:text-xl md:text-2xl font-black px-6 sm:px-12 md:px-16 h-auto min-h-[5rem] py-5 sm:py-0 sm:h-20 md:h-24 rounded-[2rem] shadow-2xl hover:bg-slate-50 transition-all flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mx-auto w-full sm:w-auto whitespace-normal"
                onClick={() => window.location.href = '/enroll'}
              >
                <span className="text-center break-words leading-tight flex-1">{t('cta.button')}</span>
                <ArrowUpRight className="w-8 h-8 shrink-0 bg-blue-50 text-blue-600 rounded-full p-1.5 mt-2 sm:mt-0" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modern High-End Footer */}
      <footer className="bg-white pt-32 pb-10 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 rotate-3">
                  <span className="text-white font-black text-xl italic leading-none">E</span>
                </div>
                <span className="font-black text-2xl tracking-tighter text-slate-900">Educators<span className="text-blue-600 font-medium">Point.</span></span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                {t('footer.tagline')}
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><Users className="w-5 h-5" /></div>
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><Globe className="w-5 h-5" /></div>
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><Rocket className="w-5 h-5" /></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-slate-900 mb-10 uppercase tracking-widest text-xs italic">{t('footer.links')}</h4>
              <ul className="space-y-5 font-bold">
                {['about', 'courses', 'experts', 'success'].map(i => (
                  <li key={i}><a href={`#${i}`} className="hover:text-blue-600 transition-colors uppercase text-xs tracking-widest">{t(`nav.${i}`)}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-slate-900 mb-10 uppercase tracking-widest text-xs italic">{t('footer.support')}</h4>
              <ul className="space-y-5 font-bold">
                {['FAQ', 'Privacy Policy', 'Terms of Service'].map(i => (
                  <li key={i}><a href="#" className="hover:text-blue-600 transition-colors uppercase text-xs tracking-widest">{i}</a></li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
              <h4 className="font-black text-slate-900 mb-6 tracking-tight">Stay Elite.</h4>
              <p className="text-sm font-medium mb-8 leading-relaxed">Join 500+ educators receiving our exclusive weekly insights.</p>
              <div className="flex flex-col gap-3">
                <input className="bg-white border-none rounded-xl px-5 py-4 w-full text-slate-900 text-sm focus:ring-2 ring-blue-500 shadow-sm" placeholder="Your work email" />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-black">Subscribe Now</Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase">{t('footer.copyright')}</p>
            <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest">
                <a href="#" className="hover:text-blue-600 transition-colors">Safety</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Ethics</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
