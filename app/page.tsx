export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center pt-24 px-6 bg-white">
      <div className="w-full max-w-lg text-center">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1 text-center">SewDigital</h1>
          <p className="text-slate-500 font-medium text-sm text-center">Sewing the new way</p>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6 text-center">Verification Service</h2>
        <p className="text-slate-600 leading-relaxed max-w-md text-center"> Please use the verification link sent to your email to continue with your account setup. </p>

        <div className="pt-12 border-t border-slate-100 mt-24">
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[13px] font-medium text-slate-400">
            <span>© 2026 SewDigital</span>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
