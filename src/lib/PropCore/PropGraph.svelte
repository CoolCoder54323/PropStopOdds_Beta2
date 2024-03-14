<script lang="ts">
    import { Table } from '@skeletonlabs/skeleton';
    import { type GraphDataComponent } from '../../routes/propTypes.ts';
    import { Line } from 'svelte-chartjs'
    import 'chart.js/auto';

    const colorSets = [
    {
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
    },
    {
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
    },
    {
        backgroundColor: 'rgba(88, 214, 141, 0.2)',
        borderColor: 'rgba(88, 214, 141, 1)',
        pointBackgroundColor: 'rgba(88, 214, 141, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(88, 214, 141, 1)'
    },
    {
        backgroundColor: 'rgba(32, 132, 142, 0.2)',
        borderColor: 'rgba(32, 132, 142, 1)',
        pointBackgroundColor: 'rgba(32, 132, 142, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(32, 132, 142, 1)'
    },
    // ... add more if there are more datasets
];

    export let data:GraphDataComponent | undefined = undefined;


    function componentToSource(component:GraphDataComponent)  {
        const dataKeys = component.keys.filter(key => key !== 'GAME_DATE');

        const datasets = dataKeys.map((key, index) => {
            const colorSet = colorSets[index % colorSets.length];
            return {
                label: key,
                fill: true,
                lineTension: 0.1,
                backgroundColor: colorSet.backgroundColor,
                borderColor: colorSet.borderColor,
                borderCapStyle: 'butt' as 'butt' | 'round' | 'square',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter' as "round" | "miter" | "bevel" ,
                pointBorderColor: colorSet.pointBorderColor,
                pointBackgroundColor: colorSet.pointBackgroundColor,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: colorSet.pointHoverBackgroundColor,
                pointHoverBorderColor: colorSet.pointHoverBorderColor,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: component.rows.map(row => row[key])
            };
        });

        const chartData = {
            labels: component.rows.map(row => row.GAME_DATE),
            datasets: datasets
        };
        console.log(chartData)
        return chartData
    }
    
</script>

<div>
    {#if data !== undefined}
        <Line data={componentToSource(data)}></Line>
    {/if}
</div>
