<script lang="ts">
    import { type GraphDataComponent, type DataComponent ,graphGlobal, findGraphType } from '../../routes/propTypes.ts';
    import { Line, } from 'svelte-chartjs'
    import 'chart.js/auto';
	import { Title } from 'chart.js/auto';

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
const months:{ [key: string]: string } = {
            'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
            'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
            'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
        };

    export let data:DataComponent | undefined = undefined;
    $: graphData = data as GraphDataComponent
  
    function convertDate(dateString:string) {

        const [monthAbbr, day, ] = dateString.split(' ');
        const month = months[monthAbbr];

        if(!month)
            return dateString

        return `${month}/${day.substring(0,day.length-1)}`;
    }
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
            labels: component.rows.map(row => convertDate(row.GAME_DATE)),
            datasets: datasets
        };
        return chartData
    }

    
</script>

{#if data !== undefined}

<div style="position: relative;" class="h-full w-full">
        <Line data={componentToSource(graphData)} options={{ 
            scales:{
                y: { 
                    position: 'left', 
                    type:'linear',
                    min: 0,
                    max: $graphGlobal[findGraphType(graphData.keys,$graphGlobal)] ? $graphGlobal[findGraphType(graphData.keys,$graphGlobal)].max+ 1 : 20
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: `${data.player_name}`,
                    font: {
                        size: 20
                    },
                    padding: {
                        top: 10,
                        bottom: 5
                    }
                }
            },
            responsive:true,
            maintainAspectRatio:false,

        }}
        />
</div>
{/if}

