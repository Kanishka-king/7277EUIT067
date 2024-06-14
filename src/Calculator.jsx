import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
    const [numberId, setNumberId] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setNumberId(e.target.value);
    };

    const fetchData = async () => {
        if (!['p', 'f', 'e', 'r'].includes(numberId)) {
            setError('Invalid ID');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:9876/numbers/${numberId}`);
            console.log('Server response:', response.data);  // Debugging statement
            setData(response.data);
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Average Calculator</h1>
                <input type="text" value={numberId} onChange={handleInputChange} placeholder="Enter ID (p, f, e, r)" />
                <button onClick={fetchData} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Numbers'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {data && (
                    <div>
                        <h2>Previous Window State:</h2>
                        <p>{JSON.stringify(data.windowPrevState)}</p>
                        <h2>Current Window State:</h2>
                        <p>{JSON.stringify(data.windowCurrState)}</p>
                        <h2>Numbers Received:</h2>
                        <p>{JSON.stringify(data.numbers)}</p>
                        <h2>Average:</h2>
                        <p>{data.avg}</p>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Calculator;
