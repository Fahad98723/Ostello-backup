import React from 'react'
import Card from './card'

function SearchList({ filteredItems }) {
  
  return (
    <div>
      {filteredItems.map((item, index) => (
        <Card key={index} currentValue={item} />
      ))}
    </div>
  )
}

export default SearchList
