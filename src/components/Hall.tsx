'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hall() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData().then((fetchedData) => {
            setData(fetchedData);
        });
    }, []);

    const fetchData = async () => {
        const response = await fetch('https://c1i0ye43g5.execute-api.us-east-1.amazonaws.com/dev/hall');
        const data = await response.json();
        return data;
    };

    return (
        <div>
            <h1>Data Display</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>X Axis</th>
                        <th>Y Axis</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.xAxis}</td>
                            <td>{item.yAxis}</td>
                            <td>
                                <Link href={`/hall/${item.id}`}>Go to Hall</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
