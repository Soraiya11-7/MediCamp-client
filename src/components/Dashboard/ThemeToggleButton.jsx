import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";


const ThemeToggleButton = () => {
    const { darkMode, setDarkMode } = useAuth();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center  p-1 rounded-full shadow-lg border border-black dark:border-white dark:bg-gray-800 transition-all duration-300"
        >
            {darkMode ? (
                <FaSun className="text-orange-400 text-xs sm:text-base" />
            ) : (
                <FaMoon className="text-yellow-500 text-xs sm:text-base" />
            )}
        </button>
    );
};

export default ThemeToggleButton;
