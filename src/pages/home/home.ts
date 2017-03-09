import { Component, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Chart } from 'chart.js';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    //items: FirebaseListObservable<any[]>;

    //@ViewChild('barCanvas') barCanvas;
    //@ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;

    items: any;
    iChart: any;

    barChart: any;
    doughnutChart: any;
    lineChart: any;

    updateChart: any;
    maxPoints: any;
    dataPoints: any;
    dataLabels: any;
    constructor(public navCtrl: NavController, af: AngularFire) {
        //AngularFireModule.initializeApp(firebaseConfig);
        //this.items = af.database.list('/points');
        //console.log(this.items);
        this.maxPoints = 50;
        this.dataPoints = [];
        this.dataLabels = [];
        this.items = af.database.object('/points/100', { preserveSnapshot: true });
        this.items.subscribe(snapshot => {
          console.log(snapshot)
          console.log(snapshot.key)
          console.log(snapshot.val())
            if ((snapshot.val()).hasOwnProperty('point')) {
                this.updateChart(parseFloat((snapshot.val()).point));
            }
        });
    }

    ionViewDidLoad() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                //labels: ["January", "February", "March", "April", "May", "June", "July"],
                labels: [],
                datasets: [
                    {
                        label: "Update Points",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.dataPoints,
                        spanGaps: false,
                    },

                ]
            },
            options: {
                animation: {
                    duration: 0
                },
                elements: {
                    line: {
                        borderWidth: 0.5
                    },
                    point: {
                        radius: 2
                    }
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                    gridLines: {
                        display: true
                    }
                },
                tooltips: {
                    enabled: true
                }
            }
        });
        this.updateChart = function (point) {
                if (this.dataPoints.length) {
                    //this.dataPoints = dataPoints.slice(1);
                    this.dataPoints.shift();
                    this.dataLabels.shift();
                }

            while (this.dataPoints.length < this.maxPoints) {
                    /*
                    this.dataPoints.push({
                        x: count++,
                        y: parseInt(point)
                    });
                    */
                    this.dataPoints.push(point);
                    this.dataLabels.push("");
            }
            console.log(this.dataPoints);
            this.lineChart.data.datasets.data = this.dataPoints;
            this.lineChart.data.labels = this.dataLabels;
            this.lineChart.update();
            /*
            this.barChart = new Chart(this.barCanvas.nativeElement, {

                type: 'bar',
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }

            });

            this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

                type: 'doughnut',
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]
                }

            });
            

            this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                type: 'line',
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [
                        {
                            label: "Update Points",
                            fill: true,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.dataPoints,
                            spanGaps: false,
                        }
                    ]
                }

            });
            */
        }
    }
}
