import { motion } from 'framer-motion';
import { Package, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Products', value: '124', icon: <Package className="w-8 h-8 text-blue-500" /> },
    { title: 'Active Users', value: '89', icon: <Users className="w-8 h-8 text-green-500" /> },
    { title: 'Monthly Views', value: '4.2k', icon: <TrendingUp className="w-8 h-8 text-purple-500" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome to your Krishi Vikas control panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Manage your catalog easily using the sidebar options. Make sure to provide your Supabase keys in `.env.local` to enable database operations.</p>
      </div>
    </div>
  );
}
