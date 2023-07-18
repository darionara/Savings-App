import React from 'react';
import { useQuery } from 'react-query';
import { SummaryService } from 'api';
import { SUMMARY_QUERY } from 'queryKeys';
import { Card, CardHeader, CardContent, Typography, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatCentsToDollars } from 'utils';
import { CustomLegend } from 'ui';

ChartJS.register(ArcElement, Tooltip, Legend);

export const BalanceChart = () => {

  const { data } = useQuery({
    queryKey: [SUMMARY_QUERY],
    queryFn: () => SummaryService.findAll()
  });

  const summary = {
    labels: data?.spending.map((spending) => spending.categoryName),
    datasets: [
      {
        data: data?.spending.map((spending) => formatCentsToDollars(spending.amountInCents)),
        backgroundColor: data?.spending.map((spending) => spending.categoryColor)
      }
    ]
  };

  const options = {
    responsive: false,
    devicePixelRatio: 4,
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  return (
    <Card>
      {data?.spending.length ? (
        <>
          <CardHeader 
            title={
              <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                <Typography variant={'h4'}>Saldo</Typography>
                <Typography variant={'h3'}>{formatCentsToDollars(data.balance)} PLN</Typography>
              </Box>
            }
            subheader='Pozostała kwota'
            sx={{mb: 5}}
          />
          <CardContent sx={{paddingBottom: 0}}>
            <div style={{margin: '0 auto'}}>
              <Doughnut data={summary} options={options} style={{width: '100%', height: '100%'}}/>
            </div>
            <CustomLegend 
              labels={data?.spending.map((spending) => 
              ({ name: spending.categoryName, color: spending.categoryColor, id: spending.categoryId }))} />
          </CardContent>
        </>
      ) : (
        <Typography variant={'subtitle1'}>Brak wyników</Typography>
      )}
    </Card>
  );
};