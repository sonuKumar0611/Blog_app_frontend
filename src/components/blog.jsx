import React, { useEffect, useState } from 'react';
import { Api } from '../api/api';
import { useParams } from 'react-router-dom';

const GetBlog = () => {
    const [data, setData] = useState(null);
    const { blog_id } = useParams();

    const getBlog = () => {
        Api.getBlog(blog_id).then((res) => {
            setData(res?.data?.data)
        })
    }

    useEffect(() => {
        getBlog();
    }, [])



    return (
        <div className="mx-auto">
            {data ?
                <div className="container mx-auto py-8">

                    <div className="mb-6">
                        <img
                            src={data?.file_path}
                            alt={data?.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    {/* Blog Title */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>

                        {/* Blog Description */}
                        <p className="text-gray-600 mb-6">{data?.body}</p>

                        {/* Blog Content */}
                        <div className="prose max-w-none">
                            <p>-By {data?.username}</p>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8 bg-gray-100 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

                        {/* Hardcoded Comments */}
                        <div className="mb-4">
                            <p className="font-bold">User1:</p>
                            <p className="text-gray-700">Great blog! Very informative.</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-bold">User2:</p>
                            <p className="text-gray-700">I learned a lot from this post, thanks for sharing!</p>
                        </div>
                    </div>
                </div>

                :
                null

            }
        </div>
    );
};

export default GetBlog;