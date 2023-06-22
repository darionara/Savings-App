import React from 'react';
import { useQuery } from 'react-query';
import { BudgetService } from 'api';
import { BUDGET_QUERY } from 'queryKeys';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const BudgetChart = () => {

    const { data } = useQuery({
      queryKey: [BUDGET_QUERY],
      queryFn: () => BudgetService.findAll()
    });

    const budgetData = {
      labels: data?.map((budget) => `${budget.category.name} %`),
      datasets: [
        {
          data: data?.map((budget) => budget.currentSpendingPercent),
          backgroundColor: data?.map((budget) => budget.category.color)
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        }
      }
    };

    return (
      <Card>
        {data?.length ? (
          <>
            <CardHeader 
              title={<Typography variant={'h4'} sx={{mb: 2}}>Budżet</Typography>} 
              subheader='Podsumowanie wydatków'
              sx={{mb: 5}}
            />
            <CardContent sx={{paddingBottom: 0}}>
              <Bar data={budgetData} options={options} />
            </CardContent>
          </>
        ) : (
          <Typography variant={'subtitle1'}>Brak wyników</Typography>
        )}
      </Card>
    );
  };