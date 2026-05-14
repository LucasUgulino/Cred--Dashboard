import { useState, useMemo } from 'react';
import { Leaf, MapPin, Users, Plus, Search, SlidersHorizontal } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import GaugeChart from '../components/GaugeChart';
import ProgressBar from '../components/ProgressBar';
import HarvestCard from '../components/HarvestCard';
import { dashboardData } from '../data/mockData';

export default function Dashboard() {
    const { metricasGerais, performanceGeral, indicadoresSustentabilidade, safrasParaPatrocinio } = dashboardData;

    // Estados dos filtros
    const [busca, setBusca] = useState('');
    const [scoreMin, setScoreMin] = useState('');
    const [ordenarPor, setOrdenarPor] = useState('validacao'); // 'validacao' ou 'score'

    // Filtragem e ordenação automática (useMemo evita cálculos desnecessários)
    const safrasFiltradas = useMemo(() => {
        let resultado = [...safrasParaPatrocinio];

        if (busca) {
            const termo = busca.toLowerCase();
            resultado = resultado.filter(s =>
                s.produtor.toLowerCase().includes(termo) ||
                s.safra.toLowerCase().includes(termo) ||
                s.associacao.toLowerCase().includes(termo) ||
                s.regiao.toLowerCase().includes(termo)
            );
        }

        if (scoreMin) {
            resultado = resultado.filter(s => s.agroScore >= Number(scoreMin));
        }

        resultado.sort((a, b) => {
            return ordenarPor === 'score' ? b.agroScore - a.agroScore : b.validacaoEsg - a.validacaoEsg;
        });

        return resultado;
    }, [safrasParaPatrocinio, busca, scoreMin, ordenarPor]);

    return (
        <div className="space-y-8">
            {/* Métricas Gerais */}
            <section>
                <h2 className="text-2xl font-bold text-cred-green-dark mb-6">Métricas Gerais</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard title="Safras Disponíveis" value={metricasGerais.safrasDisponiveis} subtitle="Aguardando patrocínio" icon={Leaf} colorScheme="green" />
                    <MetricCard title="Área Total" value={`${metricasGerais.areaTotal}ha`} subtitle="Hectares disponíveis" icon={MapPin} colorScheme="orange" />
                    <MetricCard title="Produtores Ativos" value={metricasGerais.produtoresAtivos} subtitle="Cadastrados" icon={Users} colorScheme="green" />
                    <MetricCard title="AgroScore Médio" value={metricasGerais.agroScoreMedio} subtitle="Pontuação geral" icon={Plus} colorScheme="orange" />
                </div>
            </section>

            {/* Performance & Indicadores */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GaugeChart agroScore={performanceGeral.agroScore} sustentabilidade={performanceGeral.sustentabilidade} />

                <div className="bg-cred-green-dark rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-6">Indicadores de Sustentabilidade</h3>
                    <ProgressBar label="Práticas Sustentáveis" value={indicadoresSustentabilidade.praticasSustentaveis} colorScheme="orange" />
                    <ProgressBar label="Qualidade da Produção" value={indicadoresSustentabilidade.qualidadeProducao} colorScheme="orange" />
                    <ProgressBar label="Certificações" value={indicadoresSustentabilidade.certificacoes} colorScheme="orange" />

                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
                        <div className="text-center"><p className="text-2xl font-bold text-white">{indicadoresSustentabilidade.culturasOrganicas}</p><p className="text-xs opacity-75 mt-1">Culturas Orgânicas</p></div>
                        <div className="text-center"><p className="text-2xl font-bold text-white">{indicadoresSustentabilidade.praticasRegenerativas}</p><p className="text-xs opacity-75 mt-1">Práticas Regenerativas</p></div>
                        <div className="text-center"><p className="text-2xl font-bold text-white">{indicadoresSustentabilidade.usoEficienteAgua}%</p><p className="text-xs opacity-75 mt-1">Uso Eficiente de Água</p></div>
                    </div>
                </div>
            </section>

            {/* Safras + Filtros */}
            <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-cred-green-dark">Safras para Patrocínio</h2>
                        <p className="text-sm text-gray-600 mt-1">{safrasFiltradas.length} oportunidade{safrasFiltradas.length !== 1 ? 's' : ''} encontrada{safrasFiltradas.length !== 1 ? 's' : ''}</p>
                    </div>

                    {/* Barra de Filtros */}
                    <div className="flex flex-wrap gap-3 bg-white p-3 rounded-xl border border-cred-beige shadow-sm">
                        <div className="relative flex-1 min-w-[180px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar produtor ou safra..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cred-orange/50"
                            />
                        </div>
                        <select
                            value={scoreMin}
                            onChange={(e) => setScoreMin(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cred-orange/50 bg-white"
                        >
                            <option value="">Score mínimo</option>
                            <option value="80">≥ 80</option>
                            <option value="85">≥ 85</option>
                            <option value="90">≥ 90</option>
                        </select>
                        <select
                            value={ordenarPor}
                            onChange={(e) => setOrdenarPor(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cred-orange/50 bg-white"
                        >
                            <option value="validação">Ordenar: Validação ESG</option>
                            <option value="score">Ordenar: AgroScore</option>
                        </select>
                    </div>
                </div>

                {/* Grid de Cards */}
                {safrasFiltradas.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {safrasFiltradas.map((safra) => (
                            <HarvestCard key={safra.id} safra={safra} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-cred-beige">
                        <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">Nenhuma safra encontrada com esses filtros.</p>
                        <button
                            onClick={() => { setBusca(''); setScoreMin(''); }}
                            className="mt-3 text-sm text-cred-orange hover:underline"
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}