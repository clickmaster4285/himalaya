export default function BookStayLoading() {
  return (
    <div className="min-h-screen bg-[#F6F1EA] px-6 py-14 md:px-12">
      <div className="mx-auto max-w-3xl rounded-xl border border-[#eadfce] bg-white p-8">
        <h1 className="font-display text-3xl text-neutral-900 md:text-4xl">Loading booking details...</h1>
        <p className="mt-3 text-neutral-700">Please wait while we prepare villa availability and stay options.</p>
      </div>
    </div>
  );
}

