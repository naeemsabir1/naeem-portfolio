export default function HeroDivider() {
  return (
    <div style={{ width: "100%", lineHeight: 0, backgroundColor: "#000" }}>
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "160px", display: "block" }}
      >
        <path
          d="M0,0 C320,80 420,0 720,60 C1020,120 1280,40 1440,80 L1440,160 L0,160 Z"
          fill="#fafafa"
        />
        {/* Fill the top with dark to explicitly overlap any gaps */}
         <path
          d="M0,0 L1440,0 L1440,80 C1280,40 1020,120 720,60 C420,0 320,80 0,0 Z"
          fill="#000000"
        />
      </svg>
    </div>
  );
}
