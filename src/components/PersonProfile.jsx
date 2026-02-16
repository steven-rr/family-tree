import { useParams, useNavigate } from "react-router-dom";
import {
  getPerson,
  getFullName,
  getDisplayName,
  getParents,
  getChildren,
  getPartners,
  getSiblings,
  getUnionsForPerson,
} from "../data/familyData";
import "./PersonProfile.css";

function PersonProfile() {
  const { personId } = useParams();
  const navigate = useNavigate();
  const person = getPerson(personId);

  if (!person) {
    return (
      <div className="profile-not-found">
        <h2>Person not found</h2>
        <p>No record found for &ldquo;{personId}&rdquo;</p>
        <button className="profile-back-btn" onClick={() => navigate("/")}>
          Back to Family Tree
        </button>
      </div>
    );
  }

  const parents = getParents(personId);
  const partners = getPartners(personId);
  const children = getChildren(personId);
  const siblings = getSiblings(personId);
  const isMale = person.gender === "male";

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <div className={`profile-hero ${isMale ? "male" : "female"}`}>
        <div className="profile-hero-bg"></div>
        <div className="profile-hero-content">
          <div className={`profile-avatar ${isMale ? "male" : "female"}`}>
            {person.photo ? (
              <img src={person.photo} alt={getFullName(personId)} />
            ) : (
              <span className="avatar-icon">{isMale ? "👤" : "👩"}</span>
            )}
          </div>
          <h1 className="profile-name">{getDisplayName(personId)}</h1>
          <div className="profile-meta">
            {person.birthYear && (
              <span className="meta-item">
                Born {person.birthYear}
              </span>
            )}
            {person.deathYear && (
              <span className="meta-item">
                Died {person.deathYear}
              </span>
            )}
            {!person.birthYear && !person.deathYear && (
              <span className="meta-item meta-muted">Dates unknown</span>
            )}
          </div>
        </div>
      </div>

      <div className="profile-body">
        {/* Bio Section */}
        {person.bio && (
          <section className="profile-section">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              About
            </h2>
            <p className="profile-bio">{person.bio}</p>
          </section>
        )}

        {/* Parents */}
        {parents.length > 0 && (
          <section className="profile-section">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Parents
            </h2>
            <div className="person-cards">
              {parents.map((pid) => (
                <PersonCard key={pid} personId={pid} onClick={() => navigate(`/person/${pid}`)} />
              ))}
            </div>
          </section>
        )}

        {/* Partners / Marriages */}
        {partners.length > 0 && (
          <section className="profile-section">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {partners.length === 1 ? "Spouse" : "Marriages"}
            </h2>
            {partners.map((p, idx) => (
              <div key={p.unionId} className="marriage-block">
                {partners.length > 1 && (
                  <div className="marriage-label">
                    {idx === 0 ? "1st" : idx === 1 ? "2nd" : `${idx + 1}th`} Marriage
                  </div>
                )}
                <div className="person-cards">
                  <PersonCard
                    personId={p.partnerId}
                    onClick={() => navigate(`/person/${p.partnerId}`)}
                  />
                </div>
                {p.children.length > 0 && (
                  <div className="marriage-children">
                    <span className="children-label">Children from this marriage:</span>
                    <div className="person-cards person-cards-sm">
                      {p.children.map((cid) => (
                        <PersonCard
                          key={cid}
                          personId={cid}
                          small
                          onClick={() => navigate(`/person/${cid}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {p.children.length === 0 && (
                  <div className="marriage-children">
                    <span className="children-label children-none">No children from this marriage</span>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Siblings */}
        {(siblings.full.length > 0 || siblings.half.length > 0) && (
          <section className="profile-section">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Siblings
            </h2>
            {siblings.full.length > 0 && (
              <div className="sibling-group">
                <span className="sibling-label">Full siblings</span>
                <div className="person-cards person-cards-sm">
                  {siblings.full.map((sid) => (
                    <PersonCard
                      key={sid}
                      personId={sid}
                      small
                      onClick={() => navigate(`/person/${sid}`)}
                    />
                  ))}
                </div>
              </div>
            )}
            {siblings.half.length > 0 && (
              <div className="sibling-group">
                <span className="sibling-label">Half-siblings</span>
                <div className="person-cards person-cards-sm">
                  {siblings.half.map((sid) => (
                    <PersonCard
                      key={sid}
                      personId={sid}
                      small
                      onClick={() => navigate(`/person/${sid}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* All Children (if not already shown through marriages) */}
        {children.length > 0 && partners.length === 0 && (
          <section className="profile-section">
            <h2 className="section-title">Children</h2>
            <div className="person-cards">
              {children.map((cid) => (
                <PersonCard key={cid} personId={cid} onClick={() => navigate(`/person/${cid}`)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/** Reusable card for displaying a family member link */
function PersonCard({ personId, onClick, small = false }) {
  const person = getPerson(personId);
  if (!person) return null;

  const isMale = person.gender === "male";
  return (
    <button
      className={`person-card ${isMale ? "male" : "female"} ${small ? "small" : ""}`}
      onClick={onClick}
    >
      <span className="person-card-avatar">
        {isMale ? "👤" : "👩"}
      </span>
      <span className="person-card-name">{getFullName(personId)}</span>
      <span className="person-card-arrow">→</span>
    </button>
  );
}

export default PersonProfile;
