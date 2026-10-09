import { useRegisterSW } from "virtual:pwa-register/react";

export default function Reload() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log("SW Registered successfully:", r);
        },
        onRegisterError(error) {
            console.error("SW registration failed:", error);
        },
    });

    const close = () => {
        setNeedRefresh(false);
    };

    if (!needRefresh) return null;

    return (
        <div className="fixed bottom-5 right-5 z-9999 max-w-sm w-full p-4 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4 flex flex-col gap-3">
                {needRefresh && (
                    <>
                        <div className="flex items-start gap-3">
                            <span
                                className="text-xl"
                                role="img"
                                aria-label="sparkles"
                            >
                                <img
                                    src="/icon-192x192.png"
                                    alt="refresh"
                                    className="w-10 h-10"
                                />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-primary">
                                    New content from Barkati Masjid is
                                    available!
                                </p>
                                <p className="text-xs text-secondary-green mt-0.5">
                                    Reload to see them now.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={close}
                                className="px-3 py-1.5 text-xs font-medium text-primary hover:text-secondary-green border border-accent rounded-md dark:hover:text-slate-200 transition-colors cursor-pointer"
                            >
                                Later
                            </button>
                            <button
                                onClick={() => updateServiceWorker(true)}
                                className="px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-secondary-green rounded-md transition-colors shadow-sm cursor-pointer"
                            >
                                Update Now
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
