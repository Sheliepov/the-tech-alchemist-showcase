
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutSection = () => {
  const skills = [
    { 
      category: "Frontend", 
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
      color: "tech-frontend"
    },
    { 
      category: "Backend", 
      items: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"],
      color: "tech-backend"
    },
    { 
      category: "Blockchain", 
      items: ["Solidity", "Hardhat", "Web3.js", "Ethers.js", "Chainlink"],
      color: "tech-blockchain"
    },
    { 
      category: "AI/ML", 
      items: ["TensorFlow", "PyTorch", "LangChain", "LLM APIs", "Computer Vision"],
      color: "tech-ai"
    }
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="section-container">
        <h2 className="section-title text-center">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Bio */}
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-semibold">My Journey</h3>
            <p className="text-muted-foreground">
              I started my development journey 8 years ago with a passion for creating elegant solutions to complex problems. With a background in computer science and continuous learning, I've evolved from a frontend enthusiast to a versatile full-stack developer with specialized expertise in blockchain and AI technologies.
            </p>
            <p className="text-muted-foreground">
              Having worked with startups and established organizations alike, I bring a unique perspective that combines technical excellence with business acumen. My approach is centered around building scalable, maintainable systems that deliver real value to users and businesses.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, I contribute to open source projects, write technical articles, and explore the latest advancements in blockchain and AI. I believe in technology as a force for positive change and strive to create solutions that make a meaningful impact.
            </p>
          </div>
          
          {/* Right side: Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Skills & Expertise</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup) => (
                <Card key={skillGroup.category} className="bg-secondary border-none shadow-lg animate-scale-in">
                  <CardContent className="p-6">
                    <h4 className={`text-xl font-semibold mb-4 text-${skillGroup.color}`}>
                      {skillGroup.category}
                    </h4>
                    <Separator className="mb-4" />
                    <ul className="space-y-2">
                      {skillGroup.items.map((skill) => (
                        <li key={skill} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-${skillGroup.color}`}></div>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Testimonial */}
            <Card className="mt-8 bg-glass border-none shadow-lg">
              <CardContent className="p-6">
                <blockquote className="italic text-muted-foreground">
                  "One of the most versatile developers I've worked with. Their expertise across full-stack, blockchain, and AI technologies enabled our team to deliver an innovative product ahead of schedule."
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">JD</span>
                  </div>
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">CTO, Tech Innovations Inc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
