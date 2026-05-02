import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSimple01 = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How much time does repair take?",
      answer: "Most repairs are completed within 30–60 minutes depending on the issue."
    },
    {
      question: "Do you provide warranty?",
      answer: "Yes, we provide limited warranty on selected repairs and parts."
    },
    {
      question: "Do you support all mobile brands?",
      answer: "We repair all major brands including Samsung, Vivo, Oppo, Xiaomi, Realme, and more."
    },
  
    {
      question: "How can I contact support?",
      answer: "You can contact us via WhatsApp, call, or the contact form on our website."
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-white/70 mt-2">
            Quick answers to common questions
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={index}>

                {/* QUESTION */}
              
              <button
  onClick={() => toggleFaq(index)}
  className={`
    w-full flex items-center justify-between
    px-2 py-4
    border-b border-white/20
    transition-all duration-300

    hover:border-blue-400
    ${isOpen && "border-blue-400"}
  `}
>
  <span className="font-medium text-white text-left">
    {item.question}
  </span>

  <ChevronDown
    className={`w-5 h-5 transition-transform duration-300 ${
      isOpen ? "rotate-180 text-blue-400" : "text-white"
    }`}
  />
</button>

                {/* ANSWER */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pt-3"
                    >
                      <p className="text-white/80 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
};

export default FAQSimple01;