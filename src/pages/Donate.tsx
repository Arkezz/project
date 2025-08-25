import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  Crown,
  Zap,
  Gift,
  Users,
  BookOpen,
  Shield,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Check,
  Coffee,
  Palette,
  Bell,
  Eye,
  Award,
  Globe,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface DonationTier {
  id: string;
  name: string;
  amount: number;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  perks: string[];
  popular?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

const donationTiers: DonationTier[] = [
  {
    id: "supporter",
    name: "Novel Supporter",
    amount: 5,
    icon: Heart,
    color: "text-pink-600",
    bgGradient: "from-pink-50 to-rose-50",
    perks: [
      "Supporter badge on profile",
      "Access to supporter-only Discord channel",
      "Early access to new features",
      "Monthly newsletter with updates",
    ],
  },
  {
    id: "enthusiast",
    name: "Reading Enthusiast",
    amount: 15,
    icon: Star,
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-indigo-50",
    perks: [
      "All previous tier benefits",
      "Custom profile themes",
      "Advanced reading statistics",
      "Priority customer support",
      "Beta access to mobile app",
    ],
    popular: true,
  },
  {
    id: "patron",
    name: "Literary Patron",
    amount: 30,
    icon: Crown,
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-violet-50",
    perks: [
      "All previous tier benefits",
      "Custom profile banner",
      "Patron badge with special styling",
      "Monthly virtual meetup access",
      "Influence on feature development",
      "Ad-free browsing experience",
    ],
  },
  {
    id: "champion",
    name: "Novel Champion",
    amount: 50,
    icon: Zap,
    color: "text-amber-600",
    bgGradient: "from-amber-50 to-yellow-50",
    perks: [
      "All previous tier benefits",
      "Direct line to development team",
      "Custom recommendation algorithms",
      "Early access to premium features",
      "Recognition in monthly updates",
      "Exclusive merchandise",
      "Annual virtual dinner with team",
    ],
  },
];

const faqs: FAQ[] = [
  {
    question: "How do donations help Novilist?",
    answer: "Your donations directly support our server costs, development team, and help us add new features like mobile apps, advanced recommendation systems, and community tools. Every contribution helps us maintain a free, high-quality platform for novel readers worldwide.",
  },
  {
    question: "Can I change or cancel my subscription?",
    answer: "Absolutely! You can modify or cancel your Patreon subscription at any time through your Patreon account. Changes take effect at the next billing cycle, and you'll retain your benefits until then.",
  },
  {
    question: "When do I receive my perks?",
    answer: "Most digital perks (badges, themes, Discord access) are activated within 24 hours of your first successful payment. Physical rewards and special access features may take 3-5 business days to process.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes! All payments are processed securely through Patreon's encrypted payment system. We never store or have access to your payment information directly.",
  },
  {
    question: "Can I donate without ongoing commitments?",
    answer: "Of course! Our goodwill donation section allows for one-time contributions of any amount. While these don't include tier perks, they're incredibly valuable for supporting our mission.",
  },
];

interface TierCardProps {
  tier: DonationTier;
  onSelect: (tierId: string) => void;
}

function TierCard({ tier, onSelect }: TierCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative bg-gradient-to-br ${tier.bgGradient} rounded-2xl border-2 border-transparent hover:border-primary/20 transition-all duration-300 overflow-hidden ${
        tier.popular ? "ring-2 ring-primary/30 shadow-lg" : "shadow-sm hover:shadow-lg"
      }`}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {tier.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-white text-center py-2 text-sm font-semibold">
          Most Popular
        </div>
      )}

      <div className={`p-8 ${tier.popular ? "pt-12" : ""}`}>
        {/* Tier Icon */}
        <motion.div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-6 ${tier.color}`}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <tier.icon size={32} />
        </motion.div>

        {/* Tier Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-bold text-gray-900">${tier.amount}</span>
          <span className="text-gray-600 font-medium">/month</span>
        </div>

        {/* Perks List */}
        <div className="space-y-3 mb-8">
          {tier.perks.map((perk, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                <Check size={12} className="text-primary" />
              </div>
              <span className="text-gray-700 text-sm leading-relaxed">{perk}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={() => onSelect(tier.id)}
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
            tier.popular
              ? "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl"
              : "bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-200 hover:border-primary/30"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="flex items-center justify-center gap-2"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span>Choose {tier.name}</span>
            <ArrowRight size={18} />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
      layout
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        whileHover={{ x: 4 }}
      >
        <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-gray-500" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-700 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Donate() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTierSelect = async (tierId: string) => {
    setSelectedTier(tierId);
    setIsProcessing(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Redirecting to Patreon...", {
      icon: "🎉",
      duration: 3000,
    });

    setIsProcessing(false);
    // In a real app, redirect to Patreon
  };

  const handleGoodwillDonation = async () => {
    if (!customAmount || parseFloat(customAmount) < 1) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    setIsProcessing(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1200));

    toast.success(`Thank you for your $${customAmount} donation!`, {
      icon: "💝",
      duration: 4000,
    });

    setCustomAmount("");
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Hero Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/30 rounded-3xl mb-8 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Heart size={40} className="text-primary" />
            </motion.div>

            {/* Hero Text */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Support <span className="text-primary">Novilist</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Help us build the ultimate platform for web novel enthusiasts. 
              Your support keeps Novilist free, fast, and feature-rich for everyone.
            </motion.p>

            {/* Impact Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { icon: Users, label: "Active Readers", value: "50K+" },
                { icon: BookOpen, label: "Novels Tracked", value: "25K+" },
                { icon: Globe, label: "Countries", value: "120+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                    <stat.icon size={24} className="text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Donation Tiers Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Monthly Support Tiers
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Join our community of supporters and unlock exclusive perks while helping us grow
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {donationTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              >
                <TierCard tier={tier} onSelect={handleTierSelect} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Goodwill Donation Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Coffee size={32} className="text-green-600" />
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                One-Time Support
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Prefer a one-time contribution? Every donation, no matter the size, 
                helps us maintain and improve Novilist for the entire community.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                <div className="relative flex-1 w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="25.00"
                    className="w-full pl-8 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
                  />
                </div>
                <motion.button
                  onClick={handleGoodwillDonation}
                  disabled={isProcessing || !customAmount}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Gift size={20} />
                      Donate Now
                    </>
                  )}
                </motion.button>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {[5, 10, 25, 50, 100].map((amount) => (
                  <motion.button
                    key={amount}
                    onClick={() => setCustomAmount(amount.toString())}
                    className="px-4 py-2 bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-lg text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why Support Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Your Support Matters
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every contribution directly impacts our ability to serve the novel reading community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Server & Infrastructure",
                description: "Keep our servers running fast and reliable for thousands of daily users",
                color: "text-blue-600",
                bgColor: "from-blue-50 to-indigo-50",
              },
              {
                icon: Sparkles,
                title: "Feature Development",
                description: "Fund new features like mobile apps, advanced search, and recommendation systems",
                color: "text-purple-600",
                bgColor: "from-purple-50 to-violet-50",
              },
              {
                icon: Users,
                title: "Community Growth",
                description: "Support community events, translation projects, and author collaborations",
                color: "text-green-600",
                bgColor: "from-green-50 to-emerald-50",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className={`bg-gradient-to-br ${item.bgColor} rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6 ${item.color}`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to know about supporting Novilist
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Support Our Mission?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of readers who help make Novilist the best platform for discovering and tracking web novels.
            </p>
            <motion.button
              onClick={() => document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={20} />
              Choose Your Support Level
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 text-center shadow-2xl"
            >
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Processing Your Support
              </h3>
              <p className="text-gray-600">
                Thank you for supporting Novilist!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}