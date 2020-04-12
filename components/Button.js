import { Image, Button, Platform, StyleSheet, Text, View, Alert, TouchableOpacity, Dimensions, Animated} from 'react-native';

export default class MyButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        props = this.props;
        
        return <div>
            <TouchableOpacity
                style={[{backgroundColor: props.color}, styles.buttonStyle]}
                onPress={() => props.onclick(props.path)}>
                <Image 
                    source={require(props.image)}
                    style={styles.buttonIcon}/>    
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
        </div>
    }
}