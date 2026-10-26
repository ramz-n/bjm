import { MessageSquareQuote, MoveUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
const Feedback = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col my-12 mx-5 p-5 rounded-lg border border-primary text-center shadow-2xl">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <MessageSquareQuote /> <span>{t.feedback.title}</span>
      </div>
      <p className="my-2 text-left">{t.feedback.feedbackDescription}</p>
      <a
        className="flex max-w-xs text-primary-dim bg-secondary-green rounded-lg p-2 justify-center items-center hover:bg-islamic-gold/80 transition-colors cursor-pointer"
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSeywRAtS7SLnFxYRXkYwtHhB57PT0OvEjsVZ6qZWBj9LMoUSA/viewform?usp=publish-editor"
      >
        {t.feedback.giveFeedback}
        <MoveUpRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  );
};

export default Feedback;
