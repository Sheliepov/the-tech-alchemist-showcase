
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack, AI & Blockchain Developer",
      company: "Upwork",
      period: "April 2025 - Present",
      description: "Leading development of enterprise-grade web applications with React, Node.js, and PostgreSQL. Architected and implemented a microservices-based system that improved application scalability by 40% and reduced deployment times by 60%.",
      achievements: [
        "Implemented CI/CD pipeline reducing deployment time by 70%",
        "Led team of 5 developers to deliver projects consistently ahead of schedule",
        "Optimized database queries resulting in 50% performance improvement",
      ],
      technologies: ["Python", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "LLM", "Solidity"]
    },
    {
      id: 2,
      title: "Senior Python, AI & Full Stack Developer",
      company: "IT Adviser",
      period: "November 2020 - October 2024",
      description: "Designed and developed smart contracts for DeFi protocols handling over $10M in locked value. Created secure and gas-efficient contracts for token swaps, lending, and staking.",
      achievements: [
        "Orchestrated containerized build strategies using Docker, accelerating deployment times by 70%.",
        "Implemented code standards that improved team's average productivity by 25%.",
        "Transformed legacy systems into microservice architectures using Python and Django, resulting in a 60% increase in processing efficiency.",
        "Leveraged Python libraries such as Pandas, NumPY to drive data analysis and model building, resulting in a 30% increase in prediction accuracy",
      ],
      technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "FastAPI"]
    },
    {
      id: 3,
      title: "Full Stack, Blockchain & Python Developer",
      company: "Provectus IT",
      period: "June 2016 - September 2020",
      description: "Developed machine learning models for predictive analytics and natural language processing applications. Created a sentiment analysis system with 92% accuracy for customer feedback processing.",
      achievements: [
        "Reduced model training time by 40% through optimization techniques",
        "Implemented NLP pipeline processing 100K+ documents daily",
        "Integrated ML models with web applications via REST APIs",
      ],
      technologies: ["Solidity", "Hardhat", "Ethers.js", "Web3.js", "React"]
    }
  ];

  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <h2 className="section-title text-center">Professional Experience</h2>
        
        <div className="mt-12 space-y-12">
          {experiences.map((experience) => (
            <Card key={experience.id} className="border-l-4 border-l-primary animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <CardTitle className="text-xl md:text-2xl">
                    {experience.title}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {experience.period}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  {experience.company}
                </p>
              </CardHeader>
              
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  {experience.description}
                </p>
                
                <h4 className="text-md font-semibold mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1 mb-4 text-muted-foreground">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
                
                <h4 className="text-md font-semibold mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" className="rounded-full">
            Download Full Resume
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
