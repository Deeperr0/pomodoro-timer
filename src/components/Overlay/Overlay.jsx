export default function Overlay({ children }) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-40 flex flex-col px-6 md:items-center md:px-0 py-12 md:py-0 md:justify-center bg-[#0A0C1C] bg-opacity-50">
      <div className="bg-white rounded-2xl group/container md:w-fit">
        {children}
      </div>
    </div>
  );
}
