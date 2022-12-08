import React from 'react';

const History = ({ reports }) => {
  return (
    <div class='table-responsive'>
      <table class='table align-middle mb-0 bg-white'>
        <thead class='bg-light'>
          <tr>
            <th>Name</th>
            <th>Hospital</th>
            <th>Doctor</th>
            <th>Price</th>
            <th>Date</th>
            <th>Max</th>
            <th>Min</th>
            <th>Value</th>
            <th>Weight</th>
            <th>Signauture count</th>
          </tr>
        </thead>
        <tbody>
          {reports?.map((r) => (
            <tr>
              <td>
                <div className='d-flex align-items-center'>{r.testName}</div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{r.hospital}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{r.doctor}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{r.price}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{r.date}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{r.max}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{r.min}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{r.value}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{r.weight}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{r.signatures.length}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
