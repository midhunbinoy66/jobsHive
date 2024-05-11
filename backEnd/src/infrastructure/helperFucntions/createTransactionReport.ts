
import path from "path";
import { ITransaction } from "../../entities/tranaction";
import puppeteer from 'puppeteer'


export async function generateTransactionReportPDF(transactions:ITransaction[]) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

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
                        <th>planId</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Add transaction data to the content
        transactions.forEach(transaction => {
           
            content += `
                <tr>
                    <td>${transaction.date}</td>
                    <td>${transaction.amount}</td>
                    <td>${transaction.userId}</td>
                </tr>
            `;
        });

        // Close the table and body
        content += `
                </tbody>
            </table>
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


// import { ITransaction } from "../../entities/tranaction";
// import PDFDocument from 'pdfkit'

// export async function generateTransactionReportPDF(transactions: ITransaction[]): Promise<Buffer> {
//     return new Promise((resolve, reject) => {
//         try {
//             const doc = new PDFDocument();
//             const buffers: Buffer[] = [];

//             // Pipe the PDF output to a buffer
//             doc.on('data', (chunk: Buffer) => {
//                 buffers.push(chunk);
//             });

//             doc.on('end', () => {
//                 // Concatenate all chunks into a single buffer
//                 const pdfBuffer = Buffer.concat(buffers);
//                 resolve(pdfBuffer);
//             });

//             // Add content to the PDF
//             doc.fontSize(16).text('Transaction Report', { align: 'center' }).moveDown();

//             doc.font('Helvetica-Bold').text('Date\tAmount\tPlan ID', { align: 'left' });
            
//             // Add transaction data
//             transactions.forEach(transaction => {
//                 doc.font('Helvetica').text(`${transaction.date}\t${transaction.amount}\t${transaction.userId}`, { align: 'left' });
//             });
//             // Finalize the PDF
//             doc.end();
//         } catch (error) {
//             console.error('Error generating PDF:', error);
//             reject(error);
//         }
//     });
// }
