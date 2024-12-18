import * as React from 'react';
import { useAllPayment } from '../../api/payment/api';
export default function IncomeReportPage()
{
    const payments = useAllPayment();
    console.log({payments});
 return (
        <div>
        IncomeReport Page
        </div>
    );
}