/**
 * Enrollment Page
 * Design Philosophy: Modern Blue Theme with Premium Animations
 * Multi-language support with smooth transitions
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, CheckCircle, Clock, Users, Award, Zap } from "lucide-react";
import { useLocation } from "wouter";
import EnrollmentForm from "@/components/EnrollmentForm";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Enrollment() {
  const [, navigate] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-[#E0E7FF]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">EP</span>
            </div>
            <span className="font-bold text-xl text-[#2C2C2C]">Educators Point</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-[#2C2C2C] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all duration-300"
            >
              <ChevronLeft className="mr-2" size={20} />
              {t('nav.back')}
            </Button>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-[#E0E7FF]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[#7A7A7A]">
            <a href="/" className="text-[#2563EB] hover:underline font-semibold">
              {t('nav.about')}
            </a>
            <span>/</span>
            <span className="font-semibold">{t('enroll.title')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 pb-32 md:pb-16">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">{t('enroll.title')}</h1>
          <p className="text-lg text-[#7A7A7A]">{t('enroll.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Benefits */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-[#2C2C2C] mb-8 animate-slide-in-left">
                Why Enroll Today?
              </h2>

              <div className="space-y-6">
                {/* Benefit 1 */}
                <Card className="p-6 border border-[#E0E7FF] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <Clock className="text-[#2563EB] group-hover:text-white transition-colors duration-300" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C2C2C] mb-1 group-hover:text-[#2563EB] transition-colors duration-300">
                        8-Week Program
                      </h3>
                      <p className="text-sm text-[#7A7A7A]">
                        Intensive, structured training with daily live sessions
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Benefit 2 */}
                <Card className="p-6 border border-[#E0E7FF] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#F0F9FF] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#1E40AF] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <Users className="text-[#1E40AF] group-hover:text-white transition-colors duration-300" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C2C2C] mb-1 group-hover:text-[#1E40AF] transition-colors duration-300">
                        Expert Mentors
                      </h3>
                      <p className="text-sm text-[#7A7A7A]">
                        Learn from 5-12+ years experienced educators
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Benefit 3 */}
                <Card className="p-6 border border-[#E0E7FF] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#3B82F6] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <Award className="text-[#3B82F6] group-hover:text-white transition-colors duration-300" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C2C2C] mb-1 group-hover:text-[#3B82F6] transition-colors duration-300">
                        100% Placement
                      </h3>
                      <p className="text-sm text-[#7A7A7A]">
                        Placement assistance with school partnerships
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Benefit 4 */}
                <Card className="p-6 border border-[#E0E7FF] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#F0F9FF] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <Zap className="text-[#2563EB] group-hover:text-white transition-colors duration-300" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C2C2C] mb-1 group-hover:text-[#2563EB] transition-colors duration-300">
                        Early Bird Offer
                      </h3>
                      <p className="text-sm text-[#7A7A7A]">
                        Special discount for first 20 enrollments
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Stats */}
              <div className="mt-8 p-6 bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF] rounded-lg border border-[#BFDBFE] hover:shadow-lg transition-all duration-300 animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
                <h3 className="font-semibold text-[#2C2C2C] mb-4">
                  Program Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Trained Teachers</span>
                    <span className="font-bold text-[#2563EB]">500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Success Rate</span>
                    <span className="font-bold text-[#1E40AF]">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Avg. Salary Increase</span>
                    <span className="font-bold text-[#3B82F6]">35%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="md:col-span-2">
            <EnrollmentForm />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 pt-16 border-t border-[#E0E7FF]">
          <h2 className="text-3xl font-bold text-[#2C2C2C] mb-12 text-center animate-fade-in">
            {t('enroll.faq.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { q: t('enroll.faq.q1'), a: t('enroll.faq.a1') },
              { q: t('enroll.faq.q2'), a: t('enroll.faq.a2') },
              { q: t('enroll.faq.q3'), a: t('enroll.faq.a3') },
              { q: t('enroll.faq.q4'), a: t('enroll.faq.a4') },
              { q: t('enroll.faq.q5'), a: t('enroll.faq.a5') },
              { q: t('enroll.faq.q6'), a: t('enroll.faq.a6') }
            ].map((faq, idx) => (
              <Card key={idx} className="p-6 border border-[#E0E7FF] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group">
                <h3 className="font-bold text-[#2C2C2C] mb-2 group-hover:text-[#2563EB] transition-colors duration-300">
                  {faq.q}
                </h3>
                <p className="text-[#7A7A7A] text-sm group-hover:text-[#2C2C2C] transition-colors duration-300">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 p-8 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1E40AF] rounded-2xl text-white text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Have More Questions?</h2>
          <p className="mb-6 text-[#E0E7FF]">
            Our enrollment team is here to help. Reach out to us for any queries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@educatorspoint.com"
              className="px-6 py-3 bg-white text-[#2563EB] font-semibold rounded-lg hover:bg-[#F0F9FF] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Email Us
            </a>
            <a
              href="tel:+919876543210"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">EP</span>
                </div>
                <span className="font-bold text-lg">Educators Point</span>
              </div>
              <p className="text-[#D1D5DB]">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">{t('footer.links')}</h4>
              <ul className="space-y-2 text-[#D1D5DB]">
                <li><a href="/" className="hover:text-white transition-colors duration-300">{t('nav.about')}</a></li>
                <li><a href="/#courses" className="hover:text-white transition-colors duration-300">{t('nav.courses')}</a></li>
                <li><a href="/#experts" className="hover:text-white transition-colors duration-300">{t('nav.experts')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-[#D1D5DB]">
                <li><a href="#" className="hover:text-white transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
