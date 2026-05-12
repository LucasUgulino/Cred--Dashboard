import { TrendingUp } from 'lucide-react';

function HarvestCard({ safra }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cred-beige card-hover">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h4 className="font-semibold text-gray-900">{safra.safra}</h4>
                    <p className="text-sm text-gray-600">{safra.produtor}</p>
                </div>
                <div className="flex items-center gap-1 bg-cred-green-dark/10 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4 text-cred-green-dark" />
                    <span className="text-sm font-bold text-cred-green-dark">+{safra.agroScore}</span>
                </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                    className="bg-gradient-to-r from-cred-orange to-cred-orange-light h-2 rounded-full transition-all duration-500"
                    style={{ width: `${safra.progresso}%` }}
                ></div>
            </div>

            <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Plantações</p>
                <div className="flex flex-wrap gap-2">
                    {safra.plantacoes.map((p, i) => (
                        <span key={i} className="px-3 py-1 bg-cred-beige text-cred-green-dark text-sm rounded-lg">
                            {p.tipo}: {p.quantidade}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 mt-4">
                <button className="flex-1 py-2 px-4 border-2 border-cred-green-dark text-cred-green-dark rounded-lg font-medium hover:bg-cred-green-dark hover:text-white transition-colors">
                    Detalhes
                </button>
                <button className="flex-1 py-2 px-4 bg-cred-orange text-white rounded-lg font-medium hover:bg-cred-orange-light transition-colors">
                    Investir
                </button>
            </div>
        </div>
    );
}

export default HarvestCard;