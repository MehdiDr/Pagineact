//     

import React from 'react';
import Flag from 'react-flags';

const divContainerStyle = {
	border: 'gray',
	borderRight: '2px',
	display: 'flex',
	alignItems: 'center',
	borderRadius: '25px',
};

const spanStyle = {
	textColor: 'dark',
	fontWeight: 'bold',
};

              
               
                 
                
  


const CountryCard = props => {
  props: Props
  
	const { cca2: code2 = '', region = null, name = {} } = props.country || {};
  

	return(
		<div className="col-sm-6 col-md-4 country-card">
			<div style={divContainerStyle} className="country-card-container">
				<div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">
					<Flag country={code2} format="png" pngSize={64} basePath="./img/flags" className="d-block h-100" />
				</div>
				<div className="px-3">
					<span style={spanStyle} className="country-name d-block">{ name.common }</span>
					<span className="country-region text-secondary text-uppercase">{ region }</span>
				</div>
			</div>
		</div>
	);
};

export default CountryCard;