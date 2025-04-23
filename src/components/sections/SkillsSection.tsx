
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const SkillsSection = () => {
  const skillCategories = [
    {
      name: "Frontend Development",
      color: "tech-frontend",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Redux/State Management", level: 80 },
        { name: "Responsive Design", level: 95 },
      ]
    },
    {
      name: "Backend Development",
      color: "tech-backend",
      skills: [
        { name: "Node.js/Express", level: 90 },
        { name: "Python/Django", level: 85 },
        { name: "RESTful APIs", level: 95 },
        { name: "GraphQL", level: 75 },
        { name: "Databases (SQL/NoSQL)", level: 85 },
      ]
    },
    {
      name: "Blockchain Development",
      color: "tech-blockchain",
      skills: [
        { name: "Solidity", level: 90 },
        { name: "Smart Contract Architecture", level: 85 },
        { name: "Web3.js/Ethers.js", level: 90 },
        { name: "DeFi Protocols", level: 80 },
        { name: "Zero-knowledge Proofs", level: 70 },
      ]
    },
    {
      name: "AI/ML Development",
      color: "tech-ai",
      skills: [
        { name: "Machine Learning Algorithms", level: 80 },
        { name: "TensorFlow/PyTorch", level: 85 },
        { name: "Natural Language Processing", level: 75 },
        { name: "LLM Integration", level: 80 },
        { name: "Computer Vision", level: 70 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="section-container">
        <h2 className="section-title text-center">Skills & Technologies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className={`border border-${category.color}/30 bg-card animate-fade-in`}
            >
              <CardContent className="p-6">
                <h3 className={`text-2xl font-bold mb-4 text-${category.color}`}>
                  {category.name}
                </h3>
                <Separator className="mb-6" />
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional Technologies */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Additional Technologies & Tools</h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Docker", "Kubernetes", "AWS", "Firebase", "CI/CD", "Jest", 
              "WebSockets", "Redis", "Microservices", "PWAs", "WebAssembly", 
              "OAuth", "IPFS", "ThirdWeb", "LangChain", "OpenAI API",
              "Three.js", "WebGL", "Netlify", "Vercel", "Git", "GitHub Actions"
            ].map((tech) => (
              <div 
                key={tech} 
                className="bg-secondary px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
