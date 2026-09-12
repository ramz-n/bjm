import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isAppleMobile = /iphone|ipad|ipod/.test(userAgent);

        const isStandalone = window.matchMedia(
            "(display-mode: standalone)",
        ).matches;

        if (isAppleMobile && !isStandalone) {
            setIsIOS(true);
            setIsVisible(true);
            return;
        }

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsVisible(true);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt,
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt,
            );
        };
    }, []);

    const handleAndroidInstall = async () => {
        if (!deferredPrompt) return;

        await deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            console.log("User accepted the install prompt");
        }

        setDeferredPrompt(null);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 rounded-xl bg-white p-4 shadow-2xl border border-gray-100 flex flex-col gap-3 sm:max-w-sm sm:left-auto">
            <div className="flex items-start gap-3">
                <img
                    src="/icon-192x192.png"
                    alt="Barkati Masjid Logo"
                    className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                    <h4 className="font-bold text-primary text-sm">
                        Install Barkati Masjid App
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Access prayer times and updates from your home screen.
                    </p>
                </div>
            </div>

            {isIOS ? (
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-200">
                    To install: Tap the{" "}
                    <span className="font-bold text-primary">Share icon</span>{" "}
                    below and select{" "}
                    <span className="font-bold text-gray-950">
                        "Add to Home Screen"
                    </span>
                    .
                </div>
            ) : (
                // Android / Desktop Chrome Button
                <div className="flex gap-2 justify-end w-full">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition"
                    >
                        Not Now
                    </button>
                    <button
                        onClick={handleAndroidInstall}
                        className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shadow-md shadow-emerald-100"
                    >
                        Install App
                    </button>
                </div>
            )}
        </div>
    );
};

export default Install;
