import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import landingContent from '../../data/landingContent';

const { faq } = landingContent;

function FAQItem({ item, index, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (answerRef.current) {
      setHeight(answerRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <article className={`faq__item reveal ${isOpen ? 'faq__item--open' : ''}`} key={item.id}>
      <button
        className="faq__item-question"
        type="button"
        aria-expanded={isOpen}
        onClick={() => onToggle(index)}
      >
        <span>{item.question}</span>
        <span className="faq__item-icon" aria-hidden="true">+</span>
      </button>
      <div
        className="faq__item-answer"
        role="region"
        style={{ maxHeight: isOpen ? height : 0 }}
      >
        <p ref={answerRef}>{item.answer}</p>
      </div>
    </article>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-header reveal">
          <span className="badge">{faq.badge}</span>
          <h2 className="section-header__headline">{faq.headline}</h2>
        </div>
        <div className="faq__list">
          {faq.items.map((item, i) => (
            <FAQItem
              key={item.id}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
