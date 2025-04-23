
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Problem Solving (Basic)",
    provider: "HackerRank",
    issued: "Jan 2023",
    link: "https://www.hackerrank.com/certificates/example1"
  },
  {
    id: 2,
    title: "JavaScript (Intermediate)",
    provider: "HackerRank",
    issued: "Feb 2023",
    link: "https://www.hackerrank.com/certificates/example2"
  },
  {
    id: 3,
    title: "Python (Basic)",
    provider: "HackerRank",
    issued: "Mar 2023",
    link: "https://www.hackerrank.com/certificates/example3"
  },
];

const CertificationSection = () => (
  <section id="certifications" className="py-24">
    <div className="section-container">
      <h2 className="section-title text-center">Certifications</h2>
      <div className="mt-12 space-y-12">
        {certifications.map((cert) => (
          <Card key={cert.id} className="border-l-4 border-l-primary animate-fade-in">
            <CardHeader className="pb-3 flex flex-row items-center gap-4">
              <span className="bg-primary/10 p-3 rounded-full">
                <Award className="text-primary" size={32} />
              </span>
              <div>
                <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                  {cert.title}
                  <Badge variant="outline" className="ml-2">{cert.provider}</Badge>
                </CardTitle>
                <span className="text-muted-foreground text-sm">{cert.issued}</span>
              </div>
            </CardHeader>
            <CardContent>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:opacity-80 transition"
                >
                  View Certificate
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationSection;

