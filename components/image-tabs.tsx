"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const tabs = {
  organizeTab: "organize",
  hiredTab: "hired",
  manageTab: "manage",
} as const;

type Tab = (typeof tabs)[keyof typeof tabs];

const tabItems = [
  { key: tabs.organizeTab, label: "Organize Applications" },
  { key: tabs.hiredTab, label: "Get Hired" },
  { key: tabs.manageTab, label: "Manage Boards" },
];

const tabImages = {
  [tabs.organizeTab]: {
    src: "/hero-images/hero1.png",
    alt: "Organize Applications",
  },
  [tabs.hiredTab]: {
    src: "/hero-images/hero2.png",
    alt: "Get Hired",
  },
  [tabs.manageTab]: {
    src: "/hero-images/hero3.png",
    alt: "Manage Boards",
  },
};

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState<Tab>(tabs.organizeTab);
  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2 justify-center mb-8">
            {tabItems.map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-6 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
            {tabImages[activeTab] && (
              <Image
                src={tabImages[activeTab].src}
                alt={tabImages[activeTab].alt}
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
