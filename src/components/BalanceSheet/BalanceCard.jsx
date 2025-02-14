import ContainerBalanceCard from "./ContainerBalanceCard"
import styles from './styles/BalanceCard.module.css'
import iconOptions from '../../assets/points-option-icon.svg'
import { Spinner } from "reactstrap"

export default function BalanceCard({component, title}){
    const { props } = component
     
    return(
        <ContainerBalanceCard>
            <div className={styles.container}>
                <div className="d-flex justify-content-between align-items-center">
                    <h4>{title}</h4>
                    <button className="btn border rounded-circle" >
                        <img src={iconOptions} width={15} alt="" />
                    </button>
                </div>
                {
                    props.data.length!==0?component:(
                    <div style={{width:'100%', display:'grid', placeContent:'center'}}>
                        <Spinner/>
                    </div>
                    )
                }
            </div>
        </ContainerBalanceCard>
    )
}