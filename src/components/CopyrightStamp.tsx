export default function CopyrightStamp() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      <img
        src="/stamps/kashpages-copyright.svg"
        alt=""
        className="
          w-[520px]
          max-w-[80vw]
          rotate-[-14deg]
          opacity-[0.18]
          select-none
        "
      />
    </div>
  )
}
