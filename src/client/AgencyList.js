import React from 'react';

const ListItem = (props) => (
  <a onClick={props.handleClick.bind(null, props.place)}>
    <li style={{
      'margin': '10px',
      'padding': '5px',
      'cursor': 'pointer'
    }}>
      <div>
        {props.place.name}
      </div>
      <div style={{
        'fontSize': '0.8em',
      }}>
        {props.place.vicinity}
      </div>
      </li>
  </a>
)

const AgencyList = (props) => {
  return (
    <ol style={{ 'listStyleType': 'none'}}>
      {props.agencies.map((place, idx) => <ListItem place={place} handleClick={props.handlePlaceClick} key={`ListItem${idx}`}/>)}
    </ol>
  )
}

export default AgencyList;