import React from 'react';

interface BarChartProps {
    data: { label: string; value: number }[];
    title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
    const maxValue = Math.max(...data.map(d => d.value), 0);
    const chartHeight = 200;
    const barWidth = 30;
    const barMargin = 15;
    const chartWidth = data.length * (barWidth + barMargin);

    return (
        <div className="rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 p-4">
            <h3 className="text-md font-semibold text-center mb-4">{title}</h3>
            <div className="flex justify-center">
                <svg width={chartWidth} height={chartHeight} aria-labelledby="chart-title" role="img">
                    <title id="chart-title">{title}</title>
                    {data.map((item, index) => {
                        const barHeight = maxValue > 0 ? (item.value / maxValue) * (chartHeight - 20) : 0;
                        const x = index * (barWidth + barMargin);
                        const y = chartHeight - barHeight - 20;

                        return (
                            <g key={item.label}>
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    fill="var(--primary-500)"
                                    className="transition-all"
                                >
                                    <title>{`${item.label}: ${item.value}`}</title>
                                </rect>
                                <text
                                    x={x + barWidth / 2}
                                    y={chartHeight - 5}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fill="var(--neutral-400)"
                                    className="truncate"
                                >
                                    {item.label}
                                </text>
                                 <text
                                    x={x + barWidth / 2}
                                    y={y - 5}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fill="white"
                                    fontWeight="bold"
                                >
                                    {item.value}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export default BarChart;
