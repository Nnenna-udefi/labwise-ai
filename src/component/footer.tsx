import { Beaker } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-foreColor border-t text-sm text-foreground/70 px-4 sm:px-6 lg:px-8 py-6">
      <div className="container mx-auto ">
        <div className="flex md:flex-row text-center flex-col items-center justify-between">
          <div className="flex gap-3 items-center">
            <Beaker className="text-primary h-5 w-5" />
            <p>© {new Date().getFullYear()} LabWiseAI. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
