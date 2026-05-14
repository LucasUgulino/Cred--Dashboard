import { useState } from 'react';
import { Menu, Users as UsersIcon, Home, Map, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const itensMenu = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/produtores', icon: UsersIcon, label: 'Produtores' },
    { path: '/lotes', icon: Map, label: 'Lotes' },
    { path: '/relatorios', icon: BarChart3, label: 'Relatórios' },
];

export default function MainLayout({ children }) {
    const [menuAberto, setMenuAberto] = useState(false);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-cred-cream flex">
            {/* Fundo escuro ao abrir menu */}
            {menuAberto && (
                <div
                    className="fixed inset-0 bg-black/30 z-20"
                    onClick={() => setMenuAberto(false)}
                />
            )}

            {/* Menu Lateral */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-cred-beige shadow-xl transform transition-transform duration-300 ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6">
                    <span className="text-xl font-bold text-cred-green-dark">Cred+</span>
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
                <Header
                    menuAberto={menuAberto}
                    onMenuClick={() => setMenuAberto((aberto) => !aberto)}
                />
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}