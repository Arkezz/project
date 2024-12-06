import React, { useState } from "react";
import {
  BookMarked,
  ChevronDown,
  Github,
  Heart,
  Mail,
  Twitter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FooterSectionProps {
  title: string;
  links: string[];
}

function FooterSection({ title, links }: FooterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b md:border-none border-gray-200">
      <button
        className="flex items-center justify-between w-full py-4 md:py-0 md:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-semibold">{title}</h3>
        <ChevronDown
          size={20}
          className={`md:hidden transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {(isExpanded || window.innerWidth >= 768) && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 overflow-hidden pb-4 md:pb-0"
          >
            {links.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors block"
                >
                  {link}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-8 mb-8 md:mb-12">
          <div className="md:col-span-2 pb-6 md:pb-0 border-b md:border-none border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <BookMarked className="text-primary" size={28} />
              <h2 className="text-xl font-semibold">NoviList</h2>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Track, discover, and explore your favorite web novels. Join our
              community of passionate readers from around the world.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                { icon: Github, href: "https://github.com", label: "GitHub" },
                {
                  icon: Mail,
                  href: "mailto:contact@novilist.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary"
                  whileHover={{ y: -2 }}
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <FooterSection
            title="Navigation"
            links={["Home", "Discover", "Reading List", "Forum", "About Us"]}
          />

          <FooterSection
            title="Resources"
            links={[
              "Help Center",
              "Translation Guide",
              "Community Guidelines",
              "API Documentation",
              "Status Page",
            ]}
          />
        </div>

        <div className="pt-6 md:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              © {currentYear} NoviList. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-600">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            Made with{" "}
            <Heart
              size={12}
              className="inline text-accent"
              fill="currentColor"
            />{" "}
            by novel enthusiasts
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
    </footer>
  );
}
