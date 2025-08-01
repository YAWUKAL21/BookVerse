import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col items-center gap-3">
        <h2 className="text-lg font-semibold">BookVerse</h2>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-gray-700 transition-colors"
          >
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-gray-300 hover:text-white" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-gray-700 transition-colors"
          >
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 text-gray-300 hover:text-white" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-gray-700 transition-colors"
          >
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-white" />
            </a>
          </Button>
        </div>
        <p className="text-sm mt-2 text-gray-400">
          &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
