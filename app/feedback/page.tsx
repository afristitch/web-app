import Image from "next/image";

export default function FeedbackPage() {
    return (
        <main className="min-h-screen bg-black overflow-x-hidden pt-32 px-6 pb-20">
            <div className="container mx-auto max-w-6xl text-center md:text-left relative z-10">
                <h1 
                    className="text-3xl md:text-5xl font-bold text-white uppercase mb-6 text-center"
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                >
                    We value your <span className="text-[#FDDA0D]">Feedback</span>
                </h1>
                <p className="text-stone-500 mb-12 text-lg text-center max-w-2xl mx-auto">
                    Tell us what you love, what needs improvement, or what features you want next.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
                    {/* The Success Image */}
                    <div className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image 
                            src="/storybrand_success.png" 
                            alt="A Happy Tailor" 
                            width={800} 
                            height={800} 
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                            <p className="text-white font-medium text-lg" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                Help us make tailoring even better.
                            </p>
                        </div>
                    </div>

                    {/* Feedback Form */}
                    <form className="text-left space-y-6 bg-white/[0.02] border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
                        <div>
                            <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-varela-round)' }}>Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FDDA0D] transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-varela-round)' }}>Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FDDA0D] transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-varela-round)' }}>Message</label>
                            <textarea 
                                id="message" 
                                rows={5}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FDDA0D] transition-colors resize-none"
                                placeholder="Tell us what's on your mind..."
                            ></textarea>
                        </div>

                        <button 
                            type="button" 
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-[#FDDA0D] transition-colors uppercase tracking-widest mt-4"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FDDA0D]/5 blur-[120px] rounded-full pointer-events-none" />
        </main>
    );
}
