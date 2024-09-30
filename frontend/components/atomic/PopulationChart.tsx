'use client'
import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

interface PopulationChartProps {
  populationCounts: { year: number; value: number }[]
  className?: string
}

const PopulationChart = ({ populationCounts, className }: PopulationChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      // Destroy the previous chart instance if it exists to avoid duplication
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: populationCounts.map((count) => count.year),
          datasets: [
            {
              label: 'Population',
              data: populationCounts.map((count) => count.value),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year',
              },
              grid: {
                color: 'white',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Population',
              },
              grid: {
                color: 'white',
              },
            },
          },
        },
      })
    }

    // Cleanup the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [populationCounts])

  return <canvas className={className} ref={canvasRef} width="600" height="400"></canvas>
}

export default PopulationChart
