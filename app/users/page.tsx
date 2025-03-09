"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ExternalLink, 
  Mail, 
  Phone, 
  FileText, 
  Github, 
  Linkedin, 
  Code, 
  Database, 
  Globe, 
  Building2,
  Trophy,
  Briefcase,
  ThumbsUp
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dummy data type
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeLink: string;
  leetcodeProfile?: string;
  gitLink?: string;
  linkedinLink?: string;
  cpProfiles?: string[];
  ctfProfileLinks?: string[]; // New: CTF profile links as an array
  kaggleLink?: string;
  devfolioLink?: string;      // New: Devfolio profile link
  portfolioLink?: string;
  shortBio: string;
  age: number;
  collegeName: string;
  profilePic: string;
  referralCode?: string;
}

// Dummy data
const dummyUsers: UserProfile[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 234 567 8901",
    resumeLink: "https://example.com/alice-resume.pdf",
    leetcodeProfile: "leetcode.com/alice",
    gitLink: "github.com/alice",
    linkedinLink: "linkedin.com/in/alice",
    ctfProfileLinks: ["ctf.example.com/alice"],
    kaggleLink: "kaggle.com/alice",
    devfolioLink: "devfolio.co/alice",
    portfolioLink: "alice.com",
    shortBio: "Full-stack developer with 3 years of experience. Passionate about building scalable web applications and contributing to open-source projects.",
    age: 25,
    collegeName: "MIT",
    profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    referralCode: "ALICE123"
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 234 567 8902",
    resumeLink: "https://example.com/bob-resume.pdf",
    gitLink: "github.com/bob",
    linkedinLink: "linkedin.com/in/bob",
    ctfProfileLinks: ["ctf.example.com/bob"],
    kaggleLink: "kaggle.com/bob",
    devfolioLink: "devfolio.co/bob",
    portfolioLink: "bob.com",
    shortBio: "Machine learning engineer specializing in computer vision. Currently working on deep learning projects for autonomous vehicles.",
    age: 28,
    collegeName: "Stanford",
    profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    referralCode: "BOB456"
  },
  // Add more dummy users as needed
];

// Framer Motion variants for staggered list and cards
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

// Modal animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const filteredUsers = dummyUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Glitch Heading */}
        <div className="relative mb-8">
          <h1
            className="glitch text-5xl md:text-7xl font-dystopian font-bold text-center"
            data-text="Meet the Innovators"
            style={{
              fontSize: "72px",
              color: "#00E0F3",
              backgroundColor: "rgba(0, 0, 0, 0)",
            }}
          >
            Meet the Innovators
          </h1>
        </div>

        {/* Revamped Search Bar */}
        <div className="relative mb-8">
          <div className="relative">
            {/* Animated gradient glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00E0F3] to-[#27C8CB] opacity-50 blur-md animate-pulse"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                className="pl-12 pr-4 py-3 w-full rounded-full bg-[#1C1F24] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00E0F3] transition-all duration-300"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* User Grid with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredUsers.map(user => (
            <motion.div
              key={user.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="circulating-border bg-[#5a7db9] rounded-lg shadow-lg cursor-pointer p-6 transition-all duration-300 relative"
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <img src={user.profilePic} alt={user.name} className="object-cover" />
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                  <p className="text-gray-300">{user.email}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* User Details Modal */}
        <Dialog open={selectedUser !== null} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-4xl w-full">
            <AnimatePresence>
              {selectedUser && (
                <motion.div
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-black rounded-lg p-4"
                >
                  <ScrollArea className="h-[80vh]">
                    <div className="space-y-6 p-4">
                      {/* Header */}
                      <div className="flex items-center space-x-6">
                        <Avatar className="h-24 w-24">
                          <img src={selectedUser.profilePic} alt={selectedUser.name} className="object-cover" />
                        </Avatar>
                        <div>
                          <h2 className="text-2xl font-bold" style={{ color: "#2AD7DB" }}>
                            {selectedUser.name}
                          </h2>
                          <p className="text-[#374151]">{selectedUser.age} years old</p>
                          <p className="text-[#374151] flex items-center">
                            <Building2 className="mr-2" size={16} />
                            {selectedUser.collegeName}
                          </p>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-[#374151]">
                          <Mail size={16} />
                          <span>{selectedUser.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[#374151]">
                          <Phone size={16} />
                          <span>{selectedUser.phone}</span>
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">About</h3>
                        <p className="text-[#374151]">{selectedUser.shortBio}</p>
                      </div>

                      {/* Links & Profiles */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Links & Profiles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedUser.resumeLink && (
                            <a
                              href={selectedUser.resumeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-[#27C8CB] hover:underline"
                            >
                              <FileText size={16} />
                              <span>Resume</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                          {selectedUser.gitLink && (
                            <a
                              href={`https://${selectedUser.gitLink}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-[#27C8CB] hover:underline"
                            >
                              <Github size={16} />
                              <span>GitHub</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                          {selectedUser.linkedinLink && (
                            <a
                              href={`https://${selectedUser.linkedinLink}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-[#27C8CB] hover:underline"
                            >
                              <Linkedin size={16} />
                              <span>LinkedIn</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                          {selectedUser.leetcodeProfile && (
                            <a
                              href={`https://${selectedUser.leetcodeProfile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-[#27C8CB] hover:underline"
                            >
                              <Code size={16} />
                              <span>LeetCode</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                          {selectedUser.ctfProfileLinks && selectedUser.ctfProfileLinks.length > 0 && (
                            <>
                              {selectedUser.ctfProfileLinks.map((link, idx) => (
                                <a
                                  key={`ctf-${idx}`}
                                  href={link.startsWith("http") ? link : `https://${link}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 text-[#27C8CB] hover:underline"
                                >
                                  <Trophy size={16} />
                                  <span>CTF Profile {idx + 1}</span>
                                  <ExternalLink size={12} />
                                </a>
                              ))}
                            </>
                          )}
                          {selectedUser.devfolioLink && (
                            <a
                              href={selectedUser.devfolioLink.startsWith("http") ? selectedUser.devfolioLink : `https://${selectedUser.devfolioLink}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-[#27C8CB] hover:underline"
                            >
                              <Briefcase size={16} />
                              <span>Devfolio</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                          {selectedUser.kaggleLink && (
                            <a
                              href={`https://${selectedUser.kaggleLink}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-[#27C8CB] hover:underline"
                            >
                              <Database size={16} />
                              <span>Kaggle</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                          {selectedUser.portfolioLink && (
                            <a
                              href={selectedUser.portfolioLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-[#27C8CB] hover:underline"
                            >
                              <Globe size={16} />
                              <span>Portfolio</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Referral Code Row with Upvote Button */}
                      {selectedUser.referralCode && (
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">Referral Code</h3>
                            <Badge variant="outline" className="text-[#27C8CB] border-[#27C8CB]">
                              {selectedUser.referralCode}
                            </Badge>
                          </div>
                          <button className="p-2 rounded-full bg-[#27C8CB] hover:bg-[#2AD7DB] transition-all duration-200">
                            <ThumbsUp size={20} className="text-black" />
                          </button>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
