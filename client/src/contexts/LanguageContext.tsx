import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'ta' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation strings
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.courses': 'Courses',
    'nav.experts': 'Experts',
    'nav.success': 'Success Stories',
    'nav.enroll': 'Apply Now',
    'nav.back': 'Back to Home',

    // Hero Section
    'hero.badge': 'Transform Into a Classroom-Ready Educator',
    'hero.title1': 'Master Teaching.',
    'hero.title2': 'Meet Global Standards.',
    'hero.title3': 'Get Placed.',
    'hero.subtitle': 'Become a high-impact teacher equipped with NEP-aligned pedagogy, international curriculum expertise, and real classroom execution skills.',
    'hero.cta1': 'Start Your Journey',
    'hero.cta2': 'Learn More',
    'hero.stat1': 'Weeks Program',
    'hero.stat2': 'Live Classes',
    'hero.stat3': 'Trained Teachers',

    // About Section
    'about.title': 'About Educators Point',
    'about.subtitle': 'We bridge the gap between academic training and real classroom readiness. Our mission is to empower teachers with practical skills and confidence.',
    'about.card1.title': 'Practical Training',
    'about.card1.desc': 'Real-world teaching scenarios and hands-on practice with experienced mentors who understand classroom dynamics.',
    'about.card2.title': 'Expert Mentorship',
    'about.card2.desc': 'Learn from experienced educators with 5-12+ years in the field. Personalized guidance for your career growth.',
    'about.card3.title': 'Placement Support',
    'about.card3.desc': '100% placement assistance with school partnerships, interview prep, and career guidance for your success.',

    // Courses Section
    'courses.title': '🚀 What You Will Master',
    'courses.subtitle': 'Comprehensive training covering all aspects of modern teaching, from foundational concepts to advanced digital skills.',

    // Modules
    'module.1.title': 'Become a Professional Educator',
    'module.1.desc': 'Develop a strong teacher identity, ethical grounding, and classroom presence expected in top schools.',
    'module.2.title': 'Understand Every Learner',
    'module.2.desc': 'Apply child psychology, differentiated instruction, and inclusive practices to handle diverse classrooms with confidence.',
    'module.3.title': 'Teach Across Curricula',
    'module.3.desc': 'Gain expertise in CBSE, Cambridge, and IB frameworks with outcome-driven lesson delivery.',
    'module.4.title': 'Design Powerful Lessons',
    'module.4.desc': 'Create structured, engaging lesson plans using backward design, Bloom\'s taxonomy, and real assessment integration.',
    'module.5.title': 'Deliver Impactful Teaching',
    'module.5.desc': 'Implement activity-based, inquiry-driven, and project-based learning that drives student engagement.',
    'module.6.title': 'Master Classroom Control',
    'module.6.desc': 'Handle behaviour, build routines, and maintain high-engagement classrooms without stress.',
    'module.7.title': 'Ensure Student Safety & Compliance',
    'module.7.desc': 'Learn POCSO guidelines, safeguarding protocols, and professional boundaries every school expects.',
    'module.8.title': 'Leverage Digital Teaching',
    'module.8.desc': 'Use LMS platforms, smart tools, and digital resources to teach both offline and online effectively.',
    'module.9.title': 'Assess Like a Pro',
    'module.9.desc': 'Design formative & summative assessments, track progress, and deliver meaningful feedback.',
    'module.10.title': 'Get Interview & Demo Ready',
    'module.10.desc': 'Crack interviews with mock sessions, demo teaching, and portfolio building.',
    'module.11.title': 'Research & Innovation in Education',
    'module.11.desc': 'Explore action research, evidence-based practices, and innovative teaching methodologies to stay ahead in education.',
    'module.12.title': 'Parent Communication & Engagement',
    'module.12.desc': 'Master effective communication with parents, conduct productive meetings, and build strong school-family partnerships.',
    'module.13.title': 'Special Education & Inclusive Teaching',
    'module.13.desc': 'Learn to support students with diverse learning needs, adapt curriculum, and create inclusive classroom environments.',
    'module.14.title': 'Global Perspectives & Cultural Competence',
    'module.14.desc': 'Develop cultural awareness, teach global citizenship, and integrate international perspectives in your curriculum.',
    'module.15.title': 'Career Advancement & Leadership',
    'module.15.desc': 'Build your professional portfolio, explore leadership opportunities, and plan your long-term teaching career growth.',

    // Why Choose Us
    'why.title': '🎯 Why This Program Stands Out',
    'why.1': 'NEP 2020 Aligned + International Pedagogy',
    'why.2': 'Real Classroom Simulation (Not Just Theory)',
    'why.3': 'Legal & Compliance Training (POCSO Included)',
    'why.4': 'End-to-End Teacher Readiness',
    'why.5': 'Placement-Focused Training Approach',
    'why.outcome': '🔶 Outcome You Can Expect',
    'why.outcome.intro': 'Walk out as a:',
    'why.outcome.1': 'Confident classroom practitioner',
    'why.outcome.2': 'Skilled in modern teaching methodologies',
    'why.outcome.3': 'Ready for top school interviews',
    'why.outcome.4': 'Capable of handling real classroom challenges from Day 1',

    // Experts Section
    'experts.title': 'Meet Our Expert Mentors',
    'experts.subtitle': 'Learn from experienced educators who have transformed hundreds of teaching careers.',
    'expert.1.name': 'Priya Sharma',
    'expert.1.title': 'Curriculum & Teaching Methods Specialist',
    'expert.1.desc': '10+ years in classroom teaching and curriculum design. Specializes in activity-based learning and student engagement.',
    'expert.1.tag1': 'Lesson Planning',
    'expert.1.tag2': 'Engagement',
    'expert.2.name': 'Rajesh Kumar',
    'expert.2.title': 'Classroom Management & Leadership Coach',
    'expert.2.desc': '12+ years managing diverse classrooms. Expert in behavior management, student discipline, and creating positive learning environments.',
    'expert.2.tag1': 'Management',
    'expert.2.tag2': 'Leadership',
    'expert.3.name': 'Anjali Desai',
    'expert.3.title': 'Digital Tools & Communication Expert',
    'expert.3.desc': '5+ years in EdTech and digital teaching. Passionate about modern teaching tools, online learning, and professional communication.',
    'expert.3.tag1': 'Digital Tools',
    'expert.3.tag2': 'Communication',

    // Target Audience
    'audience.title': '🔥 Who This Is For',
    'audience.subtitle': 'Educators Point is designed for aspiring teachers from all backgrounds',
    'audience.1': 'Aspiring Teachers',
    'audience.2': 'Fresh Graduates',
    'audience.3': 'Career Switchers',
    'audience.4': 'Teachers aiming for IB / Cambridge Schools',

    // CTA Section
    'cta.title': '⚡ Your Next Step',
    'cta.subtitle': '👉 Don\'t just learn teaching. Become employable. Become exceptional.',
    'cta.button': 'Enroll Now. Start Teaching with Confidence.',

    // Footer
    'footer.tagline': 'Transforming teachers into confident, skilled educators ready for top schools.',
    'footer.links': 'Quick Links',
    'footer.support': 'Support',
    'footer.social': 'Connect With Us',
    'footer.copyright': '© 2026 Educators Point. All rights reserved. Transforming teaching careers globally.',

    // Enrollment Page
    'enroll.title': 'Enroll in Educators Point',
    'enroll.subtitle': 'Join our next batch and transform your teaching career. Fill out the form below to secure your seat.',
    'enroll.form.name': 'Full Name',
    'enroll.form.email': 'Email Address',
    'enroll.form.batch': 'Select Your Batch',
    'enroll.form.terms': 'I agree to the Terms & Conditions and Privacy Policy',
    'enroll.form.submit': 'Secure Your Seat Now',
    'enroll.form.privacy': 'We respect your privacy. Your information will only be used for registration purposes.',
    'enroll.faq.title': 'Frequently Asked Questions',
    'enroll.faq.q1': 'Who can enroll in this program?',
    'enroll.faq.a1': 'The program is open to B.Ed students, B.Ed graduates, non-B.Ed graduates, and career switchers. Anyone passionate about teaching can apply.',
    'enroll.faq.q2': 'What is the program duration?',
    'enroll.faq.a2': 'The program is 8 weeks long with daily live sessions (2-3 hours), practical workshops, and independent practice. It\'s designed to be intensive yet manageable.',
    'enroll.faq.q3': 'Is there placement assistance?',
    'enroll.faq.a3': 'Yes! We provide 100% placement assistance including resume support, interview preparation, and connections with school partners.',
    'enroll.faq.q4': 'What is the course fee?',
    'enroll.faq.a4': 'Course fees vary by batch. Early bird discounts are available for the first 20 registrations. Contact us for detailed pricing information.',
    'enroll.faq.q5': 'What will I learn?',
    'enroll.faq.a5': 'You\'ll learn lesson planning, classroom management, teaching methodologies, digital tools, communication skills, and receive placement preparation guidance.',
    'enroll.faq.q6': 'Do I get a certificate?',
    'enroll.faq.a6': 'Yes! Successful participants receive a Professional Teacher Training Certificate along with a teaching portfolio and demo class recording.',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.about': 'எங்களை பற்றி',
    'nav.courses': 'பயிற்சிகள்',
    'nav.experts': 'வழிகாட்டிகள்',
    'nav.success': 'வெற்றிக்கதைகள்',
    'nav.enroll': 'இப்போதே சேர்க',
    'nav.back': 'முகப்புக்குத் திரும்பு',

    // Hero Section
    'hero.badge': 'பள்ளிகள் தேடும் சிறந்த ஆசிரியராக மாறுங்கள்',
    'hero.title1': 'கற்பிப்பதில் சிறந்து விளங்குங்கள்.',
    'hero.title2': 'சர்வதேச தரங்களை எட்டிப்பிடியுங்கள்.',
    'hero.title3': 'வேலை வாய்ப்பை வெல்லுங்கள்.',
    'hero.subtitle': 'NEP வழிகாட்டுதல்கள், சர்வதேச கல்வி முறை, மற்றும் வகுப்பறை மேலாண்மை ஆகியவற்றை கற்றுக்கொண்டு, அதிக தாக்கத்தை ஏற்படுத்தும் மாபெரும் ஆசிரியராக மாறுங்கள்.',
    'hero.cta1': 'உங்கள் பயணத்தைத் தொடங்குங்கள்',
    'hero.cta2': 'மேலும் அறிக',
    'hero.stat1': 'வார பயிற்சி',
    'hero.stat2': 'நேரடி வகுப்புகள்',
    'hero.stat3': 'பயிற்சி பெற்ற ஆசிரியர்கள்',

    // About Section
    'about.title': 'Educators Point பற்றி',
    'about.subtitle': 'ஆசிரியர் பயிற்சிக்கும் நிஜமான வகுப்பறைக்கும் உள்ள இடைவெளியைக் குறைக்கிறோம். ஆசிரியர்களுக்கு நடைமுறைத் திறன்களையும், தன்னம்பிக்கையையும் வழங்குவதே எங்கள் முக்கிய நோக்கமாகும்.',
    'about.card1.title': 'நடைமுறைப் பயிற்சி',
    'about.card1.desc': 'வகுப்பறையின் சூழ்நிலையைப் புரிந்துகொண்டு, பல ஆண்டு அனுபவம் வாய்ந்த வழிகாட்டிகளுடன் நிஜ உலக கற்பித்தல் முறைகளைக் கற்கலாம்.',
    'about.card2.title': 'நிபுணர்களின் வழிகாட்டுதல்',
    'about.card2.desc': '5-12 வருடங்களுக்கு மேல் அனுபவம் உள்ள முன்னணி ஆசிரியர்களிடம் இருந்து கற்றுக்கொள்ளுங்கள். உங்கள் தொழில் வளர்ச்சிக்கான தனிப்பட்ட வழிகாட்டுதல் கிடைக்கும்.',
    'about.card3.title': 'வேலைவாய்ப்பு ஆதரவு',
    'about.card3.desc': 'பள்ளிகளுடன் நேரடித் தொடர்பு, நேர்காணல் பயிற்சி மற்றும் உங்கள் வெற்றிக்கான 100% வேலைவாய்ப்பு ஆதரவு.',

    // Courses Section
    'courses.title': '🚀 நீங்கள் சிறந்து விளங்கப்போகும் திறன்கள்',
    'courses.subtitle': 'அடிப்படைப் பாடங்கள் முதல் மேம்பட்ட டிஜிட்டல் தொழில்நுட்பம் வரை, நவீன கற்பித்தலின் அனைத்து அம்சங்களையும் உள்ளடக்கிய விரிவான பயிற்சி.',

    // Modules
    'module.1.title': 'ஒரு திறமையான ஆசிரியராக மாறுங்கள்',
    'module.1.desc': 'வலிமையான ஆசிரியர் அடையாளத்தையும், நற்பண்புகளையும், முன்னணி பள்ளிகள் எதிர்பார்க்கும் வகுப்பறைத் திறனையும் வளர்த்துக் கொள்ளுங்கள்.',
    'module.2.title': 'ஒவ்வொரு மாணவரையும் புரிந்துகொள்ளுதல்',
    'module.2.desc': 'குழந்தை உளவியல், மாறுபட்ட கற்பித்தல் மற்றும் அனைத்து மாணவர்களையும் உள்ளடக்கிய முறைகளைப் பயன்படுத்தி பல்வேறு மாணவர்களைத் தன்னம்பிக்கையுடன் கையாளுங்கள்.',
    'module.3.title': 'அனைத்து பாடத்திட்டங்களிலும் கற்பித்தல்',
    'module.3.desc': 'CBSE, கேம்பிரிட்ஜ் மற்றும் IB பாடத்திட்டங்களில் முழுமையான நிபுணத்துவம் பெற்று, சிறந்த முறையில் பாடம் நடத்துங்கள்.',
    'module.4.title': 'சிறந்த பாடத்திட்டத்தை வடிவமைத்தல்',
    'module.4.desc': 'பின்னோக்கு வடிவமைப்பு (Backward design), ப்ளூமின் வகைப்பாடு (Bloom\'s taxonomy) மற்றும் மதிப்பீடுகளைப் பயன்படுத்தி நேர்த்தியான பாடத்திட்டங்களை உருவாக்குங்கள்.',
    'module.5.title': 'தாக்கத்தை ஏற்படுத்தும் கற்பித்தல்',
    'module.5.desc': 'செயல்பாட்டு அடிப்படை, ஆராய்ச்சி அடிப்படை மற்றும் செய்முறை அடிப்படையிலான கற்பித்தலை நடைமுறைப்படுத்துங்கள்.',
    'module.6.title': 'வகுப்பறை கட்டுப்பாட்டு மேலாண்மை',
    'module.6.desc': 'மாணவர்களிடம் நல்லொழுக்கத்தை உருவாக்குங்கள், மன அழுத்தமின்றி வகுப்பறையைச் சிறப்பாகக் கையாளுங்கள்.',
    'module.7.title': 'மாணவர் பாதுகாப்பு & சட்ட விதிமுறைகள்',
    'module.7.desc': 'POCSO வழிகாட்டுதல்கள், பாதுகாப்பு நெறிமுறைகள் மற்றும் ஒவ்வொரு பள்ளியும் எதிர்பார்க்கும் தொழில்முறை எல்லைகளைக் கற்றுக்கொள்ளுங்கள்.',
    'module.8.title': 'டிஜிட்டல் கற்பித்தல் பயன்பாடு',
    'module.8.desc': 'LMS தளங்கள், ஸ்மார்ட் கருவிகள் மற்றும் டிஜிட்டல் வளங்களைப் பயன்படுத்தி ஆன்லைனிலும் ஆஃப்லைனிலும் திறம்பட கற்பிக்கவும்.',
    'module.9.title': 'துல்லியமாக மதிப்பீடு செய்யுங்கள்',
    'module.9.desc': 'வடிவமைப்பு மற்றும் தொகுப்பு மதிப்பீடுகளை உருவாக்குதல், மாணவர்களின் முன்னேற்றத்தைக் கண்காணித்தல் மற்றும் சரியான பின்னூட்டம் வழங்குதல்.',
    'module.10.title': 'நேர்காணல் மற்றும் டெமோ வகுப்புகளுக்கு தயார்',
    'module.10.desc': 'மாதிரி நேர்காணல்கள், டெமோ வகுப்புகள் மற்றும் வலுவான போர்ட்ஃபோலியோ மூலம் வேலைவாய்ப்பை உறுதிசெய்யுங்கள்.',
    'module.11.title': 'கல்வியில் ஆராய்ச்சி மற்றும் புதுமை',
    'module.11.desc': 'ஆய்வுப் படிப்புகள் மற்றும் புதுமையான பயிற்றுவிப்பு முறைகள் மூலம் கல்வியில் தொடர்ந்து முன்னிலையில் இருங்கள்.',
    'module.12.title': 'பெற்றோர்களுடன் தொடர்பு மற்றும் ஈடுபாடு',
    'module.12.desc': 'பெற்றோர்களுடன் திறம்பட தொடர்பு கொள்ளுங்கள், ஆக்கப்பூர்வமான சந்திப்புகளை நடத்துங்கள். பள்ளி மற்றும் குடும்பங்களுக்கு இடையே வலுவான உறவை மேம்படுத்துங்கள்.',
    'module.13.title': 'சிறப்புப் பயிற்சி & ஒருங்கிணைந்த கற்பித்தல்',
    'module.13.desc': 'கற்றல் குறைபாடுடைய மாணவர்களை ஆதரிக்கவும், பாடத்திட்டத்தை மாற்றியமைக்கவும் மற்றும் அனைவரையும் உள்ளடக்கிய வகுப்பறையை உருவாக்கவும் கற்றுக்கொள்ளுங்கள்.',
    'module.14.title': 'கலாச்சாரத் திறன் & உலகளாவிய பார்வை',
    'module.14.desc': 'கலாச்சார விழிப்புணர்வை வளர்த்துக் கொள்ளுங்கள், மாணவர்களிடம் உலகளாவிய சிந்தனையை உருவாக்குங்கள்.',
    'module.15.title': 'தொழில் முன்னேற்றம் மற்றும் தலைமைத்துவம்',
    'module.15.desc': 'உங்கள் தொழில்முறை போர்ட்ஃபோலியோவை உருவாக்குங்கள், தலைமைத்துவ வாய்ப்புகளை ஆராய்ந்து உங்கள் ஆசிரியர் வாழ்க்கையை மேம்படுத்துங்கள்.',

    // Why Choose Us
    'why.title': '🎯 இந்தப் பயிற்சி ஏன் தனித்துவமானது?',
    'why.1': 'NEP 2020 சீரமைப்பு + சர்வதேச கற்பித்தல் முறை',
    'why.2': 'நிஜமான வகுப்பறைப் பயிற்சி (வெறும் தியரி மட்டுமல்ல)',
    'why.3': 'சட்ட மற்றும் பாதுகாப்பு கட்டுப்பாட்டுப் பயிற்சி (POCSO உள்ளடக்கம்)',
    'why.4': 'ஆசிரியர்களை முழுமையாக தயார்படுத்துதல்',
    'why.5': 'வேலைவாய்ப்பை மையமாகக் கொண்ட பயிற்சி முறை',
    'why.outcome': '🔶 நீங்கள் எதிர்பார்க்கக்கூடிய முடிவுகள்',
    'why.outcome.intro': 'பயிற்சியின் முடிவில் நீங்கள்:',
    'why.outcome.1': 'தன்னம்பிக்கை மிக்க ஆசிரியராக உருவெடுப்பீர்கள்',
    'why.outcome.2': 'நவீன கற்பித்தல் முறைகளில் திறன் பெறுவீர்கள்',
    'why.outcome.3': 'சிறந்த பள்ளிகளின் நேர்காணல்களை எளிதில் வெல்வீர்கள்',
    'why.outcome.4': 'முதல் நாளிலிருந்தே நிஜமான வகுப்பறைச் சவால்களைக் கையாளும் திறன் பெறுவீர்கள்',

    // Experts Section
    'experts.title': 'எங்கள் சிறந்த வழிகாட்டிகளைச் சந்திக்கவும்',
    'experts.subtitle': 'நூற்றுக்கணக்கான ஆசிரியர்களின் வாழ்க்கையை மாற்றிய, சிறந்த அனுபவம் வாய்ந்த நிபுணர்களிடம் இருந்து கற்றுக்கொள்ளுங்கள்.',
    'expert.1.name': 'பிரியா சர்மா',
    'expert.1.title': 'பாடநெறி & கற்பிப்பு முறைகள் நிபுணர்',
    'expert.1.desc': 'வகுப்பறை கற்பிப்பு மற்றும் பாடநெறி வடிவமைப்பில் 10+ வருடங்கள். செயல்-அடிப்படை கற்பிப்பு மற்றும் மாணவர் ஈடுபாட்டில் நிபுணர்.',
    'expert.1.tag1': 'பாடம் திட்டமிடல்',
    'expert.1.tag2': 'ஈடுபாடு',
    'expert.2.name': 'ராஜேஷ் குமார்',
    'expert.2.title': 'வகுப்பறை நிர்வாகம் & தலைமை பயிற்சியாளர்',
    'expert.2.desc': 'பல்வேறு வகுப்பறைகளை நிர்வகிப்பதில் 12+ வருடங்கள். நடத்தை நிர்வாகம், மாணவர் ஒழுக்கம் மற்றும் நேர்மறை கற்பிப்பு சூழல் உருவாக்கலில் நிபுணர்.',
    'expert.2.tag1': 'நிர்வாகம்',
    'expert.2.tag2': 'தலைமை',
    'expert.3.name': 'அஞ்சலி தேசாய்',
    'expert.3.title': 'டிஜிட்ல் கருவிகள் & தகவல் தொடர்பு நிபுணர்',
    'expert.3.desc': 'EdTech மற்றும் டிஜிட்டல் கற்பிப்பில் 5+ வருடங்கள். நவீன கற்பிப்பு கருவிகள், ஆன்லைன் கற்பிப்பு மற்றும் தொழில்முறை தொடர்பு பற்றி உற்சாகமுள்ளவர்.',
    'expert.3.tag1': 'டிஜிட்டல் கருவிகள்',
    'expert.3.tag2': 'தகவல் தொடர்பு',

    // Target Audience
    'audience.title': '🔥 இது யாருக்கானது?',
    'audience.subtitle': 'ஆசிரியராக வேண்டும் என்ற தாகம் உள்ள அனைவருக்கும் இந்தப் பயிற்சி ஏற்றதாகும்',
    'audience.1': 'ஆசிரியர் பயிற்சி முடித்த மாணவர்கள்',
    'audience.2': 'புதிய பட்டதாரிகள்',
    'audience.3': 'வேலை வாய்ப்பை மாற்ற விரும்புபவர்கள்',
    'audience.4': 'IB / கேம்பிரிட்ஜ் பள்ளிகளில் பணிபுரிய விரும்பும் ஆசிரியர்கள்',

    // CTA Section
    'cta.title': '⚡ உங்கள் அடுத்தப் படி',
    'cta.subtitle': '👉 கற்பிப்பதை மட்டும் கற்றுக்கொள்ளாதீர்கள். வேலைவாய்ப்பை உறுதிசெய்து, சிறந்த ஆசிரியராக மாறுங்கள்.',
    'cta.button': 'இப்போதே சேர்க. தன்னம்பிக்கையுடன் உங்கள் பயணத்தைத் தொடங்குங்கள்.',

    // Footer
    'footer.tagline': 'ஆசிரியர்களை அதிகத் திறனும், தன்னம்பிக்கையும் உள்ள முன்னணி பள்ளி நிபுணர்களாக மாற்றுதல்.',
    'footer.links': 'விரைவான இணைப்புகள்',
    'footer.support': 'ஆதரவு',
    'footer.social': 'எங்களுடன் இணையுங்கள்',
    'footer.copyright': '© 2026 Educators Point. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. கற்பித்தல் துறையில் ஒரு மாபெரும் மாற்றம்.',

    // Enrollment Page
    'enroll.title': 'Educators Point இல் பதிவு செய்யுங்கள்',
    'enroll.subtitle': 'எங்கள் அடுத்த வகுப்பில் இணைந்து உங்கள் கற்பித்தல் பயணத்தைத் தொடங்குங்கள். உங்கள் இடத்தைப் பதிவு செய்ய கீழே உள்ள படிவத்தைப் பூர்த்தி செய்யுங்கள்.',
    'enroll.form.name': 'முழு பெயர்',
    'enroll.form.email': 'மின்னஞ்சல் முகவரி',
    'enroll.form.batch': 'உங்கள் பேட்சைத் தேர்ந்தெடுக்கவும்',
    'enroll.form.terms': 'விதிமுறைகள் மற்றும் தனியுரிமைக் கொள்கைகளை நான் ஏற்றுக்கொள்கிறேன்',
    'enroll.form.submit': 'எனது இடத்தை பதிவு செய்க',
    'enroll.form.privacy': 'நாங்கள் உங்கள் தனியுரிமையை மதிக்கிறோம். உங்கள் தகவல்கள் பயிற்சிக்காக மட்டுமே பயன்படுத்தப்படும்.',
    'enroll.faq.title': 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)',
    'enroll.faq.q1': 'இந்தப் பயிற்சியில் யார் கலந்து கொள்ளலாம்?',
    'enroll.faq.a1': 'இந்தப் பயிற்சியில் B.Ed மாணவர்கள், B.Ed முடித்தவர்கள், மற்றும் கற்பித்தல் துறையில் ஆர்வமுள்ள அனைவரும் கலந்து கொள்ளலாம்.',
    'enroll.faq.q2': 'இந்தப் பயிற்சியின் கால அளவு என்ன?',
    'enroll.faq.a2': 'இப்பயிற்சி 8 வாரங்கள் கொண்டது. இதில் தினசரி நேரடி வகுப்புகள் (2-3 மணிநேரம்), செயல்முறைப் பட்டறைகள் மற்றும் சுய பயிற்சிகள் அடங்கும். இது எளிதாக கற்றுக்கொள்ளும் வகையிலேயே வடிவமைக்கப்பட்டுள்ளது.',
    'enroll.faq.q3': 'வேலைவாய்ப்பு உதவி வழங்கப்படுமா?',
    'enroll.faq.a3': 'ஆம்! ரெஸ்யூம் (Resume) தயாரிப்பு, நேர்காணல் பயிற்சி மற்றும் முன்னணி பள்ளிகளுடனான வேலை வாய்ப்புகள் உட்பட 100% வேலைவாய்ப்பு வழிகாட்டுதலை நாங்கள் வழங்குகிறோம்.',
    'enroll.faq.q4': 'பயிற்சிக்கட்டணம் எவ்வளவு?',
    'enroll.faq.a4': 'பயிற்சிக்கட்டணம் பேட்ச் அளவைப் பொறுத்து மாறுபடும். முதலில் பதிவு செய்யும் 20 நபர்களுக்குச் சிறப்புத் தள்ளுபடியும் உண்டு. விரிவான கட்டணப் விவரங்களுக்கு எங்களைத் தொடர்பு கொள்ளவும்.',
    'enroll.faq.q5': 'நான் என்ன கற்றுக்கொள்வேன்?',
    'enroll.faq.a5': 'பாடம் திட்டமிடுதல், வகுப்பறைப் பராமரிப்பு, டிஜிட்டல் கருவிகள், சிறந்த தகவல் தொடர்புத் திறன் மற்றும் நேர்காணல் வழிகாட்டுதல் ஆகியவற்றை நீங்கள் கற்றுக்கொள்வீர்கள்.',
    'enroll.faq.q6': 'எனக்குச் சான்றிதழ் வழங்கப்படுமா?',
    'enroll.faq.a6': 'ஆம்! பயிற்சியை வெற்றிகரமாக முடிக்கும் மாணவர்களுக்கு தொழில்முறை ஆசிரியர் பயிற்சிச் சான்றிதழ் (Professional Teacher Training Certificate) வழங்கப்படும். மேலும் அவர்களின் தொழில்முறை போர்ட்ஃபோலியோ பதிவு செய்யப்படும்.',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.courses': 'कोर्सेस',
    'nav.experts': 'विशेषज्ञ',
    'nav.success': 'सफलता की कहानियाँ',
    'nav.enroll': 'अभी एनरोल करें',
    'nav.back': 'होम पर लौटें',

    // Hero Section
    'hero.badge': 'एक निपुण व तैयार शिक्षक बनें',
    'hero.title1': 'शिक्षण में महारत।',
    'hero.title2': 'वैश्विक मापदंड।',
    'hero.title3': 'शत-प्रतिशत प्लेसमेंट।',
    'hero.subtitle': 'NEP-आधारित शिक्षाप्रणाली, अंतर्राष्ट्रीय पाठ्यक्रम में विशेषज्ञता और व्यावहारिक शिक्षण कौशल के साथ एक प्रभावशाली शिक्षक बनें।',
    'hero.cta1': 'अपनी यात्रा शुरू करें',
    'hero.cta2': 'अधिक जानें',
    'hero.stat1': 'सप्ताह की ट्रेनिंग',
    'hero.stat2': 'लाइव क्लासेस',
    'hero.stat3': 'प्रशिक्षित शिक्षक',

    // About Section
    'about.title': 'Educators Point के बारे में',
    'about.subtitle': 'हम किताबी ज्ञान और व्यावहारिक शिक्षण के बीच की दूरी को मिटाते हैं। हमारा उद्देश्य शिक्षकों को आवश्यक कौशल और आत्मविश्वास से मजबूत बनाना है।',
    'about.card1.title': 'प्रैक्टिकल ट्रेनिंग',
    'about.card1.desc': 'वास्तविक कक्षा की स्थितियों का सामना करना सीखें। कक्षा के माहौल को गहराई से समझने वाले विशेषज्ञों के मार्गदर्शन में अभ्यास करें।',
    'about.card2.title': 'विशेषज्ञों का मार्गदर्शन',
    'about.card2.desc': '5 से 12 से अधिक वर्षों के अनुभव वाले दिग्गज शिक्षकों से सीखें, जो आपके करियर के विकास में व्यक्तिगत रूप से सहायता करेंगे।',
    'about.card3.title': 'प्लेसमेंट में सहायता',
    'about.card3.desc': '100% प्लेसमेंट सपोर्ट! हमारे विभिन्न स्कूल पार्टनर्स, इंटरव्यू की तैयारी और सही मार्गदर्शन के साथ अपना भविष्य संवारें।',

    // Courses Section
    'courses.title': '🚀 आप क्या-क्या सीखेंगे?',
    'courses.subtitle': 'बुनियादी संकल्पनाओं से लेकर उन्नत डिजिटल कौशल तक, आधुनिक शिक्षण के सभी महत्वपूर्ण आयामों को कवर करने वाला एक संपूर्ण प्रशिक्षण।',

    // Modules
    'module.1.title': 'एक पेशेवर शिक्षक बनें',
    'module.1.desc': 'एक मजबूत शिक्षक पहचान बनाएं। नैतिकता और हाव-भाव विकसित करें, जिसकी उम्मीद शीर्ष स्कूलों द्वारा की जाती है।',
    'module.2.title': 'हर छात्र की मानसिकता को समझें',
    'module.2.desc': 'बाल मनोविज्ञान को समझें और विभेदित निर्देश एवं समावेशी दृष्टिकोण अपनाकर सभी प्रकार के छात्रों को आत्मविश्वास के साथ संभालें।',
    'module.3.title': 'संपूर्ण पाठ्यक्रम कौशल',
    'module.3.desc': 'CBSE, Cambridge और IB बोर्ड की शिक्षा-प्रणाली में परिणाम-आधारित अध्यापन के साथ विशेषज्ञता प्राप्त करें।',
    'module.4.title': 'प्रभावशाली पाठ योजनाएँ (Lesson Plans)',
    'module.4.desc': 'बैकवर्ड डिज़ाइन और ब्लूम्स टैक्सोनॉमी (Bloom\'s taxonomy) का उपयोग कर रचनात्मक और सुव्यवस्थित पाठ योजनाएँ तैयार करें।',
    'module.5.title': 'असरदार शिक्षण शैली',
    'module.5.desc': 'गतिविधि-आधारित और प्रोजेक्ट-आधारित शिक्षण तकनीकों को लागू करें, जिससे छात्रों की पाठ्यक्रम में रुचि बढ़े।',
    'module.6.title': 'क्लासरूम मैनेजमेंट में महारत',
    'module.6.desc': 'छात्रों के व्यवहार को संभालना सीखें, एक नई दिनचर्या बनाएं और क्लास रूम को पूरी तरह से तनावमुक्त और अनुशासित रखें।',
    'module.7.title': 'छात्रों की सुरक्षा और कानूनी नियम',
    'module.7.desc': 'POCSO दिशानिर्देशों, सुरक्षा प्रोटोकॉल और पेशेवर सीमाओं के बारे में जानें, जो आज हर स्कूल की प्रमुख आवश्यकता है।',
    'module.8.title': 'डिजिटल शिक्षा (Digital Teaching)',
    'module.8.desc': 'LMS प्लेटफ़ॉर्म, स्मार्ट टूल और डिजिटल साधनों का प्रभावी उपयोग कर ऑनलाइन व ऑफ़लाइन दोनों तरह से शिक्षा प्रदान करें।',
    'module.9.title': 'विशेषज्ञ की तरह मूल्यांकन करें (Assessment)',
    'module.9.desc': 'फॉर्मेटिव (Formative) और सम्मेटिव (Summative) मूल्यांकन तैयार करें, प्रगति की सटीक जाँच करें और सही फीडबैक दें।',
    'module.10.title': 'इंटरव्यू और डेमो के लिए खुद को तैयार करें',
    'module.10.desc': 'मॉक सेशन (Mock Session), डेमो टीचिंग और पोर्टफोलियो बनाने के माध्यम से आसानी से इंटरव्यू क्रैक करें।',
    'module.11.title': 'शिक्षा के क्षेत्र में अनुसंधान और नयापन',
    'module.11.desc': 'एक्शन रिसर्च (Action Research), साक्ष्य-आधारित पद्धतियों और शिक्षण में नई तकनीकों का इस्तेमाल कर शिक्षा क्षेत्र में सबसे आगे रहें।',
    'module.12.title': 'अभिभावकों के साथ कुशल संवाद',
    'module.12.desc': 'माता-पिता के साथ प्रभावी संवाद स्थापित करें, उत्पादक बैठकें (PTM) करें और स्कूल-अभिभावक भागीदारी को मजबूत करें।',
    'module.13.title': 'विशेष शिक्षा (Special Education) और समावेशी शिक्षण',
    'module.13.desc': 'विभिन्न सीखने की गति वाले छात्रों का समर्थन करना सीखें, पाठ्यक्रम को जरूरत के अनुसार ढालें और कक्षा का माहौल सभी के अनुकूल बनाएं।',
    'module.14.title': 'अंतर्राष्ट्रीय नजरिया और सांस्कृतिक समझ',
    'module.14.desc': 'सांस्कृतिक जागरूकता विकसित करें और छात्रों को वैश्विक परिप्रेक्ष्य के बारे में जानकारी दें।',
    'module.15.title': 'करियर की तरक्की और नेतृत्व (Leadership)',
    'module.15.desc': 'अपना शक्तिशाली पोर्टफोलियो तैयार करें, नेतृत्व (Leadership) के अवसरों की खोज करें और शिक्षण क्षेत्र में अपनी लंबी विकास यात्रा की योजना बनाएं।',

    // Why Choose Us
    'why.title': '🎯 हमारा प्रोग्राम दूसरों से अलग क्यों है?',
    'why.1': 'NEP 2020 अनुरूप + अंतर्राष्ट्रीय शिक्षण पद्धति',
    'why.2': 'वास्तविक क्लासरूम ट्रेनिंग (केवल किताबी पढ़ाई नहीं)',
    'why.3': 'कानूनी नियमों का ज्ञान (POCSO ट्रेनिंग शामिल)',
    'why.4': 'एक संपूर्ण शिक्षक बनने की तैयारी',
    'why.5': 'शत-प्रतिशत रोजगार और प्लेसमेंट केंद्रित प्रशिक्षण',
    'why.outcome': '🔶 आप क्या उम्मीद कर सकते हैं?',
    'why.outcome.intro': 'कोर्स पूरा करने के बाद आप होंगे:',
    'why.outcome.1': 'कक्षा का संचालन करने में पूरी तरह आत्मविश्वासी',
    'why.outcome.2': 'आधुनिक शिक्षण तकनीकों में अत्यधिक निपुण',
    'why.outcome.3': 'देश के सर्वश्रेष्ठ स्कूलों का इंटरव्यू क्रैक करने के लिए तैयार',
    'why.outcome.4': 'पहले ही दिन से कक्षा की चुनौतियों को आसानी से संभालने में सक्षम',

    // Experts Section
    'experts.title': 'हमारे अनुभवी विशेषज्ञों से मिलें',
    'experts.subtitle': 'शिक्षक प्रशिक्षण के दिग्गजों से सीखें, जिन्होंने सैकड़ों शिक्षकों के भविष्य को सँवारा है।',
    'expert.1.name': 'प्रिया शर्मा',
    'expert.1.title': 'पाठ्यक्रम और शिक्षण विधि विशेषज्ञ',
    'expert.1.desc': 'कक्षा शिक्षण और पाठ्यक्रम डिजाइन में 10+ वर्ष। गतिविधि-आधारित शिक्षण और छात्र जुड़ाव में विशेषज्ञ।',
    'expert.1.tag1': 'पाठ योजना',
    'expert.1.tag2': 'जुड़ाव',
    'expert.2.name': 'राजेश कुमार',
    'expert.2.title': 'कक्षा प्रबंधन और नेतृत्व कोच',
    'expert.2.desc': 'विविध कक्षाओं को प्रबंधित करने में 12+ वर्ष। व्यवहार प्रबंधन, छात्र अनुशासन और सकारात्मक सीखने के माहौल बनाने में विशेषज्ञ।',
    'expert.2.tag1': 'प्रबंधन',
    'expert.2.tag2': 'नेतृत्व',
    'expert.3.name': 'अंजलि देसाई',
    'expert.3.title': 'डिजिटल टूल्स और संचार विशेषज्ञ',
    'expert.3.desc': 'EdTech और डिजिटल शिक्षण में 5+ वर्ष। आधुनिक शिक्षण उपकरण, ऑनलाइन शिक्षण और व्यावसायिक संचार के बारे में भावुक।',
    'expert.3.tag1': 'डिजिटल टूल्स',
    'expert.3.tag2': 'संचार',


    // Target Audience
    'audience.title': '🔥 यह प्रोग्राम किसके लिए है?',
    'audience.subtitle': 'Educators Point उन सभी के लिए है जो शिक्षण के क्षेत्र में अपना एक सुनहरा भविष्य बनाना चाहते हैं।',
    'audience.1': 'शिक्षक बनने की चाह रखने वाले युवा',
    'audience.2': 'हाल ही में ग्रेजुएट हुए छात्र',
    'audience.3': 'जो लोग अपना करियर बदलना चाहते हैं',
    'audience.4': 'IB / कैम्ब्रिज स्कूलों में नौकरी का लक्ष्य रखने वाले शिक्षक',

    // CTA Section
    'cta.title': '⚡ अपने भविष्य की ओर एक नया कदम बढ़ाएँ',
    'cta.subtitle': '👉 केवल पढ़ाना न सीखें। एक असाधारण और रोजगार योग्य शिक्षक बनें।',
    'cta.button': 'अभी एनरोल करें। आत्मविश्वास के साथ पढ़ाना शुरू करें।',

    // Footer
    'footer.tagline': 'शिक्षकों को शीर्ष स्कूलों के लिए तैयार करते हुए उन्हें एक आत्मविश्वासी और कुशल मार्गदर्शक में बदलना।',
    'footer.links': 'त्वरित लिंक',
    'footer.support': 'सपोर्ट',
    'footer.social': 'हमसे जुड़ें',
    'footer.copyright': '© 2026 Educators Point। सभी अधिकार सुरक्षित। विश्व स्तर पर शिक्षण करियर को बदलना।',

    // Enrollment Page
    'enroll.title': 'Educators Point के लिए एनरोल करें',
    'enroll.subtitle': 'हमारे अगले बैच में शामिल हों और अपनी शिक्षण यात्रा की शुरुआत करें। अपनी सीट सुनिश्चित करने के लिए नीचे दिया गया फॉर्म भरें।',
    'enroll.form.name': 'पूरा नाम',
    'enroll.form.email': 'ईमेल आईडी',
    'enroll.form.batch': 'अपना बैच चुनें',
    'enroll.form.terms': 'मैं नियम व शर्तें (T&C) और गोपनीयता नीति (Privacy Policy) से सहमत हूँ',
    'enroll.form.submit': 'अपनी उपस्थिति सुरक्षित करें',
    'enroll.form.privacy': 'हम आपकी गोपनीयता का सम्मान करते हैं। आपकी व्यक्तिगत जानकारी का उपयोग केवल पंजीकरण के उद्देश्य से किया जाएगा।',
    'enroll.faq.title': 'अक्सर पूछे जाने वाले प्रश्न (FAQs)',
    'enroll.faq.q1': 'इस प्रोग्राम में कौन नामांकन (Enroll) कर सकता है?',
    'enroll.faq.a1': 'यह प्रोग्राम B.Ed छात्रों, B.Ed स्नातकों, गैर-B.Ed स्नातकों और शिक्षण में रुचि रखने वाले किसी भी व्यक्ति के लिए खुला है।',
    'enroll.faq.q2': 'इस प्रोग्राम की अवधि क्या है?',
    'enroll.faq.a2': 'यह 8 सप्ताह का एक विशेष प्रोग्राम है जिसमें रोज़ लाइव सत्र (2-3 घंटे), प्रैक्टिकल वर्कशॉप्स और व्यक्तिगत अभ्यास शामिल हैं। इसे इस तरह डिज़ाइन किया गया है कि आप आसानी से इसे मैनेज कर सकें।',
    'enroll.faq.q3': 'क्या इस कोर्स के बाद जॉब प्लेसमेंट की सुविधा है?',
    'enroll.faq.a3': 'हाँ! हम 100% प्लेसमेंट सपोर्ट प्रदान करते हैं, जिसमें शानदार रिज्यूमे बनाना, इंटरव्यू की तैयारी कराना और बेहतरीन स्कूलों से संपर्क कराना शामिल है।',
    'enroll.faq.q4': 'कोर्स की फीस कितनी है?',
    'enroll.faq.a4': 'प्रत्येक बैच के अनुसार फीस अलग हो सकती है। पहले 20 नामांकन पर विशेष छूट (Early Bird Discount) उपलब्ध है। फीस की पूरी जानकारी के लिए कृपया हमसे संपर्क करें।',
    'enroll.faq.q5': 'इस कोर्स में मैं क्या-क्या सीखूँगा?',
    'enroll.faq.a5': 'आप लेसन प्लानिंग, क्लासरूम मैनेजमेंट, आधुनिक शिक्षण पद्धतियाँ, डिजिटल टूल्स (Smart Tools) का उपयोग, कम्युनिकेशन स्किल्स और इंटरव्यू क्रैक करने के बेहतरीन तरीके सीखेंगे।',
    'enroll.faq.q6': 'क्या कोर्स पूरा होने पर मुझे प्रमाणपत्र (Certificate) दिया जाएगा?',
    'enroll.faq.a6': 'जी हाँ! सफलतापूर्वक ट्रेनिंग पूरी करने वाले उम्मीदवारों को \'प्रोफेशनल टीचर ट्रेनिंग सर्टिफिकेट\' (Professional Teacher Training Certificate) दिया जाता है, साथ ही उनका टीचिंग पोर्टफोलियो और डेमो क्लास की रिकॉर्डिंग भी उपलब्ध कराई जाती है।',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en';
    }
    return 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
