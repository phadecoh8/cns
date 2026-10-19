'use client';

import { useState } from 'react';
import {
  Minus, Plus 
} from 'lucide-react';
import { faqItems } from '@/content/faq';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-title"
      className="faq-section"
      id="faq"
    >
      <div className="container faq-layout">
        <div>
          <p className="eyebrow">Frequently asked</p>
          <h2 className="section-title" id="faq-title">
            Questions, answered.
          </h2>
          <p>Still curious? Send us your question.</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const Icon = isOpen ? Minus : Plus;

            return (
              <article className="faq-item" key={item.question}>
                <h3>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    type="button"
                  >
                    {item.question}
                    <Icon aria-hidden="true" />
                  </button>
                </h3>
                {isOpen && <p id={answerId}>{item.answer}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
