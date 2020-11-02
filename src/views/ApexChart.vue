<template>
<div id="chart">
    <apexchart height="400" ref="chart" :series="series" />
</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ApexCharts from 'apexcharts'
import * as config from '../constants/config';
import axios from 'axios';
import socket from '../../server/socket'
// import moment from 'vue-moment'
// import io from 'socket.io-client'

var data;
var chartOptions = {
    chart: {
        id: 'realtime',
        height: 400,
        background: '#ffff',
        type: 'candlestick',
        animations: {
            enabled: true,
            easing: 'liner',

        },
        toolbar: {
            show: true
        },
        zoom: {
            enabled: true
        },
        annotations: {
            xaxis: [{
                x: '1538778600000',
                borderColor: '#00E396',
                label: {
                    borderColor: '#00E396',
                    style: {
                        fontSize: '12px',
                        color: '#fff',
                        background: '#00E396'
                    },
                    orientation: 'horizontal',
                    offsetY: 7,
                    text: 'Annotation Test'
                }
            }]
        },
    },
    dataLabels: {
        // enabled: false
    },
    series: [],
    time: null,
    title: {
        text: 'Real Time Chart',
        align: 'left'
    },

    markers: {
        size: 0
    },
    tooltip: {
        enabled: true,
    },

    xaxis: {
        type: 'category',

    },
    yaxis: {
        tooltip: {
            enabled: true
        }
    },
    legend: {
        // show: false
    },

    noData: {
        text: 'Loading...'
    }
}
export default {
    name: 'ApexChart',

    components: {
        apexchart: VueApexCharts,
    },
    data() {

        return {

            series: [{
                data: [],
            }],
            chartOptions: chartOptions,
            time: null,
            chart: chartOptions.chart,
            connection: new socket()
        }
    },
    created: function () {
        this.connection.doOpen()
        this.connection.onOpen = function (event) {
            console.log("socket event", event)
        }

    },
    methods: {
        getDataWS() {
            console.log('connecting socket...')

            this.connection.onOpen = function (event) {
                console.log(event);
                console.log('connect successfull')
            }

            // this.connection.onMessage = function (event) {
            //     console.log('message log', event)
            // }
            this.connection.on("datachart", function (event) {
                console.log('datas:', event.data)
            })

            var chart = new ApexCharts(
                document.querySelector("#chart"),
                chartOptions
            );

            chart.render();

            function getDataAPI() {
                axios.get(config.API_URL + 'stockDate').then((res) => {
                    data = res.data
                })

            };

            getDataAPI()
            chart.updateSeries([{
                data: data
            }])
            window.setInterval(() => {
                getDataAPI()
                // this.connnection.on('onopen', function (data) {
                //     console.log("this data", data)
                // })
                var date = new Date().toString().split('GMT')[0];

                if (data.length >= 80) {
                    axios.post(config.API_URL + 'stockDate', {
                        x: date,
                        y: [parseInt(Math.random() * (9999 - 1000) + 2), parseInt(Math.random() * (9999 - 1000) + 2), parseInt(Math.random() * (9999 - 1000) + 2), parseInt(Math.random() * (9999 - 1000) + 2)]
                    }).then((res) => {
                        axios.delete(config.API_URL + `stockDate/${(parseInt(res.data.id) - 80).toString()}`)

                    })

                } else {
                    axios.post(config.API_URL + 'stockDate', {
                        x: date,
                        y: [parseInt(Math.random() * (9999 - 1000) + 2), parseInt(Math.random() * (9999 - 1000) + 2), parseInt(Math.random() * (9999 - 1000) + 2), parseInt(Math.random() * (9999 - 1000) + 2)]
                    })

                }
                chart.updateSeries([{
                    data: data
                }])
                // console.log('data:', data)
            }, 5000)
        },
    },
    mounted: function () {
        this.getDataWS()
    },

}
</script>

<style scoped>
#chart {
    background: #ffff;
}
</style>
