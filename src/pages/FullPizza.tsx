import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';


 const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    image: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

    React.useEffect(() => {
      async function fetchPizza() {
        try {
          const { data } = await axios.get('http://localhost:3002/pizzas/' + id)
          setPizza(data);
        } catch (error) {
          alert('Some error when you getting pizzas');
          navigate('/');
        }
      }
      fetchPizza();
    }, [])

    if (!pizza) {
      return <>'Loading...' </>;
    }

  return (
    <div className='container'>
        <img src={pizza.image}/>
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} R</h4>
    </div>
  )
}
export default FullPizza;
