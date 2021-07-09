import React from 'react';

import { Card } from 'antd';


const CustomCard = ({number, description,icon }) =>{
    return(
        <Card
        hoverableauto={'true'}
        style={{
          background:'rgba( 246, 246, 246, 0.50 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 8.0px )',
          webkitBackdropFilter: 'blur( 8.0px )',
          border: '1px solid rgba( 255, 255, 255, 0.18 )'
        }}
        cover={icon}
        hoverable={true}
      
      >
        <Card.Meta 
        title={number}
        description={description}/>
      </Card>
      );
}






//{ borderStyle:'solid', borderWidth:'1px', borderColor:'#E5E5E5', margin:'3px',boxShadow:' 0 2px 8px 0 rgba(0, 0, 0, 0.2)'}
/**

background: rgba( 246, 246, 246, 0.50 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 11.0px );
-webkit-backdrop-filter: blur( 11.0px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );

**/

export default CustomCard;