import styles from './button.module.css';

const Button = (props) =>{
    return <button 
    className={props.className ? `${styles.button} ${props.className}` : styles.button}
    type={props.type || 'button'}
    onClick={props.onClick}
    disabled={props.disabled}
    >
        {props.children}
    </button>
}

export default Button;