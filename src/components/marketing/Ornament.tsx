/**
 * Classical printer's ornament — three asterisks in italic Cormorant
 * with rust-colored hairlines on either side. Used between major
 * sections to add editorial rhythm + brand "soul".
 */
export function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      ✻ ✻ ✻
    </div>
  )
}

/**
 * Section eyebrow with rust-colored leading hairline.
 * More editorial than a plain uppercase tracking-wide line.
 */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>
}
