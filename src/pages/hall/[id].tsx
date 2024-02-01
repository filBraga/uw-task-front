import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import './styles.css';

const Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const [hall, setHall] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);

    // useEffect hook to fetch data when 'id' changes
    useEffect(() => {
        if (id) {
            // Check if 'id' is not undefined or null
            fetchHallData(id).then((fetchedData) => {
                setHall(fetchedData);
            });

            fetchReservedSeats(id).then((fetchedData) => {
                console.log('fetchedData');
                console.log(fetchedData);
                setReservedSeats(fetchedData);
            });
        }
    }, [id]); // Dependency array with 'id', to re-run the effect when 'id' changes

    const fetchHallData = async (id: any) => {
        try {
            const response = await fetch(`http://localhost:3001/hall/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // Return an empty array or error state as needed
        }
    };

    const fetchReservedSeats = async (id: any) => {
        try {
            const response = await fetch(`http://localhost:3001/reserved-seat/hall/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // Return an empty array or error state as needed
        }
    };

    const handleCircleClick = async (xAxis: any, yAxis: any) => {
        try {
            const hallId = id; // Assuming 'id' from the router query is the hallId
            const response = await fetch(
                `http://localhost:3001/reserved-seat/nextAvailableTicket?hallId=${hallId}&xAxis=${xAxis}&yAxis=${yAxis}`,
            );
            const data = await response.json();

            console.log('data');
            console.log(data);

            alert(`Next available ticket: ${JSON.stringify(data)}`);
            // You can do something with this data
        } catch (error) {
            console.error('Error on clicking circle:', error);
        }
    };

    const handleNextAvailableTicketClick = async () => {
        try {
            const hallId = id; // Assuming 'id' from the router query is the hallId
            const response = await fetch(`http://localhost:3001/reserved-seat/nextAvailableTicket?hallId=${hallId}`);
            const data = await response.json();

            console.log('No prefered seat');
            console.log(data);

            alert(`Next available ticket: ${JSON.stringify(data)}`);
            // You can do something with this data
        } catch (error) {
            console.error('Error fetching next available ticket:', error);
        }
    };

    return (
        <div>
            <div>
                {reservedSeats.map((row: any[], rowIndex: any) => (
                    <div key={rowIndex}>
                        {row &&
                            row.map((cell: any, cellIndex: any) => (
                                <span
                                    key={cellIndex}
                                    className={`circle ${cell === 1 ? 'red' : 'green'}`}
                                    onClick={() => handleCircleClick(cellIndex, rowIndex)}
                                >
                                    {cellIndex}, {rowIndex}
                                </span>
                            ))}
                    </div>
                ))}
            </div>
            <button onClick={handleNextAvailableTicketClick}>No prefered seat</button>
        </div>
    );
};

export default Page;
