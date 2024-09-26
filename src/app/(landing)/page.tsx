'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  GlobalOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  LineChartOutlined,
  TeamOutlined,
  SafetyOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: `Global Reach`,
      description: `Connect with buyers and suppliers worldwide, expanding your market presence exponentially.`,
      icon: <GlobalOutlined />,
    },
    {
      heading: `Real-Time Updates`,
      description: `Stay ahead with instant pricing and inventory information, ensuring you never miss an opportunity.`,
      icon: <ThunderboltOutlined />,
    },
    {
      heading: `Cost Reduction`,
      description: `Streamline your procurement process and reduce costs by up to 20% through our efficient platform.`,
      icon: <DollarOutlined />,
    },
    {
      heading: `Market Insights`,
      description: `Leverage powerful analytics to make data-driven decisions and stay competitive in the industry.`,
      icon: <LineChartOutlined />,
    },
    {
      heading: `Enhanced Collaboration`,
      description: `Foster stronger relationships with partners through our integrated communication tools.`,
      icon: <TeamOutlined />,
    },
    {
      heading: `Quality Assurance`,
      description: `Access detailed product specifications and certifications to ensure you're getting the best quality cables.`,
      icon: <SafetyOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `John Smith`,
      designation: `Procurement Manager, ElectroCorp`,
      content: `Since joining this marketplace, we've reduced our procurement time by 30% and expanded our supplier base significantly. It's been a game-changer for our operations.`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: `Sarah Johnson`,
      designation: `CEO, CableConnect Ltd`,
      content: `As a manufacturer, this platform has opened doors to new markets we never thought possible. Our sales have increased by 25% in just six months!`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Chen`,
      designation: `Supply Chain Director, TechInnovate`,
      content: `The real-time pricing and inventory updates have revolutionized our supply chain management. We're now more agile and responsive to market demands.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emma Rodriguez`,
      designation: `Sales Manager, PowerCables Inc`,
      content: `The analytics tools provided by the platform have given us invaluable insights into market trends. We've been able to tailor our product offerings and increase our market share.`,
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    {
      name: `David Patel`,
      designation: `Operations Manager, GlobalWire Solutions`,
      content: `The efficiency gains we've experienced are remarkable. Our order processing time has been cut in half, allowing us to focus more on strategic growth initiatives.`,
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
    {
      name: `Lisa Thompson`,
      designation: `Quality Assurance Specialist, PrecisionCables`,
      content: `The detailed product specifications available on the platform have significantly improved our quality control processes. We're now able to make more informed decisions about our suppliers.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for small manufacturers and distributors looking to expand their reach.`,
      monthly: 299,
      yearly: 2990,
      features: [
        `Access to global marketplace`,
        `Basic analytics`,
        `Standard customer support`,
      ],
    },
    {
      title: `Professional`,
      description: `Ideal for growing businesses seeking advanced features and priority support.`,
      monthly: 599,
      yearly: 5990,
      features: [
        `All Starter features`,
        `Advanced analytics and reporting`,
        `Priority customer support`,
        `Custom branding options`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Tailored solutions for large-scale operations with complex needs.`,
      monthly: 1299,
      yearly: 12990,
      features: [
        `All Professional features`,
        `Dedicated account manager`,
        `API access for seamless integration`,
        `Custom feature development`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How does the marketplace ensure the quality of listed products?`,
      answer: `We have a rigorous vetting process for all manufacturers and suppliers. Additionally, we provide detailed product specifications and certifications for each listing, allowing buyers to make informed decisions.`,
    },
    {
      question: `What security measures are in place to protect transactions?`,
      answer: `Our platform uses bank-grade encryption for all transactions. We also offer secure payment gateways and have implemented fraud detection systems to ensure the safety of all users.`,
    },
    {
      question: `Can I integrate the marketplace with my existing ERP system?`,
      answer: `Yes, our Enterprise plan offers API access that allows for seamless integration with most major ERP systems. Our team can provide support during the integration process.`,
    },
    {
      question: `How does pricing work on the platform?`,
      answer: `Suppliers set their own prices, which are updated in real-time. Buyers can compare prices from multiple suppliers and take advantage of volume discounts or special promotions.`,
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: `Register`,
      description: `Sign up as a buyer or seller and complete your profile with relevant business information.`,
    },
    {
      heading: `Connect`,
      description: `Browse through a wide range of products or list your offerings, reaching a global network of industry professionals.`,
    },
    {
      heading: `Transact`,
      description: `Negotiate deals, place orders, and manage transactions securely through our platform.`,
    },
    {
      heading: `Grow`,
      description: `Leverage our analytics and insights to make informed decisions and expand your business.`,
    },
  ]

  const painPoints = [
    {
      emoji: `🔍`,
      title: `Struggling to find reliable suppliers or buyers`,
    },
    {
      emoji: `💰`,
      title: `Losing money due to inefficient procurement processes`,
    },
    {
      emoji: `📊`,
      title: `Lacking market insights to make informed decisions`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Revolutionize Your Electric Cable Business`}
        subtitle={`Join the premier B2B marketplace connecting cable manufacturers, buyers, and suppliers worldwide. Streamline your operations, reduce costs, and unlock new growth opportunities.`}
        buttonText={`Get Started`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/owGHPg-imacab-PF6m`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText={`from happy industry professionals`}
          />
        }
      />
      <LandingSocialProof logos={logos} title={`Trusted by Industry Leaders`} />
      <LandingPainPoints
        title={`The $269 Billion Electric Cable Industry is Evolving. Are You Keeping Up?`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Simplify Your Journey to Success`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Empower Your Business with Cutting-Edge Features`}
        subtitle={`Our platform is designed to address the unique challenges of the electric cable industry, providing you with the tools you need to thrive in a competitive market.`}
        features={features}
      />
      <LandingTestimonials
        title={`Success Stories from Industry Leaders`}
        subtitle={`Discover how businesses like yours have transformed their operations and achieved remarkable growth through our platform.`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Your Success`}
        subtitle={`Choose the plan that best fits your business needs and start revolutionizing your electric cable operations today.`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Got Questions? We've Got Answers`}
        subtitle={`Find quick answers to common questions about our B2B marketplace for electric cable manufacturers.`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Electrify Your Business?`}
        subtitle={`Join thousands of successful companies who have already transformed their operations. Don't miss out on the future of the electric cable industry.`}
        buttonText={`Get Started Now`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
