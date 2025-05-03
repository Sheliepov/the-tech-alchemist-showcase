
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Calendar } from "lucide-react";

const educationList = [
  {
    id: 1,
    degree: "MSc Computer Science, Software Engineering",
    institution: "National Technical University of Ukraine 'Kyiv Polytechnic Institute'",
    period: "2014 - 2016",
    description:
      "Master's degree with specialization in frontend architecture, distributed systems, and UI/UX engineering. Graduated with honors.",
    achievements: [
      "Graduated with First Class Honors (GPA: 3.9/4.0)",
      "Master's thesis: 'Component-Based Architecture for Modern Web Applications'",
      "Research project on optimizing JavaScript performance in single-page applications",
      "Teaching Assistant for 'Modern Web Development' undergraduate course"
    ],
  },
  {
    id: 2,
    degree: "BSc Computer Science",
    institution: "National Technical University of Ukraine 'Kyiv Polytechnic Institute'",
    period: "2011 - 2014",
    description:
      "Bachelor's degree covering fundamentals of computer science, algorithms, data structures, and web development basics.",
    achievements: [
      "Graduated top 5% of class",
      "Developed a responsive web application for university events",
      "Winner of the national student web development competition",
      "Student representative on department curriculum committee"
    ],
  }
];

const certifications = [
  "AWS Certified Developer Associate",
  "Google Cloud Professional Developer",
  "Frontend Masters Complete Professional Path",
  "React Advanced Patterns and Performance"
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24">
      <div className="section-container">
        <h2 className="section-title text-center">Education & Qualifications</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Main education column - takes 2/3 of space */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Formal Education</h3>
            </div>
            
            <div className="space-y-8">
              {educationList.map((edu) => (
                <Card 
                  key={edu.id} 
                  className="border-l-4 border-l-primary animate-card bg-secondary/10 shadow-lg"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                          {edu.degree}
                        </CardTitle>
                        <p className="text-lg text-muted-foreground mt-1">
                          {edu.institution}
                        </p>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {edu.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">{edu.description}</p>
                    {edu.achievements.length > 0 && (
                      <>
                        <h4 className="text-md font-semibold mb-3 mt-4 flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" /> Key Achievements
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {edu.achievements.map((achieve, idx) => (
                            <li key={idx} className="pl-2">{achieve}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Certifications column - takes 1/3 of space */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Professional Development</h3>
            </div>
            
            <Card className="bg-secondary/10 border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">Key Certifications</h4>
                <Separator className="mb-6" />
                
                <ul className="space-y-4">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <Award className="w-4 h-4 text-primary" />
                      </div>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-lg font-semibold mb-3">Continuing Education</h4>
                  <p className="text-muted-foreground text-sm">
                    I regularly complete online courses, attend workshops, and participate in conferences to stay
                    current with the rapidly evolving frontend ecosystem. I dedicate at least 8 hours per week to
                    continuous learning and experimentation with new technologies.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">Languages</h4>
                <Separator className="mb-6" />
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>English</span>
                      <span className="text-muted-foreground">Professional</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Ukrainian</span>
                      <span className="text-muted-foreground">Native</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Russian</span>
                      <span className="text-muted-foreground">Professional</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                    </div>
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

export default EducationSection;
