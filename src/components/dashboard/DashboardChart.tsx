import {useEffect, useState} from 'react'
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Rejection Reasons ',
      position: 'left' as const,
    },
  },
};

// const custData = [
//     {
//         reasonTitle:"Illegible ID",
//         noOfRejects: 40000,
//     }, {
//         reasonTitle:"Invalid ID",
//         noOfRejects: 30000,
//     }, {
//         reasonTitle:"Rej. Multiple Wallet",
//         noOfRejects: 20000,
//     }, {
//         reasonTitle:"Rej. KYC Update",
//         noOfRejects: 25000,
//     },
// ]

interface DashboardProps {
  reasons_count: any
}

const DashboardChart = ({reasons_count}:DashboardProps) => {
  const [customerData, setCustomerData] = useState<any>()
  useEffect(()=>{
    setCustomerData({
      labels:reasons_count?.map((item:any) => item.reason_name),
      datasets:[{
          label:'Reasons',
          data:reasons_count?.map((item:any) => item.count),
          backgroundColor: 'rgba(3 105 161)',
          borderColor: 'rgba(255,0,0)',
          barThickness: 50,  
      }]
  })
  }, [reasons_count])
    return (
      <>
        {
          customerData &&
          <Bar options={options} data={customerData} />
        }
      </>
    )
}

export default DashboardChart

