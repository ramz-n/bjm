import { MessageSquareQuote, MoveUpRight } from "lucide-react";

const Feedback = () => {
    return (
        <div className="flex flex-col m-12 p-5 rounded-lg border border-primary text-center shadow-2xl">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <MessageSquareQuote /> <span>Feedback</span>
            </div>
            <p className="my-2 text-left">
                Have a suggestion or an issue to report? We'd love to hear from
                you
            </p>
            <div className="flex w-xs text-primary bg-islamic-gold rounded-lg p-2 justify-center items-center hover:bg-islamic-gold/80 transition-colors">
                <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeywRAtS7SLnFxYRXkYwtHhB57PT0OvEjsVZ6qZWBj9LMoUSA/viewform?usp=publish-editor">Give feedback</a>
                <MoveUpRight className="ml-2 h-4 w-4" />
            </div>
        </div>
    );
};

export default Feedback;
