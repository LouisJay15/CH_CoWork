/** FAQ as <details>, so answers stay in the markup and open from the keyboard. */
export default function FaqList({ items }) {
  return (
    <ul className="faq">
      {items.map((item) => (
        <li key={item.question}>
          <details>
            <summary>{item.question}</summary>
            <div className="faq__answer">{item.answer}</div>
          </details>
        </li>
      ))}
    </ul>
  );
}
