interface MonoFlagProps {
  className?: string;
}

function MonoFlag({ className = "" }: MonoFlagProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-paper/30 ${className}`}
      aria-hidden="true"
    >
      <div className="h-1/3 bg-[#000000]" />
      <div className="h-1/3 bg-[#ffffff]" />
      <div className="h-1/3 bg-[#007a3d]" />
      <div className="absolute inset-y-0 left-0 w-2/5 bg-[#ce1126] [clip-path:polygon(0_0,100%_50%,0_100%)]" />
    </div>
  );
}

export default MonoFlag;
