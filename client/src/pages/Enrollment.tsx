/**
 * Enrollment Page
 * Design Philosophy: Modern Minimalist with Warm Accents
 * Dedicated page for enrollment form with additional context
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, CheckCircle, Clock, Users, Award } from "lucide-react";
import { useLocation } from "wouter";
import EnrollmentForm from "@/components/EnrollmentForm";

export default function Enrollment() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#D97757] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">EP</span>
            </div>
            <span className="font-bold text-xl text-[#2C2C2C]">Educators Point</span>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-[#2C2C2C] hover:text-[#D97757]"
          >
            <ChevronLeft className="mr-2" size={20} />
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[#7A7A7A]">
            <a href="/" className="text-[#D97757] hover:underline">
              Home
            </a>
            <span>/</span>
            <span>Enrollment</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Benefits */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-[#2C2C2C] mb-8">
                Why Enroll Today?
              </h2>

              <div className="space-y-6">
                {/* Benefit 1 */}
                <Card className="card-warm">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#D97757] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C2C2C] mb-1">
                        8-Week Program
                      </h3>
                      <p className="text-sm text-[#7A7A7A]">
                        Intensive, structured training with daily live sessions
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Benefit 2 */}
                <Card className="card-warm">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#7BA89F] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C2C2C] mb-1">
                        Expert Mentors
                      </h3>
                      <p className="text-sm text-[#7A7A7A]">
                        Learn from 5-12+ years experienced educators
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Benefit 3 */}
                <Card className="card-warm">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#D4A574] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C2C2C] mb-1">
                        100% Placement
                      </h3>
                      <p className="text-sm text-[#7A7A7A]">
                        Placement assistance with school partnerships
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Benefit 4 */}
                <Card className="card-warm">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#D97757] rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C2C2C] mb-1">
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
              <div className="mt-8 p-6 bg-[#FAFAFA] rounded-lg border border-[#E8E8E8]">
                <h3 className="font-semibold text-[#2C2C2C] mb-4">
                  Program Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Trained Teachers</span>
                    <span className="font-bold text-[#D97757]">500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Success Rate</span>
                    <span className="font-bold text-[#7BA89F]">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7A7A]">Avg. Salary Increase</span>
                    <span className="font-bold text-[#D4A574]">35%</span>
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
        <div className="mt-20 pt-16 border-t border-[#E8E8E8]">
          <h2 className="text-3xl font-bold text-[#2C2C2C] mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FAQ 1 */}
            <Card className="card-warm">
              <h3 className="font-bold text-[#2C2C2C] mb-2">
                Who can enroll in this program?
              </h3>
              <p className="text-[#7A7A7A] text-sm">
                The program is open to B.Ed students, B.Ed graduates, non-B.Ed
                graduates, and career switchers. Anyone passionate about teaching can
                apply.
              </p>
            </Card>

            {/* FAQ 2 */}
            <Card className="card-warm">
              <h3 className="font-bold text-[#2C2C2C] mb-2">
                What is the program duration?
              </h3>
              <p className="text-[#7A7A7A] text-sm">
                The program is 8 weeks long with daily live sessions (2-3 hours),
                practical workshops, and independent practice. It's designed to be
                intensive yet manageable.
              </p>
            </Card>

            {/* FAQ 3 */}
            <Card className="card-warm">
              <h3 className="font-bold text-[#2C2C2C] mb-2">
                Is there placement assistance?
              </h3>
              <p className="text-[#7A7A7A] text-sm">
                Yes! We provide 100% placement assistance including resume support,
                interview preparation, and connections with school partners.
              </p>
            </Card>

            {/* FAQ 4 */}
            <Card className="card-warm">
              <h3 className="font-bold text-[#2C2C2C] mb-2">
                What is the course fee?
              </h3>
              <p className="text-[#7A7A7A] text-sm">
                Course fees vary by batch. Early bird discounts are available for the
                first 20 enrollments. Contact us for detailed pricing information.
              </p>
            </Card>

            {/* FAQ 5 */}
            <Card className="card-warm">
              <h3 className="font-bold text-[#2C2C2C] mb-2">
                What will I learn?
              </h3>
              <p className="text-[#7A7A7A] text-sm">
                You'll learn lesson planning, classroom management, teaching
                methodologies, digital tools, communication skills, and receive
                placement preparation guidance.
              </p>
            </Card>

            {/* FAQ 6 */}
            <Card className="card-warm">
              <h3 className="font-bold text-[#2C2C2C] mb-2">
                Do I get a certificate?
              </h3>
              <p className="text-[#7A7A7A] text-sm">
                Yes! Successful participants receive a Professional Teacher Training
                Certificate along with a teaching portfolio and demo class recording.
              </p>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 p-8 bg-gradient-to-r from-[#D97757] to-[#C85F47] rounded-2xl text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Have More Questions?</h2>
          <p className="mb-6 text-white/90">
            Our enrollment team is here to help. Reach out to us for any queries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@educatorspoint.com"
              className="px-6 py-3 bg-white text-[#D97757] font-semibold rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:+919876543210"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#D97757] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">EP</span>
                </div>
                <span className="font-bold text-lg">Educators Point</span>
              </div>
              <p className="text-white/70 text-sm">
                Transforming teacher careers through practical training and expert
                mentorship.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="/" className="hover:text-[#D97757] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#D97757] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#D97757] transition-colors">
                    Courses
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="#" className="hover:text-[#D97757] transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D97757] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D97757] transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#D97757] rounded-lg flex items-center justify-center hover:bg-[#C85F47] transition-colors"
                >
                  f
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#7BA89F] rounded-lg flex items-center justify-center hover:bg-[#6B9890] transition-colors"
                >
                  in
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#D4A574] rounded-lg flex items-center justify-center hover:bg-[#C4956A] transition-colors"
                >
                  yt
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/70 text-sm">
            <p>
              &copy; 2026 Educators Point. All rights reserved. Transforming teacher
              careers, one batch at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
