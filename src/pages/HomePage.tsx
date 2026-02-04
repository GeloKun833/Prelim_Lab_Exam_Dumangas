import { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import StudentComponent from '../components/StudentComponent';

const sampleStudents = [
  { studentName: 'Kerwin James R. Macasunod', course: 'BS Information Technology', year: '4' },
  { studentName: 'Jan Rhen Garcia', course: 'BS Information Technology', year: '4' },
  { studentName: 'Andrei Asnan', course: 'BS Information Technology', year: '4' },
  { studentName: 'Mark Anthony R. Dela Rosa', course: 'BS Information Technology', year: '4' },
  { studentName: 'Juan Miguel R. Larios', course: 'BS Information Technology', year: '4' },
  { studentName: 'Gio Calugas', course: 'BS Information Technology', year: '4' },
];

const CURSOR_DEPTH = 0.02;

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) * CURSOR_DEPTH;
      const y = (e.clientY - centerY) * CURSOR_DEPTH;
      setCursor({ x, y });
    },
    []
  );

  const handleHeroMouseLeave = useCallback(() => {
    setCursor({ x: 0, y: 0 });
  }, []);

  const contentTransform = `translate3d(${cursor.x}px, ${cursor.y}px, 0)`;

  return (
    <main className="page home-page">
      <section
        ref={heroRef}
        className="hero"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        aria-label="Hero"
      >
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-gradient" />
          <div className="hero-light hero-light-1" />
          <div className="hero-light hero-light-2" />
          <div className="hero-parallax-layer hero-orb hero-orb-1" />
          <div className="hero-parallax-layer hero-orb hero-orb-2" />
        </div>

        <div
          className="hero-content"
          style={{ transform: contentTransform }}
        >
          <h1 className="hero-headline">
            Student Information Application
          </h1>
          <p className="hero-subtitle">
            Manage records, view students, and keep everything in one place. Modern, fast, and built for your workflow.
          </p>
          <div className="hero-cta">
            <Link to="/students" className="hero-btn hero-btn-primary">
              View Students
            </Link>
            <a href="#featured" className="hero-btn hero-btn-glass">
              Featured Students
            </a>
          </div>
        </div>
      </section>

      <section id="featured" className="page-content animate-in">
        <h2 className="section-title">Featured Students</h2>
        <div className="student-grid">
          {sampleStudents.map((student, index) => (
            <div key={student.studentName} className="animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <StudentComponent
                studentName={student.studentName}
                course={student.course}
                year={student.year}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
