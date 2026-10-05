import type { ReactNode } from "react";
import { comforts, type ComfortIconName } from "@/lib/stay-details";
import "./Comforts.css";

const drawings: Record<ComfortIconName, ReactNode> = {
  kitchen: <><rect x="5" y="7" width="30" height="28" rx="3" /><path d="M5 16h30M11 11h2m6 0h2m6 0h2" /><rect x="11" y="21" width="18" height="9" rx="1" /><path d="M10 3h20" /></>,
  climate: <><rect x="4" y="8" width="32" height="14" rx="3" /><path d="M8 17h24M12 25v4c0 3-3 3-3 6m11-10v10m8-10v4c0 3 3 3 3 6" /></>,
  patio: <><path d="M3 17 20 4l17 13H3Zm17 0v19M10 36h20M5 25h11m-11 0v11m30-11H24m11 0v11" /></>,
  laundry: <><rect x="7" y="3" width="26" height="34" rx="3" /><path d="M7 11h26m-20-4h2m5 0h2" /><circle cx="20" cy="23" r="9" /><path d="M12 24c5-6 11 6 16 0" /></>,
  tv: <><rect x="3" y="6" width="34" height="24" rx="3" /><path d="M15 36h10m-5-6v6" /></>,
  shower: <><path d="M8 36V11a7 7 0 0 1 14 0v2m-7 5a7 5 0 0 1 14 0H15Zm1 6v2m6-2v2m6-2v2m-12 5v2m6-2v2m6-2v2" /></>,
};

export function Comforts() {
  return <section id="comfort" className="comfort-section section-space" aria-labelledby="comfort-title">
    <div className="page-shell">
      <div className="comfort-heading">
        <div><p className="eyebrow section-kicker">I comfort della casa</p><h2 id="comfort-title" className="section-title">Sentirsi a casa.<br /><em>Con semplicità.</em></h2></div>
        <p className="section-description">Le piccole cose che rendono più leggera la vacanza. Tutto il piacere di avere i tuoi spazi e i tuoi ritmi.</p>
      </div>
      <ul className="comfort-grid">
        {comforts.map(item => <li key={item.icon} className="comfort-item">
          <span className="comfort-icon"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawings[item.icon]}</svg></span>
          <h3>{item.title}</h3><p>{item.detail}</p>
        </li>)}
      </ul>
      <a className="comfort-faq-link" href="#faq">Hai una domanda sul soggiorno? <span>Leggi le FAQ ↓</span></a>
    </div>
  </section>;
}
