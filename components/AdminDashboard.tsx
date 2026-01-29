import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Users, Target, TrendingDown, MousePointerClick, 
  RefreshCw, Trash2, ArrowLeft, Activity, Database, AlertCircle,
  Wifi, WifiOff
} from 'lucide-react';
import { getAnalyticsData, generateMockData, clearData, isFirebaseConfigured, testConnection } from '../utils/analytics';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [usingFirebase, setUsingFirebase] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{success: boolean, message: string} | null>(null);

  // Carrega os dados (pode vir do LocalStorage ou Firebase)
  const loadData = async () => {
    setLoading(true);
    try {
        const analytics = await getAnalyticsData();
        setData(analytics);
        setUsingFirebase(isFirebaseConfigured());
    } catch (error) {
        console.error("Erro ao carregar dados", error);
    } finally {
        setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setConnectionStatus({ success: false, message: "Testando conexão..." });
    const result = await testConnection();
    setConnectionStatus(result);
    // Remove a mensagem após 5 segundos
    setTimeout(() => setConnectionStatus(null), 5000);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-500 gap-2">
              <RefreshCw className="animate-spin" /> Carregando inteligência de dados...
          </div>
      );
  }

  if (!data) return <div className="p-10 text-center">Sem dados disponíveis.</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      {/* Notificação de Status de Conexão */}
      {connectionStatus && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-bounce-short ${connectionStatus.success ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
            {connectionStatus.success ? <Wifi size={20} /> : <WifiOff size={20} />}
            <span className="font-bold text-sm">{connectionStatus.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <button 
             onClick={onClose}
             className="flex items-center text-slate-500 hover:text-slate-800 mb-2 transition-colors"
           >
             <ArrowLeft size={16} className="mr-2" /> Voltar ao Quiz
           </button>
           <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
             <Activity className="text-rose-600" />
             Dashboard de Conversão
           </h1>
           <div className="flex items-center gap-2 mt-1">
                <p className="text-slate-500 text-sm">Acompanhamento em tempo real.</p>
                {usingFirebase ? (
                    <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                        <Database size={10} /> Firebase Conectado
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                        <AlertCircle size={10} /> Modo Local (Demo)
                    </span>
                )}
           </div>
        </div>
        
        <div className="flex gap-3">
            <button 
                onClick={handleTestConnection}
                className="flex items-center px-4 py-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-sm font-medium shadow-sm"
            >
                <Wifi size={14} className="mr-2" /> Testar Conexão
            </button>
            <button 
                onClick={() => { generateMockData(); setTimeout(loadData, 500); }}
                className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium shadow-sm"
            >
                <RefreshCw size={14} className="mr-2" /> Simular Tráfego
            </button>
            <button 
                onClick={() => { clearData(); setTimeout(loadData, 500); }}
                className="flex items-center px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium shadow-sm"
            >
                <Trash2 size={14} className="mr-2" /> Limpar Dados
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visitantes Totais</p>
                        <h3 className="text-3xl font-bold text-slate-800">{data.totalVisits}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Users size={20} />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Leads Capturados</p>
                        <h3 className="text-3xl font-bold text-slate-800">{data.totalLeads}</h3>
                    </div>
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                        <Target size={20} />
                    </div>
                </div>
                <div className="text-xs text-slate-500">
                    {data.totalVisits > 0 ? ((data.totalLeads / data.totalVisits) * 100).toFixed(1) : 0}% de conversão de leads
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cliques no Checkout</p>
                        <h3 className="text-3xl font-bold text-slate-800">{data.totalSalesClicks}</h3>
                    </div>
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                        <MousePointerClick size={20} />
                    </div>
                </div>
                <div className="text-xs text-slate-500">
                    Venda final
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Taxa de Conversão</p>
                        <h3 className="text-3xl font-bold text-slate-800">{data.conversionRate}%</h3>
                    </div>
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                        <TrendingDown size={20} />
                    </div>
                </div>
                <div className="text-xs text-slate-500">
                    Funil completo (Visita &rarr; Venda)
                </div>
            </div>
        </div>

        {/* Funnel Chart */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Funil de Retenção (Passo a Passo)</h3>
            <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data.funnel}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="label" 
                            type="category" 
                            width={150} 
                            tick={{fontSize: 12, fill: '#64748b'}}
                        />
                        <Tooltip 
                            cursor={{fill: '#f1f5f9'}}
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}}
                        />
                        <Bar dataKey="users" radius={[0, 4, 4, 0]} barSize={30}>
                            {data.funnel.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={index === data.funnel.length - 1 ? '#e11d48' : '#3b82f6'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            {/* Funnel Table Details */}
            <div className="mt-8 overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th className="px-6 py-3">Etapa</th>
                            <th className="px-6 py-3">Usuários</th>
                            <th className="px-6 py-3">Drop-off (Saíram)</th>
                            <th className="px-6 py-3 text-red-500">% Perda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.funnel.map((step: any, index: number) => (
                            <tr key={index} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{step.label}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                                        {step.users}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{step.dropOff > 0 ? step.dropOff : '-'}</td>
                                <td className="px-6 py-4 font-bold text-red-500">{step.dropOffRate !== '0' ? `${step.dropOffRate}%` : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;