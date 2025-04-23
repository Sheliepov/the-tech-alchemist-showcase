import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const educationList = [
  {
    id: 1,
    degree: "BCompSc, Bachelor of Computer Science",
    institution: "National Technical University of Ukraine 'Odessa National Polytechnic University'",
    period: "2011 - 2015",
    description:
      "Master's degree focused on software engineering, distributed systems, and artificial intelligence. Graduated with distinction.",
    achievements: [
      "Graduated top 5% of class",
      "Developed blockchain-based academic record prototype",
      "Completed thesis on distributed neural networks",
    ],
  }
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24">
      <div className="section-container">
        <h2 className="section-title text-center animate-fade-in">Education</h2>
        <div className="mt-12 space-y-12">
          {educationList.map((edu, index) => (
            <Card 
              key={edu.id} 
              className="border-l-4 border-l-primary animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <CardTitle className="text-xl md:text-2xl">{edu.degree}</CardTitle>
                  <Badge variant="outline" className="w-fit">{edu.period}</Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  {edu.institution}
                </p>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{edu.description}</p>
                {edu.achievements.length > 0 && (
                  <>
                    <h4 className="text-md font-semibold mb-2 mt-2">Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 mb-2 text-muted-foreground">
                      {edu.achievements.map((achieve, idx) => (
                        <li key={idx}>{achieve}</li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
