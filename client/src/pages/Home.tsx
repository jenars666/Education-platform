/*
 * Educators Point - Home Page
 * Design Philosophy: Modern Blue Theme with Premium Animations
 * Colors: Vibrant Blue (#2563EB), Light Blue (#60A5FA), Deep Blue (#1E40AF)
 * Features: Multi-language support, smooth animations, premium icons
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Users, Clock, Award, BookOpen, Zap, MessageCircle, Briefcase, Lightbulb, Shield, Laptop, CheckCircle, Target, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function Home() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const modules = [
    {
      title: t('module.1.title'),
      desc: t('module.1.desc'),
      icon: Users,
      color: "#2563EB",
      lightColor: "#DBEAFE"
    },
    {
      title: t('module.2.title'),
      desc: t('module.2.desc'),
      icon: Lightbulb,
      color: "#1E40AF",
      lightColor: "#EFF6FF"
    },
    {
      title: t('module.3.title'),
      desc: t('module.3.desc'),
      icon: BookOpen,
      color: "#3B82F6",
      lightColor: "#F0F9FF"
    },
    {
      title: t('module.4.title'),
      desc: t('module.4.desc'),
      icon: Zap,
      color: "#2563EB",
      lightColor: "#DBEAFE"
    },
    {
      title: t('module.5.title'),
      desc: t('module.5.desc'),
      icon: Rocket,
      color: "#1E40AF",
      lightColor: "#EFF6FF"
    },
    {
      title: t('module.6.title'),
      desc: t('module.6.desc'),
      icon: Target,
      color: "#3B82F6",
      lightColor: "#F0F9FF"
    },
    {
      title: t('module.7.title'),
      desc: t('module.7.desc'),
      icon: Shield,
      color: "#2563EB",
      lightColor: "#DBEAFE"
    },
    {
      title: t('module.8.title'),
      desc: t('module.8.desc'),
      icon: Laptop,
      color: "#1E40AF",
      lightColor: "#EFF6FF"
    },
    {
      title: t('module.9.title'),
      desc: t('module.9.desc'),
      icon: CheckCircle,
      color: "#3B82F6",
      lightColor: "#F0F9FF"
    },
    {
      title: t('module.10.title'),
      desc: t('module.10.desc'),
      icon: Briefcase,
      color: "#2563EB",
      lightColor: "#DBEAFE"
    }
  ];

  const whyChooseUs = [
    t('why.1'),
    t('why.2'),
    t('why.3'),
    t('why.4'),
    t('why.5')
  ];

  const outcomes = [
    t('why.outcome.1'),
    t('why.outcome.2'),
    t('why.outcome.3'),
    t('why.outcome.4')
  ];

  const targetAudience = [
    t('audience.1'),
    t('audience.2'),
    t('audience.3'),
    t('audience.4')
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? "bg-white shadow-lg" : "bg-white border-b border-[#E0E7FF]"}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">EP</span>
            </div>
            <span className="font-bold text-xl text-[#2C2C2C]">Educators Point</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-[#2C2C2C] hover:text-[#2563EB] transition-colors duration-300 font-medium">{t('nav.about')}</a>
            <a href="#courses" className="text-[#2C2C2C] hover:text-[#2563EB] transition-colors duration-300 font-medium">{t('nav.courses')}</a>
            <a href="#experts" className="text-[#2C2C2C] hover:text-[#2563EB] transition-colors duration-300 font-medium">{t('nav.experts')}</a>
            <a href="#testimonials" className="text-[#2C2C2C] hover:text-[#2563EB] transition-colors duration-300 font-medium">{t('nav.success')}</a>
            <LanguageSelector />
            <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white shadow-md hover:shadow-lg transition-all duration-300" onClick={() => window.location.href = '/enroll'}>{t('nav.enroll')}</Button>
          </div>
          <div className={`md:hidden flex items-center gap-2 transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {!isScrolled && <LanguageSelector />}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-white pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="fade-in space-y-6">
              <div className="inline-block bg-[#EFF6FF] px-4 py-2 rounded-full mb-6 animate-slide-in-left">
                <span className="text-[#2563EB] font-semibold text-sm">{t('hero.badge')}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#2C2C2C] mb-6 leading-tight animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                {t('hero.title1')} <span className="text-[#2563EB]">{t('hero.title2')}</span> {t('hero.title3')}
              </h1>
              <p className="text-lg text-[#7A7A7A] mb-8 leading-relaxed animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white text-lg px-8 py-6 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" onClick={() => window.location.href = '/enroll'}>
                  {t('hero.cta1')} <ChevronRight className="ml-2" />
                </Button>
                <Button variant="outline" className="border-[#60A5FA] text-[#2563EB] hover:bg-[#EFF6FF] text-lg px-8 py-6 h-auto rounded-lg transition-all duration-300" >
                  {t('hero.cta2')}
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
                <div className="p-4 bg-[#EFF6FF] rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="text-3xl font-bold text-[#2563EB]">8</div>
                  <div className="text-sm text-[#7A7A7A]">{t('hero.stat1')}</div>
                </div>
                <div className="p-4 bg-[#F0F9FF] rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="text-3xl font-bold text-[#3B82F6]">100%</div>
                  <div className="text-sm text-[#7A7A7A]">{t('hero.stat2')}</div>
                </div>
                <div className="p-4 bg-[#EFF6FF] rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="text-3xl font-bold text-[#1E40AF]">500+</div>
                  <div className="text-sm text-[#7A7A7A]">{t('hero.stat3')}</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="fade-in animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 aspect-video">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/hero-teacher-professional-m5h5vfoLfkFX2KxoWD9z6m.webp"
                  alt="Professional teacher in modern classroom"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">{t('about.title')}</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">{t('about.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: t('about.card1.title'), desc: t('about.card1.desc') },
              { icon: Users, title: t('about.card2.title'), desc: t('about.card2.desc') },
              { icon: Award, title: t('about.card3.title'), desc: t('about.card3.desc') }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Card key={idx} className="p-6 border border-[#E0E7FF] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group">
                  <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                    <IconComponent className="text-[#2563EB] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-3 group-hover:text-[#2563EB] transition-colors duration-300">{item.title}</h3>
                  <p className="text-[#7A7A7A]">{item.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Will Master Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">{t('courses.title')}</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">{t('courses.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              const isHovered = hoveredModule === index;
              return (
                <Card 
                  key={index} 
                  className="p-6 border border-[#E0E7FF] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer group"
                  onMouseEnter={() => setHoveredModule(index)}
                  onMouseLeave={() => setHoveredModule(null)}
                >
                  <div className="flex gap-4 mb-4">
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-500 shadow-md"
                      style={{ backgroundColor: module.lightColor }}
                    >
                      <IconComponent 
                        size={28} 
                        style={{ color: module.color }}
                        className="group-hover:rotate-12 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-2 group-hover:text-[#2563EB] transition-colors duration-300">{module.title}</h3>
                  <p className="text-[#7A7A7A] text-sm group-hover:text-[#2C2C2C] transition-colors duration-300">{module.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why This Program Stands Out */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold text-[#2C2C2C] mb-8">{t('why.title')}</h2>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white transition-all duration-300 transform hover:translate-x-2">
                    <CheckCircle className="text-[#2563EB] flex-shrink-0 mt-1 animate-bounce" style={{ animationDelay: `${index * 0.1}s` }} size={24} />
                    <p className="text-[#2C2C2C] font-semibold text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF] rounded-2xl p-8 border border-[#BFDBFE] hover:shadow-xl transition-all duration-500 transform hover:scale-105 animate-slide-in-right">
              <h3 className="text-2xl font-bold text-[#2C2C2C] mb-6">{t('why.outcome')}</h3>
              <p className="text-[#7A7A7A] mb-6 font-semibold">{t('why.outcome.intro')}</p>
              <ul className="space-y-3">
                {outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3 animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-[#2563EB] font-bold text-lg">✓</span>
                    <span className="text-[#2C2C2C]">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section id="experts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">{t('experts.title')}</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">{t('experts.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: t('expert.1.name'), title: t('expert.1.title'), desc: t('expert.1.desc'), tag1: t('expert.1.tag1'), tag2: t('expert.1.tag2'), img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-priya-deKLhh2uDffoEnMdHFMUMr.webp', color: '#2563EB' },
              { name: t('expert.2.name'), title: t('expert.2.title'), desc: t('expert.2.desc'), tag1: t('expert.2.tag1'), tag2: t('expert.2.tag2'), img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-rajesh-FQKhR6cB2nRqdVZ6mPUnw9.webp', color: '#1E40AF' },
              { name: t('expert.3.name'), title: t('expert.3.title'), desc: t('expert.3.desc'), tag1: t('expert.3.tag1'), tag2: t('expert.3.tag2'), img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-anjali-6BhRb2WwQUnXNSKjUiJ7fd.webp', color: '#3B82F6' }
            ].map((expert, idx) => (
              <Card key={idx} className="p-6 text-center overflow-hidden hover:shadow-2xl transition-all duration-500 border border-[#E0E7FF] transform hover:-translate-y-4 group cursor-pointer">
                <div className="mb-6 relative">
                  <img 
                    src={expert.img}
                    alt="Expert mentor"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 transition-all duration-500 group-hover:scale-110 group-hover:border-[#2563EB]"
                    style={{ borderColor: expert.color }}
                  />
                  <div className="absolute inset-0 rounded-full bg-[#2563EB] opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
                </div>
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-1 group-hover:text-[#2563EB] transition-colors duration-300">{expert.name}</h3>
                <p className="font-semibold mb-3 transition-colors duration-300" style={{ color: expert.color }}>{expert.title}</p>
                <p className="text-[#7A7A7A] text-sm mb-4 group-hover:text-[#2C2C2C] transition-colors duration-300">{expert.desc}</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <span className="bg-[#EFF6FF] text-[#2563EB] text-xs px-3 py-1 rounded-full font-semibold group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">{expert.tag1}</span>
                  <span className="bg-[#EFF6FF] text-[#2563EB] text-xs px-3 py-1 rounded-full font-semibold group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">{expert.tag2}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">{t('audience.title')}</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">{t('audience.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
              <Card key={index} className="p-6 text-center border border-[#E0E7FF] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <Users className="text-[#2563EB] group-hover:text-white transition-colors duration-300" size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#2C2C2C] group-hover:text-[#2563EB] transition-colors duration-300">{audience}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1E40AF] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 animate-slide-in-left">{t('cta.title')}</h2>
          <p className="text-xl text-[#E0E7FF] mb-8 max-w-2xl mx-auto animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            {t('cta.subtitle')}
          </p>
          <Button 
            className="bg-white hover:bg-[#F0F9FF] text-[#2563EB] text-lg px-12 py-6 h-auto rounded-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slide-in-left" 
            style={{ animationDelay: '0.2s' }}
            onClick={() => window.location.href = '/enroll'}
          >
            {t('cta.button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">EP</span>
                </div>
                <span className="font-bold text-lg">Educators Point</span>
              </div>
              <p className="text-[#D1D5DB]">{t('footer.tagline')}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.links')}</h4>
              <ul className="space-y-2 text-[#D1D5DB]">
                <li><a href="#about" className="hover:text-white transition-colors duration-300">{t('nav.about')}</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors duration-300">{t('nav.courses')}</a></li>
                <li><a href="#experts" className="hover:text-white transition-colors duration-300">{t('nav.experts')}</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors duration-300">{t('nav.success')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-[#D1D5DB]">
                <li><a href="#" className="hover:text-white transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.social')}</h4>
              <div className="flex gap-4">
                <a href="#" className="text-[#D1D5DB] hover:text-white transition-colors duration-300 hover:scale-110 transform">
                  <span className="text-2xl">f</span>
                </a>
                <a href="#" className="text-[#D1D5DB] hover:text-white transition-colors duration-300 hover:scale-110 transform">
                  <span className="text-2xl">in</span>
                </a>
                <a href="#" className="text-[#D1D5DB] hover:text-white transition-colors duration-300 hover:scale-110 transform">
                  <span className="text-2xl">yt</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#374151] pt-8 text-center text-[#D1D5DB]">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
          opacity: 0;
        }

        .fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
