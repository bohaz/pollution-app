import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAirData } from '../redux/airSlice';

function Details() {
  const { stateName } = useParams();
  const dispatch = useDispatch();
  const airData = useSelector((state) => state.air.data);
  const airStatus = useSelector((state) => state.air.status);

  useEffect(() => {
    dispatch(fetchAirData(stateName));
  }, [dispatch, stateName]);

  if (airStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (airStatus === 'failed') {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="card">
      <Link to="/">← Back</Link>
      <h2>
        Details of
        {' '}
        {stateName}
      </h2>
      {/* Check if the required properties exist before accessing them */}
      {airData && airData.list && airData.list[0] && airData.list[0].components ? (
        <div>
          <p>
            CO:
            {' '}
            {airData.list[0].components.co}
          </p>
          <p>
            NO2:
            {' '}
            {airData.list[0].components.no2}
          </p>
          <p>
            O3:
            {' '}
            {airData.list[0].components.o3}
          </p>
          <p>
            SO2:
            {' '}
            {airData.list[0].components.so2}
          </p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default Details;
