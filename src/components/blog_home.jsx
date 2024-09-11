import React, { useEffect, useState } from 'react';
import Table from './common/table';
import { useNavigate } from 'react-router-dom';
import { Api } from '../api/api';
import Pagination from './common/Pagination/Pagination';
import { cleanLocalStorage, getLocalStorageItem, successToast } from '../helper/helper';



const BlogHome = () => {
    const columns = [
        {
            title: 'Blog image',
            key: 'file_path',
            type: 'image',
            extend: false,
            align: 'left',
            className: "text-nowrap"
        },
        {
            title: 'Blog title',
            key: 'title',
            type: 'text',
            extend: false,
            align: 'left',
            className: "text-nowrap"
        },
        {
            title: 'Blog Description',
            key: 'body',
            type: 'text',
            extend: false,
            align: 'left',
            className: "text-nowrap"
        },
        {
            title: 'Created By',
            key: 'username',
            type: 'text',
            extend: false,
            align: 'left',
            className: "text-nowrap"
        },
        {
            title: 'Created On',
            key: 'timestamp',
            type: 'date',
            extend: false,
            align: 'left',
            className: "text-nowrap"
        },
        {
            title: 'Action',
            key: '',
            type: 'action',
            extend: false,
            align: 'left',
            className: "text-nowrap",
            isDelete: true,
            isView: true

        },
    ]

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCounts, setTotalCounts] = useState(15);
    const [pageSize, setPageSize] = useState(5);
    const userToken = getLocalStorageItem('token');


    const navigate = useNavigate()

    useEffect(() => {
        handlePagination(page, pageSize);
    }, [])

    useEffect(() =>{
        if(!userToken){
            navigate('/');
        }
    }, [userToken])

    const handlePagination = (pageNumber, pageSize) => {
        Api.getBlogs(pageNumber, pageSize).then((response) => {
          if (response?.data?.code === 1) {
            setPage(pageNumber);
            setData(response?.data?.data);
            setTotalCounts(response?.data?.totalRecords);
          } else if (response?.status === 400) {
            setPage(1);
            setData([]);
            setTotalCounts(0);
          } 
        });
      };

    const deleteHandler = (id) => {
        Api.deleteBlog(id).then((response) => {
            handlePagination(page, pageSize);
        });
    };

    const handleLogout= ()=>{
        cleanLocalStorage();
        navigate('/')
    }

    return (
        <div className='h-full w-full mx-auto'>
            <div className='mx-auto rounded-lg w-[90%] mt-[2rem] h-full '>
                <div className='mx-auto flex gap-2 justify-end rounded-lg mt-[2rem] h-full '>
                    <button
                        onClick={() => navigate('/blogs/add')}
                        className='bg-purple-800 p-2 px-4 rounded-xl text-white text-md'
                    >Add Blog</button>
                     <button
                        onClick={handleLogout}
                        className='border border-purple-800 p-2 px-4 rounded-xl text-purple-800 text-md'
                    >Logout</button>
                </div>
            </div>

            <div className='border  mx-auto rounded-lg w-[90%] mt-[2rem] h-full '>
                <Table
                    columns={columns}
                    data={data}
                    name={'blog_table'}
                    setDeleteId={deleteHandler}
                />
               
            </div>
            <div className='mx-auto w-[90%] '>
                {data.length > 0 ? (
                    <Pagination
                        currentPage={page}
                        totalCount={totalCounts}
                        pageSize={pageSize}
                        onPageChange={(page) =>
                              handlePagination(
                                page,
                                pageSize,
                              )
                        }
                    />
                ) : (
                    <span />
                )}
            </div>

        </div>
    );
};

export default BlogHome;