import { useState } from 'react';
import landingContent from '../../data/landingContent';

const { faq } = landingContent;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{faq.badge}</span>
          <h2 className="section-header__headline">{faq.headline}</h2>
        </div>
        <div className="faq__list">
          {faq.items.map((item, i) => (
            <article className={`faq__item reveal ${openIndex === i ? 'faq__item--open' : ''}`} key={item.id}>
              <button
                className="faq__item-question"
                type="button"
                aria-expanded={openIndex === i}
                onClick={() => handleToggle(i)}
              >
                <span>{item.question}</span>
                <span className="faq__item-icon" aria-hidden="true">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              <div className="faq__item-answer" role="region">
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
