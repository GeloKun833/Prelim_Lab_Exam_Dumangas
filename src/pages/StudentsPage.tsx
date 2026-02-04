import { useEffect, useState } from 'react';
import LoadingModal from '../components/LoadingModal';

interface ApiUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  picture?: string;
}

interface RandomUserResult {
  login: { uuid: string; username: string };
  name: { first: string; last: string };
  email: string;
  phone: string;
  picture: { thumbnail: string };
}

const API_URL = 'https://randomuser.me/api/?results=10';

function mapResults(results: RandomUserResult[]): ApiUser[] {
  return results.map((u) => ({
    id: u.login.uuid,
    name: `${u.name.first} ${u.name.last}`,
    username: u.login.username,
    email: u.email,
    phone: u.phone || undefined,
    picture: u.picture?.thumbnail,
  }));
}

export default function StudentsPage() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    
    // Start 3-second timer
    const minLoadingTimer = new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      const apiPromise = fetch(API_URL, { signal })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => mapResults(data.results ?? []));
      
      // Wait for both API call and minimum 3 seconds
      const [list] = await Promise.all([apiPromise, minLoadingTimer]);
      setUsers(list);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message || 'Failed to load data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  fetchUsers();
  return () => controller.abort();
}, []);



  return (
    <main className="page students-page">
      {loading && <LoadingModal visible={loading} message="LOADING STUDENTS" fullScreen />}

      <section className="page-content animate-in" aria-hidden={loading}>
        <h2 className="section-title">Students (API Data)</h2>

        {error && (
          <div className="api-state error-state" role="alert">
            <p className="error-message">{error}</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <ul className="students-list">
            {users.map((user, index) => (
              <li key={user.id} className="student-card-item" style={{ animationDelay: `${0.08 + index * 0.04}s` }}>
                <article className="student-api-card">
                  <div className="student-api-card-header">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt=""
                        className="student-api-avatar"
                        width={72}
                        height={72}
                      />
                    ) : (
                      <div className="student-api-avatar-placeholder" aria-hidden="true">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="student-api-card-body">
                    <h3 className="student-api-name">{user.name}</h3>
                    <p className="student-api-username">@{user.username}</p>
                    <a href={`mailto:${user.email}`} className="student-api-email">
                      {user.email}
                    </a>
                    {user.phone && (
                      <p className="student-api-phone">{user.phone}</p>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
