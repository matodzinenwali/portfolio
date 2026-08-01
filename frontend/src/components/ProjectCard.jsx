import { useState } from 'react';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const { title, description, repoUrl, imageUrl, skills = [] } = project;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = imageUrl && !imageFailed;

  return (
    <article className="project-card">
      <div className="project-card-tab mono">
        <span className="project-card-dot" aria-hidden="true" />
        {slugify(title)}.md
      </div>

      <div className="project-card-thumb">
        {showImage ? (
          <img src={imageUrl} alt="" onError={() => setImageFailed(true)} />
        ) : (
          <div className="project-card-thumb-placeholder mono" aria-hidden="true">
            {'</>'}
          </div>
        )}
      </div>

      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-desc">{description}</p>

        {skills.length > 0 && (
          <div className="project-card-tags">
            {skills.map((skill) => (
              <span key={skill._id || skill.name} className="tag">
                {skill.name || skill}
              </span>
            ))}
          </div>
        )}

        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="project-card-link mono"
          >
            View repo →
          </a>
        )}
      </div>
    </article>
  );
}

function slugify(title = '') {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
