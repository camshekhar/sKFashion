/* App.js */
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Test = () => {

        const options = {
            animationEnabled: true,
			exportEnabled: true,
			theme: "light2", //"light1", "dark1", "dark2"
			axisY: {
				includeZero: true
			},

            title: {
              text: "Your Order Graph"
            },
            data: [{        
              type: "column",  
              dataPoints: [
                { label: "Apple",  y: 10  },
                { label: "Orange", y: 15  },
                { label: "Banana", y: 25  },
                { label: "Mango",  y: 30  },
                { label: "Grape",  y: 28  }
              ]
            }]
          }
        
          
          return (
            <div>
              <CanvasJSChart options={options} />
            </div>
          );
        
   
}
export default Test;
