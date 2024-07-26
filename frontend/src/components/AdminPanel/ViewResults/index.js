import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('/api/results').then((response) => {
      setResults(response.data);
    });
  }, []);

  return (
    <div>
      <h2>View Results</h2>
      <table>
        <thead>
          <tr>
            <th>Experiment</th>
            <th>Participant</th>
            <th>Dark Pattern</th>
            <th>Task</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.experiment}</td>
              <td>{result.participant}</td>
              <td>{result.darkPattern}</td>
              <td>{result.task}</td>
              <td>{result.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResults;
