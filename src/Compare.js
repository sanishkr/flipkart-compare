import React, {useEffect, useState} from 'react';

const Summary = ({s, cb}) => {
  return(
    <div className="w-1/3 flex flex-col p-2 relative">
      <div>
        <img alt={s.title} src={s.image} />
      </div> 
      <div className="flex flex-col"> 
        <span className="text-base self-start mt-2">{s.title}</span>  
        <div className="flex mt-2">
          <span className="text-base mr-2 font-medium">{s.pricing.price}</span>  
          <span className="text-base mr-2 text-gray-500 line-through">{s.pricing.finalPrice}</span>  
          <span className="text-sm text-green-500">{s.pricing.totalDiscount}% off</span>            
        </div>
      </div>
      <span onClick={() => cb(s.id)} className="absolute cursor-pointer rounded-full p-2 -mt-6 mr-1 bg-white right-0 shadow">&#10060;</span>
    </div>
  )
}
const Compare = ({compareSummary, onAddOrRemove}) => {
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState([])
  useEffect(()=>{
    const ids = Object.keys(compareSummary.images)
    const prods = ids.map(id => {
      return {
        id: id,
        image: compareSummary.images[id],
        title: compareSummary.titles[id]["title"] || "",
        subtitle: compareSummary.titles[id]["subtitle"] || "",
        pricing: compareSummary.productPricingSummary[id],
        selected: false
      }
    })
    setProducts(prods)
  },[compareSummary]);
  const addToCompare = e => {
    setSelected([...selected, e.target.value])
    onAddOrRemove([...selected, e.target.value])
  }
  const removeFromCompare = (id) => {
    let slctd = selected;
    console.log("removing id:", id, slctd.indexOf(id))
    if(slctd.indexOf(id) > -1 ) {
      slctd.splice( slctd.indexOf(id), 1 )
      setSelected([...slctd])
      onAddOrRemove([...selected])
    }
  }
  // console.log({selected})
  return(
    <div className="flex flex-row mt-4">
      <div className="w-1/3 flex flex-col p-2 justify-between">
        <div className="flex flex-col items-start">
          <span className="text-2xl">Compare</span>  
          <span className="text-sm">{selected.length} item selected</span>
        </div>
        <label htmlFor="only" className="self-start mb-2">
          <input className="p-2" type="checkbox" id="only" />
          <span className="text-sm ml-1">Show only differences</span>
        </label>
      </div>
      {
        products.filter(pd => selected.includes(pd.id)).map(p => <Summary key={p.id} s={p} cb={removeFromCompare} />)
      }
      {
      products.length !== selected.length ? 
      <div className="w-1/3 flex flex-col p-2 justify-between">
        <div>
          <img alt="tv" src="https://via.placeholder.com/1000x585/09f/fff.png" />
        </div>
        <div className="flex flex-col"> 
          <span className="text-base mt-2 self-start">Add a product</span>
          <select 
            onChange={addToCompare}
            className="mt-2 block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-1 px-2 rounded"
          >
            <option default>Choose a product</option>
            {
              products.map((p,i) => 
               !selected.includes(p.id) ? <option key={p.id} value={p.id} >{p.title}</option> : null
              )
            }
          </select>
        </div>
      </div> : null
      } 
    </div>
  )
}

export default Compare;