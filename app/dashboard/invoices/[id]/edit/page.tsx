import React from 'react'
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data'
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
 
export default async function Page({params}: {params:{id:string}}) {
  const {id} = params

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if(!invoice){
    notFound()
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}








// const page = async({params} :{ params: {id: string}}) => {

//   const { id } = params
//   const DataFromInvoice = await fetchInvoiceById(id)
  
//   return (
//     <div>
//       {id}
//       <ul>
//         <input type="number" name="" value={DataFromInvoice.amount} id="" />
//         <li>{DataFromInvoice.amount}</li>
//         <li>{DataFromInvoice.status}</li>
//         <li></li>
//         <li></li>
//       </ul>
//     </div>
//   )
// }

// export default page
