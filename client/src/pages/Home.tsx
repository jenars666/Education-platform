/*
 * Educators Point - Home Page
 * Design Philosophy: Modern Blue Theme with Professional Accents
 * Colors: Vibrant Blue (#2563EB), Light Blue (#60A5FA), Deep Blue (#1E40AF)
 * Typography: Poppins (headings) + Inter (body)
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Users, Clock, Award, BookOpen, Zap, MessageCircle, Briefcase, Lightbulb, Shield, Laptop, CheckCircle, Target, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const modules = [
    {
      title: "Become a Professional Educator",
      description: "Develop a strong teacher identity, ethical grounding, and classroom presence expected in top schools.",
      icon: Users,
      color: "#2563EB",
      lightColor: "#DBEAFE"
    },
    {
      title: "Understand Every Learner",
      description: "Apply child psychology, differentiated instruction, and inclusive practices to handle diverse classrooms with confidence.",
      icon: Lightbulb,
      color: "#1E40AF",
      lightColor: "#EFF6FF"
    },
    {
      title: "Teach Across Curricula",
      description: "Gain expertise in CBSE, Cambridge, and IB frameworks with outcome-driven lesson delivery.",
      icon: BookOpen,
      color: "#3B82F6",
      lightColor: "#F0F9FF"
    },
    {
      title: "Design Powerful Lessons",
      description: "Create structured, engaging lesson plans using backward design, Bloom's taxonomy, and real assessment integration.",
      icon: Zap,
      color: "#2563EB",
      lightColor: "#DBEAFE"
    },
    {
      title: "Deliver Impactful Teaching",
      description: "Implement activity-based, inquiry-driven, and project-based learning that drives student engagement.",
      icon: Rocket,
      color: "#1E40AF",
      lightColor: "#EFF6FF"
    },
    {
      title: "Master Classroom Control",
      description: "Handle behaviour, build routines, and maintain high-engagement classrooms without stress.",
      icon: Target,
      color: "#3B82F6",
      lightColor: "#F0F9FF"
    },
    {
      title: "Ensure Student Safety & Compliance",
      description: "Learn POCSO guidelines, safeguarding protocols, and professional boundaries every school expects.",
      icon: Shield,
      color: "#2563EB",
      lightColor: "#DBEAFE"
    },
    {
      title: "Leverage Digital Teaching",
      description: "Use LMS platforms, smart tools, and digital resources to teach both offline and online effectively.",
      icon: Laptop,
      color: "#1E40AF",
      lightColor: "#EFF6FF"
    },
    {
      title: "Assess Like a Pro",
      description: "Design formative & summative assessments, track progress, and deliver meaningful feedback.",
      icon: CheckCircle,
      color: "#3B82F6",
      lightColor: "#F0F9FF"
    },
    {
      title: "Get Interview & Demo Ready",
      description: "Crack interviews with mock sessions, demo teaching, and portfolio building.",
      icon: Briefcase,
      color: "#2563EB",
      lightColor: "#DBEAFE"
    }
  ];

  const whyChooseUs = [
    "NEP 2020 Aligned + International Pedagogy",
    "Real Classroom Simulation (Not Just Theory)",
    "Legal & Compliance Training (POCSO Included)",
    "End-to-End Teacher Readiness",
    "Placement-Focused Training Approach"
  ];

  const outcomes = [
    "Confident classroom practitioner",
    "Skilled in modern teaching methodologies",
    "Ready for top school interviews",
    "Capable of handling real classroom challenges from Day 1"
  ];

  const targetAudience = [
    "Aspiring Teachers",
    "Fresh Graduates",
    "Career Switchers",
    "Teachers aiming for IB / Cambridge Schools"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">EP</span>
            </div>
            <span className="font-bold text-xl text-[#2C2C2C]">Educators Point</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-[#2C2C2C] hover:text-[#2563EB] transition-colors">About</a>
            <a href="#courses" className="text-[#2C2C2C] hover:text-[#2563EB] transition-colors">Courses</a>
            <a href="#experts" className="text-[#2C2C2C] hover:text-[#2563EB] transition-colors">Experts</a>
            <a href="#testimonials" className="text-[#2C2C2C] hover:text-[#2563EB] transition-colors">Success Stories</a>
            <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white" onClick={() => window.location.href = '/enroll'}>Enroll Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="fade-in">
              <div className="inline-block bg-[#EFF6FF] px-4 py-2 rounded-full mb-6">
                <span className="text-[#2563EB] font-semibold text-sm">🎓 Transform Into a Classroom-Ready Educator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#2C2C2C] mb-6 leading-tight">
                Master Teaching. <span className="text-[#2563EB]">Meet Global Standards.</span> Get Placed.
              </h1>
              <p className="text-lg text-[#7A7A7A] mb-8 leading-relaxed">
                Become a high-impact teacher equipped with NEP-aligned pedagogy, international curriculum expertise, and real classroom execution skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button className="bg-[#2563EB] hover:bg-[#1E40AF] text-white text-lg px-8 py-6 h-auto rounded-lg" onClick={() => window.location.href = '/enroll'}>
                  Start Your Journey <ChevronRight className="ml-2" />
                </Button>
                <Button variant="outline" className="border-[#60A5FA] text-[#2563EB] hover:bg-[#EFF6FF] text-lg px-8 py-6 h-auto rounded-lg">
                  Learn More
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-[#2563EB]">8</div>
                  <div className="text-sm text-[#7A7A7A]">Weeks Program</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#3B82F6]">100%</div>
                  <div className="text-sm text-[#7A7A7A]">Live Classes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#1E40AF]">500+</div>
                  <div className="text-sm text-[#7A7A7A]">Trained Teachers</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/hero-teacher-classroom-W8EM7bLhpsogWR6pLwNT5C.webp"
                  alt="Teacher in classroom"
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">About Educators Point</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
              We bridge the gap between academic training and real classroom readiness. Our mission is to empower teachers with practical skills and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border border-[#E0E7FF] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-[#2563EB]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Practical Training</h3>
              <p className="text-[#7A7A7A]">Real-world teaching scenarios and hands-on practice with experienced mentors who understand classroom dynamics.</p>
            </Card>

            <Card className="p-6 border border-[#E0E7FF] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                <Users className="text-[#2563EB]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Expert Mentorship</h3>
              <p className="text-[#7A7A7A]">Learn from experienced educators with 5-12+ years in the field. Personalized guidance for your career growth.</p>
            </Card>

            <Card className="p-6 border border-[#E0E7FF] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                <Award className="text-[#2563EB]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Placement Support</h3>
              <p className="text-[#7A7A7A]">100% placement assistance with school partnerships, interview prep, and career guidance for your success.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Will Master Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">🚀 What You Will Master</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
              Comprehensive training covering all aspects of modern teaching, from foundational concepts to advanced digital skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <Card key={index} className="p-6 border border-[#E0E7FF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex gap-4 mb-4">
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: module.lightColor }}
                    >
                      <IconComponent size={28} style={{ color: module.color }} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">{module.title}</h3>
                  <p className="text-[#7A7A7A] text-sm">{module.description}</p>
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
            <div>
              <h2 className="text-4xl font-bold text-[#2C2C2C] mb-8">🎯 Why This Program Stands Out</h2>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="text-[#2563EB] flex-shrink-0 mt-1" size={24} />
                    <p className="text-[#2C2C2C] font-semibold text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF] rounded-2xl p-8 border border-[#BFDBFE]">
              <h3 className="text-2xl font-bold text-[#2C2C2C] mb-6">🔶 Outcome You Can Expect</h3>
              <p className="text-[#7A7A7A] mb-6 font-semibold">Walk out as a:</p>
              <ul className="space-y-3">
                {outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#2563EB] font-bold">✓</span>
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">Meet Our Expert Mentors</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
              Learn from experienced educators who have transformed hundreds of teaching careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Expert 1 */}
            <Card className="p-6 text-center overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#E0E7FF]">
              <div className="mb-6">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-1-Rc3WLSMdgeLCQFdTPYSCiD.webp"
                  alt="Expert mentor"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#2563EB]"
                />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-1">Priya Sharma</h3>
              <p className="text-[#2563EB] font-semibold mb-3">Curriculum & Teaching Methods Specialist</p>
              <p className="text-[#7A7A7A] text-sm mb-4">10+ years in classroom teaching and curriculum design. Specializes in activity-based learning and student engagement.</p>
              <div className="flex justify-center gap-2">
                <span className="bg-[#EFF6FF] text-[#2563EB] text-xs px-3 py-1 rounded-full font-semibold">Lesson Planning</span>
                <span className="bg-[#EFF6FF] text-[#2563EB] text-xs px-3 py-1 rounded-full font-semibold">Engagement</span>
              </div>
            </Card>

            {/* Expert 2 */}
            <Card className="p-6 text-center overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#E0E7FF]">
              <div className="mb-6">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-2-ma5dXffbG7uGSTA4xwrWtz.webp"
                  alt="Expert mentor"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#1E40AF]"
                />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-1">Rajesh Kumar</h3>
              <p className="text-[#1E40AF] font-semibold mb-3">Classroom Management & Leadership Coach</p>
              <p className="text-[#7A7A7A] text-sm mb-4">12+ years managing diverse classrooms. Expert in behavior management, student discipline, and creating positive learning environments.</p>
              <div className="flex justify-center gap-2">
                <span className="bg-[#EFF6FF] text-[#1E40AF] text-xs px-3 py-1 rounded-full font-semibold">Management</span>
                <span className="bg-[#EFF6FF] text-[#1E40AF] text-xs px-3 py-1 rounded-full font-semibold">Leadership</span>
              </div>
            </Card>

            {/* Expert 3 */}
            <Card className="p-6 text-center overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#E0E7FF]">
              <div className="mb-6">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-3-USMSo4AK3BUhJR7idsZPPm.webp"
                  alt="Expert mentor"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#3B82F6]"
                />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-1">Anjali Desai</h3>
              <p className="text-[#3B82F6] font-semibold mb-3">Digital Tools & Communication Expert</p>
              <p className="text-[#7A7A7A] text-sm mb-4">5+ years in EdTech and digital teaching. Passionate about modern teaching tools, online learning, and professional communication.</p>
              <div className="flex justify-center gap-2">
                <span className="bg-[#EFF6FF] text-[#3B82F6] text-xs px-3 py-1 rounded-full font-semibold">Digital Tools</span>
                <span className="bg-[#EFF6FF] text-[#3B82F6] text-xs px-3 py-1 rounded-full font-semibold">Communication</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">🔥 Who This Is For</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
              Educators Point is designed for aspiring teachers from all backgrounds
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
              <Card key={index} className="p-6 text-center border border-[#E0E7FF] hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="text-[#2563EB]" size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#2C2C2C]">{audience}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2563EB] to-[#1E40AF]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">⚡ Your Next Step</h2>
          <p className="text-xl text-[#E0E7FF] mb-8 max-w-2xl mx-auto">
            👉 Don't just learn teaching. Become employable. Become exceptional.
          </p>
          <Button 
            className="bg-white hover:bg-[#F0F9FF] text-[#2563EB] text-lg px-12 py-6 h-auto rounded-lg font-bold"
            onClick={() => window.location.href = '/enroll'}
          >
            Enroll Now. Start Teaching with Confidence.
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
              <p className="text-[#D1D5DB]">Transforming teachers into confident, skilled educators ready for top schools.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-[#D1D5DB]">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#experts" className="hover:text-white transition-colors">Experts</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-[#D1D5DB]">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-[#D1D5DB] hover:text-white transition-colors">
                  <span className="text-2xl">f</span>
                </a>
                <a href="#" className="text-[#D1D5DB] hover:text-white transition-colors">
                  <span className="text-2xl">in</span>
                </a>
                <a href="#" className="text-[#D1D5DB] hover:text-white transition-colors">
                  <span className="text-2xl">yt</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#374151] pt-8 text-center text-[#D1D5DB]">
            <p>&copy; 2026 Educators Point. All rights reserved. Transforming teaching careers globally.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
