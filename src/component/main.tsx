import React from "react";
import { Button } from "../ui/button";

import Link from "next/link";
import Image from "next/image";
import { MessageCircleMore } from "lucide-react";
import { features, placeholderImage } from "../lib/constant";
import Faq from "./faq";

const MainComponent = () => {
  const heroImage = placeholderImage.find((p) => p.id === "hero-image");
  return (
    <main className="min-h-screen">
      <section className="bg-primary/10 py-10 md:py-20 lg:py-32">
        <div className="container px-6 md:px-12">
          <div className="flex flex-col gap-6 md:flex-row">
            <div>
              <h1 className="text-primary tracking-tighter text-3xl md:text-5xl font-bold">
                Understand Your Lab Results, Instantly.
              </h1>
              <p className="text-md md:text-xl text-foreground/80 py-3">
                LabWise AI is your personal medical chatbot, providing clear,
                concise answers to your questions about laboratory tests.
              </p>
              <Button size={"lg"}>
                <Link href="/chatbot" className="flex gap-3">
                  {" "}
                  Ask a Question <MessageCircleMore className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                width={600}
                height={400}
                alt={heroImage.imageDescription}
                className="mx-auto rounded-xl overflow-hidden object-cover aspect-video sm:w-full  lg:order-last"
              />
            )}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="w-full py-12 md:py-20 lg:py-32 px-6 md:px-12"
      >
        <div className="flex flex-col gap-3 justify-center items-center">
          <h2 className="bg-secondary/70 w-fit py-1 px-3 text-sm rounded-lg text-foreground">
            Key Features
          </h2>
          <h3 className="text-foreground font-extrabold text-2xl md:text-5xl">
            {" "}
            Your Health, Simplified
          </h3>
          <p className="text-foreground/80 max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed text-center">
            LabWise AI is designed to empower you with knowledge, making complex
            medical information accessible and understandable.
          </p>
        </div>
        <div className="py-8 max-w-5xl mx-auto">
          <div className="flex md:flex-row flex-col gap-10 justify-between">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="shadow-md hover:shadow-sl transition-shadow duration-300 p-6 rounded-lg bg-foreColor"
              >
                <div className="flex gap-4 items-center pb-6">
                  <div className="bg-primary/10 rounded-full p-3">
                    <feature.icon className="text-primary w-8 h-8" />
                  </div>
                  <h4 className="text-foreground md:text-xl font-semibold ">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-foreground/80 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <Faq />
      </section>
    </main>
  );
};

export default MainComponent;
