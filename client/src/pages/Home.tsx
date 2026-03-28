/**
 * Educators Point - Home Page
 * Design Philosophy: Modern Minimalist with Warm Accents
 * Colors: Terracotta (#D97757), Sage Green (#7BA89F), Gold (#D4A574)
 * Typography: Poppins (headings) + Inter (body)
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Users, Clock, Award, BookOpen, Zap, MessageCircle, Briefcase } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#D97757] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">EP</span>
            </div>
            <span className="font-bold text-xl text-[#2C2C2C]">Educators Point</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-[#2C2C2C] hover:text-[#D97757] transition-colors">About</a>
            <a href="#courses" className="text-[#2C2C2C] hover:text-[#D97757] transition-colors">Courses</a>
            <a href="#experts" className="text-[#2C2C2C] hover:text-[#D97757] transition-colors">Experts</a>
            <a href="#testimonials" className="text-[#2C2C2C] hover:text-[#D97757] transition-colors">Success Stories</a>
            <Button className="bg-[#D97757] hover:bg-[#C85F47] text-white" onClick={() => window.location.href = '/enroll'}>Enroll Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="fade-in">
              <div className="inline-block bg-[#F5F5F5] px-4 py-2 rounded-full mb-6">
                <span className="text-[#D97757] font-semibold text-sm">🎓 Teacher Career Accelerator</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#2C2C2C] mb-6 leading-tight">
                Transform Your Teaching <span className="text-[#D97757]">Career</span>
              </h1>
              <p className="text-lg text-[#7A7A7A] mb-8 leading-relaxed">
                Master practical teaching skills in just 8 weeks. From classroom management to digital tools, we prepare you to excel as a confident, skilled educator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button className="bg-[#D97757] hover:bg-[#C85F47] text-white text-lg px-8 py-6 h-auto rounded-lg" onClick={() => window.location.href = '/enroll'}>
                  Start Your Journey <ChevronRight className="ml-2" />
                </Button>
                <Button variant="outline" className="border-[#7BA89F] text-[#7BA89F] hover:bg-[#7BA89F] hover:text-white text-lg px-8 py-6 h-auto rounded-lg">
                  Learn More
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-[#D97757]">8</div>
                  <div className="text-sm text-[#7A7A7A]">Weeks Program</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#7BA89F]">100%</div>
                  <div className="text-sm text-[#7A7A7A]">Live Classes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4A574]">500+</div>
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
      <section id="about" className="py-20 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">About Educators Point</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
              We bridge the gap between academic training and real classroom readiness. Our mission is to empower teachers with practical skills and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-warm">
              <div className="w-12 h-12 bg-[#D97757] rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Practical Training</h3>
              <p className="text-[#7A7A7A]">Real-world teaching scenarios and hands-on practice with experienced mentors who understand classroom dynamics.</p>
            </Card>

            <Card className="card-warm">
              <div className="w-12 h-12 bg-[#7BA89F] rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Expert Mentorship</h3>
              <p className="text-[#7A7A7A]">Learn from experienced educators with 5-12+ years in the field. Personalized guidance for your career growth.</p>
            </Card>

            <Card className="card-warm">
              <div className="w-12 h-12 bg-[#D4A574] rounded-lg flex items-center justify-center mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">Placement Support</h3>
              <p className="text-[#7A7A7A]">100% placement assistance with school partnerships, interview prep, and career guidance for your success.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">8-Week Curriculum</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
              Comprehensive training covering all aspects of modern teaching, from foundational concepts to advanced digital skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Course Module 1 */}
            <Card className="card-warm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D97757] to-[#C85F47] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">1-2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Foundations & Child Psychology</h3>
                  <p className="text-[#7A7A7A] mb-3">Master teaching fundamentals, understand child development stages, and identify diverse learning styles.</p>
                  <ul className="text-sm text-[#7A7A7A] space-y-1">
                    <li>✓ Teacher roles and responsibilities</li>
                    <li>✓ Developmental psychology</li>
                    <li>✓ Learning style identification</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Course Module 2 */}
            <Card className="card-warm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7BA89F] to-[#6B9890] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">3-4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Lesson Planning & Classroom Management</h3>
                  <p className="text-[#7A7A7A] mb-3">Design structured lessons using Bloom's taxonomy and master effective classroom behavior management techniques.</p>
                  <ul className="text-sm text-[#7A7A7A] space-y-1">
                    <li>✓ Curriculum-aligned lesson plans</li>
                    <li>✓ Bloom's taxonomy application</li>
                    <li>✓ Behavior management strategies</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Course Module 3 */}
            <Card className="card-warm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4A574] to-[#C4956A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">5-6</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Teaching Methods & Digital Skills</h3>
                  <p className="text-[#7A7A7A] mb-3">Learn activity-based teaching, micro-teaching practice, and master modern digital teaching tools and platforms.</p>
                  <ul className="text-sm text-[#7A7A7A] space-y-1">
                    <li>✓ Activity-based learning techniques</li>
                    <li>✓ Google Slides & interactive tools</li>
                    <li>✓ Hybrid classroom management</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Course Module 4 */}
            <Card className="card-warm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D97757] to-[#C85F47] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">7-8</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Communication & Placement Ready</h3>
                  <p className="text-[#7A7A7A] mb-3">Enhance communication skills, prepare for interviews, and deliver professional demo classes for placement success.</p>
                  <ul className="text-sm text-[#7A7A7A] space-y-1">
                    <li>✓ Professional communication training</li>
                    <li>✓ Mock interviews & resume building</li>
                    <li>✓ Demo class preparation</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Course Modules Visual */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/course-modules-visual-djkPvVhcJLvHbYEPxkUfyK.webp"
              alt="Course modules visualization"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section id="experts" className="py-20 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">Meet Our Expert Mentors</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
              Learn from experienced educators who have transformed hundreds of teaching careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Expert 1 */}
            <Card className="card-warm text-center overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-1-Rc3WLSMdgeLCQFdTPYSCiD.webp"
                  alt="Expert mentor"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#D97757]"
                />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-1">Priya Sharma</h3>
              <p className="text-[#D97757] font-semibold mb-3">Curriculum & Teaching Methods Specialist</p>
              <p className="text-[#7A7A7A] text-sm mb-4">10+ years in classroom teaching and curriculum design. Specializes in activity-based learning and student engagement.</p>
              <div className="flex justify-center gap-2">
                <span className="bg-[#F5F5F5] text-[#2C2C2C] text-xs px-3 py-1 rounded-full">Lesson Planning</span>
                <span className="bg-[#F5F5F5] text-[#2C2C2C] text-xs px-3 py-1 rounded-full">Engagement</span>
              </div>
            </Card>

            {/* Expert 2 */}
            <Card className="card-warm text-center overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-2-ma5dXffbG7uGSTA4xwrWtz.webp"
                  alt="Expert mentor"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#7BA89F]"
                />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-1">Rajesh Kumar</h3>
              <p className="text-[#7BA89F] font-semibold mb-3">Classroom Management & Leadership Coach</p>
              <p className="text-[#7A7A7A] text-sm mb-4">12+ years managing diverse classrooms. Expert in behavior management, student discipline, and creating positive learning environments.</p>
              <div className="flex justify-center gap-2">
                <span className="bg-[#F5F5F5] text-[#2C2C2C] text-xs px-3 py-1 rounded-full">Management</span>
                <span className="bg-[#F5F5F5] text-[#2C2C2C] text-xs px-3 py-1 rounded-full">Leadership</span>
              </div>
            </Card>

            {/* Expert 3 */}
            <Card className="card-warm text-center overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663485929038/o7TmuGWsZAQSnDyrQtK4Dx/expert-mentor-3-USMSo4AK3BUhJR7idsZPPm.webp"
                  alt="Expert mentor"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#D4A574]"
                />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-1">Anjali Desai</h3>
              <p className="text-[#D4A574] font-semibold mb-3">Digital Tools & Communication Expert</p>
              <p className="text-[#7A7A7A] text-sm mb-4">5+ years in EdTech and digital teaching. Passionate about modern teaching tools, online learning, and professional communication.</p>
              <div className="flex justify-center gap-2">
                <span className="bg-[#F5F5F5] text-[#2C2C2C] text-xs px-3 py-1 rounded-full">Digital Tools</span>
                <span className="bg-[#F5F5F5] text-[#2C2C2C] text-xs px-3 py-1 rounded-full">Communication</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">Why Choose Educators Point?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-warm text-center">
              <div className="w-12 h-12 bg-[#D97757] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-[#2C2C2C] mb-2">Intensive 8 Weeks</h3>
              <p className="text-sm text-[#7A7A7A]">Structured program with daily live sessions and practical workshops</p>
            </Card>

            <Card className="card-warm text-center">
              <div className="w-12 h-12 bg-[#7BA89F] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-[#2C2C2C] mb-2">Expert Mentors</h3>
              <p className="text-sm text-[#7A7A7A]">Learn from 5-12+ years experienced educators</p>
            </Card>

            <Card className="card-warm text-center">
              <div className="w-12 h-12 bg-[#D4A574] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-[#2C2C2C] mb-2">100% Placement</h3>
              <p className="text-sm text-[#7A7A7A]">Placement assistance and school partnerships</p>
            </Card>

            <Card className="card-warm text-center">
              <div className="w-12 h-12 bg-[#D97757] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-[#2C2C2C] mb-2">Practical Skills</h3>
              <p className="text-sm text-[#7A7A7A]">Hands-on training with real classroom simulations</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">Success Stories</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
              Hear from teachers who transformed their careers with Educators Point
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="card-warm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#D97757] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">SK</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#2C2C2C]">Sneha Kumar</h4>
                  <p className="text-sm text-[#7A7A7A]">B.Ed Graduate</p>
                </div>
              </div>
              <p className="text-[#7A7A7A] mb-4 italic">"Educators Point gave me the confidence I needed. The practical training and expert mentorship helped me secure a position at a top CBSE school within weeks of completing the program."</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#D4A574]">★</span>
                ))}
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="card-warm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#7BA89F] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AJ</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#2C2C2C]">Arjun Joshi</h4>
                  <p className="text-sm text-[#7A7A7A]">Career Switcher</p>
                </div>
              </div>
              <p className="text-[#7A7A7A] mb-4 italic">"Coming from a non-teaching background, I was nervous. But the structured curriculum and supportive mentors made the transition smooth. Now I'm teaching at an international school!"</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#D4A574]">★</span>
                ))}
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="card-warm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#D4A574] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">MV</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#2C2C2C]">Meera Verma</h4>
                  <p className="text-sm text-[#7A7A7A]">Arts Graduate</p>
                </div>
              </div>
              <p className="text-[#7A7A7A] mb-4 italic">"The digital teaching skills module was eye-opening. I learned how to engage students in the modern classroom. My first class went amazingly well!"</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#D4A574]">★</span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">Who Should Join?</h2>
            <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
              Educators Point is designed for aspiring teachers from all backgrounds
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-warm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#D97757] rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">B.Ed Students & Graduates</h3>
                  <p className="text-[#7A7A7A]">Final year students wanting stronger classroom skills or graduates struggling to secure school jobs.</p>
                </div>
              </div>
            </Card>

            <Card className="card-warm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#7BA89F] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Career Switchers</h3>
                  <p className="text-[#7A7A7A]">Professionals from other sectors looking to transition into the rewarding teaching profession.</p>
                </div>
              </div>
            </Card>

            <Card className="card-warm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#D4A574] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Non-B.Ed Graduates</h3>
                  <p className="text-[#7A7A7A]">Arts and Science graduates passionate about becoming school teachers without formal B.Ed qualification.</p>
                </div>
              </div>
            </Card>

            <Card className="card-warm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#D97757] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Anyone Passionate About Teaching</h3>
                  <p className="text-[#7A7A7A]">If you're interested in building a stable, growing career in education, this program is for you.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#D97757] to-[#C85F47]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Teaching Career?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 500+ teachers who have already started their journey with Educators Point. Limited seats available for the next batch.
          </p>
          <Button className="bg-white text-[#D97757] hover:bg-[#F5F5F5] text-lg px-8 py-6 h-auto rounded-lg font-bold" onClick={() => window.location.href = '/enroll'}>
            Enroll Now - Secure Your Seat
          </Button>
          <p className="text-white/80 mt-4 text-sm">Early bird discount available for the first 20 enrollments</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#D97757] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">EP</span>
                </div>
                <span className="font-bold text-lg">Educators Point</span>
              </div>
              <p className="text-white/70 text-sm">Transforming teacher careers through practical training and expert mentorship.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#about" className="hover:text-[#D97757] transition-colors">About Us</a></li>
                <li><a href="#courses" className="hover:text-[#D97757] transition-colors">Courses</a></li>
                <li><a href="#experts" className="hover:text-[#D97757] transition-colors">Experts</a></li>
                <li><a href="#testimonials" className="hover:text-[#D97757] transition-colors">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-[#D97757] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#D97757] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#D97757] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#D97757] transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[#D97757] rounded-lg flex items-center justify-center hover:bg-[#C85F47] transition-colors">
                  <span className="text-white font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-[#7BA89F] rounded-lg flex items-center justify-center hover:bg-[#6B9890] transition-colors">
                  <span className="text-white font-bold">in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-[#D4A574] rounded-lg flex items-center justify-center hover:bg-[#C4956A] transition-colors">
                  <span className="text-white font-bold">yt</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/70 text-sm">
            <p>&copy; 2026 Educators Point. All rights reserved. Transforming teacher careers, one batch at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
