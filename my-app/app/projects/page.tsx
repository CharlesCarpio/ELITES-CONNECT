import Image from "next/image";
import { PlatformLayout } from "../components/platform-layout";

const projects = [
  {
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=85",
    alt: "Shelves filled with books in a library",
    status: "In progress",
    title: "Community library",
    description: "The new shelving is installed. We’re now gathering books and preparing the space for members and students.",
    update: "Updated October 30, 2026",
  },
  {
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1000&q=85",
    alt: "Students studying together in a library",
    status: "Completed",
    title: "Student scholarship program",
    description: "Twelve students received support this term through contributions from members and community partners.",
    update: "Updated October 15, 2026",
  },
  {
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=85",
    alt: "A team reviewing a project report",
    status: "Published",
    title: "Quarterly community report",
    description: "A look at the work, milestones, and lessons from the third quarter is available through the office.",
    update: "Updated September 30, 2026",
  },
];

export default function ProjectsPage() {
  return (
    <PlatformLayout
      activePath="/projects"
      eyebrow="Small steps, real impact"
      title="Projects"
      description="Follow the work our members are doing and see how it grows over time."
    >
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-image-wrap">
              <Image src={project.image} alt={project.alt} width={1000} height={700} unoptimized className="project-image" />
              <span className="project-status">{project.status}</span>
            </div>
            <div className="project-copy">
              <p className="eyebrow">{project.update}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PlatformLayout>
  );
}