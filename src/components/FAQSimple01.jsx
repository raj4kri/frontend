import {
  Heart,
  Mail,
  CreditCard,
  Shield,
  FileText,
  RefreshCw,
} from "lucide-react";

export default function FAQSimple01() {
  const faqs = [
    { question: "Repair cost?", answer: "Starts from ₹499.", icon: Heart },
    { question: "Time required?", answer: "30–60 minutes.", icon: RefreshCw },
    { question: "Warranty?", answer: "Limited warranty available.", icon: Shield },
    { question: "All brands?", answer: "Supports all major brands.", icon: FileText },
    { question: "Doorstep service?", answer: "Available in selected areas.", icon: Mail },
    { question: "Payment?", answer: "Pay after service.", icon: CreditCard },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#050816] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Quick answers to common queries about our mobile repair service
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {faqs.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group relative p-[1px] rounded-2xl
                  bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-cyan-500/30
                  hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500
                  transition-all duration-300
                "
              >
                <div
                  className="
                    h-full bg-white/5 backdrop-blur-xl
                    rounded-2xl p-6 text-center
                    border border-white/10
                    group-hover:bg-white/10
                    transition-all duration-300
                    shadow-lg
                    group-hover:shadow-blue-500/20
                    transform group-hover:-translate-y-2
                  "
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-tr from-blue-500/20 to-purple-500/20 p-3 rounded-xl">
                      <Icon className="w-6 h-6 text-blue-300" />
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="text-lg font-semibold mb-2">
                    {item.question}
                  </h3>

                  {/* Answer */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}