/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, TrendingUp, CreditCard, Activity, FileDown, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 4500 },
  { name: 'Fri', revenue: 6000 },
  { name: 'Sat', revenue: 7000 },
  { name: 'Sun', revenue: 6500 },
];

export default function AdminDashboard() {
  const stats = [
    { label: 'Active Members', value: '1,248', icon: Users, color: 'text-blue-500' },
    { label: 'Monthly Revenue', value: '₹4,50,000', icon: CreditCard, color: 'text-[#ccff00]' },
    { label: 'Gym Occupancy', value: '82%', icon: Activity, color: 'text-orange-500' },
    { label: 'Net Growth', value: '+12.5%', icon: TrendingUp, color: 'text-green-500' },
  ];

  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Add Gym Logo/Name
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text('LIVE FIT GYM - PERFORMANCE REPORT', 20, 20);
    
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    // Add Stats Table
    (doc as any).autoTable({
      startY: 40,
      head: [['Metric', 'Value']],
      body: stats.map(s => [s.label, s.value]),
      theme: 'grid',
      headStyles: { fillColor: [204, 255, 0], textColor: [0, 0, 0] },
    });

    // Add Revenue Data
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Day', 'Revenue (INR)']],
      body: data.map(d => [d.name, `Rs. ${d.revenue}`]),
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    });

    doc.save('live-fit-gym-report.pdf');
  };

  const exportAttendancePDF = () => {
    const doc = new jsPDF();
    const attendanceData = [
      ['Alex Rider', '05:30 PM', 'QR Scan'],
      ['Priya Sharma', '06:15 PM', 'Manual'],
      ['Rahul Reddy', '07:00 PM', 'QR Scan'],
      ['Siva Kumar', '07:15 PM', 'QR Scan'],
      ['Jyothsna K.', '08:00 PM', 'Manual'],
    ];
    
    doc.setFontSize(22);
    doc.text('LIVE FIT GYM - ATTENDANCE LOG', 20, 20);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);

    (doc as any).autoTable({
      startY: 40,
      head: [['Member Name', 'Check-in Time', 'Method']],
      body: attendanceData,
      theme: 'grid',
      headStyles: { fillColor: [204, 255, 0], textColor: [0, 0, 0] },
    });

    doc.save('attendance-report.pdf');
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">Command <span className="text-[#ccff00]">Center</span></h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Real-time gym performance analytics</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportAttendancePDF}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-xs font-bold hover:border-[#ccff00] transition-all group"
          >
            <Users size={18} />
            ATTENDANCE PDF
          </button>
          <button 
            onClick={exportPDF}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-bold hover:bg-[#ccff00] hover:text-black transition-all group"
          >
            <FileDown size={18} className="group-hover:translate-y-[-2px] transition-transform" />
            REVENUE REPORT
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl hover:border-[#ccff00]/50 transition-all duration-500 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-zinc-800 group-hover:bg-[#ccff00]/10 transition-colors`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <span className="text-xs font-mono text-zinc-600">ID: {Math.floor(Math.random() * 1000)}</span>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[32px]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold">Revenue Flow</h3>
            <p className="text-zinc-500 text-xs">Weekly financial overview</p>
          </div>
          <div className="flex gap-2">
            {['7D', '1M', '1Y'].map(t => (
              <button key={t} className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold hover:bg-[#ccff00] hover:text-black transition-all">
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ccff00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ccff00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#4b5563', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#4b5563', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                itemStyle={{ color: '#ccff00' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#ccff00" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[32px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Member Feedback</h3>
          <div className="flex items-center gap-2 bg-black px-4 py-2 rounded-2xl border border-zinc-800">
             <span className="text-xl font-black text-[#ccff00]">4.9</span>
             <div className="flex text-[#ccff00]">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="#ccff00" />)}
             </div>
             <span className="text-[10px] text-zinc-500 font-mono">(49 REVIEWS)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { name: 'Siva Penki', msg: 'The gym offers fantastic daily class variations. Knowledgeable coach.', date: 'a year ago' },
             { name: 'Kemburu Jyothsna', msg: 'One of the best gym in Rajam. Especially for ladies. Well maintained.', date: 'a year ago' },
           ].map((rev, i) => (
             <div key={i} className="p-5 bg-black/40 rounded-3xl border border-zinc-800 hover:border-[#ccff00]/20 transition-all">
                <div className="flex justify-between items-start mb-3">
                   <p className="font-bold text-sm">{rev.name}</p>
                   <span className="text-[10px] text-zinc-600 font-mono">{rev.date}</span>
                </div>
                <p className="text-xs text-zinc-400 italic leading-relaxed">"{rev.msg}"</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
