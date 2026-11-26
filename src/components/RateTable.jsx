import { PriceNote } from "./Notes.jsx";

/** A semantic rate table with the VAT line underneath. */
export default function RateTable({ caption, columns, rows, note }) {
  return (
    <div>
      <div className="table-wrap">
        <table className="rate-table">
          {caption && <caption>{caption}</caption>}
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                <th scope="row">{row[0]}</th>
                {row.slice(1).map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PriceNote />
      {note && <p className="caption">{note}</p>}
    </div>
  );
}
