import { useState } from 'react';
import { Menu, X, Home, Users, Map, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const itensMenu = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/produtores', icon: Users, label: 'Produtores' },
    { path: '/lotes', icon: Map, label: 'Lotes' },
    { path: '/relatorios', icon: BarChart3, label: 'Relatórios' },
];

export default function MainLayout({ children }) {
    const [menuAberto, setMenuAberto] = useState(false);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-cred-cream flex">
            {/* Fundo escuro ao abrir menu no mobile */}
            {menuAberto && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setMenuAberto(false)}
                />
            )}

            {/* Menu Lateral */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-cred-beige transform transition-transform duration-300 ${menuAberto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6 flex items-center justify-between">
                    <span className="text-xl font-bold text-cred-green-dark">Cred+</span>
                    <button onClick={() => setMenuAberto(false)} className="lg:hidden p-1">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <nav className="px-4 space-y-2">
                    {itensMenu.map((item) => {
                        const ativo = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMenuAberto(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${ativo ? 'bg-cred-green-dark text-white shadow-md' : 'text-gray-600 hover:bg-cred-beige'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Área Principal */}
            <div className="flex-1 flex flex-col min-w-0">
                <Header onMenuClick={() => setMenuAberto(true)} />
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}