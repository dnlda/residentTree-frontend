import "./styles.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



interface TreeAnimatedArrowProps {
    isExpanded: boolean;
}

const TreeAnimatedArrow = ({isExpanded}: TreeAnimatedArrowProps) => {
    return (
        <div className={`arrow-container ${isExpanded ? 'expanded' : ''}`}>
             <KeyboardArrowDownIcon /> 
        </div>
    )
  }

  export default TreeAnimatedArrow