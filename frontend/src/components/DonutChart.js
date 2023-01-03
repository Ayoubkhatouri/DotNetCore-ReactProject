import React,{useContext} from "react";
import Chart from 'react-apexcharts'
import context1 from '../context1'

function DonutChart({v,u,c,mybool}){
    const {isEn}=useContext(context1);
    return(
        <React.Fragment>
            <div className="container-fluid ">
            <Chart
            type="donut"
            width={400}
            height={400}
            series={mybool ?[v,u,c] : [v,c]}
            options={{
                labels:mybool ?(isEn ? ['Cars','Users','Orders'] :['Voitures','Utilisateurs','Commandes']) :(isEn ? ['Cars','Users'] :['Voitures','Commandes']),
                
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