'use client';

import { memo } from 'react';
import { TrendingUp } from 'lucide-react';
import { IconType } from 'react-icons';

interface DashboardCardProps {
  stat: {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: IconType;
    color: string;
    bgColor: string;
  };
  index: number;
}

export const DashboardCard = memo(({ stat, index }: DashboardCardProps) => {
  const Icon = stat.icon;

  return (
    <div
    
      className="group relative cursor-pointer"
    >
      <div className="border-border bg-card/40 rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
        <div className="to-primary/5 absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className={`rounded-lg p-3 ${stat.bgColor}`}>
              <Icon className={`h-6 w-6 ${stat.color}`} />
            </div>

            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                stat.changeType === 'positive'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              <TrendingUp
                className={`h-4 w-4 ${
                  stat.changeType === 'negative' ? 'rotate-180' : ''
                }`}
              />
              <span>{stat.change}</span>
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-foreground mb-1 text-3xl font-bold">
              {stat.value}
            </h3>
            <p className="text-muted-foreground text-sm font-medium">
              {stat.title}
            </p>
          </div>

          <div className="bg-muted h-2 overflow-hidden rounded-full">
            <div
            
              className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

DashboardCard.displayName = 'DashboardCard';
