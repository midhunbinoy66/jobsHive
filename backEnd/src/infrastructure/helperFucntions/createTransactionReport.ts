
import path from "path";
import { ITransactionReport } from "../../entities/tranaction";
import puppeteer from 'puppeteer'



export async function generateTransactionReportPDF(transactions:ITransactionReport[]) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // analysing trasactions
      const data = transactions.map(trt=>{

            const formattedDate = trt.date.toLocaleDateString('en-US',{
                year:'numeric',
                month:'long',
                day:'numeric'
            })
            return {
                amount:trt.amount,
                date:formattedDate,
                planName:trt.planId?.type,
                subscriber:trt.userId?.name||trt.employerId?.name
            }
        })

        const totalAmount = data.reduce((acc,curr)=>acc+curr.amount,0);
        const numberOfSubscriptions = data.length;
        const avrgAmount = totalAmount/numberOfSubscriptions;
        console.log(avrgAmount);
 
        const subscriptionRecord:Record<string,number>={}
        
        data.forEach(trt=>{
            if(!subscriptionRecord[trt.date]){
                subscriptionRecord[trt.date] =0;
            }
            subscriptionRecord[trt.date] = trt.amount;
        })

        const subscriptionByDateLabel = Object.keys(subscriptionRecord);
        const subscriptionByDateData = Object.values(subscriptionRecord);
        const labelsStringByDate = JSON.stringify(subscriptionByDateLabel);
        const dataStringByDate = JSON.stringify(subscriptionByDateData);
        

        // Set the content for the PDF
        let content = `
        <style>
        h1 {
            color: #333;
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th, td {
            border: 1px solid #333;
            padding: 8px;
            text-align: left;
        }
        
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
    </style>
            <h1>Transaction Report</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>User Name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Add transaction data to the content
        data.forEach(transaction => {
           
            content += `
                <tr>
                    <td>${transaction.date}</td>
                    <td>${transaction.amount}</td>
                    <td>${transaction.subscriber}</td>
                    <td>${transaction.planName}</td>
                </tr>
            `;
        });

        // Close the table and body
        content += `
                </tbody>
            </table>
            <h1>Subscriptions-Graphs</h1>
            <canvas id="myChart" width="400" height="400"></canvas> <!-- Chart canvas -->
            <canvas id="secondChart" width="400" height="400"></canvas> <!-- Chart canvas -->

        `;
        content += `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`;

        const trasactionRecords:Record<string,number>={};
        data.forEach(trt=>{
            if(trt.planName)
            if(!trasactionRecords[trt.planName?.toString()]){
                trasactionRecords[trt.planName?.toString()]=0;
            }
            if(trt.planName)
            trasactionRecords[trt.planName?.toString()] =trasactionRecords[trt.planName?.toString()] +1;
        })


        const labelsOfTrans = Object.keys(trasactionRecords)
        const dataOfTrans = Object.values(trasactionRecords)
        console.log(labelsOfTrans,dataOfTrans)
        const labelsString = JSON.stringify(labelsOfTrans);
        const dataString = JSON.stringify(dataOfTrans);
        content += `
        <script>
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ${labelsString},
                    datasets: [{
                        label: 'Number',
                        data: ${dataString},
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        </script>
    `;



    content += `
    <script>
        var ctx = document.getElementById('secondChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ${labelsStringByDate},
                datasets: [{
                    label: 'Number',
                    data: ${dataStringByDate},
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>
`;







        // Set the HTML content of the page
        await page.setContent(content);

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4'
        });
        console.log(typeof pdfBuffer)
        const filePath = path.join(__dirname+'../../../../resumes','1.pdf')
        await page.pdf({ path:filePath, format: 'A4' });
        // Close browser
        await browser.close();
    
        return '1.pdf';
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}


