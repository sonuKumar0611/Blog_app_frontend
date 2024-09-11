import { ArrowDownTrayIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import moment from 'moment/moment';
import React, { useState } from 'react';
import DeletePopup from './delete_modal';
import { useNavigate } from 'react-router-dom';
// import { Api } from '../api';

const Table = ({ columns, data, setDeleteId, onClickRow }) => {
    const [selected, setSelected] = useState(false);
    const [loader, setLoader] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');
    const [openDeletePopup, setDeletePopup] = useState(false);
    const navigate = useNavigate();


    const handleRowClick = (item, index) => {
        if (onClickRow) {
            onClickRow(item)
            setSelected(index)
        }
    }

    const deleteHandler = (id) => {
        setIdToDelete(id);
        setDeletePopup(true)
    };

    const handleDeletePopup = () => {
        setDeletePopup(false);
        setDeleteId(idToDelete);
        setIdToDelete('');
    };

    const formattedData = (rowData, data, type, column, index, rowIndex) => {
        if (type === 'badge') {
            return (
                <p
                    className={`inline-flex m-0 rounded-full ${data === 1 ? 'bg-green-100' : 'bg-red-100'
                        } px-3 py-[3px] text-md leading-5 capitalize font-semibold tracking-normal ${data === 1 ? 'text-green-700' : 'text-red-700'
                        }`}
                >
                    {data === 1 ? 'active' : 'inactive'}
                </p>
            );
        } else if (type === 'action') {
            return (
                <div className="flex items-center justify-end">
                    {column.isEdit && (
                        <PencilSquareIcon
                            className="w-[20px] ml-2 text-shoorah-secondary dark:text-white cursor-pointer"
                        // onClick={() => navigate(column.isEdit, { state: { ...rowData, action: 'edit' } })}
                        />
                    )}
                    {column?.isView && (
                        <EyeIcon
                            className="w-[20px] ml-2 text-purple-800 cursor-pointer"
                            onClick={() => navigate(`/blogs/${rowData?.blog_id}`)}
                        />
                    )}
                    {column.isDelete && (
                        <TrashIcon
                            className="w-[20px] ml-2 text-red-500 cursor-pointer"
                            onClick={() => deleteHandler(rowData?.blog_id || rowData?.blog_id)}
                        />
                    )}
                </div>
            );
        } else if (type === 'boolean') {
            return (
                <>
                    <p
                        className="w-[3rem] min-w-[2rem] inline-block overflow-hidden overflow-ellipsis text-center"
                        id={column.key + rowData.id}
                    >
                        {data ? 'Yes' : 'No'}
                    </p>
                </>
            );
        } else if (type === 'text') {
            return data ? (
                <p
                className="w-[10rem] min-w-[8rem] inline-block overflow-hidden overflow-ellipsis"
                id={column.key + rowData.id}
              >
                    {data}
                </p>
            ) : (
                '--'
            );
        } else if (type === 'date') {
            return data ? moment(data).format('MMM D, YYYY') : 'N/A';
        } else if (type === 'image') {
            return (
                data ?
                <img
                    src={data ? data : ""}
                    className="w-full max-w-[50px] aspect-square rounded-full h-auto"
                />
                :
                <p className='mx-auto'>
                 N/A
                </p>
               
            );
        }
    };

    return (
        <div className="w-full overflow-x-auto h-full">
            <table className="min-w-full h-max">
                <thead className="rounded-3xl sticky top-0">
                    <tr>
                        <th
                            className={`px-6 py-3 text-left rounded-l-lg bg-purple-800 text-xs md:text-sm font-medium text-white uppercase tracking-wider`}
                        >
                            Sr no
                        </th>
                        {columns.map((column, index) => (
                            <th
                                key={column.key}
                                className={`px-6 py-3 text-${column.align} bg-purple-800 text-xs md:text-sm font-medium text-white uppercase tracking-wider
                                ${index === 0 ? '' : ''}
                                ${index === columns.length - 1 ? 'rounded-r-lg' : ''} ${column.className}`}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white h-full overflow-y-auto">
                    {data.map((data, rowIndex) => (
                        <tr onClick={() => handleRowClick(data, rowIndex)} key={rowIndex} className={`border-b border-gray-200 ${onClickRow ? "cursor-pointer" : ""}`}>
                            <td
                                className={`whitespace-nowrap px-6 py-4 `}>{rowIndex + 1}</td>
                            {columns.map((column, index) => (
                                <td
                                    className={`whitespace-nowrap px-6 py-4 
                    ${column.align === 'left'
                                            ? 'text-left'
                                            : column.align == 'center'
                                                ? 'text-center'
                                                : 'text-right'
                                        } 
                    p-3 text-sm text-gray-700 
                    ${column.transform ? column.transform : ''} 
                    ${index === 0 ? 'rounded-l-[3rem]' : ''}
                    ${index === columns.length - 1 ? 'rounded-r-[3rem]' : ''}
                    ${selected === rowIndex ? "bg-gray-300" : ""}`}
                                    key={column.key}
                                >
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="whitespace-nowrap">
                                            {formattedData(
                                                data,
                                                data[column.key],
                                                column.type,
                                                column,
                                                index,
                                                rowIndex
                                            )}
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {openDeletePopup && (
                <DeletePopup
                    open={openDeletePopup}
                    setOpen={setDeletePopup}
                    setDelete={handleDeletePopup}
                />
            )}
        </div>
    );
};

export default Table;