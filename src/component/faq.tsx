import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "What is a Complete Blood Count (CBC) test?",
    answer:
      "A Complete Blood Count, or CBC, is a common blood test that evaluates your overall health and detects a wide range of disorders, including anemia, infection, and leukemia. It measures several components and features of your blood, including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.",
  },
  {
    question: "How should I prepare for a blood test?",
    answer:
      "Preparation depends on the specific test. Some tests require fasting (not eating or drinking anything but water) for 8-12 hours beforehand. For others, there are no special preparations. Always follow the instructions provided by your doctor or the laboratory.",
  },
  {
    question: "What is a Basic Metabolic Panel (BMP)?",
    answer:
      "A Basic Metabolic Panel (BMP) is a test that measures eight different substances in your blood. It provides important information about your body's chemical balance and metabolism. It can help check for conditions like kidney disease, lung problems, and diabetes.",
  },
  {
    question: "What does it mean if my results are 'out of range'?",
    answer:
      "'Out of range' means your result is higher or lower than the reference range, which is considered the normal range for that test. This doesn't necessarily mean you have a health problem. Factors like age, sex, and the lab that analyzed the test can affect results. It's important to discuss any out-of-range results with your healthcare provider.",
  },
  {
    question: "How long does it take to get lab test results?",
    answer:
      "The time it takes to get results varies widely depending on the test. Some tests, like a rapid strep test, can provide results in minutes. Others may take several days or even weeks. Your doctor's office or the lab will be able to give you a more specific timeframe.",
  },
  {
    question: "Can I get a copy of my lab test results?",
    answer:
      "Yes, you have a right to your medical information, including lab results. You can request a copy from your doctor's office or directly from the laboratory. Many healthcare systems now offer online patient portals where you can view your results as soon as they are available.",
  },
];

const Faq = () => {
  return (
    <div
      className="container mx-auto max-w-4xl pb-12 px-4 sm:px-6 lg:px-8"
      id="faq"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary ">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-foreground/90">
          Find answers to common questions about medical laboratory tests.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={index}
            className="bg-foreColor/50 rounded-lg mb-4 px-4 shadow-sm hover:bg-foreColor transition-colors"
          >
            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
