import Image from "next/image";

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-black overflow-x-hidden pt-32 px-6 pb-20">
            <div className="container mx-auto max-w-6xl text-center md:text-left relative z-10">
                <h1 
                    className="text-3xl md:text-5xl font-bold text-white uppercase mb-6 text-center"
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                >
                    See SewDigital in <span className="opacity-40">Action</span>
                </h1>
                <p className="text-stone-500 mb-12 text-lg text-center max-w-2xl mx-auto">
                    Watch how you can completely transform your tailoring business.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
                    {/* The Problem Image */}
                    <div className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image 
                            src="/storybrand_problem.png" 
                            alt="The Chaos of Notebooks" 
                            width={800} 
                            height={800} 
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                            <p className="text-white font-medium text-lg" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                Still using a chaotic notebook?
                            </p>
                        </div>
                    </div>

                    {/* Video Placeholder */}
                    <div className="w-full aspect-[4/5] md:aspect-square bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group hover:border-[#FDDA0D]/30 transition-colors">
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 group-hover:bg-[#FDDA0D]/20 transition-all cursor-pointer shadow-[0_0_40px_rgba(253,218,13,0.15)]">
                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2 group-hover:border-l-[#FDDA0D]"></div>
                        </div>
                        <p className="text-white/40 font-medium uppercase tracking-wider text-sm" style={{ fontFamily: 'var(--font-varela-round)' }}>
                            Watch Demo Video
                        </p>
                    </div>
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FDDA0D]/5 blur-[120px] rounded-full pointer-events-none" />
        </main>
    );
}
