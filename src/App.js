import React, {useEffect,useState} from "react";
import axios from 'axios';

import Compare from './Compare';
import ComparisonTable from './ComparisonTable';

export default function App() {
  const [products, setProducts] = useState({})
  const [selected, setSelected] = useState([])
  useEffect(()=>{
    axios.get(`https://flipkart-mock-product.now.sh/`)
    .then(({data}) => setProducts(data.products))
  },[])
  const onAddOrRemove = (slctd) => {
    setSelected([...slctd])
  }
  return (
    <div className={""}>
      {/* <h1 className="text-3xl text-green-500 pt-32">Hello CodeSandbox</h1> */}
      {/* <h2 className="text-white">Start editing to see some magic happen!</h2> */}
      {
        products.compareSummary ? 
        <Compare onAddOrRemove={onAddOrRemove} compareSummary={products.compareSummary} />
        : null
      }
      {
        products.featuresList ? 
        <ComparisonTable showExtra={Object.keys(products.compareSummary.images).length != selected.length} selected={selected} featuresList={products.featuresList} />
        : null
      }
    </div>
  );
}
