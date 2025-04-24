
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const projects = [
    {
      id: 1,
      name: "DeFi Dashboard",
      description: "A comprehensive dashboard for DeFi users to track portfolios, analyze yields, and manage positions across multiple blockchains in one unified interface.",
      techStack: ["React", "TypeScript", "Ethers.js", "TailwindCSS", "Web3 APIs"],
      role: "Lead Developer",
      category: "blockchain",
      image: "/placeholder.svg",
      demoLink: "#",
      sourceLink: "#"
    },
    {
      id: 2,
      name: "AI Content Analyzer",
      description: "An AI-powered tool that analyzes written content for sentiment, readability, SEO optimization, and provides actionable improvement suggestions.",
      techStack: ["Python", "TensorFlow", "Next.js", "NLP", "REST API"],
      role: "AI Engineer & Frontend Developer",
      category: "ai",
      image: "/placeholder.svg",
      demoLink: "#",
      sourceLink: "#"
    },
    {
      id: 3,
      name: "E-Commerce Platform",
      description: "A full-featured e-commerce solution with real-time inventory management, payment processing, and analytics dashboard for business owners.",
      techStack: ["Node.js", "React", "MongoDB", "Redis", "Stripe API"],
      role: "Full Stack Developer",
      category: "fullstack",
      image: "/projects/eCommerce.png",
      demoLink: "https://e-commer-website-three.vercel.app/",
      sourceLink: "https://github.com/Sheliepov/eCommer-website"
    },
    {
      id: 4,
      name: "Smart Contract Auditing Tool",
      description: "Automated tool that scans Solidity code for security vulnerabilities, optimization opportunities, and compliance with best practices.",
      techStack: ["Solidity", "TypeScript", "Hardhat", "Node.js", "GraphQL"],
      role: "Blockchain Developer",
      category: "blockchain",
      image: "/placeholder.svg",
      demoLink: "#",
      sourceLink: "#"
    },
    {
      id: 5,
      name: "Predictive Analytics Dashboard",
      description: "A business intelligence tool that leverages machine learning to predict customer behavior and market trends based on historical data.",
      techStack: ["Python", "PyTorch", "React", "D3.js", "FastAPI"],
      role: "ML Engineer & Dashboard Developer",
      category: "ai",
      image: "/placeholder.svg",
      demoLink: "#",
      sourceLink: "#"
    },
    {
      id: 6,
      name: "Real-Time Collaboration Suite",
      description: "A set of collaborative tools for remote teams including document editing, video conferencing, and project management with real-time updates.",
      techStack: ["WebRTC", "Socket.io", "React", "Node.js", "PostgreSQL"],
      role: "Lead Full Stack Developer",
      category: "fullstack",
      image: "/placeholder.svg",
      demoLink: "#",
      sourceLink: "#"
    }
  ];

  const filteredProjects = activeTab === "all"
    ? projects
    : projects.filter(project => project.category === activeTab);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fullstack": return "tech-frontend";
      case "blockchain": return "tech-blockchain";
      case "ai": return "tech-ai";
      default: return "primary";
    }
  };

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <h2 className="section-title text-center">Featured Projects</h2>

        <Tabs defaultValue="all" className="w-full mb-12">
          <div className="flex justify-center">
            <TabsList className="bg-secondary">
              <TabsTrigger
                value="all"
                onClick={() => setActiveTab("all")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger
                value="fullstack"
                onClick={() => setActiveTab("fullstack")}
                className="data-[state=active]:bg-tech-frontend data-[state=active]:text-primary-foreground"
              >
                Full Stack
              </TabsTrigger>
              <TabsTrigger
                value="blockchain"
                onClick={() => setActiveTab("blockchain")}
                className="data-[state=active]:bg-tech-blockchain data-[state=active]:text-primary-foreground"
              >
                Blockchain
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                onClick={() => setActiveTab("ai")}
                className="data-[state=active]:bg-tech-ai data-[state=active]:text-primary-foreground"
              >
                AI/ML
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fullstack" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blockchain" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    techStack: string[];
    role: string;
    category: string;
    image: string;
    demoLink: string;
    sourceLink: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const categoryColor = {
    fullstack: "tech-frontend",
    blockchain: "tech-blockchain",
    ai: "tech-ai"
  }[project.category] || "primary";

  return (
    <Card className="overflow-hidden border border-border/50 bg-secondary/30 hover:border-primary/50 transition-all duration-300 h-full flex flex-col animate-scale-in">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-center"
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-${categoryColor} text-white`}>
          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
        </div>
      </div>

      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">My Role:</p>
          <p className="text-sm text-muted-foreground">{project.role}</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Tech Stack:</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="bg-secondary/50">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button variant="default" size="sm" className="w-full">
          Live Demo
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          Source Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectsSection;
