import { MessageSquareQuote, MoveUpRight } from "lucide-react";

const Feedback = () => {
    return (
        <div className="flex flex-col my-12 mx-5 p-5 rounded-lg border border-primary text-center shadow-2xl">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <MessageSquareQuote /> <span>Feedback</span>
            </div>
            <p className="my-2 text-left">
                Have a suggestion or an issue to report? We'd love to hear from
                you
            </p>
            <a
                className="flex max-w-xs text-primary-dim bg-secondary-green rounded-lg p-2 justify-center items-center hover:bg-islamic-gold/80 transition-colors cursor-pointer"
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSeywRAtS7SLnFxYRXkYwtHhB57PT0OvEjsVZ6qZWBj9LMoUSA/viewform?usp=publish-editor"
            >
                Give feedback
                <MoveUpRight className="ml-2 h-4 w-4" />
            </a>
        </div>
    );
};

export default Feedback;
