import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

interface TypewriterProps {
    words: readonly string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetweenWords?: number;
    cursorClassName?: string;
}

/**
 * Typewriter - Animated text that types and deletes words in sequence
 */
export function Typewriter({
    words,
    className = "",
    typingSpeed = 80,
    deletingSpeed = 50,
    delayBetweenWords = 2000,
    cursorClassName = "",
}: TypewriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        const timeout = setTimeout(
            () => {
                if (isPaused) {
                    setIsPaused(false);
                    setIsDeleting(true);
                    return;
                }

                if (isDeleting) {
                    // Deleting
                    if (currentText === "") {
                        setIsDeleting(false);
                        setCurrentWordIndex((prev) => (prev + 1) % words.length);
                    } else {
                        setCurrentText(currentWord.substring(0, currentText.length - 1));
                    }
                } else {
                    // Typing
                    if (currentText === currentWord) {
                        setIsPaused(true);
                    } else {
                        setCurrentText(currentWord.substring(0, currentText.length + 1));
                    }
                }
            },
            isPaused ? delayBetweenWords : isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

    return (
        <span className={`inline-flex items-baseline ${className}`}>
            <AnimatePresence mode="wait">
                <m.span
                    key={currentText}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    className="inline-block"
                >
                    {currentText}
                </m.span>
            </AnimatePresence>
            <m.span
                className={`inline-block w-[3px] h-[1em] bg-current ml-1 ${cursorClassName}`}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
        </span>
    );
}

export default Typewriter;
