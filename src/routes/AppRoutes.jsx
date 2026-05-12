import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

const EmBreve = ({ titulo }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-2xl border border-cred-beige shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-cred-beige rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl"></span>
        </div>
        <h2 className="text-2xl font-bold text-cred-green-dark mb-2">{titulo}</h2>
        <p className="text-gray-500 max-w-md">
            Este módulo está em desenvolvimento e fará parte da próxima atualização do protótipo.
        </p>
        <button type="button" className="mt-6 px-6 py-2 bg-cred-green-dark text-white rounded-lg hover:bg-cred-green-medium transition-colors">
            Voltar ao Dashboard
        </button>
    </div>
);

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rota pública */}
                    <Route path="/login" element={<Login />} />

                    {/* Rotas protegidas */}
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/produtores" element={<EmBreve titulo="Produtores" />} />
                                        <Route path="/lotes" element={<EmBreve titulo="Lotes" />} />
                                        <Route path="/relatorios" element={<EmBreve titulo="Relatórios" />} />
                                    </Routes>
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}