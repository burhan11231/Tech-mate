export default function CopyrightStamp() {
  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={{ opacity: 0.35 }}
    >
      <img
        src="/stamps/kashpages-copyright.svg"
        alt="KashPages Preview Copyright"
        className="w-[360px] rotate-[-15deg]"
      />
    </div>
  )
}
