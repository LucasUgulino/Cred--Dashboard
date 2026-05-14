import { LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ menuAberto, onMenuClick }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <header className="bg-cred-cream border-b border-cred-beige sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 py-4 lg:px-8">
                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={onMenuClick}
                        aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={menuAberto}
                        className="p-2 hover:bg-cred-beige rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6 text-cred-green-dark" />
                    </button>

                    <div className="w-9 h-9 bg-cred-green-dark rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">C+</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-cred-green-dark leading-tight">
                        Dashboard Empresarial
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-cred-green-dark hover:bg-cred-beige rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleLogout}
                        aria-label="Sair"
                        className="p-2 hover:bg-cred-beige rounded-lg transition-colors sm:hidden"
                    >
                        <LogOut className="w-5 h-5 text-cred-green-dark" />

                    </button>
                </div>
            </div>
        </header>
    );
}