'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Megaphone,
  MessageSquare,
  Monitor,
  BookOpen,
  Film,
  Globe,
  Smartphone,
  Cloud,
  Mail,
  Star,
  Users,
  Award,
  Phone,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  CheckCircle2,
  Layers,
  PieChart,
  ShoppingCart,
  Lightbulb,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Layout,
  Settings,
  Play,
  MapPin,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

/* ═══════════════════════════════════════════
   COUNTER HOOK
   ═══════════════════════════════════════════ */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return { count, ref };
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
// navLinks moved inside component for i18n access

// featureCards moved inside component for i18n access

// services moved inside component for i18n access

// testimonials moved inside component for i18n access

// faqs moved inside component for i18n access

// stats moved inside component for i18n access

// partners moved inside component for i18n access

// solutions moved inside component for i18n access

/* ═══════════════════════════════════════════
   STAT COUNTER COMPONENT
   ═══════════════════════════════════════════ */
function StatCounter({ value, suffix, label, color = '#818CF8' }: { value: number; suffix: string; label: string; color?: string }) {
  const { count, ref } = useCounter(value);
  const r = 42;
  const circ = 2 * Math.PI * r;
  const pct = value > 0 ? Math.min(count / value, 1) : 0;
  return (
    <div ref={ref} className="text-center flex flex-col items-center">
      <div className="relative w-28 h-28 mb-3">
        <svg className="absolute inset-0 w-full h-full" style={{ transform:'rotate(-90deg)' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5"/>
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={String(circ)}
            strokeDashoffset={String(circ * (1 - pct))}
            style={{ transition:'stroke-dashoffset 0.04s linear', filter:`drop-shadow(0 0 8px ${color}70)` }}/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="stat-number text-3xl text-white leading-none">
            {count}<span className="text-xl" style={{ color }}>{suffix}</span>
          </div>
        </div>
      </div>
      <p className="text-white/50 text-[10px] font-bold tracking-[0.16em] uppercase">{label}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    position: '',
    employees: '',
  });
  const [activeSolution, setActiveSolution] = useState(0);
  const hasInteracted = useRef(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  const { t } = useLanguage();

  const navLinks = [
    { name: t('Home', 'الرئيسية'), href: '#home' },
    { name: t('Solutions', 'الحلول'), href: '#showcase' },
    { name: t('About', 'من نحن'), href: '#about' },
    { name: t('Services', 'الخدمات'), href: '#services' },
    { name: t('Testimonials', 'آراء العملاء'), href: '#testimonials' },
    { name: t('FAQ', 'الأسئلة الشائعة'), href: '#faq' },
    { name: t('Contact', 'تواصل معنا'), href: '#contact' },
  ];

  const services = [
    { icon: BarChart3, title: t('LMS Implementation', 'تطبيق نظام إدارة التعلم'), desc: t('Complete Moodle-based learning management system customized for your institution.', 'نظام إدارة تعلم متكامل قائم على Moodle مخصص لمؤسستك.') },
    { icon: Film, title: t('Animation Studio', 'استوديو الرسوم المتحركة'), desc: t('Professional 2D/3D animated educational content in English, Arabic & Urdu.', 'محتوى تعليمي متحرك احترافي ثنائي وثلاثي الأبعاد بالإنجليزية والعربية والأردية.') },
    { icon: Monitor, title: t('School ERP System', 'نظام تخطيط موارد المدرسة'), desc: t('Comprehensive school management with admissions, HR, finance & reporting.', 'إدارة مدرسية شاملة تتضمن القبول والموارد البشرية والمالية والتقارير.') },
    { icon: Globe, title: t('Web Development', 'تطوير المواقع الإلكترونية'), desc: t('Modern, responsive websites and web applications built for education sector.', 'مواقع وتطبيقات ويب حديثة ومتجاوبة مصممة لقطاع التعليم.') },
    { icon: Smartphone, title: t('Mobile Apps', 'تطبيقات الجوال'), desc: t('Cross-platform mobile applications for students, parents and administrators.', 'تطبيقات جوال متعددة المنصات للطلاب وأولياء الأمور والإداريين.') },
    { icon: Cloud, title: t('Cloud Hosting', 'الاستضافة السحابية'), desc: t('Reliable cloud infrastructure with 99.9% uptime and global CDN delivery.', 'بنية تحتية سحابية موثوقة بوقت تشغيل 99.9% وشبكة توصيل محتوى عالمية.') },
    { icon: Mail, title: t('Digital Marketing', 'التسويق الرقمي'), desc: t('Strategic digital marketing campaigns to increase enrollment and engagement.', 'حملات تسويق رقمي استراتيجية لزيادة التسجيل والتفاعل.') },
    { icon: Users, title: t('Teacher Training', 'تدريب المعلمين'), desc: t('Professional development programs for educators on digital tools and pedagogy.', 'برامج تطوير مهني للمعلمين على الأدوات الرقمية وأساليب التدريس.') },
  ];

  const testimonials = [
    {
      name: t('Dr. Ahmed Al-Rashid', 'د. أحمد الراشد'),
      role: t('Director', 'مدير'),
      company: t('Al-Noor Academy', 'أكاديمية النور'),
      location: t('Saudi Arabia', 'المملكة العربية السعودية'),
      text: t('Cubico transformed our entire school system. The LMS and animated content have dramatically improved student engagement. Their team understood our Islamic education requirements perfectly.', 'حوّلت كيوبيكو نظام مدرستنا بالكامل. أدى نظام إدارة التعلم والمحتوى المتحرك إلى تحسين تفاعل الطلاب بشكل كبير. فهم فريقهم متطلبات التعليم الإسلامي لدينا بشكل مثالي.'),
      rating: 5,
    },
    {
      name: t('Fatima Hassan', 'فاطمة حسن'),
      role: t('Principal', 'مديرة المدرسة'),
      company: t('Iqra Foundation School', 'مدرسة إقرأ التأسيسية'),
      location: t('Pakistan', 'باكستان'),
      text: t('From day one, Cubico delivered beyond our expectations. The ERP system streamlined our operations and the animated Urdu lessons are loved by our students. Truly world-class service.', 'منذ اليوم الأول، قدمت كيوبيكو ما فاق توقعاتنا. نظّم نظام تخطيط الموارد عملياتنا والدروس المتحركة بالأردية يحبها طلابنا. خدمة عالمية المستوى حقاً.'),
      rating: 5,
    },
    {
      name: t('Michael Torres', 'مايكل توريس'),
      role: t('Board Chair', 'رئيس مجلس الإدارة'),
      company: t('Cornwall Islamic Foundation', 'مؤسسة كورنوال الإسلامية'),
      location: t('Canada', 'كندا'),
      text: t('Working with Cubico has been exceptional. They deployed our complete digital infrastructure in just 3 weeks. The ongoing support and training have been invaluable for our staff.', 'كان العمل مع كيوبيكو استثنائياً. نشروا بنيتنا التحتية الرقمية الكاملة في 3 أسابيع فقط. الدعم والتدريب المستمر كانا لا يقدران بثمن لموظفينا.'),
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: t('How quickly can we launch our digital platform?', 'ما مدى سرعة إطلاق منصتنا الرقمية؟'),
      a: t('Most institutions go live within 4 weeks. Our streamlined onboarding process includes data migration, staff training, and content setup — all handled by our dedicated team.', 'تبدأ معظم المؤسسات العمل خلال 4 أسابيع. تتضمن عملية الإعداد المبسطة لدينا نقل البيانات وتدريب الموظفين وإعداد المحتوى — يتولاها فريقنا المتخصص بالكامل.'),
    },
    {
      q: t('Do you support Arabic and Urdu content?', 'هل تدعمون المحتوى بالعربية والأردية؟'),
      a: t('Yes! We specialize in multilingual education content. Our animation studio produces high-quality lessons in English, Arabic, and Urdu with full RTL support across all platforms.', 'نعم! نحن متخصصون في المحتوى التعليمي متعدد اللغات. ينتج استوديو الرسوم المتحركة لدينا دروساً عالية الجودة بالإنجليزية والعربية والأردية مع دعم كامل للكتابة من اليمين لليسار.'),
    },
    {
      q: t('Can we engage Cubico for just one service?', 'هل يمكننا التعاقد مع كيوبيكو لخدمة واحدة فقط؟'),
      a: t('Absolutely. While we offer a full-stack approach, each service — LMS, ERP, animations, web development — can be engaged independently based on your needs.', 'بالتأكيد. بينما نقدم نهجاً شاملاً، يمكن التعاقد على كل خدمة — نظام إدارة التعلم، نظام تخطيط الموارد، الرسوم المتحركة، تطوير الويب — بشكل مستقل حسب احتياجاتك.'),
    },
    {
      q: t('What makes Cubico different from other EdTech providers?', 'ما الذي يميز كيوبيكو عن مزودي تكنولوجيا التعليم الآخرين؟'),
      a: t('We combine deep understanding of Islamic and traditional education with cutting-edge technology. Our team includes educators and technologists who bridge the gap between pedagogy and innovation.', 'نجمع بين الفهم العميق للتعليم الإسلامي والتقليدي والتكنولوجيا المتطورة. يضم فريقنا معلمين وتقنيين يسدون الفجوة بين أساليب التدريس والابتكار.'),
    },
    {
      q: t('Which countries do you operate in?', 'في أي دول تعملون؟'),
      a: t('We actively serve institutions across Pakistan, Saudi Arabia, and Canada. Our cloud-based solutions can be deployed globally with local support teams in each region.', 'نخدم المؤسسات بنشاط في باكستان والمملكة العربية السعودية وكندا. يمكن نشر حلولنا السحابية عالمياً مع فرق دعم محلية في كل منطقة.'),
    },
  ];

  const stats = [
    { value: 760, suffix: '+', label: t('Institutions Served', 'مؤسسة تم خدمتها') },
    { value: 3, suffix: '', label: t('Countries Active', 'دول نشطة') },
    { value: 4, suffix: '', label: t('Weeks Avg Launch', 'أسابيع متوسط الإطلاق') },
    { value: 100, suffix: '%', label: t('Client Retention', 'نسبة الاحتفاظ بالعملاء') },
  ];

  const partners = [
    t('Al-Huffaz Academy', 'أكاديمية الحفاظ'),
    t('Al-Noor Academy', 'أكاديمية النور'),
    t('CIF Canada', 'مؤسسة CIF كندا'),
    t('Iqra Foundation', 'مؤسسة إقرأ'),
    t('Saudi Schools Network', 'شبكة المدارس السعودية'),
    t('TechEd Pakistan', 'تيك إد باكستان'),
  ];

  const solutions = [
    {
      id: 'manage', name: t('Cubico Manage™', 'كيوبيكو إدارة™'),
      tagline: t('Your entire institution. One intelligent system.', 'مؤسستك بالكامل. نظام ذكي واحد.'),
      icon: Layout,
      painPoint: t('Still running your school on Excel sheets and WhatsApp groups?', 'هل لا تزال تدير مدرستك عبر جداول Excel ومجموعات واتساب؟'),
      metric: t('47 hrs', '47 ساعة'), metricLabel: t('saved per staff member, per month', 'يتم توفيرها لكل موظف شهرياً'),
      accentHex: '#D4711A', accentLight: '#FEF0E6',
      demoUrl: 'app.cubico.tech/manage',
      features: [
        { icon: Users,    title: t('Enrollment & Admissions', 'التسجيل والقبول'), desc: t('Full student lifecycle from inquiry to graduation.', 'دورة حياة الطالب الكاملة من الاستفسار إلى التخرج.') },
        { icon: BarChart3,title: t('Fee & Finance', 'الرسوم والمالية'), desc: t('Invoices, payments, and overdue alerts — automated.', 'الفواتير والمدفوعات وتنبيهات التأخر — آلياً.') },
        { icon: PieChart, title: t('Attendance & Exams', 'الحضور والامتحانات'), desc: t('Smart attendance, gradebooks, and exam scheduling.', 'حضور ذكي وسجلات درجات وجدولة امتحانات.') },
        { icon: Settings, title: t('HR & Timetable', 'الموارد البشرية والجدول'), desc: t('Staff records, payroll, and auto-generated schedules.', 'سجلات الموظفين والرواتب والجداول التلقائية.') },
      ],
    },
    {
      id: 'lms', name: t('Moodle LMS Setup', 'إعداد نظام Moodle'),
      tagline: t('Your branded Moodle — configured, hosted, supported.', 'منصة Moodle بعلامتك التجارية — مُعدّة ومستضافة ومدعومة.'),
      icon: BookOpen,
      painPoint: t('Moodle is powerful but complex — setting it up right takes months without the right team.', 'Moodle قوي لكنه معقد — إعداده بشكل صحيح يستغرق أشهراً بدون الفريق المناسب.'),
      metric: t('2 wks', 'أسبوعان'), metricLabel: t('from signup to a fully live Moodle platform', 'من التسجيل إلى منصة Moodle مباشرة بالكامل'),
      accentHex: '#F47B20', accentLight: '#FEF0E6',
      demoUrl: 'lms.cubico.tech/demo',
      features: [
        { icon: Settings,  title: t('Custom Moodle Theme', 'قالب Moodle مخصص'), desc: t('Your logo, colors, and branding — pixel-perfect.', 'شعارك وألوانك وعلامتك التجارية — بدقة متناهية.') },
        { icon: BookOpen,  title: t('Course Build & Migration', 'بناء ونقل المقررات'), desc: t('We build or migrate your course content for you.', 'نبني أو ننقل محتوى مقرراتك نيابة عنك.') },
        { icon: Shield,    title: t('Managed Hosting', 'استضافة مُدارة'), desc: t('Secure cloud hosting with 99.9% uptime guarantee.', 'استضافة سحابية آمنة بضمان وقت تشغيل 99.9%.') },
        { icon: Users,     title: t('Training & Onboarding', 'التدريب والإعداد'), desc: t('Live sessions for teachers and admins, included.', 'جلسات مباشرة للمعلمين والإداريين، مشمولة.') },
      ],
    },
    {
      id: 'teach', name: t('Cubico Teach™', 'كيوبيكو تدريس™'),
      tagline: t("Everything a teacher needs. Nothing they don't.", 'كل ما يحتاجه المعلم. لا شيء لا يحتاجه.'),
      icon: Lightbulb,
      painPoint: t('Teachers spending Sunday nights building lesson plans from scratch?', 'المعلمون يقضون ليالي الأحد في إعداد خطط الدروس من الصفر؟'),
      metric: t('2×', '2×'), metricLabel: t('faster lesson planning from day one', 'تخطيط دروس أسرع من اليوم الأول'),
      accentHex: '#B85E15', accentLight: '#FFF8F0',
      demoUrl: 'app.cubico.tech/teach',
      features: [
        { icon: Lightbulb, title: t('Lesson Plan Builder', 'منشئ خطط الدروس'), desc: t('Drag-and-drop blocks aligned to national curriculum.', 'كتل سحب وإفلات متوافقة مع المنهج الوطني.') },
        { icon: Target,    title: t('Curriculum Mapping', 'خريطة المنهج'), desc: t('Visual scope & sequence across subjects and grades.', 'نطاق وتسلسل مرئي عبر المواد والصفوف.') },
        { icon: BarChart3, title: t('Class Analytics', 'تحليلات الصف'), desc: t('Per-student progress with automatic at-risk flags.', 'تقدم كل طالب مع تنبيهات تلقائية للطلاب المعرضين للخطر.') },
        { icon: Cloud,     title: t('Resource Library', 'مكتبة الموارد'), desc: t('Upload, tag, and share materials across departments.', 'رفع ووسم ومشاركة المواد عبر الأقسام.') },
      ],
    },
    {
      id: 'learn', name: t('Cubico Learn™', 'كيوبيكو تعلّم™'),
      tagline: t('Textbooks come alive.', 'الكتب المدرسية تنبض بالحياة.'),
      icon: Film,
      painPoint: t('Students zoning out 8 minutes into a 40-minute lecture?', 'الطلاب يفقدون التركيز بعد 8 دقائق من محاضرة مدتها 40 دقيقة؟'),
      metric: t('4×', '4×'), metricLabel: t('higher engagement vs. traditional textbooks', 'تفاعل أعلى مقارنة بالكتب المدرسية التقليدية'),
      accentHex: '#C0651A', accentLight: '#FEF0E6',
      demoUrl: 'app.cubico.tech/learn',
      features: [
        { icon: Film,    title: t('2D & 3D Animation', 'رسوم متحركة ثنائية وثلاثية الأبعاد'), desc: t('Character-led animated lessons, any subject.', 'دروس متحركة بقيادة شخصيات، لأي مادة.') },
        { icon: Monitor, title: t('Interactive Simulations', 'محاكاة تفاعلية'), desc: t('STEM labs students can actually manipulate.', 'مختبرات STEM يمكن للطلاب التفاعل معها فعلياً.') },
        { icon: Globe,   title: t('English · Arabic · Urdu', 'الإنجليزية · العربية · الأردية'), desc: t('Full narration and RTL support built in.', 'سرد كامل ودعم الكتابة من اليمين لليسار مدمج.') },
        { icon: Zap,     title: t('Adaptive Quizzes', 'اختبارات تكيفية'), desc: t('End-of-lesson assessments that self-adjust.', 'تقييمات نهاية الدرس التي تتكيف تلقائياً.') },
      ],
    },
    {
      id: 'marketing', name: t('Cubico Marketing™', 'كيوبيكو تسويق™'),
      tagline: t('Fill every seat. Every semester.', 'املأ كل مقعد. كل فصل دراسي.'),
      icon: Megaphone,
      painPoint: t('Your school is incredible. Nobody outside your city knows it exists.', 'مدرستك رائعة. لا أحد خارج مدينتك يعرف بوجودها.'),
      metric: t('+34%', '+34%'), metricLabel: t('average increase in admission enquiries', 'متوسط الزيادة في استفسارات القبول'),
      accentHex: '#8B4513', accentLight: '#FDF5ED',
      demoUrl: 'app.cubico.tech/marketing',
      features: [
        { icon: Globe,      title: t('Premium School Websites', 'مواقع مدرسية متميزة'), desc: t('Conversion-focused, mobile-first, and beautiful.', 'مركزة على التحويل، متوافقة مع الجوال أولاً، وجميلة.') },
        { icon: TrendingUp, title: t('Enrollment Funnels', 'مسارات التسجيل'), desc: t('Google Ads, landing pages, and retargeting.', 'إعلانات جوجل وصفحات الهبوط وإعادة الاستهداف.') },
        { icon: Megaphone,  title: t('Social Media Management', 'إدارة وسائل التواصل الاجتماعي'), desc: t('Content, campaigns, and brand voice.', 'المحتوى والحملات وصوت العلامة التجارية.') },
        { icon: Shield,     title: t('SEO & Monthly Reports', 'تحسين محركات البحث والتقارير الشهرية'), desc: t('Search visibility that compounds over time.', 'ظهور في البحث يتراكم مع مرور الوقت.') },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Hide when scrolling down past 80px, show when scrolling up
      if (y > lastScrollY.current && y > 80) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!hasInteracted.current) {
        setActiveSolution((prev) => (prev + 1) % solutions.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const { error } = await supabase.from('demo_requests').insert([formData]);
      if (error) throw error;
      setFormStatus('success');
      setFormData({ name: '', company: '', phone: '', email: '', position: '', employees: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('newsletter_signups').insert([{ name: newsletterName, email: newsletterEmail }]);
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setNewsletterName('');
  };

  return (
    <>
      <style>{`
        @keyframes float      { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-20px); } }
        @keyframes float2     { 0%,100%{ transform:translateY(-10px); } 50%{ transform:translateY(14px); } }
        @keyframes float3     { 0%,100%{ transform:translateY(-5px) translateX(0); } 50%{ transform:translateY(10px) translateX(-8px); } }
        @keyframes marquee    { 0%{ transform:translateX(0); } 100%{ transform:translateX(-50%); } }
        @keyframes shimmer-slide { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
        @keyframes glow-breath{ 0%,100%{ opacity:0.4; transform:scale(1); } 50%{ opacity:0.75; transform:scale(1.06); } }
        @keyframes spin-slow  { from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
        @keyframes pdrift     { 0%{ transform:translateY(0) scale(1); opacity:0.55; } 100%{ transform:translateY(-110px) translateX(25px) scale(0.3); opacity:0; } }
        @keyframes pdrift2    { 0%{ transform:translateY(0) scale(1); opacity:0.45; } 100%{ transform:translateY(-90px) translateX(-30px) scale(0.2); opacity:0; } }
        .animate-float        { animation:float 7s ease-in-out infinite; }
        .animate-float2       { animation:float2 9s ease-in-out infinite; }
        .animate-float3       { animation:float3 11s ease-in-out infinite; }
        .animate-marquee-slow { animation:marquee 38s linear infinite; }
        .animate-glow-breath  { animation:glow-breath 4.5s ease-in-out infinite; }
        .animate-spin-slow    { animation:spin-slow 22s linear infinite; }
        .shimmer-text {
          background:linear-gradient(90deg,#D4711A 0%,#E88C32 30%,#F4A94D 50%,#E88C32 70%,#D4711A 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer-slide 4s linear infinite;
        }
      `}</style>

      {/* ═══════════ NAVIGATION — Always pill, hides on scroll down ═══════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center px-4"
        style={{
          transform: navHidden ? 'translateY(-120%)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pointer-events-auto mt-3 px-3 sm:px-5 py-2 rounded-full"
          style={{
            background: 'rgba(18,18,20,0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(232,140,50,0.1)',
          }}
        >
          <div className="flex items-center gap-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center font-heading font-bold text-sm text-white shadow-lg shadow-orange-600/25 flex-shrink-0">
                C
              </div>
              <span className="font-heading font-bold text-sm text-white hidden sm:inline whitespace-nowrap">
                Cubico<span className="text-orange-300">.tech</span>
              </span>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-white/[0.1] mx-1.5 hidden lg:block flex-shrink-0" />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[13px] font-medium text-white/55 hover:text-white hover:bg-white/[0.08] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-px h-5 bg-white/[0.1] mx-1.5 hidden lg:block flex-shrink-0" />

            {/* CTA */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4711A] to-[#E88C32] hover:from-[#C0630F] hover:to-[#D4711A] text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(232,140,50,0.4)]"
              >
                {t('Get Started', 'ابدأ الآن')}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-white hover:bg-white/[0.08] transition-colors ml-auto"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu — separate from header so it stays visible */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-4 right-4 z-50 bg-[#1a1a1e]/95 backdrop-blur-xl rounded-2xl border border-orange-500/[0.12] shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-5 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white/70 hover:text-white hover:bg-white/[0.06] font-medium transition-colors px-4 py-3 rounded-xl"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-white/[0.08]">
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4711A] to-[#E88C32] text-white text-sm font-semibold w-full py-3 rounded-xl transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section
        id="home"
        className="relative flex flex-col overflow-hidden"
        style={{ minHeight: '100dvh' }}
      >
        {/* ── Background image — modern ed-tech classroom ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2560&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
          }}
        />
        {/* ── Dark warm overlay ── */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(12,10,8,0.93) 0%, rgba(28,18,10,0.82) 35%, rgba(20,14,10,0.78) 60%, rgba(10,8,6,0.96) 100%)',
          }}
        />

        {/* ── Warm accent glow at center ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 45% at 50% 30%, rgba(232,140,50,0.1) 0%, transparent 70%)',
          }}
        />

        {/* ── Floating atmosphere orbs — warm orange tones ── */}
        <div className="absolute top-[12%] left-[6%] w-72 h-72 rounded-full pointer-events-none animate-float"
          style={{ background:'radial-gradient(circle,rgba(232,140,50,0.14) 0%,transparent 70%)', filter:'blur(60px)' }}/>
        <div className="absolute top-[22%] right-[8%] w-80 h-80 rounded-full pointer-events-none animate-float2"
          style={{ background:'radial-gradient(circle,rgba(212,113,26,0.1) 0%,transparent 70%)', filter:'blur(50px)' }}/>
        <div className="absolute top-[50%] left-[30%] w-96 h-96 rounded-full pointer-events-none animate-float3"
          style={{ background:'radial-gradient(circle,rgba(232,140,50,0.06) 0%,transparent 70%)', filter:'blur(70px)' }}/>

        {/* ── Subtle dot grid overlay ── */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* ═══ CONTENT ═══ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center pt-32 pb-6 px-6"
        >
          {/* Trust badge */}
          <motion.div variants={fadeUp} custom={0} className="mb-5">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[13px] font-medium text-white/75 border border-orange-400/20 bg-orange-900/25 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse flex-shrink-0" />
              Trusted by 760+ Institutions · Pakistan · Saudi Arabia · Canada
            </span>
          </motion.div>

          {/* Headline — smaller, tighter */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-heading font-bold text-white leading-[1.08] tracking-[-0.02em] mb-5 max-w-3xl"
          >
            Give your school the platform
            <br className="hidden sm:block" />
            {' '}it deserves — and your students
            <br className="hidden sm:block" />
            {' '}the education they expect.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-sm md:text-base text-white/55 max-w-lg leading-relaxed mb-8"
          >
            Cubico brings LMS, animated lessons, digital marketing, and complete
            institution management under one intelligent platform.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} custom={3} className="flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4711A] to-[#E88C32] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-orange-600/25 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-200"
            >
              Book Free Demo
              <ArrowRight size={16} />
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium text-sm px-6 py-3.5 rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.05] transition-all duration-200"
            >
              See Products
            </a>
          </motion.div>
        </motion.div>

        {/* ═══ HORIZONTAL SCROLL NARRATIVE — 4 Mini Browser Screens ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full mt-6 pb-8"
        >
          {/* ── Glow behind ── */}
          <div className="absolute inset-0 -top-10 -bottom-10 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(232,140,50,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} />

          {/* ── Horizontal card strip — uses CSS transform for layout, NO scroll ── */}
          <div className="relative flex items-center justify-center py-6 mx-auto" style={{ maxWidth: '100vw' }}>
            {/* Perspective wrapper — all 4 cards in a flex row, sized to fit */}
            <div className="flex items-center gap-4 lg:gap-6" style={{ transform: 'perspective(1200px)' }}>

              {/* ────── SCREEN 1: Login ────── */}
              <div className="hidden md:block flex-shrink-0 w-[250px] lg:w-[280px] rounded-2xl overflow-hidden"
                style={{
                  opacity: 0.7,
                  transform: 'scale(0.92) translateY(8px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
                }}>
                {/* Browser chrome */}
                <div className="bg-[#18161a] px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white/[0.06] rounded px-2 py-0.5">
                    <span className="text-[7px] font-mono text-white/25">lms.cubico.tech/login</span>
                  </div>
                </div>
                {/* Login body */}
                <div className="bg-[#111113] p-4 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center text-white font-bold text-xs mb-1.5 shadow-lg shadow-orange-600/30">C</div>
                  <span className="text-white text-[10px] font-bold mb-0.5">Cubico LMS</span>
                  <span className="text-white/20 text-[7px] mb-4">Sign in to your institution</span>
                  <div className="w-full space-y-2 mb-3">
                    <div className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <svg className="w-2.5 h-2.5 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      <span className="text-[8px] text-white/20">admin@school.edu</span>
                    </div>
                    <div className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <svg className="w-2.5 h-2.5 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                      <span className="text-[8px] text-white/20">••••••••••</span>
                    </div>
                  </div>
                  <div className="w-full bg-gradient-to-r from-[#D4711A] to-[#E88C32] text-white text-[9px] font-bold py-2 rounded-lg text-center shadow-md shadow-orange-700/20">
                    Sign In
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[7px] text-white/15">Forgot password?</span>
                    <span className="text-[7px] text-orange-400/40">Create account</span>
                  </div>
                </div>
              </div>

              {/* ────── SCREEN 2: Dashboard (ACTIVE / CENTER) ────── */}
              <div className="flex-shrink-0 w-[360px] sm:w-[420px] lg:w-[520px] rounded-2xl overflow-hidden relative z-10"
                style={{
                  transform: 'scale(1.06)',
                  boxShadow: '0 30px 100px rgba(0,0,0,0.4), 0 0 0 1.5px rgba(232,140,50,0.3), 0 0 60px rgba(232,140,50,0.06)',
                }}>
                {/* Browser chrome */}
                <div className="bg-[#18161a] px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white/[0.06] rounded px-2 py-0.5 flex items-center gap-1.5">
                    <svg className="w-2.5 h-2.5 text-orange-400/50 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                    <span className="text-[8px] font-mono text-white/30">lms.cubico.tech/dashboard</span>
                  </div>
                </div>
                {/* Dashboard body */}
                <div className="flex bg-[#FAFAFA]">
                  {/* Sidebar */}
                  <div className="w-[110px] lg:w-[120px] flex-shrink-0 bg-[#1a1310] flex-col py-3 hidden sm:flex">
                    <div className="flex items-center gap-1.5 px-3 mb-4">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center text-[7px] text-white font-bold">C</div>
                      <span className="text-[8px] text-white font-bold">Cubico</span>
                    </div>
                    {[
                      { l: 'Dashboard', active: true },
                      { l: 'Courses' },
                      { l: 'Students' },
                      { l: 'Grades' },
                      { l: 'Calendar' },
                      { l: 'Messages' },
                      { l: 'Settings' },
                    ].map(n => (
                      <div key={n.l} className={`mx-2 px-2 py-1.5 rounded-md text-[8px] font-medium mb-0.5 ${
                        n.active ? 'bg-orange-500/15 text-orange-300' : 'text-white/25'
                      }`}>{n.l}</div>
                    ))}
                  </div>
                  {/* Main */}
                  <div className="flex-1 flex flex-col min-w-0">
                    {/* Welcome banner */}
                    <div className="m-2.5 bg-gradient-to-r from-[#8B4513] via-[#C0651A] to-[#E88C32] rounded-xl p-3 relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/[0.06]" />
                      <div className="absolute -right-1 -bottom-6 w-14 h-14 rounded-full bg-white/[0.04]" />
                      <div className="relative flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-orange-200/60 text-[7px] font-medium">Welcome back</div>
                          <div className="text-white font-bold text-[11px]">Admin Khan</div>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                          {[
                            { v: '1,284', l: 'Learners' },
                            { v: '78%', l: 'Progress' },
                            { v: 'B+', l: 'Avg Grade' },
                          ].map(s => (
                            <div key={s.l} className="bg-white/[0.12] rounded-lg px-2 py-1.5 text-center border border-white/[0.06]">
                              <div className="text-white font-bold text-[9px] leading-none">{s.v}</div>
                              <div className="text-white/30 text-[5px] mt-0.5">{s.l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* 3×2 Course grid */}
                    <div className="grid grid-cols-3 gap-1.5 px-2.5 pb-2.5">
                      {[
                        { name: 'Mathematics 101', students: 45, progress: 82, color: '#D4711A' },
                        { name: 'English Literature', students: 38, progress: 65, color: '#E76F51' },
                        { name: 'Physics Lab', students: 32, progress: 91, color: '#2563EB' },
                        { name: 'Islamic Studies', students: 52, progress: 74, color: '#B8860B' },
                        { name: 'Computer Science', students: 41, progress: 88, color: '#E88C32' },
                        { name: 'Arabic Language', students: 36, progress: 70, color: '#7C3AED' },
                      ].map(c => (
                        <div key={c.name} className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                            <span className="text-[6px] font-bold text-gray-700 truncate">{c.name}</span>
                          </div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[5px] text-gray-400">{c.students} students</span>
                            <span className="text-[6px] font-bold" style={{ color: c.color }}>{c.progress}%</span>
                          </div>
                          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${c.progress}%`, backgroundColor: c.color, opacity: 0.85 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ────── SCREEN 3: Course View ────── */}
              <div className="hidden sm:block flex-shrink-0 w-[250px] lg:w-[280px] rounded-2xl overflow-hidden"
                style={{
                  opacity: 0.7,
                  transform: 'scale(0.92) translateY(8px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
                }}>
                {/* Browser chrome */}
                <div className="bg-[#18161a] px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white/[0.06] rounded px-2 py-0.5">
                    <span className="text-[7px] font-mono text-white/25">lms.cubico.tech/course/math-101</span>
                  </div>
                </div>
                {/* Course body */}
                <div className="bg-[#FAFAFA]">
                  {/* Course header */}
                  <div className="bg-gradient-to-r from-[#8B4513] to-[#D4711A] p-3">
                    <div className="text-[7px] text-orange-200/50 font-medium mb-0.5">STEM · Mathematics</div>
                    <div className="text-white font-bold text-[11px] mb-2">Mathematics 101</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/[0.15] rounded-full overflow-hidden">
                        <div className="h-full w-[65%] bg-gradient-to-r from-orange-200 to-orange-300 rounded-full" />
                      </div>
                      <span className="text-[8px] text-orange-100 font-bold">65%</span>
                    </div>
                  </div>
                  {/* Lesson list */}
                  <div className="p-2.5 space-y-1">
                    {[
                      { name: 'Intro to Algebra', done: true },
                      { name: 'Linear Equations', done: true },
                      { name: 'Quadratic Functions', done: true },
                      { name: 'Polynomials', done: false, current: true },
                      { name: 'Trigonometry Basics', done: false },
                      { name: 'Statistics & Probability', done: false },
                    ].map((lesson, i) => (
                      <div key={i} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[8px] ${
                        lesson.current ? 'bg-orange-50 border border-orange-200' : 'bg-white border border-gray-100'
                      }`}>
                        {lesson.done ? (
                          <div className="w-3 h-3 rounded-full bg-[#D4711A] flex items-center justify-center flex-shrink-0">
                            <svg className="w-1.5 h-1.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                          </div>
                        ) : (
                          <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${lesson.current ? 'border-orange-400 bg-orange-100' : 'border-gray-200'}`} />
                        )}
                        <span className={`font-medium truncate ${lesson.done ? 'text-gray-400 line-through' : lesson.current ? 'text-orange-700' : 'text-gray-500'}`}>{lesson.name}</span>
                        {lesson.current && <span className="ml-auto text-[6px] bg-[#D4711A] text-white px-1 py-0.5 rounded font-bold flex-shrink-0">NOW</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ────── SCREEN 4: Grades ────── */}
              <div className="hidden lg:block flex-shrink-0 w-[250px] lg:w-[280px] rounded-2xl overflow-hidden"
                style={{
                  opacity: 0.45,
                  transform: 'scale(0.88) translateY(12px)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.03)',
                }}>
                {/* Browser chrome */}
                <div className="bg-[#18161a] px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white/[0.06] rounded px-2 py-0.5">
                    <span className="text-[7px] font-mono text-white/25">lms.cubico.tech/grades</span>
                  </div>
                </div>
                {/* Grades body */}
                <div className="bg-[#FAFAFA] p-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-bold text-gray-700">Grade Report</span>
                    <span className="text-[6px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-semibold">Spring 2026</span>
                  </div>
                  {/* Table */}
                  <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-4 gap-px bg-gray-50 border-b border-gray-100 px-2 py-1">
                      {['Student', 'Math', 'Eng', 'Sci'].map(h => (
                        <span key={h} className="text-[6px] font-bold text-gray-400 uppercase tracking-wider">{h}</span>
                      ))}
                    </div>
                    {/* Rows */}
                    {[
                      { name: 'Sara Ahmed', math: 'A', eng: 'A-', sci: 'B+', colors: ['#059669','#059669','#D4711A'] },
                      { name: 'Omar Khan', math: 'B+', eng: 'A', sci: 'A-', colors: ['#D4711A','#059669','#059669'] },
                      { name: 'Aisha Ali', math: 'A-', eng: 'B', sci: 'A', colors: ['#059669','#B8860B','#059669'] },
                      { name: 'Hassan M.', math: 'B', eng: 'B+', sci: 'B-', colors: ['#B8860B','#D4711A','#B8860B'] },
                      { name: 'Fatima Z.', math: 'A+', eng: 'A', sci: 'A+', colors: ['#059669','#059669','#059669'] },
                      { name: 'Yusuf R.', math: 'C+', eng: 'B-', sci: 'B', colors: ['#E76F51','#B8860B','#B8860B'] },
                    ].map((row, ri) => (
                      <div key={ri} className={`grid grid-cols-4 gap-px px-2 py-1 items-center ${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50 last:border-0`}>
                        <span className="text-[7px] font-medium text-gray-600 truncate">{row.name}</span>
                        {[row.math, row.eng, row.sci].map((grade, gi) => (
                          <span key={gi} className="text-[7px] font-bold px-1 py-0.5 rounded text-center w-fit" style={{
                            color: row.colors[gi],
                            backgroundColor: row.colors[gi] + '12',
                          }}>{grade}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Summary */}
                  <div className="mt-2 flex gap-1.5">
                    {[
                      { label: 'Class Avg', value: 'B+', color: '#D4711A' },
                      { label: 'Top Perf.', value: '86%', color: '#059669' },
                    ].map(s => (
                      <div key={s.label} className="flex-1 bg-white rounded-lg p-1.5 border border-gray-100 text-center">
                        <div className="text-[9px] font-bold" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[5px] text-gray-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── Soft edge fade masks that match the dark hero bg ── */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-20" style={{ background: 'linear-gradient(to right, rgba(12,10,8,0.7), transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-20" style={{ background: 'linear-gradient(to left, rgba(12,10,8,0.7), transparent)' }} />
        </motion.div>
      </section>

      {/* ═══════════ WHAT IS CUBICO — Psychological Context Section ═══════════ */}
      <section className="pt-24 pb-24 bg-white relative z-10 overflow-hidden">
        {/* Subtle warm radial bg accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(232,140,50,0.04) 0%, transparent 70%)',
        }} />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">

          {/* ── Section Header — emotional hook ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="text-center mb-8"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                Why Cubico
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-bold text-gray-900 leading-[1.1] tracking-tight mb-5"
            >
              Schools don&apos;t need more tools.<br className="hidden sm:block" />
              They need <span className="shimmer-text">one platform that works.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Most institutions juggle disconnected systems — one for learning, another for admin,
              another for content. Cubico replaces all of them with a single intelligent platform
              built specifically for education.
            </motion.p>
          </motion.div>

          {/* ── Social proof mini-strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-14"
          >
            {[
              { value: '760+', label: 'Institutions' },
              { value: '85K+', label: 'Active Students' },
              { value: '99.9%', label: 'Uptime' },
              { value: '3', label: 'Countries' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gray-50 border border-gray-100">
                <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs text-gray-400">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── Problem → Solution Cards ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                icon: BookOpen,
                label: 'LEARN',
                title: 'Smart LMS',
                problem: 'Students lose interest in outdated, static course materials.',
                solution: 'AI-powered learning paths with progress tracking, interactive courses, and real-time analytics that keep students engaged.',
                accent: '#D4711A',
                gradient: 'linear-gradient(135deg, #D4711A, #E88C32)',
                iconBg: 'bg-orange-50',
              },
              {
                icon: Film,
                label: 'CREATE',
                title: 'Animated Lessons',
                problem: 'Teachers spend hours creating content that still doesn\'t land.',
                solution: 'Professional 2D & 3D animated lessons in English, Arabic & Urdu — ready to deploy across any curriculum.',
                accent: '#C0651A',
                gradient: 'linear-gradient(135deg, #C0651A, #D4711A)',
                iconBg: 'bg-amber-50',
              },
              {
                icon: Monitor,
                label: 'MANAGE',
                title: 'School ERP',
                problem: 'Admin staff drowns in spreadsheets and disconnected systems.',
                solution: 'All-in-one operations — admissions, attendance, HR, finance, and reporting in a single dashboard.',
                accent: '#8B4513',
                gradient: 'linear-gradient(135deg, #8B4513, #B8651A)',
                iconBg: 'bg-orange-50/70',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-default"
              >
                {/* Top accent bar */}
                <div className="h-1" style={{ background: card.gradient }} />

                <div className="p-7 lg:p-8">
                  {/* Label + Icon row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: card.accent }}>
                      {card.label}
                    </span>
                    <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                      <card.icon className="w-5 h-5" style={{ color: card.accent }} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">{card.title}</h3>

                  {/* Problem */}
                  <div className="mb-4 pl-3 border-l-2 border-red-200/60">
                    <p className="text-[13px] text-gray-400 leading-relaxed italic">
                      &ldquo;{card.problem}&rdquo;
                    </p>
                  </div>

                  {/* Solution */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {card.solution}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-200" style={{ color: card.accent }}>
                    Explore {card.title} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 0%, ${card.accent}06 0%, transparent 65%)` }} />
              </motion.div>
            ))}
          </motion.div>

          {/* ── Bottom reinforcement line ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-14 text-center"
          >
            <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
              Built for Pakistan, Saudi Arabia & Canada — supporting English, Arabic & Urdu curricula out of the box.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SOLUTIONS SHOWCASE ═══════════ */}
      <section id="showcase" className="py-20 bg-white relative overflow-hidden">

        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #E5E5F0 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── SECTION HEADER ── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer} className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                Product Suite
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl md:text-4xl lg:text-[2.8rem] font-heading font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              Five products.{' '}
              <span className="shimmer-text">One ecosystem.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
              Each tool is purpose-built for education. Together, they run your entire institution — from classroom to admin office to marketing.
            </motion.p>
          </motion.div>

          {/* ── TAB RAIL ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-1 mb-10 justify-start lg:justify-center">
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              const active = activeSolution === i;
              return (
                <button key={sol.id}
                  onClick={() => { hasInteracted.current = true; setActiveSolution(i); }}
                  className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 whitespace-nowrap"
                  style={active
                    ? { backgroundColor: sol.accentHex, borderColor: sol.accentHex, color: '#fff', boxShadow: '0 4px 16px ' + sol.accentHex + '50' }
                    : { backgroundColor: '#fff', borderColor: '#E5E7EB', color: '#6B7280' }}>
                  <Icon size={15} />
                  {sol.name}
                </button>
              );
            })}
          </motion.div>

          {/* ── SHOWCASE STAGE ── */}
          <AnimatePresence mode="wait">
            {solutions.map((sol, i) => activeSolution !== i ? null : (
              <motion.div key={sol.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>

                <div className="grid lg:grid-cols-[42%_58%] gap-10 lg:gap-16 items-start">

                  {/* LEFT — narrative column */}
                  <div className="pt-2">
                    {/* Product icon badge */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
                      style={{ backgroundColor: sol.accentLight }}>
                      {(() => { const SolIcon = sol.icon; return <SolIcon size={26} style={{ color: sol.accentHex }} />; })()}
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900 mb-2">{sol.name}</h3>
                    <p className="text-base font-medium mb-5" style={{ color: sol.accentHex }}>{sol.tagline}</p>

                    {/* Pain point callout */}
                    <div className="rounded-2xl p-4 mb-6 bg-gray-50 border-l-4 border-gray-300">
                      <p className="text-sm text-gray-500 italic leading-relaxed">&ldquo;{sol.painPoint}&rdquo;</p>
                    </div>

                    {/* Headline outcome metric */}
                    <div className="inline-flex items-end gap-3 mb-6 p-4 rounded-2xl border"
                      style={{ backgroundColor: sol.accentLight + 'BB', borderColor: sol.accentHex + '25' }}>
                      <span className="font-heading font-bold leading-none"
                        style={{ fontSize: '2.5rem', color: sol.accentHex }}>{sol.metric}</span>
                      <span className="text-xs text-gray-500 leading-snug pb-1 max-w-[140px]">{sol.metricLabel}</span>
                    </div>

                    {/* Feature bullets */}
                    <ul className="space-y-3 mb-8">
                      {sol.features.map(feat => {
                        const FIcon = feat.icon;
                        return (
                          <li key={feat.title} className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: sol.accentLight }}>
                              <FIcon size={13} style={{ color: sol.accentHex }} />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-gray-800">{feat.title}</span>
                              <span className="text-sm text-gray-400"> — {feat.desc}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <a href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: sol.accentHex }}>
                      Book a Live Demo
                      <ArrowRight size={15} />
                    </a>
                  </div>

                  {/* RIGHT — Illustrated Mockup */}
                  <div className="relative">

                    {/* Browser chrome wrapper */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200/80"
                      style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.11), 0 4px 16px rgba(0,0,0,0.06)' }}>

                      {/* Chrome bar */}
                      <div className="bg-[#1C1C2E] px-3 py-2.5 flex items-center gap-2.5">
                        <div className="flex gap-1.5 flex-shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"/>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"/>
                        </div>
                        <div className="flex-1 bg-white/[0.06] rounded px-2.5 py-1 flex items-center gap-1.5 min-w-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0"/>
                          <span className="text-[10px] font-mono text-white/30 truncate">{sol.demoUrl}</span>
                        </div>
                      </div>

                      {/* ══ MANAGE MOCKUP ══ */}
                      {sol.id === 'manage' && (
                        <div className="flex bg-[#F4F5F7]" style={{ minHeight: '360px' }}>
                          {/* Sidebar */}
                          <div className="w-[152px] flex-shrink-0 bg-[#1A0E04] flex flex-col py-3 hidden sm:flex">
                            <div className="flex items-center gap-1.5 px-3 mb-4">
                              <div className="w-5 h-5 rounded-md bg-[#D4711A] flex items-center justify-center text-white text-[8px] font-bold">C</div>
                              <span className="text-white text-xs font-bold">Cubico</span>
                            </div>
                            {[['Dashboard',true],['Students',false],['Fee & Finance',false],['Attendance',false],['HR & Staff',false],['Reports',false]].map(([label, active]) => (
                              <div key={String(label)} className="flex items-center gap-2 px-3 py-1.5 mx-1.5 rounded-lg text-[10px] mb-0.5"
                                style={active ? { backgroundColor: 'rgba(212,113,26,0.18)', color: '#E88C32' } : { color: 'rgba(255,255,255,0.30)' }}>
                                <span className="w-1 h-1 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: active ? '#D4711A' : 'rgba(255,255,255,0.15)' }}/>
                                {String(label)}
                              </div>
                            ))}
                          </div>
                          {/* Main */}
                          <div className="flex-1 flex flex-col min-w-0 p-3 gap-2.5">
                            {/* KPI row */}
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { label: 'Students',      value: '2,847', color: '#D4711A', bg: '#FEF0E6' },
                                { label: 'Fee Collected', value: '₨4.2M', color: '#059669', bg: '#ECFDF5' },
                                { label: 'Attendance',    value: '94.3%', color: '#B85E15', bg: '#FFF8F0' },
                              ].map(k => (
                                <div key={k.label} className="rounded-xl p-2.5 border border-white shadow-sm" style={{ backgroundColor: k.bg }}>
                                  <div className="text-[8px] text-gray-400 mb-0.5">{k.label}</div>
                                  <div className="font-bold text-sm leading-none" style={{ color: k.color }}>{k.value}</div>
                                </div>
                              ))}
                            </div>
                            {/* Student table */}
                            <div className="flex-1 bg-white rounded-xl border border-gray-100 overflow-hidden">
                              <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-600">Recent Enrollments</span>
                                <span className="text-[8px] text-[#D4711A] bg-orange-50 px-2 py-0.5 rounded-full cursor-default">View All</span>
                              </div>
                              <div className="divide-y divide-gray-50">
                                {[
                                  { name: 'Ahmed Raza',  grade: 'Grade 8A', fee: 'Paid',    fc: '#059669' },
                                  { name: 'Sara Khan',   grade: 'Grade 7B', fee: 'Pending', fc: '#D97706' },
                                  { name: 'Ali Hassan',  grade: 'Grade 9C', fee: 'Paid',    fc: '#059669' },
                                  { name: 'Fatima Noor', grade: 'Grade 6A', fee: 'Overdue', fc: '#E11D48' },
                                ].map((s, si) => (
                                  <div key={s.name} className="flex items-center gap-2 px-3 py-1.5">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                                      style={{ backgroundColor: ['#D4711A','#B85E15','#059669','#E11D48'][si] }}>
                                      {s.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-[10px] font-semibold text-gray-700 truncate">{s.name}</div>
                                      <div className="text-[8px] text-gray-400">{s.grade}</div>
                                    </div>
                                    <div className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                                      style={{ color: s.fc, backgroundColor: s.fc + '18' }}>{s.fee}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Attendance mini-chart */}
                            <div className="bg-white rounded-xl border border-gray-100 p-2.5">
                              <div className="text-[9px] font-semibold text-gray-500 mb-2">Weekly Attendance</div>
                              <div className="flex items-end gap-1 h-9">
                                {[88,92,87,95,94,91,96].map((v, i) => (
                                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: v + '%', backgroundColor: i === 6 ? '#D4711A' : '#FEF0E6' }}/>
                                ))}
                              </div>
                              <div className="flex mt-1">
                                {['M','T','W','T','F','S','S'].map((d, i) => (
                                  <div key={i} className="flex-1 text-center text-[7px] text-gray-300">{d}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ══ MOODLE LMS MOCKUP ══ */}
                      {sol.id === 'lms' && (
                        <div className="bg-white" style={{ minHeight: '360px' }}>
                          {/* Moodle top nav */}
                          <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #F47B20 0%, #E05E00 100%)' }}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                                <span className="text-white text-[9px] font-black">M</span>
                              </div>
                              <div>
                                <div className="text-white text-[10px] font-bold leading-none">Al-Noor Academy</div>
                                <div className="text-white/60 text-[8px]">Moodle LMS · Powered by Cubico</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-[9px]">A</div>
                              <span className="text-white/70 text-[9px]">Admin</span>
                            </div>
                          </div>
                          {/* Content */}
                          <div className="p-3">
                            <div className="flex items-center justify-between mb-2.5">
                              <span className="text-[10px] font-bold text-gray-700">My Courses</span>
                              <span className="text-[9px] font-semibold cursor-default" style={{ color: '#F47B20' }}>+ Add Course</span>
                            </div>
                            {/* Course grid 3x2 */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              {[
                                { name: 'Mathematics', grade: 'Grade 8', color: '#D4711A', bg: '#FEF0E6', pct: 78, students: 34 },
                                { name: 'Physics',     grade: 'Grade 9', color: '#0891B2', bg: '#ECFEFF', pct: 92, students: 28 },
                                { name: 'English',     grade: 'Grade 7', color: '#059669', bg: '#ECFDF5', pct: 65, students: 41 },
                                { name: 'Chemistry',   grade: 'Grade 10',color: '#E11D48', bg: '#FFF1F2', pct: 45, students: 22 },
                                { name: 'Urdu',        grade: 'Grade 8', color: '#D97706', bg: '#FFFBEB', pct: 88, students: 38 },
                                { name: 'Biology',     grade: 'Grade 9', color: '#B85E15', bg: '#FFF8F0', pct: 55, students: 30 },
                              ].map(c => (
                                <div key={c.name} className="rounded-xl overflow-hidden border border-gray-100 cursor-default hover:shadow-sm transition-shadow">
                                  <div className="h-9 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: c.bg }}>
                                    <span className="text-lg font-black leading-none" style={{ color: c.color + '40' }}>{c.name.slice(0,2).toUpperCase()}</span>
                                    <div className="absolute bottom-1 right-1.5 text-[7px] font-bold px-1 py-0.5 rounded-full text-white" style={{ backgroundColor: c.color }}>{c.pct}%</div>
                                  </div>
                                  <div className="p-1.5 bg-white">
                                    <div className="text-[8px] font-bold text-gray-700 truncate">{c.name}</div>
                                    <div className="text-[7px] text-gray-400">{c.grade} · {c.students} students</div>
                                    <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                      <div className="h-full rounded-full" style={{ width: c.pct + '%', backgroundColor: c.color }}/>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Activity feed */}
                            <div className="bg-gray-50 rounded-xl p-2.5 mb-3">
                              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2">Recent Activity</div>
                              {[
                                { text: 'Ahmed submitted “Week 3 Quiz”',   time: '5m ago',  color: '#D4711A' },
                                { text: 'New assignment: Chapter 4 Review', time: '1h ago',  color: '#F47B20' },
                                { text: 'Sara viewed Lesson 7 Video',       time: '2h ago',  color: '#0891B2' },
                                { text: '6 students completed Module 2',    time: '3h ago',  color: '#059669' },
                              ].map((a, ai) => (
                                <div key={ai} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
                                  <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: a.color }}/>
                                  <div className="flex-1 flex items-center justify-between gap-2">
                                    <span className="text-[8px] text-gray-600 leading-snug">{a.text}</span>
                                    <span className="text-[7px] text-gray-400 flex-shrink-0">{a.time}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Powered by badges */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border" style={{ backgroundColor: '#FEF0E6', borderColor: '#F47B20' + '40' }}>
                                <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F47B20' }}>
                                  <span className="text-white text-[7px] font-black">M</span>
                                </div>
                                <span className="text-[9px] font-bold" style={{ color: '#F47B20' }}>Powered by Moodle™</span>
                              </div>
                              <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border" style={{ backgroundColor: '#FEF0E6', borderColor: '#D4711A' + '40' }}>
                                <div className="w-3.5 h-3.5 rounded-md bg-[#D4711A] flex items-center justify-center text-white text-[7px] font-bold">C</div>
                                <span className="text-[9px] font-bold text-[#D4711A]">Setup by Cubico</span>
                              </div>
                              <div className="flex items-center gap-1 rounded-full px-2 py-1 bg-emerald-50 border border-emerald-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                                <span className="text-[8px] font-semibold text-emerald-600">Live in 2 weeks</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ══ TEACH MOCKUP ══ */}
                      {sol.id === 'teach' && (
                        <div className="bg-[#F8FBFC]" style={{ minHeight: '360px' }}>
                          {/* Toolbar */}
                          <div className="bg-white border-b border-gray-100 px-3 py-2 flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-700">Lesson Plan Builder</span>
                            <div className="flex-1"/>
                            <span className="text-[8px] text-white rounded-full px-2.5 py-1 cursor-default" style={{ backgroundColor: '#B85E15' }}>Save Draft</span>
                          </div>
                          <div className="flex gap-3 p-3">
                            {/* Lesson blocks */}
                            <div className="flex-1">
                              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Week 3 · Grade 6 Mathematics</div>
                              {[
                                { label: 'Learning Objective',   emoji: '🎯', color: '#B85E15', desc: 'Students will understand fractions and mixed numbers' },
                                { label: 'Introduction (10 min)',emoji: '📖', color: '#B85E15', desc: 'Warm-up: review whole numbers with visual aids' },
                                { label: 'Main Activity (20 min)',emoji: '⚡',      color: '#D97706', desc: 'Group work: pizza fraction exercise with worksheets' },
                                { label: 'Assessment',           emoji: '✅',      color: '#059669', desc: 'Exit ticket: 5 fraction problems — auto-graded' },
                              ].map((block, bi) => (
                                <div key={bi} className="flex items-start gap-2 mb-2 bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                                    style={{ backgroundColor: block.color + '15' }}>
                                    {block.emoji}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[9px] font-bold text-gray-700">{block.label}</div>
                                    <div className="text-[8px] text-gray-400 mt-0.5 leading-snug">{block.desc}</div>
                                  </div>
                                  <div className="text-gray-200 text-xs flex-shrink-0 cursor-grab">⋮⋮</div>
                                </div>
                              ))}
                              <div className="border-2 border-dashed border-gray-200 rounded-xl p-2 flex items-center justify-center gap-1.5 cursor-default">
                                <span className="text-gray-300 text-sm">+</span>
                                <span className="text-[9px] text-gray-300">Add Block</span>
                              </div>
                            </div>
                            {/* At-risk + chart panel */}
                            <div className="w-[118px] flex-shrink-0 flex flex-col gap-2">
                              <div className="bg-white rounded-xl border border-gray-100 p-2.5">
                                <div className="text-[9px] font-bold text-gray-500 mb-2">At-Risk Alerts</div>
                                {[
                                  { name: 'Ali M.',   issue: 'Missed 3 lessons', color: '#E11D48' },
                                  { name: 'Sara K.',  issue: '< 60% quiz avg',   color: '#D97706' },
                                  { name: 'Umar B.',  issue: 'Low attendance',   color: '#D97706' },
                                ].map(s => (
                                  <div key={s.name} className="flex items-start gap-1.5 mb-2 last:mb-0">
                                    <div className="w-1.5 h-1.5 rounded-full mt-0.5 flex-shrink-0" style={{ backgroundColor: s.color }}/>
                                    <div>
                                      <div className="text-[8px] font-semibold text-gray-700">{s.name}</div>
                                      <div className="text-[7px] text-gray-400 leading-tight">{s.issue}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="bg-white rounded-xl border border-gray-100 p-2.5">
                                <div className="text-[9px] font-bold text-gray-500 mb-2">Class Avg</div>
                                <div className="flex items-end gap-1 h-12">
                                  {[72,85,68,92,78,88].map((v, i) => (
                                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: v + '%', backgroundColor: i === 3 ? '#B85E15' : '#FEF0E6' }}/>
                                  ))}
                                </div>
                                <div className="text-[8px] font-bold text-center mt-1" style={{ color: '#B85E15' }}>76.4% avg</div>
                              </div>
                              <div className="bg-white rounded-xl border border-gray-100 p-2">
                                <div className="text-[8px] font-bold text-gray-400 mb-1.5">Curriculum</div>
                                {[
                                  { sub: 'Mathematics', pct: 68, color: '#0891B2' },
                                  { sub: 'Science',     pct: 82, color: '#059669' },
                                  { sub: 'English',     pct: 55, color: '#D4711A' },
                                ].map(c => (
                                  <div key={c.sub} className="mb-1.5 last:mb-0">
                                    <div className="flex justify-between mb-0.5">
                                      <span className="text-[7px] text-gray-400">{c.sub}</span>
                                      <span className="text-[7px] font-bold" style={{ color: c.color }}>{c.pct}%</span>
                                    </div>
                                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                      <div className="h-full rounded-full" style={{ width: c.pct + '%', backgroundColor: c.color }}/>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ══ LEARN MOCKUP ══ */}
                      {sol.id === 'learn' && (
                        <div style={{ minHeight: '360px', backgroundColor: '#0D0D1F' }}>
                          {/* Language + title bar */}
                          <div className="bg-[#1A1A2E] px-3 py-2 flex items-center gap-2 border-b border-white/[0.06]">
                            <div className="flex gap-1">
                              {['EN','AR','UR'].map(lang => (
                                <div key={lang} className="text-[8px] px-1.5 py-0.5 rounded font-bold"
                                  style={lang === 'EN' ? { backgroundColor: '#C0651A', color: '#fff' } : { backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }}>
                                  {lang}
                                </div>
                              ))}
                            </div>
                            <div className="flex-1 text-[8px] text-white/35 text-center">Chapter 3: Fractions · Grade 6 Math</div>
                            <div className="text-[8px] text-white/25 border border-white/10 rounded px-1.5 py-0.5">HD</div>
                          </div>
                          {/* Animation stage */}
                          <div className="relative p-3" style={{ minHeight: '200px' }}>
                            {/* Scene bg */}
                            <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a4e 0%, #2d1b69 50%, #4a1e8a 100%)', minHeight: '180px', position: 'relative' }}>
                              {/* Stars */}
                              {[[10,8],[35,14],[65,7],[85,18],[25,22],[55,11],[78,5],[48,26]].map(([x,y], i) => (
                                <div key={i} className="absolute rounded-full bg-white"
                                  style={{ width: i % 3 === 0 ? '2px' : '1.5px', height: i % 3 === 0 ? '2px' : '1.5px', left: x+'%', top: y+'%', opacity: 0.5 + (i * 0.06) }}/>
                              ))}
                              {/* Chalkboard */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rounded-xl border-4 p-4 w-48 shadow-2xl"
                                  style={{ backgroundColor: '#1E3A2E', borderColor: '#2D5040' }}>
                                  <div className="text-center">
                                    <div className="text-white/80 font-mono font-bold mb-3" style={{ fontSize: '1.1rem' }}>&frac12; + &frac14; = ?</div>
                                    <div className="flex items-center justify-center gap-2">
                                      {['½', '+', '¼', '=', '¾'].map((sym, si) => (
                                        <div key={si} className={si === 2 || si === 0 ? 'w-7 h-7 rounded-lg flex items-center justify-center text-xs' : si === 4 ? 'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold' : 'text-white/40 text-sm'}
                                          style={si === 0 || si === 2 ? { backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' } : si === 4 ? { backgroundColor: 'rgba(192,101,26,0.3)', border: '1px solid rgba(192,101,26,0.5)', color: '#C0651A' } : {}}>
                                          {sym}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Animated character SVG */}
                              <div className="absolute bottom-2 left-4">
                                <svg width="44" height="66" viewBox="0 0 44 66" fill="none">
                                  <ellipse cx="22" cy="42" rx="11" ry="15" fill="#F97316"/>
                                  <circle cx="22" cy="20" r="11" fill="#FBBF24"/>
                                  <circle cx="18.5" cy="18" r="2" fill="#1F2937"/>
                                  <circle cx="25.5" cy="18" r="2" fill="#1F2937"/>
                                  <path d="M17.5 23 Q22 27.5 26.5 23" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                                  <path d="M11 39 L4 31" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round"/>
                                  <path d="M33 37 L41 27" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round"/>
                                  <line x1="41" y1="27" x2="47" y2="20" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                                  <path d="M17 56 L14 66" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round"/>
                                  <path d="M27 56 L30 66" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round"/>
                                </svg>
                              </div>
                              {/* Quiz popup */}
                              <div className="absolute top-3 right-3 bg-white rounded-xl shadow-lg p-2.5 w-28">
                                <div className="text-[8px] font-bold text-gray-700 mb-1.5">Quick Check ✓</div>
                                {['¾','½','1¼'].map((opt, oi) => (
                                  <div key={opt} className="flex items-center gap-1.5 mb-1 last:mb-0 rounded-lg px-1.5 py-1"
                                    style={oi === 0 ? { backgroundColor: '#DCFCE7', border: '1px solid #86EFAC' } : {}}>
                                    <div className="w-3 h-3 rounded-full border flex items-center justify-center flex-shrink-0"
                                      style={oi === 0 ? { backgroundColor: '#22C55E', borderColor: '#22C55E' } : { borderColor: '#D1D5DB' }}>
                                      {oi === 0 && <span className="text-white text-[6px]">✓</span>}
                                    </div>
                                    <span className="text-[8px]"
                                      style={oi === 0 ? { color: '#15803D', fontWeight: 700 } : { color: '#9CA3AF' }}>{opt}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* Player controls */}
                          <div className="px-3 py-2 bg-[#1A1A2E]">
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                              <div className="h-full rounded-full" style={{ width: '38%', backgroundColor: '#C0651A' }}/>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] text-white/50">▶</span>
                              <span className="text-[9px] text-white/40 font-mono">04:33 / 12:00</span>
                              <div className="flex-1"/>
                              <div className="flex gap-1">
                                {['2D Char','3D Model','Whiteboard','Motion GFX'].map((t, ti) => (
                                  <div key={t} className="text-[7px] px-1.5 py-0.5 rounded font-medium"
                                    style={ti === 0 ? { backgroundColor: '#C0651A', color: '#fff' } : { backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.28)' }}>
                                    {t}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* Chapter list */}
                          <div className="px-3 py-2 border-t border-white/[0.05] bg-[#0F0F1E]">
                            <div className="flex gap-2 overflow-x-auto pb-1">
                              {[
                                { num: '01', title: 'Intro to Fractions',     done: true  },
                                { num: '02', title: 'Adding Fractions',        done: true  },
                                { num: '03', title: 'Mixed Numbers',           active: true },
                                { num: '04', title: 'Fraction Word Problems',  done: false },
                              ].map(ch => (
                                <div key={ch.num} className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-default"
                                  style={'active' in ch && ch.active
                                    ? { backgroundColor: 'rgba(192,101,26,0.15)', border: '1px solid rgba(192,101,26,0.3)' }
                                    : { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                  <span className="text-[8px] font-mono font-bold"
                                    style={{ color: 'active' in ch && ch.active ? '#C0651A' : ch.done ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.12)' }}>
                                    {ch.done ? '✓' : ch.num}
                                  </span>
                                  <span className="text-[8px] whitespace-nowrap"
                                    style={{ color: 'active' in ch && ch.active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.22)' }}>
                                    {ch.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ══ MARKETING MOCKUP ══ */}
                      {sol.id === 'marketing' && (
                        <div className="bg-white" style={{ minHeight: '360px' }}>
                          {/* Dashboard header */}
                          <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #8B4513 0%, #B85E15 100%)' }}>
                            <div>
                              <div className="text-white text-[10px] font-bold">Admissions Dashboard</div>
                              <div className="text-white/60 text-[8px]">March 2025 · Al-Noor Academy</div>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-2.5 py-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"/>
                              <span className="text-white text-[8px] font-semibold">Live</span>
                            </div>
                          </div>
                          <div className="p-3 flex gap-3">
                            {/* Funnel chart */}
                            <div className="flex-1">
                              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">Enrollment Funnel · This Month</div>
                              {[
                                { label: 'Website Visitors', value: '4,280', pct: 100, color: '#D4711A' },
                                { label: 'Ad Clicks',        value: '1,940', pct: 71,  color: '#B85E15' },
                                { label: 'Inquiries',        value: '342',   pct: 45,  color: '#C0651A' },
                                { label: 'Enrolled',         value: '164',   pct: 22,  color: '#8B4513' },
                              ].map((step, si) => (
                                <div key={step.label} className="mb-2.5">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-[8px] text-gray-500 font-medium">{step.label}</span>
                                    <span className="text-[9px] font-bold text-gray-700">{step.value}</span>
                                  </div>
                                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: step.pct + '%', backgroundColor: step.color }}/>
                                  </div>
                                </div>
                              ))}
                              {/* ROI cards */}
                              <div className="grid grid-cols-3 gap-1.5 mt-3">
                                {[
                                  { label: 'Ad ROI',           value: '5×',     color: '#8B4513', bg: '#FDF5ED' },
                                  { label: 'Cost/Enrollment',  value: '₨2,100', color: '#B85E15', bg: '#FFF8F0' },
                                  { label: 'Enquiries ↑', value: '+34%',        color: '#D4711A', bg: '#FEF0E6' },
                                ].map(r => (
                                  <div key={r.label} className="rounded-xl p-2 border"
                                    style={{ backgroundColor: r.bg, borderColor: r.color + '30' }}>
                                    <div className="text-[7px] text-gray-400">{r.label}</div>
                                    <div className="text-sm font-bold leading-none mt-0.5" style={{ color: r.color }}>{r.value}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Social & SEO panel */}
                            <div className="w-[115px] flex-shrink-0 flex flex-col gap-2">
                              <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                                <div className="text-[8px] font-bold text-gray-500 mb-2">Social Reach</div>
                                {[
                                  { platform: 'Facebook',  val: '12.4K', color: '#1877F2' },
                                  { platform: 'Instagram', val: '8.2K',  color: '#E11D48' },
                                  { platform: 'YouTube',   val: '3.8K',  color: '#FF0000' },
                                ].map(s => (
                                  <div key={s.platform} className="flex items-center justify-between mb-1.5 last:mb-0">
                                    <span className="text-[7px] text-gray-400">{s.platform}</span>
                                    <span className="text-[8px] font-bold" style={{ color: s.color }}>{s.val}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                                <div className="text-[8px] font-bold text-gray-500 mb-2">SEO Rankings</div>
                                {[
                                  { kw: '"Best school Lahore"', pos: '#2' },
                                  { kw: '"O-levels academy"',   pos: '#4' },
                                  { kw: '"Cambridge school"',   pos: '#3' },
                                ].map(k => (
                                  <div key={k.kw} className="flex items-center justify-between mb-1.5 last:mb-0">
                                    <span className="text-[7px] text-gray-400 truncate flex-1 mr-1">{k.kw}</span>
                                    <span className="text-[8px] font-bold flex-shrink-0" style={{ color: '#8B4513' }}>{k.pos}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="bg-[#FEF0E6] rounded-xl p-2 border border-orange-200/60">
                                <div className="text-[8px] font-bold text-[#8B4513] mb-0.5">Website Live ✓</div>
                                <div className="text-[7px] text-gray-500">alnooracademy.edu.pk</div>
                                <div className="text-[7px] text-[#D4711A] font-medium mt-1">Live in 3 weeks</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Floating metric badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-gray-100 hidden lg:flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: sol.accentLight }}>
                        {(() => { const SolIcon = sol.icon; return <SolIcon size={16} style={{ color: sol.accentHex }} />; })()}
                      </div>
                      <div>
                        <div className="text-sm font-heading font-bold leading-none" style={{ color: sol.accentHex }}>{sol.metric}</div>
                        <div className="text-[9px] text-gray-400 leading-snug max-w-[100px]">{sol.metricLabel}</div>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ── BOTTOM TRUST STRIP ── */}
          <div className="mt-16 pt-10 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield,     stat: '760+', label: 'Schools Served',     sub: 'across PK, SA & CA'    },
                { icon: TrendingUp, stat: '94%',  label: 'Satisfaction Rate',  sub: 'rated 5/5 by educators'},
                { icon: Zap,        stat: '4 wk', label: 'Avg. Go-Live',      sub: 'from signed contract'  },
                { icon: Users,      stat: '24/7', label: 'Dedicated Support',  sub: 'account manager incl.' },
              ].map(item => {
                const SIcon = item.icon;
                return (
                  <motion.div key={item.label}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.3 }}
                    className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <SIcon size={15} className="text-gray-400" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-gray-900 text-xl leading-none">{item.stat}</div>
                      <div className="text-xs font-semibold text-gray-600 mt-0.5">{item.label}</div>
                      <div className="text-[10px] text-gray-400">{item.sub}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ ABOUT / WHO WE ARE ═══════════ */}
      <section id="about" className="py-24 bg-surface-light bg-grid-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Visual with real image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Main classroom image */}
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                    alt="Students learning in a modern digital classroom"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Floating 760+ badge */}
                <motion.div
                  initial={{ opacity:0, scale:0.8, y:10 }}
                  whileInView={{ opacity:1, scale:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:0.5, type:'spring', stiffness:260, damping:20 }}
                  className="absolute top-4 right-4 bg-white rounded-2xl px-3.5 py-2 shadow-xl border border-gray-100 z-20 flex items-center gap-2"
                  style={{ animation:'float 6s ease-in-out 0.5s infinite' }}>
                  <div className="w-6 h-6 rounded-lg bg-[#D4711A] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-900 leading-none">760+</div>
                    <div className="text-[9px] text-gray-400 leading-tight">Schools</div>
                  </div>
                </motion.div>
                {/* Floating 3 Countries badge */}
                <motion.div
                  initial={{ opacity:0, scale:0.8, y:10 }}
                  whileInView={{ opacity:1, scale:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:0.7, type:'spring', stiffness:260, damping:20 }}
                  className="absolute bottom-4 left-4 bg-white rounded-2xl px-3.5 py-2 shadow-xl border border-gray-100 z-20 flex items-center gap-2"
                  style={{ animation:'float2 8s ease-in-out 1s infinite' }}>
                  <div className="w-6 h-6 rounded-lg bg-[#8B4513] flex items-center justify-center flex-shrink-0">
                    <Globe className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-900 leading-none">3 Countries</div>
                    <div className="text-[9px] text-gray-400 leading-tight">PK · SA · CA</div>
                  </div>
                </motion.div>
                {/* Bottom stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 z-10">
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: BookOpen, label: 'K-12',    count:'460+', color: 'text-[#D4711A]' },
                      { icon: Award,    label: 'Islamic',  count:'180+', color: 'text-[#B85E15]' },
                      { icon: Globe,    label: 'Int\'l',   count:'85+',  color: 'text-[#C0651A]' },
                      { icon: Users,    label: 'NGOs',     count:'35+',  color: 'text-[#8B4513]' },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <item.icon className={`w-4 h-4 mx-auto mb-1 ${item.color}`} />
                        <div className="text-xs font-black text-gray-900">{item.count}</div>
                        <div className="text-[9px] text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                  Who We Are
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6"
              >
                Educators & engineers<br />
                building <span className="shimmer-text">what schools actually need</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                Cubico Technologies is a full-stack EdTech company serving schools across Pakistan, Saudi Arabia & Canada.
                We don&apos;t just sell software — we deploy complete digital infrastructure, train your staff,
                and stay with you long after launch. Our team includes former principals, curriculum designers,
                and full-stack engineers.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-[#D4711A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Education-First DNA</h4>
                    <p className="text-sm text-gray-500">Built by people who&apos;ve run classrooms, not just code editors.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-[#8B4513]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Co-Created With Schools</h4>
                    <p className="text-sm text-gray-500">Every feature ships after real-world testing with principals and teachers.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS SECTION ═══════════ */}
      <section className="py-20 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=2560&q=80"
          alt="Books and education background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0C0A08]/92" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4711A]/12 rounded-full filter blur-[110px] animate-float" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8B4513]/10 rounded-full filter blur-[110px] animate-float2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i}>
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label}
                  color={['#D4711A','#E88C32','#F4A261','#FBBF24'][i]} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SOLUTIONS / SERVICES ═══════════ */}
      <section id="solutions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                Services
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
            >
              Everything your school needs,<br />
              <span className="shimmer-text">under one roof</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 max-w-2xl mx-auto">
              From learning management to marketing — eight specialized services built specifically for educational institutions.
            </motion.p>
          </motion.div>

          <motion.div
            id="services"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((svc, i) => {
              const SC = [
                { b:'#D4711A', ib:'#FEF0E6', if_:'#D4711A', lg:'linear-gradient(90deg,#D4711A,#E88C32)' },
                { b:'#B85E15', ib:'#FFF8F0', if_:'#B85E15', lg:'linear-gradient(90deg,#B85E15,#D4711A)' },
                { b:'#C0651A', ib:'#FEF0E6', if_:'#C0651A', lg:'linear-gradient(90deg,#C0651A,#E88C32)' },
                { b:'#8B4513', ib:'#FDF5ED', if_:'#8B4513', lg:'linear-gradient(90deg,#8B4513,#B85E15)' },
                { b:'#D97706', ib:'#FEF3C7', if_:'#D97706', lg:'linear-gradient(90deg,#D97706,#F4A261)' },
                { b:'#A0522D', ib:'#FDF5ED', if_:'#A0522D', lg:'linear-gradient(90deg,#A0522D,#C0651A)' },
                { b:'#E88C32', ib:'#FEF0E6', if_:'#E88C32', lg:'linear-gradient(90deg,#E88C32,#F4A94D)' },
                { b:'#CD853F', ib:'#FDF8F3', if_:'#CD853F', lg:'linear-gradient(90deg,#CD853F,#DEB887)' },
              ];
              const c = SC[i % 8];
              return (
                <motion.div
                  key={svc.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y:-5, scale:1.02 }}
                  transition={{ type:'spring', stiffness:300, damping:20 }}
                  className="group cursor-pointer relative rounded-2xl bg-white border border-gray-100 p-6 text-center overflow-hidden shadow-sm hover:shadow-xl"
                >
                  {/* Hover bg gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{ background:`radial-gradient(ellipse at 50% 0%,${c.b}14 0%,transparent 70%)` }}/>
                  {/* Animated bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl"
                    style={{ background:c.lg }}/>
                  {/* Service number */}
                  <div className="absolute top-2.5 right-3 text-[10px] font-mono font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
                    {String(i + 1).padStart(2,'0')}
                  </div>
                  <motion.div
                    whileHover={{ rotate:-6, scale:1.15 }}
                    transition={{ type:'spring', stiffness:400, damping:15 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor:c.ib }}>
                    <svc.icon className="w-6 h-6" style={{ color:c.if_ }} />
                  </motion.div>
                  <h3 className="font-heading font-bold text-gray-900 mb-2 text-sm">{svc.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA + FORM SECTION ═══════════ */}
      <section id="contact" className="py-24 bg-surface-light bg-grid-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                  Book a Demo
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6"
              >
                See Cubico in action —<br />
                <span className="shimmer-text">free personalized demo</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                Walk through the LMS, ERP, animated content, and marketing tools with our team.
                We&apos;ll customize the demo to your curriculum, student count, and goals.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="space-y-3 mb-6">
                {[
                  { text:'Full LMS demo with your curriculum', emoji:'💻' },
                  { text:'ERP system walkthrough',             emoji:'🏢' },
                  { text:'Animated content preview',           emoji:'🎥' },
                  { text:'Custom pricing for your needs',      emoji:'💰' },
                  { text:'Implementation timeline review',     emoji:'📅' },
                ].map((item, idx) => (
                  <motion.div key={item.text}
                    initial={{ opacity:0, x:-16 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.07 * idx, duration:0.4 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D4711A]/25 transition-all">
                    <span className="text-xl flex-shrink-0">{item.emoji}</span>
                    <span className="text-sm text-gray-600 font-medium flex-1">{item.text}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#D4711A] flex-shrink-0" />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} custom={4}
                className="flex items-center gap-3 p-4 rounded-2xl border"
                style={{ backgroundColor:'rgba(212,113,26,0.05)', borderColor:'rgba(212,113,26,0.18)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4711A] animate-pulse flex-shrink-0"/>
                <span className="text-sm font-semibold text-gray-700">We respond within <span className="text-[#D4711A] font-bold">24 hours</span>, guaranteed.</span>
              </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-500">We&apos;ll be in touch within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Company *"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input
                        type="tel"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="form-select"
                    >
                      <option value="">Select Position</option>
                      <option value="principal">Principal / Head of School</option>
                      <option value="director">Director / Board Member</option>
                      <option value="it_head">IT Head / Administrator</option>
                      <option value="teacher">Teacher / Department Head</option>
                      <option value="other">Other</option>
                    </select>
                    <select
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      className="form-select"
                    >
                      <option value="">Number of Students / Staff</option>
                      <option value="1-50">1 – 50</option>
                      <option value="51-100">51 – 100</option>
                      <option value="101-500">101 – 500</option>
                      <option value="501-1000">501 – 1,000</option>
                      <option value="1000+">1,000+</option>
                    </select>
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="btn-primary w-full justify-center text-base"
                    >
                      {formStatus === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          Get Free Demo
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    {formStatus === 'error' && (
                      <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                Testimonials
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
            >
              Trusted by <span className="shimmer-text">educators worldwide</span>
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="flex items-center justify-center gap-4 mt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm font-medium">Rated 5 out of 5 (760+ reviews)</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, i) => {
              const tGrads = [
                'linear-gradient(135deg,#D4711A,#E88C32)',
                'linear-gradient(135deg,#B85E15,#D4711A)',
                'linear-gradient(135deg,#8B4513,#C0651A)',
              ];
              const tChip = [
                { bg:'rgba(212,113,26,0.08)', fg:'#D4711A' },
                { bg:'rgba(184,94,21,0.08)',  fg:'#B85E15' },
                { bg:'rgba(139,69,19,0.08)',  fg:'#8B4513' },
              ];
              return (
                <motion.div key={t.name} variants={fadeUp} custom={i}
                  whileHover={{ y:-6, rotateY:3, rotateX:-2, scale:1.01 }}
                  transition={{ type:'spring', stiffness:250, damping:25 }}
                  style={{ transformStyle:'preserve-3d', transformOrigin:'center center' }}
                  className="relative rounded-2xl bg-white border border-gray-100 p-8 overflow-hidden shadow-sm hover:shadow-2xl cursor-default"
                >
                  {/* Giant decorative quote */}
                  <div className="absolute -top-3 -left-1 leading-none select-none pointer-events-none text-gray-100"
                    style={{ fontSize:'6.5rem', fontFamily:'Georgia,serif', lineHeight:1 }}>“</div>
                  {/* Stars + verified */}
                  <div className="flex items-center gap-1 mb-4 relative">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-auto text-[9px] font-bold text-gray-300 tracking-wider">VERIFIED</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm relative">“{t.text}”</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background:tGrads[i] }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{t.name}</h4>
                      <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
                    </div>
                    <div className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor:tChip[i].bg, color:tChip[i].fg }}>
                      {t.location}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ SECTION ═══════════ */}
      <section id="faq" className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-orange-200/60 bg-orange-50/60 text-[#D4711A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4711A]" />
                  FAQ
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6"
              >
                Questions schools<br />
                <span className="shimmer-text">ask us most</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-gray-500 leading-relaxed mb-8">
                From onboarding timelines to multilingual support — here&apos;s what principals and IT heads want to know before signing up.
              </motion.p>

              {/* FAQ Visual — image + CTA */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="rounded-3xl overflow-hidden hidden lg:block"
              >
                <div className="relative" style={{ aspectRatio: '16/10' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                    alt="Team collaborating on education technology solutions"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Still have questions?</h4>
                        <p className="text-sm text-white/60">Our team is ready to help</p>
                      </div>
                    </div>
                    <a href="#contact" className="btn-primary text-sm">
                      Contact Us <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Accordion */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="py-5 border-b border-gray-100 last:border-0"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-start justify-between w-full text-left gap-3 group"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 transition-all duration-200"
                        style={openFaq === i ? { backgroundColor:'#D4711A', color:'#fff' } : { backgroundColor:'#F3F4F6', color:'#9CA3AF' }}>
                        {i + 1}
                      </div>
                      <span className="font-semibold text-sm text-gray-900 pr-2 group-hover:text-primary transition-colors">{faq.q}</span>
                    </div>
                    <span className="flex-shrink-0 mt-0.5">
                      {openFaq === i ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease:'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 pr-6 pt-3 pb-1">
                          <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ PARTNER LOGOS ═══════════ */}
      <section className="py-14 bg-white border-y border-gray-100 overflow-hidden relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background:'linear-gradient(90deg,white 0%,transparent 100%)' }}/>
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background:'linear-gradient(270deg,white 0%,transparent 100%)' }}/>
        <p className="text-center text-[10px] font-bold text-gray-300 tracking-[0.22em] uppercase mb-6">
          Trusted by institutions across 3 countries
        </p>
        <div className="flex animate-marquee-slow" style={{ width:'max-content' }}>
          {[...partners, ...partners, ...partners, ...partners].map((name, i) => (
            <div key={i} className="flex-shrink-0 mx-4 flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100 bg-gray-50 cursor-default hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <div className="w-2 h-2 rounded-full bg-primary/25 group-hover:bg-primary/60 transition-colors"/>
              <span className="text-gray-400 font-heading font-bold text-sm whitespace-nowrap group-hover:text-primary transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ JOIN CTA SECTION ═══════════ */}
      <section className="py-24 relative overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2560&q=80"
          alt="Students in classroom celebrating education"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0C0A08]/88" />
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4711A]/15 rounded-full filter blur-[150px] animate-float" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#8B4513]/10 rounded-full filter blur-[120px] animate-float2" />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'32px 32px' }}/>
        </div>
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { l:'8%',  b:'25%', s:4, d:'0s',    a:'pdrift'  },
            { l:'18%', b:'55%', s:3, d:'1.3s',  a:'pdrift2' },
            { l:'28%', b:'12%', s:5, d:'2.6s',  a:'pdrift'  },
            { l:'45%', b:'35%', s:3, d:'0.7s',  a:'pdrift2' },
            { l:'60%', b:'65%', s:4, d:'1.9s',  a:'pdrift'  },
            { l:'72%', b:'18%', s:3, d:'3.1s',  a:'pdrift2' },
            { l:'82%', b:'45%', s:5, d:'0.4s',  a:'pdrift'  },
            { l:'92%', b:'72%', s:3, d:'2.2s',  a:'pdrift2' },
          ].map((p, pi) => (
            <div key={pi} className="absolute rounded-full bg-white/20"
              style={{ left:p.l, bottom:p.b, width:p.s, height:p.s,
                animation:`${p.a} ${4.5 + pi * 0.4}s ease-in-out ${p.d} infinite alternate` }}/>
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Live status badge */}
            <motion.div variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="text-white/70 text-xs font-bold tracking-wider uppercase">Now Enrolling Institutions</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-5xl font-heading font-bold text-white mb-6"
            >
              Join <span className="shimmer-text">760+ schools</span> already transforming education
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              From a 50-student school in Lahore to a 2,000-student campus in Riyadh —
              Cubico scales to your institution. Launch in 4 weeks.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="btn-primary text-lg px-10">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#solutions" className="btn-outline-white text-lg px-10">
                Explore Solutions
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-dark-950 text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1 - Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4711A] to-[#E88C32] flex items-center justify-center font-heading font-bold text-lg text-white shadow-lg shadow-orange-600/25">
                  C
                </div>
                <span className="font-heading font-bold text-xl">
                  Cubico<span className="text-orange-300">.tech</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Full-stack EdTech company powering 760+ schools across Pakistan, Saudi Arabia & Canada with LMS, ERP, animated content, and marketing solutions.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Youtube, label: 'YouTube' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Solutions */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Solutions</h4>
              <ul className="space-y-3">
                {['Smart LMS', 'Animation Studio', 'School ERP', 'Web Development', 'Mobile Apps'].map((link) => (
                  <li key={link}>
                    <a href="#solutions" className="text-white/50 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Our Team', 'Careers', 'News & Blog', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <a href="#about" className="text-white/50 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Newsletter */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-white/50 text-sm mb-6">
                Sign up for updates, insights, and news about EdTech innovation.
              </p>
              {newsletterStatus === 'success' ? (
                <div className="flex items-center gap-2 text-accent-light text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Successfully subscribed!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    className="form-input-dark text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="form-input-dark text-sm"
                    required
                  />
                  <button type="submit" className="btn-primary w-full justify-center text-sm">
                    Sign Up <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              Copyright © {new Date().getFullYear()} Cubico Technologies. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
