import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    iconColor?: string;
    className?: string;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    iconColor = "bg-slate-100 text-slate-600",
    className
}: StatsCardProps) {
    return (
        <div className={cn(
            "rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md",
            className
        )}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                        {value}
                    </h3>
                    <p className="mt-1 text-[13px] font-semibold text-slate-400">{title}</p>
                </div>
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shadow-sm", iconColor)}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>

            {(description || trend) && (
                <div className="mt-4 flex items-center gap-1.5">
                    {trend && (
                        <span className={cn(
                            "text-[12px] font-bold",
                            trend.isPositive ? "text-emerald-500" : "text-rose-500"
                        )}>
                            {trend.isPositive ? "↑" : "↓"} {trend.value}%
                        </span>
                    )}
                    {description && (
                        <span className="text-[12px] font-medium text-slate-400">
                            {description}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
