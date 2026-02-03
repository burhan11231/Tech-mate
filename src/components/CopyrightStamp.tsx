export default function CopyrightStamp() {
  return (
    <div
      className="
        fixed
        top-0 left-0
        w-screen h-screen
        pointer-events-none
      "
      style={{
        zIndex: 2147483647, // max safe z-index
      }}
    >
      <img
        src="/stamps/kashpages-copyright.svg"
        alt=""
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[520px]
          max-w-[85vw]
          rotate-[-14deg]
          opacity-[0.18]
          select-none
        "
      />
    </div>
  )
}
