import { useState } from 'react';

export interface StudentProps {
  studentName: string;
  course: string;
  year: string;
}

export default function StudentComponent({ studentName, course, year }: StudentProps) {
  const [expanded, setExpanded] = useState(false);
  const [displayName, setDisplayName] = useState(studentName);

  const handleToggleDetails = () => {
    setExpanded((prev) => !prev);
  };

  const handleUpdateName = () => {
    const newName = prompt('Enter new display name:', displayName);
    if (newName?.trim()) setDisplayName(newName.trim());
  };

  return (
    <article className="student-component" data-expanded={expanded}>
      <div className="student-card">
        <h3 className="student-name">{displayName}</h3>
        <p className="student-course">{course}</p>
        <p className="student-year">Year: {year}</p>
        <div className="student-actions">
          <button type="button" className="btn btn-primary" onClick={handleToggleDetails} aria-expanded={expanded}>
            {expanded ? 'Hide Details' : 'Show Details'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleUpdateName}>
            Update Name
          </button>
        </div>
        {expanded && (
          <div className="student-details">
            <p>Course: {course}</p>
            <p>Year Level: {year}</p>
          </div>
        )}
      </div>
    </article>
  );
}
