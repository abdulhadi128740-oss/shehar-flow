import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const TYPE_COLORS = ['#3b82f6', '#f97316', '#ef4444'];
const SEVERITY_COLORS = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#3b82f6',
};

const Analytics = ({ hotspots }) => {
  const byType = [
    {
      name: 'Motorcycle',
      value: hotspots.filter((h) => h.type === 'motorcycle_conflict').length,
    },
    {
      name: 'Encroachment',
      value: hotspots.filter((h) => h.type === 'encroachment').length,
    },
    {
      name: 'Delivery',
      value: hotspots.filter((h) => h.type === 'delivery_impact').length,
    },
  ];

  const bySeverity = ['critical', 'high', 'medium', 'low'].map((s) => ({
    name: s,
    value: hotspots.filter((h) => h.severity === s).length,
  }));

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h2 className="text-lg font-semibold text-white mb-4">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By Type */}
        <div>
          <p className="text-sm text-slate-400 mb-3">Hotspots by Type</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byType}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By Severity */}
        <div>
          <p className="text-sm text-slate-400 mb-3">Hotspots by Severity</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={bySeverity.filter((d) => d.value > 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {bySeverity.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={SEVERITY_COLORS[entry.name] || '#64748b'}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;