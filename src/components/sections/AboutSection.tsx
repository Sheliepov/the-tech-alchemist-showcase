
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Code, Database, Braces, 
  Sparkles, Brain, Github, 
  Bot, Stars
} from "lucide-react";

const AboutSection = () => {
  const skills = [
    { 
      category: "Frontend",
      icon: <Code className="w-5 h-5 mr-2 text-tech-frontend" />,
      items: [
        "React/Next.js/TypeScript", 
        "State Management (Redux, Zustand, Jotai)", 
        "Design Systems & Component Libraries", 
        "Advanced CSS (Tailwind, Styled-Components)",
        "Performance Optimization"
      ],
      color: "tech-frontend",
      description: "Building exceptional user experiences with modern JavaScript frameworks and performance-focused development."
    },
    { 
      category: "Backend", 
      icon: <Database className="w-5 h-5 mr-2 text-tech-backend" />,
      items: [
        "Node.js/Express", 
        "GraphQL API Design", 
        "RESTful Architecture", 
        "Database Design (SQL & NoSQL)",
        "Serverless Functions"
      ],
      color: "tech-backend",
      description: "Creating robust, scalable backend systems with modern JavaScript and TypeScript."
    },
    { 
      category: "Architecture", 
      icon: <Braces className="w-5 h-5 mr-2 text-tech-blockchain" />,
      items: [
        "Micro-Frontend Architecture",
        "Design Patterns & Best Practices",
        "System Design & Documentation",
        "Testing Strategies (TDD/BDD)",
        "CI/CD & DevOps Integration"
      ],
      color: "tech-blockchain",
      description: "Designing scalable software architectures and implementing engineering best practices."
    },
    { 
      category: "Innovation", 
      icon: <Sparkles className="w-5 h-5 mr-2 text-tech-ai" />,
      items: [
        "Web Performance Optimization",
        "Accessibility (WCAG Standards)",
        "UI/UX Design Collaboration",
        "Technical Leadership",
        "Mentoring & Knowledge Sharing"
      ],
      color: "tech-ai",
      description: "Pushing the boundaries of web development through innovation and technical excellence."
    }
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="section-container">
        <h2 className="section-title text-center">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Bio */}
          <div className="space-y-6 animate-card">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="px-3 py-1 text-primary border-primary/30">
                <Brain className="w-4 h-4 mr-1" /> Senior Frontend Developer
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-tech-backend border-tech-backend/30">
                <Stars className="w-4 h-4 mr-1" /> 8+ Years Experience
              </Badge>
            </div>
            
            <h3 className="text-2xl font-semibold">My Journey</h3>
            <p className="text-muted-foreground">
              I'm a passionate frontend developer with 8+ years of experience crafting high-performance web applications. 
              My expertise lies in building complex, user-centric interfaces with React, TypeScript, and modern frontend 
              tooling. I pride myself on writing clean, maintainable code that scales.
            </p>
            <p className="text-muted-foreground">
              Throughout my career, I've led frontend teams at startups and established organizations, 
              implementing engineering best practices, component libraries, and design systems. I'm deeply 
              committed to web performance optimization, accessibility, and creating exceptional user experiences.
            </p>
            
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Github className="w-5 h-5 text-primary" />
                <span>Active open-source contributor with 500+ GitHub contributions this year</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bot className="w-5 h-5 text-primary" />
                <span>Technical writer with articles on React optimization and modern JavaScript</span>
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className="text-lg font-medium mb-3">My Approach</h4>
              <p className="text-muted-foreground">
                I approach projects with a focus on performance, maintainability, and user experience. 
                I believe in continuous learning, sharing knowledge with the team, and building systems 
                that stand the test of time. My technical decisions are guided by best practices while 
                remaining pragmatic and focused on business value.
              </p>
            </div>
          </div>
          
          {/* Right side: Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Areas of Expertise</h3>
            
            <div className="space-y-6">
              {skills.map((skillGroup) => (
                <Card key={skillGroup.category} className="bg-secondary/50 border-none shadow-lg animate-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      {skillGroup.icon}
                      <h4 className="text-xl font-semibold text-primary">
                        {skillGroup.category}
                      </h4>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm">
                      {skillGroup.description}
                    </p>
                    
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
