import React from 'react';

const Features = ({features}) => {
  return(
    <>
      {
      features.map((featureItem,i) => <span key={i+1} className="p-1 text-sm h-12 px-2">{featureItem.featureName}</span>)
      }
    </>
  )
}

const ProductFeatures = ({features, id}) => {
  return(
    <>
      {
      features.map((featureItem,i) => <span key={i+1} className="truncate h-12 p-1 text-sm px-2">{featureItem.values[id]}</span>)
      }
    </>
  )
}

const ComparisonTable = ({featuresList, selected, showExtra}) => {
  console.log({selected, showExtra})
return (
  <div className="flex flex-row text-left border-t border-gray-400">
    <div className="w-1/3 flex flex-col border-r border-gray-400">
      {
        featuresList.map((featuresListItem, i) => {
          return(
            <React.Fragment key={i+1}>
              <div className="p-1 h-8 bg-gray-200 uppercase px-2">{featuresListItem.title}</div>
              <Features features={featuresListItem.features} />
            </React.Fragment>
          )
        })
      }
    </div>
    {
      selected.map(p => 
        <div key={p} className="w-1/3 flex flex-col border-r border-gray-400">
        {
            featuresList.map((featuresListItem, i) => {
              return(
                <React.Fragment key={i+1}>
                  <span className="p-1 h-8 bg-gray-200 px-2"></span>
                  <ProductFeatures features={featuresListItem.features} id={p} />
                </React.Fragment>
              )
            })
          }
        </div>
      )
    }
    {
      showExtra ?  
      <div className="w-1/3 flex flex-col border-r border-gray-400">
        <span className="p-1 h-8 bg-gray-200 px-2"></span>
        <span className="p-1 text-sm px-2"></span>
      </div> : null
    }
  </div>
)
}

export default ComparisonTable;