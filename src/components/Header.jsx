import { Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
    return (
        <header className="bg-cred-cream border-b border-cred-beige sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 py-4 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-cred-green-dark rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">C+</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-cred-green-dark leading-tight">Cred+</h1>
                        <p className="text-xs text-gray-500 hidden sm:block">Dashboard Empresarial</p>
                    </div>
                </div>

                {/* Botão só aparece no mobile/tablet */}
                <button
                    onClick={onMenuClick}
                    className="p-2 hover:bg-cred-beige rounded-lg transition-colors lg:hidden"
                >
                    <Menu className="w-6 h-6 text-cred-green-dark" />
                </button>
            </div>
        </header>
    );
}