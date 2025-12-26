import { motion } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { LogoIcon } from './LogoIcon';

export const Footer = () => {
  return (
    <footer className="relative py-16 px-4 border-t border-border">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <LogoIcon size={36} className="text-foreground" />
              <h3 className="logo-text text-2xl tracking-[0.2em]">comfitco</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Premium fashion for the modern woman. Elevate your style with our curated collection of elegant dresses.
            </p>
            <motion.a
              href="https://www.instagram.com/comfitco_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium hover:bg-foreground/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-4 h-4" />
              Follow on Instagram
            </motion.a>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Shop Collection', 'New Arrivals', 'Best Sellers', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="#collection" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Instagram className="w-4 h-4 text-accent" />
                @comfitco_
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-accent" />
                hello@comfitco.com
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                India
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="pt-8 border-t border-border text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} comfitco. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};