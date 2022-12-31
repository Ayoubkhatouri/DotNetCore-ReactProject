import React from "react";
import Chart from 'react-apexcharts'

function DonutChart({v,u,c,mybool}){
    return(
        <React.Fragment>
            <div className="container-fluid ">
            <Chart
            type="donut"
            width={400}
            height={400}
            series={mybool ?[v,u,c] : [v,c]}
            options={{
                labels:mybool ?['Voitures','Utilisateurs','Commandes'] :['Voitures','Commandes'],
                
                plotOptions:{
                    pie:{
                        donut:{
                            labels:{
                                show:true
                            }
                        }
                    }
                }
            } 
            
        }
            />
            </div>
        </React.Fragment>
    )
}
export default DonutChart