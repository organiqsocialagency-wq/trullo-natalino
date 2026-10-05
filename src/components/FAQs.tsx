"use client";

import { useState } from "react";
import { stayFaqs } from "@/lib/stay-details";
import { brand } from "@/lib/brand";
import ScrollStack, { ScrollStackItem } from "./react-bits/ScrollStack";
import "./FAQs.css";

export function FAQs() {
  const [stacked, setStacked] = useState(true);
  return <section id="faq" className="faq-section section-space" aria-labelledby="faq-title">
    <div className="page-shell faq-layout">
      <div className="faq-heading">
        <p className="eyebrow section-kicker">Prima di partire / FAQ</p>
        <h2 id="faq-title" className="section-title">Le tue domande.<br /><em>Con calma.</em></h2>
        <p className="section-description">Qualche risposta per immaginare il tuo soggiorno. Al resto, pensiamo insieme.</p>
        <a href={brand.contact.whatsapp} target="_blank" rel="noreferrer" className="faq-contact">Chiedici su WhatsApp <span aria-hidden="true">↗</span><span className="sr-only">, nuova scheda</span></a>
        <button className="faq-view-toggle" type="button" aria-pressed={!stacked} onClick={() => setStacked(value => !value)}>{stacked ? "Leggi senza animazioni" : "Attiva le card in scorrimento"}</button>
      </div>
      <ScrollStack enabled={stacked} className="faq-stack">
        {stayFaqs.map((faq, index) => <ScrollStackItem key={faq.topic} itemClassName={`faq-card faq-card-${index % 3}`}>
          <div className="faq-card-meta"><span className="eyebrow">{faq.topic}</span><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
          <h3>{faq.question}</h3><p>{faq.answer}</p>
        </ScrollStackItem>)}
      </ScrollStack>
    </div>
  </section>;
}
