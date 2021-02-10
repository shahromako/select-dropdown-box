import { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Select } from '../components/Select';
import { Users } from '../models/user';
import { useQuery } from '../shared/utils/utils';
import './App.scss';

const App: FC = () => {
  const [users, setUsers] = useState<Users | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const perPage: number = 8
  const query = useQuery();

  const fetchData = async (limit: number = perPage) => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://reqres.in/api/users',
      params: { page: 1, per_page: limit }
    }).then((response: AxiosResponse<Users>) => {
      setUsers(response.data);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="select-container">
        <Select
          defaultValue={query.get('id') || undefined}
          placeholder="Select user"
          options={users?.data}
          onClick={(option) => console.log(option)}
          onPaginate={(limit) => fetchData(limit)}
          totalRow={users?.total || 0}
          perPage={perPage}
          searchKey="first_name"
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
