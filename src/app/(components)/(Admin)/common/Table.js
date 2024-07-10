'use client'
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Table = ({ rows = [], columns = [], height }) => {
  const { showSidebar } = useSelector((state) => state.app);
  
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [window.innerWidth])

  return (
    <div
      style={{
        height: '70%',
        width: width < 768 ? null : `${
          !showSidebar ? "calc(100vw - 120px)" : `calc(100vw - 300px)`
        }`,
        overflowX: "auto",
      }}
    >
      <DataGrid
        rowSelection={false}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        rowHeight={height || 50}
        pageSizeOptions={[10, 20]}
      />
    </div>
  );
};

export default Table;

// xài bootstrap 5
// 'use client';

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const Table = ({ rows = [], columns = [], height }) => {
//   const { showSidebar } = useSelector((state) => state.app);

//   const [width, setWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize =() => setWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Xử lý chiều rộng dựa trên kích thước màn hình và showSidebar
//   const tableWidth = width < 768
//     ? "100%"
//     : !showSidebar
//     ? "calc(100vw - 120px)"
//     : "calc(100vw - 300px)";

//   return (
//     <div style={{ height: "70%", overflowX: "auto" }}>
//       <table className="table table-striped table-bordered table-hover" style={{ width: tableWidth }}>
//         <thead>
//           <tr>
//             {columns.map((column, index) => (
//               <th key={index}>{column.headerName}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columns.map((column, colIndex) => (
//                 <td key={colIndex}>{row[column.field]}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
