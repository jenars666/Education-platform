import React, { createContext, useContext, useState, useEffect } from 'react';

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
    'nav.about': 'About',
    'nav.courses': 'Courses',
    'nav.experts': 'Experts',
    'nav.success': 'Success Stories',
    'nav.enroll': 'Enroll Now',
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
    'nav.about': 'பற்றி',
    'nav.courses': 'பாடநெறிகள்',
    'nav.experts': 'நிபுணர்கள்',
    'nav.success': 'வெற்றி கதைகள்',
    'nav.enroll': 'இப்போது சேர்ந்து கொள்ளுங்கள்',
    'nav.back': 'முகப்புக்குத் திரும்பவும்',

    // Hero Section
    'hero.badge': 'வகுப்பறையில் தயாரான ஆசிரியராக மாறுங்கள்',
    'hero.title1': 'கற்பிப்பதை மாஸ்டர் செய்யுங்கள்.',
    'hero.title2': 'உலகளாவிய தரங்களை சந்திக்கவும்.',
    'hero.title3': 'வேலை பெறுங்கள்.',
    'hero.subtitle': 'NEP-சீரமைக்கப்பட்ட கற்பிப்பு, சர்வதேச பாடநெறி நிபுணத்வம் மற்றும் உண்மையான வகுப்பறை செயல்பாட்டு திறன்களுடன் உচ்ச-প্রভাவ ஆசிரியர் ஆனுங்கள்.',
    'hero.cta1': 'உங்கள் பயணத்தைத் தொடங்குங்கள்',
    'hero.cta2': 'மேலும் அறிக',
    'hero.stat1': 'வாரங்கள் நிரல்',
    'hero.stat2': 'நேரடி வகுப்புகள்',
    'hero.stat3': 'பயிற்றுவிக்கப்பட்ட ஆசிரியர்கள்',

    // About Section
    'about.title': 'Educators Point பற்றி',
    'about.subtitle': 'நாங்கள் கல்வி பயிற்சி மற்றும் உண்மையான வகுப்பறை தயாரிப்பின் இடைவெளியை குறைக்கிறோம். எங்கள் நோக்கம் ஆசிரியர்களுக்கு நடைமுறை திறன்கள் மற்றும் தன்னம்பிக்கை வழங்குவது.',
    'about.card1.title': 'நடைமுறை பயிற்சி',
    'about.card1.desc': 'நிஜ-உலக கற்பிப்பு காட்சிகள் மற்றும் வகுப்பறை இயக்கவியல் புரிந்துகொள்ளும் அভিজ்ஞ ஆசிரியர்களுடன் கை-நடைமுறை பயிற்சி.',
    'about.card2.title': 'நிபுண ஆலோசனை',
    'about.card2.desc': '5-12+ வருட அভিজ்ஞதையுள்ள ஆசிரியர்களிடமிருந்து கற்றுக்கொள்ளுங்கள். உங்கள் வாழ்க்கை வளர்ச்சிக்கான ব்যক்তிগত வழிகாட்டுதல்.',
    'about.card3.title': 'பணி வைப்பு ஆதரவு',
    'about.card3.desc': 'பள்ளி கூட்டாளிதுவ, साक்ষாத்கார தயாரிப்பு மற்றும் உங்கள் வெற்றிக்கான வாழ்க்கை வழிகாட்டுதலுடன் 100% பணி வைப்பு உதவி.',

    // Courses Section
    'courses.title': '🚀 நீங்கள் மாஸ்டர் செய்யப் போகிறீர்கள்',
    'courses.subtitle': 'அடிப்படை கருத்துக்கள் முதல் மேம்பட்ட டிஜிটல் திறன் வரை நவீன கற்பிப்பின் அனைத்து அம்சங்களை உள்ளடக்கிய விரிவான பயிற்சி.',

    // Modules
    'module.1.title': 'ஒரு தொழில்முறை ஆசிரியர் ஆனுங்கள்',
    'module.1.desc': 'வலுவான ஆசிரியர் அடையாளம், நৈதிக ভিত்தி மற்றும் சிறந்த பள்ளிகளில் எதிர்பார்க்கப்படும் வகுப்பறை முன்னிலை வளர்த்துக் கொள்ளுங்கள்.',
    'module.2.title': 'ஒவ்வொரு கற்றவரையும் புரிந்து கொள்ளுங்கள்',
    'module.2.desc': 'குழந்தை உளவியல், வேறுபட்ட கற்பிப்பு மற்றும் உள்ளடக்கிய நடைமுறைகளைப் பயன்படுத்தி பல்வேறு வகுப்பறைகளை தன்னம்பிக்கையுடன் கையாளுங்கள்.',
    'module.3.title': 'பல்வேறு பாடநெறிகள் முழுவதும் கற்பிக்கவும்',
    'module.3.desc': 'CBSE, கேம்பிரிட்ஜ் மற்றும் IB கட்டமைப்புகளில் நிபுணத்வம் பெறுங்கள் ফলাফல-চালিত பாடம் வழங்கலுடன்.',
    'module.4.title': 'சக்திশালி பாடங்களை வடிவமைக்கவும்',
    'module.4.desc': 'பின்னோக்கு வடிவமைப்பு, ப்ளூமின் வகைபிரிப்பு மற்றும் உண்மையான மதிப்பீட்டு ஒருங்கிணைப்பைப் பயன்படுத்தி கட்டமைக்கப்பட்ட, আকர্ষণீய பாடம் திட்டங்களை உருவாக்கவும்.',
    'module.5.title': 'প্রভাবশালி கற்பிப்பை வழங்கவும்',
    'module.5.desc': 'செயல்-அடிப்படை, விசாரணை-இயக்கப்பட்ட மற்றும் திட்ட-அடிப்படை கற்பிப்பை செயல்படுத்தவும் மாணவர் ஈடுபாட்டை இயக்கும்.',
    'module.6.title': 'வகுப்பறை கட்டுப்பாட்டை மாஸ்டர் செய்யுங்கள்',
    'module.6.desc': 'நடத்தையை கையாளுங்கள், வழக்கங்களை உருவாக்குங்கள் மற்றும் மன அழுத்தம் இல்லாமல் உচ்ச-ஈடுபாட்டு வகுப்பறைகளை பராமரிக்கவும்.',
    'module.7.title': 'மாணவர் பாதுகாப்பு & சட்ட கட்டுப்பாட்டை உறுதிசெய்யுங்கள்',
    'module.7.desc': 'POCSO வழிகாட்டுதல்கள், பாதுகாப்பு நெறிமுறைகள் மற்றும் ஒவ்வொரு பள்ளியும் எதிர்பார்க்கும் தொழில்முறை எல்லைகளைக் கற்றுக்கொள்ளுங்கள்.',
    'module.8.title': 'டிஜிটல் கற்பிப்பைப் பயன்படுத்துங்கள்',
    'module.8.desc': 'LMS தளங்கள், ஸ்மார்ட் கருவிகள் மற்றும் டிஜிটல் வளங்களைப் பயன்படுத்தி ஆன்லைনிலும் ஆஃப்லைனிலும் திறம்பட கற்பிக்கவும்.',
    'module.9.title': 'ஒரு நிபுணரைப் போல மதிப்பீடு செய்யுங்கள்',
    'module.9.desc': 'உருவாக்க மற்றும் சுருக்கமான மதிப்பீடுகளை வடிவமைக்கவும், முன்னேற்றத்தைக் கண்காணிக்கவும் மற்றும் অর্থপূর்ண கருத்து வழங்கவும்.',
    'module.10.title': 'साक्ষाத्कार & ডেমো প्रস्तुत ஆனுங்கள்',
    'module.10.desc': 'மாக் அமர்வுகள், ডेমो கற்பிப்பு மற்றும் போர்ட்ஃபோலியோ கட்டுமானத்துடன் साक्ষाத्कार கடக்கவும்.',
    'module.11.title': 'கல்வியில் ஆராய்ச்சி & உদ்ভாவனம்',
    'module.11.desc': 'செயல் ஆராய்ச்சி, சான்ற-அடிப்படை நடைமுறைகள் மற்றும் கல்வியில் தனிமையான கற்பிப்பு முறைகளை ஆராயுங்கள்.',
    'module.12.title': 'பெற்றோர் যোগாயோகம் & ஈடுபாடு',
    'module.12.desc': 'பெற்றோர்களுடன் திறம்பட যোகாயோகம் செய்யுங்கள், உற்பத்தिशील சந்திப்புகள் நடத்தவும் மற்றும் வலுவான பள்ளி-குடும்ப கூட்டாளிதுவ உருவாக்கவும்.',
    'module.13.title': 'சிறப்பு கல்வி & உள்ளடக்கிய கற்பிப்பு',
    'module.13.desc': 'பல்வேறு கற்றல் தேவைகளுள்ள மாணவர்களை ஆதரிக்க, பாடநெறியை மாற்றியமைக்க மற்றும் உள்ளடக்கிய வகுப்பறை சூழல் உருவாக்க கற்றுக்கொள்ளுங்கள்.',
    'module.14.title': 'உலகளாவிய பார்வைகள் & கலாச்சார திறன்',
    'module.14.desc': 'கலாச்சார விழிப்புணர்வு வளர்த்துக்கொள்ளுங்கள், உலகளாவிய குடிமகத்துவத்தை கற்பிக்கவும் மற்றும் உங்கள் பாடநெறியில் சர்வதேச பார்வைகளை ஒருங்கிணைக்கவும்.',
    'module.15.title': 'வாழ்க்கை முன்னேற்றம் & தலைமை',
    'module.15.desc': 'உங்கள் தொழில்முறை போர்ட்ஃபோலியோ உருவாக்கவும், தலைமை வாய்ப்புகளை ஆராயுங்கள் மற்றும் உங்கள் நீண்ட கால கற்பிப்பு வாழ்க்கை வளர்ச்சியை திட்டமிடவும்.',

    // Why Choose Us
    'why.title': '🎯 இந்த நிரல் ஏன் தனிமையாக உள்ளது',
    'why.1': 'NEP 2020 சீரமைக்கப்பட்ட + சர்வதேச கற்பிப்பு',
    'why.2': 'உண்மையான வகுப்பறை உருவகப்படுத்தல் (கோட்பாடு மட்டுமல்ல)',
    'why.3': 'சட்ட & சட்ட கட்டுப்பாட்டு பயிற்சி (POCSO சேர்க்கப்பட்ட)',
    'why.4': 'முடிந்த-முடிந்த ஆசிரியர் தயாரிப்பு',
    'why.5': 'பணி வைப்பு-கেந்திரிக பயிற்சி அணுகுமுறை',
    'why.outcome': '🔶 நீங்கள் எதிர்பார்க்கக்கூடிய ফলாফல',
    'why.outcome.intro': 'இவ்வாறு வெளியேறுங்கள்:',
    'why.outcome.1': 'நம்பிக்கையான வகுப்பறை பயிற்சியாளர்',
    'why.outcome.2': 'நவீன கற்பிப்பு முறைகளில் திறமையான',
    'why.outcome.3': 'சிறந்த பள்ளி साक்ষாத்கারங்களுக்கு தயாரான',
    'why.outcome.4': '1 வது நாளிலிருந்து உண்மையான வகுப்பறை சவால்களை கையாள முடிந்த',

    // Experts Section
    'experts.title': 'எங்கள் நிபுண ஆசிரியர்களை சந்திக்கவும்',
    'experts.subtitle': 'நூற்றுக்கணக்கான கற்பிப்பு வாழ்க்கைகளை மாற்றிய அভிজ்ஞ ஆசிரியர்களிடமிருந்து கற்றுக்கொள்ளுங்கள்.',
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
    'expert.3.title': 'டிஜிটல் கருவிகள் & যোগাযোग நிபுணர்',
    'expert.3.desc': 'EdTech மற்றும் டிஜிটல் கற்பிப்பில் 5+ வருடங்கள். நவீன கற்பிப்பு கருவிகள், ஆன்லைன் கற்பிப்பு மற்றும் தொழில்முறை যোগாযோகம் பற்றி உற்சாகமுள்ளவர்.',
    'expert.3.tag1': 'டிஜிटल கருவிகள்',
    'expert.3.tag2': 'যோগாযோகம்',

    // Target Audience
    'audience.title': '🔥 இது யாருக்கு',
    'audience.subtitle': 'Educators Point அனைத்து பின்னணியிலிருந்து আকাঙ்க்ষী ஆசிரியர்களுக்கு வடிவமைக்கப்பட்டுள்ளது',
    'audience.1': 'ஆசிரியர் ஆக விரும்பும் மாணவர்கள்',
    'audience.2': 'சமீபத்திய பட்டதாரிகள்',
    'audience.3': 'வாழ்க்கை மாற்றுபவர்கள்',
    'audience.4': 'IB / கேம்பிரிட்ஜ் பள்ளிகளுக்கு இலக்கு வைக்கும் ஆசிரியர்கள்',

    // CTA Section
    'cta.title': '⚡ உங்கள் அடுத்த படி',
    'cta.subtitle': '👉 கற்பிப்பை மாத்திரம் கற்றுக்கொள்ளாதீர்கள். வேலை பெறக்கூடியவர் ஆனுங்கள். விதிவிலக்கான ஆனுங்கள்.',
    'cta.button': 'இப்போது சேர்ந்து கொள்ளுங்கள். தன்னம்பிக்கையுடன் கற்பிக்க தொடங்குங்கள்.',

    // Footer
    'footer.tagline': 'ஆசிரியர்களை சிறந்த பள்ளிகளுக்கு தயாரான நம்பிக்கையான, திறமையான ஆசிரியர்களாக மாற்றுதல்.',
    'footer.links': 'விரைவு இணைப்புகள்',
    'footer.support': 'ஆதரவு',
    'footer.social': 'எங்களுடன் இணைந்து கொள்ளுங்கள்',
    'footer.copyright': '© 2026 Educators Point. அனைத்து உரிமைகள் உள்ளன. உலகளாவிய கற்பிப்பு வாழ்க்கைகளை மாற்றுதல்.',

    // Enrollment Page
    'enroll.title': 'Educators Point இல் சேர்ந்து கொள்ளுங்கள்',
    'enroll.subtitle': 'எங்கள் அடுத்த தொகுப்பில் சேர்ந்து உங்கள் கற்பிப்பு வாழ்க்கையை மாற்றுங்கள். உங்கள் இருக்கையை பாதுகாக்க கீழே உள்ள படிவத்தை பூரணம் செய்யுங்கள்.',
    'enroll.form.name': 'முழு பெயர்',
    'enroll.form.email': 'மின்னஞ்சல் முகவரி',
    'enroll.form.batch': 'உங்கள் தொகுப்பைத் தேர்ந்தெடுக்கவும்',
    'enroll.form.terms': 'நான் நிபந்தனைகள் & தனியுரிமை கொள்கையை ஒப்புக்கொள்கிறேன்',
    'enroll.form.submit': 'உங்கள் இருக்கையை பாதுகாக்கவும்',
    'enroll.form.privacy': 'நாங்கள் உங்கள் தனியுரிமையை மதிக்கிறோம். உங்கள் தகவல் சேர்ப்பு நோக்கங்களுக்கு மட்டுமே பயன்படுத்தப்படும்.',
    'enroll.faq.title': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'enroll.faq.q1': 'இந்த நிரலில் யார் சேர்ந்து கொள்ளலாம்?',
    'enroll.faq.a1': 'இந்த நிரல் B.Ed மாணவர்கள், B.Ed பட்டதாரிகள், B.Ed அல்லாத பட்டதாரிகள் மற்றும் வாழ்க்கை மாற்றுபவர்களுக்கு திறந்துள்ளது. கற்பிப்பு பற்றி உற்சாகமுள்ள யாரும் விண்ணப்பிக்கலாம்.',
    'enroll.faq.q2': 'நிரலின் கால அளவு என்ன?',
    'enroll.faq.a2': 'இந்த நிரல் 8 வாரங்கள் நீளமுள்ளது, தினசரி நேரடி அமர்வுகள் (2-3 மணிநேரம்), நடைமுறை பணிசாலைகள் மற்றும் சுயாதீன பயிற்சி. இது தீவிரமாக இருந்தாலும் நிர்வாகிக்கக்கூடியதாக வடிவமைக்கப்பட்டுள்ளது.',
    'enroll.faq.q3': 'பணி வைப்பு உதவி உள்ளதா?',
    'enroll.faq.a3': 'ஆம்! நாங்கள் 100% பணி வைப்பு உதவி வழங்குகிறோம் மீண்டும் ஆதரவு, साक्ষाத्कार தயாரிப்பு மற்றும் பள்ளி கூட்டாளிதுவ இணைப்புகள் உட்பட.',
    'enroll.faq.q4': 'பாடநெறி கட்டணம் என்ன?',
    'enroll.faq.a4': 'பாடநெறி கட்டணம் தொகுப்பு முழுவதும் மாறுபடுகிறது. முதல் 20 சேர்ப்பு கட்டணங்களுக்கு ஆரம்பகாலக் பறவை ছাড் கிடைக்கிறது. விரிவான விலை தகவலுக்கு எங்களைத் தொடர்பு கொள்ளுங்கள்.',
    'enroll.faq.q5': 'நான் என்ன கற்றுக்கொள்ளப் போகிறேன்?',
    'enroll.faq.a5': 'நீங்கள் பாடம் திட்டமிடல், வகுப்பறை நிர்வாகம், கற்பிப்பு முறைகள், டிஜிटல் கருவிகள், যোগாযோக திறன்கள் மற்றும் பணி வைப்பு தயாரிப்பு வழிகாட்டுதல் பெறுவீர்கள்.',
    'enroll.faq.q6': 'நான் சான்றிதழ் பெறுவேனா?',
    'enroll.faq.a6': 'ஆம்! வெற்றிகரமான பங்கேற்பாளர்கள் தொழில்முறை ஆசிரியர் பயிற்சி சான்றிதழ் மற்றும் கற்பிப்பு போர்ட்ஃபோலியோ மற்றும் ডেமோ வகுப்பு பதிவு பெறுவார்கள்.',
  },
  hi: {
    // Navigation
    'nav.about': 'परिचय',
    'nav.courses': 'पाठ्यक्रम',
    'nav.experts': 'विशेषज्ञ',
    'nav.success': 'सफलता की कहानियां',
    'nav.enroll': 'अभी नामांकन करें',
    'nav.back': 'होम पर वापस जाएं',

    // Hero Section
    'hero.badge': 'कक्षा के लिए तैयार शिक्षक बनें',
    'hero.title1': 'शिक्षण में महारत हासिल करें।',
    'hero.title2': 'वैश्विक मानकों को पूरा करें।',
    'hero.title3': 'नौकरी पाएं।',
    'hero.subtitle': 'NEP-संरेखित शिक्षा, अंतर्राष्ट्रीय पाठ्यक्रम विशेषज्ञता और वास्तविक कक्षा निष्पादन कौशल के साथ एक उच्च-प्रभाव शिक्षक बनें।',
    'hero.cta1': 'अपनी यात्रा शुरू करें',
    'hero.cta2': 'और जानें',
    'hero.stat1': 'सप्ताह कार्यक्रम',
    'hero.stat2': 'लाइव कक्षाएं',
    'hero.stat3': 'प्रशिक्षित शिक्षक',

    // About Section
    'about.title': 'Educators Point के बारे में',
    'about.subtitle': 'हम शैक्षणिक प्रशिक्षण और वास्तविक कक्षा तैयारी के बीच अंतर को पाटते हैं। हमारा मिशन शिक्षकों को व्यावहारिक कौशल और आत्मविश्वास प्रदान करना है।',
    'about.card1.title': 'व्यावहारिक प्रशिक्षण',
    'about.card1.desc': 'वास्तविक दुनिया की शिक्षण परिस्थितियों और अनुभवी शिक्षकों के साथ व्यावहारिक अभ्यास जो कक्षा की गतिशीलता को समझते हैं।',
    'about.card2.title': 'विशेषज्ञ मार्गदर्शन',
    'about.card2.desc': '5-12+ वर्षों के अनुभव वाले शिक्षकों से सीखें। आपके करियर विकास के लिए व्यक्तिगत मार्गदर्शन।',
    'about.card3.title': 'नियुक्ति सहायता',
    'about.card3.desc': 'स्कूल भागीदारी, साक्षात्कार तैयारी और आपकी सफलता के लिए करियर मार्गदर्शन के साथ 100% नियुक्ति सहायता।',

    // Courses Section
    'courses.title': '🚀 आप क्या सीखेंगे',
    'courses.subtitle': 'मौलिक अवधारणाओं से लेकर उन्नत डिजिटल कौशल तक आधुनिक शिक्षण के सभी पहलुओं को कवर करने वाला व्यापक प्रशिक्षण।',

    // Modules
    'module.1.title': 'एक पेशेवर शिक्षक बनें',
    'module.1.desc': 'एक मजबूत शिक्षक पहचान, नैतिक आधार और शीर्ष स्कूलों में अपेक्षित कक्षा की उपस्थिति विकसित करें।',
    'module.2.title': 'हर शिक्षार्थी को समझें',
    'module.2.desc': 'बाल मनोविज्ञान, विभेदित निर्देश और समावेशी प्रथाओं को लागू करें ताकि विविध कक्षाओं को आत्मविश्वास से संभाला जा सके।',
    'module.3.title': 'पाठ्यक्रम में पढ़ाएं',
    'module.3.desc': 'CBSE, कैम्ब्रिज और IB ढांचे में परिणाम-संचालित पाठ वितरण के साथ विशेषज्ञता प्राप्त करें।',
    'module.4.title': 'शक्तिशाली पाठ डिजाइन करें',
    'module.4.desc': 'बैकवर्ड डिजाइन, ब्लूम की वर्गीकरण और वास्तविक मूल्यांकन एकीकरण का उपयोग करके संरचित, आकर्षक पाठ योजनाएं बनाएं।',
    'module.5.title': 'प्रभावशाली शिक्षण प्रदान करें',
    'module.5.desc': 'गतिविधि-आधारित, जांच-संचालित और परियोजना-आधारित शिक्षण लागू करें जो छात्र जुड़ाव को चलाता है।',
    'module.6.title': 'कक्षा नियंत्रण में महारत हासिल करें',
    'module.6.desc': 'व्यवहार को संभालें, दिनचर्या बनाएं और बिना तनाव के उच्च-जुड़ाव वाली कक्षाएं बनाए रखें।',
    'module.7.title': 'छात्र सुरक्षा और अनुपालन सुनिश्चित करें',
    'module.7.desc': 'POCSO दिशानिर्देश, सुरक्षा प्रोटोकॉल और हर स्कूल द्वारा अपेक्षित व्यावसायिक सीमाएं सीखें।',
    'module.8.title': 'डिजिटल शिक्षण का लाभ उठाएं',
    'module.8.desc': 'LMS प्लेटफॉर्म, स्मार्ट टूल्स और डिजिटल संसाधनों का उपयोग करके ऑनलाइन और ऑफलाइन दोनों को प्रभावी ढंग से सिखाएं।',
    'module.9.title': 'एक पेशेवर की तरह मूल्यांकन करें',
    'module.9.desc': 'रचनात्मक और योगात्मक मूल्यांकन डिजाइन करें, प्रगति को ट्रैक करें और सार्थक प्रतिक्रिया प्रदान करें।',
    'module.10.title': 'साक्षात्कार और डेमो के लिए तैयार हों',
    'module.10.desc': 'मॉक सत्र, डेमो शिक्षण और पोर्टफोलियो निर्माण के साथ साक्षात्कार को क्रैक करें।',
    'module.11.title': 'शिक्षा में अनुसंधान और नवाचार',
    'module.11.desc': 'कार्य अनुसंधान, साक्ष्य-आधारित प्रथाओं और नवीन शिक्षण पद्धतियों की खोज करें ताकि आप शिक्षा में आगे रहें।',
    'module.12.title': 'माता-पिता संचार और जुड़ाव',
    'module.12.desc': 'माता-पिता के साथ प्रभावी संचार में महारत हासिल करें, उत्पादक बैठकें आयोजित करें और मजबूत स्कूल-परिवार भागीदारी बनाएं।',
    'module.13.title': 'विशेष शिक्षा और समावेशी शिक्षण',
    'module.13.desc': 'विविध सीखने की जरूरतों वाले छात्रों का समर्थन करना, पाठ्यक्रम को अनुकूलित करना और समावेशी कक्षा वातावरण बनाना सीखें।',
    'module.14.title': 'वैश्विक दृष्टिकोण और सांस्कृतिक क्षमता',
    'module.14.desc': 'सांस्कृतिक जागरूकता विकसित करें, वैश्विक नागरिकता सिखाएं और अपने पाठ्यक्रम में अंतर्राष्ट्रीय दृष्टिकोण को एकीकृत करें।',
    'module.15.title': 'कैरियर उन्नति और नेतृत्व',
    'module.15.desc': 'अपना व्यावसायिक पोर्टफोलियो बनाएं, नेतृत्व के अवसरों की खोज करें और अपने दीर्घकालिक शिक्षण करियर विकास की योजना बनाएं।',

    // Why Choose Us
    'why.title': '🎯 यह कार्यक्रम क्यों अलग है',
    'why.1': 'NEP 2020 संरेखित + अंतर्राष्ट्रीय शिक्षा',
    'why.2': 'वास्तविक कक्षा सिमुलेशन (केवल सिद्धांत नहीं)',
    'why.3': 'कानूनी और अनुपालन प्रशिक्षण (POCSO शामिल)',
    'why.4': 'अंत-से-अंत शिक्षक तैयारी',
    'why.5': 'नियुक्ति-केंद्रित प्रशिक्षण दृष्टिकोण',
    'why.outcome': '🔶 आप क्या उम्मीद कर सकते हैं',
    'why.outcome.intro': 'इस रूप में बाहर निकलें:',
    'why.outcome.1': 'आत्मविश्वासी कक्षा चिकित्सक',
    'why.outcome.2': 'आधुनिक शिक्षण पद्धतियों में कुशल',
    'why.outcome.3': 'शीर्ष स्कूल साक्षात्कार के लिए तैयार',
    'why.outcome.4': 'दिन 1 से वास्तविक कक्षा चुनौतियों को संभालने में सक्षम',

    // Experts Section
    'experts.title': 'हमारे विशेषज्ञ शिक्षकों से मिलें',
    'experts.subtitle': 'अनुभवी शिक्षकों से सीखें जिन्होंने सैकड़ों शिक्षण करियर को बदल दिया है।',
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
    'audience.title': '🔥 यह किसके लिए है',
    'audience.subtitle': 'Educators Point सभी पृष्ठभूमि से आकांक्षी शिक्षकों के लिए डिज़ाइन किया गया है',
    'audience.1': 'आकांक्षी शिक्षक',
    'audience.2': 'ताजा स्नातक',
    'audience.3': 'करियर स्विचर',
    'audience.4': 'IB / कैम्ब्रिज स्कूलों के लिए लक्ष्य रखने वाले शिक्षक',

    // CTA Section
    'cta.title': '⚡ आपका अगला कदम',
    'cta.subtitle': '👉 केवल शिक्षण न सीखें। रोजगार योग्य बनें। असाधारण बनें।',
    'cta.button': 'अभी नामांकन करें। आत्मविश्वास के साथ शिक्षण शुरू करें।',

    // Footer
    'footer.tagline': 'शिक्षकों को आत्मविश्वासी, कुशल शिक्षकों में बदलना जो शीर्ष स्कूलों के लिए तैयार हैं।',
    'footer.links': 'त्वरित लिंक',
    'footer.support': 'समर्थन',
    'footer.social': 'हमसे जुड़ें',
    'footer.copyright': '© 2026 Educators Point। सर्वाधिकार सुरक्षित। विश्व स्तर पर शिक्षण करियर को बदलना।',

    // Enrollment Page
    'enroll.title': 'Educators Point में नामांकन करें',
    'enroll.subtitle': 'हमारे अगले बैच में शामिल हों और अपने शिक्षण करियर को बदलें। अपनी सीट सुरक्षित करने के लिए नीचे दिया गया फॉर्म भरें।',
    'enroll.form.name': 'पूरा नाम',
    'enroll.form.email': 'ईमेल पता',
    'enroll.form.batch': 'अपना बैच चुनें',
    'enroll.form.terms': 'मैं नियम और शर्तें और गोपनीयता नीति से सहमत हूं',
    'enroll.form.submit': 'अपनी सीट सुरक्षित करें',
    'enroll.form.privacy': 'हम आपकी गोपनीयता का सम्मान करते हैं। आपकी जानकारी केवल नामांकन उद्देश्यों के लिए उपयोग की जाएगी।',
    'enroll.faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
    'enroll.faq.q1': 'इस कार्यक्रम में कौन नामांकन कर सकता है?',
    'enroll.faq.a1': 'यह कार्यक्रम B.Ed छात्रों, B.Ed स्नातकों, गैर-B.Ed स्नातकों और करियर स्विचर के लिए खुला है। शिक्षण के प्रति जुनूनी कोई भी आवेदन कर सकता है।',
    'enroll.faq.q2': 'कार्यक्रम की अवधि क्या है?',
    'enroll.faq.a2': 'कार्यक्रम 8 सप्ताह लंबा है जिसमें दैनिक लाइव सत्र (2-3 घंटे), व्यावहारिक कार्यशालाएं और स्वतंत्र अभ्यास हैं। इसे गहन लेकिन प्रबंधनीय होने के लिए डिज़ाइन किया गया है।',
    'enroll.faq.q3': 'क्या प्लेसमेंट सहायता है?',
    'enroll.faq.a3': 'हां! हम 100% प्लेसमेंट सहायता प्रदान करते हैं जिसमें रिज्यूमे सहायता, साक्षात्कार तैयारी और स्कूल भागीदारों के साथ कनेक्शन शामिल हैं।',
    'enroll.faq.q4': 'कोर्स की फीस क्या है?',
    'enroll.faq.a4': 'कोर्स की फीस बैच के अनुसार अलग-अलग होती है। पहले 20 नामांकन के लिए अर्ली बर्ड डिस्काउंट उपलब्ध हैं। विस्तृत मूल्य जानकारी के लिए हमसे संपर्क करें।',
    'enroll.faq.q5': 'मैं क्या सीखूंगा?',
    'enroll.faq.a5': 'आप पाठ योजना, कक्षा प्रबंधन, शिक्षण पद्धति, डिजिटल उपकरण, संचार कौशल और प्लेसमेंट तैयारी मार्गदर्शन सीखेंगे।',
    'enroll.faq.q6': 'क्या मुझे सर्टिफिकेट मिलेगा?',
    'enroll.faq.a6': 'हां! सफल प्रतिभागियों को व्यावसायिक शिक्षक प्रशिक्षण प्रमाणपत्र के साथ-साथ शिक्षण पोर्टफोलियो और डेमो क्लास रिकॉर्डिंग मिलेगी।',
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
