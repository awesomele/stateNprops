import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground,TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';

export class Personinfo extends Component {

	// Note: does not work if defaultProps in class
	// defaultProps = {
	//   name: 'Stranger',
	//   age: 0
	// };

	constructor(props) {
		super(props);
		this.state = {age: this.props.initialAge,
									handler: null,
									isNeverDie: false,
									isDieImmediately: false
									};

		this.increaseAge = this.increaseAge.bind(this);
		this.startLife = this.startLife.bind(this);
		this.isStillAlive = this.isStillAlive.bind(this);
		this.onClick = this.onClick.bind(this);
		this.saveHisLife = this.saveHisLife.bind(this);
		this.watchHimDie = this.watchHimDie.bind(this);
		this.die = this.die.bind(this);
	}

	increaseAge() {
		console.log('increaseAge for ' + this.props.name);
		if (this.isStillAlive()) {
			this.setState({age: this.state.age + 1});
		}
		else{
			clearInterval(this.state.handler);
		}
	}

	onClick() {
		if (!this.state.isNeverDie)
			Alert.alert(
				'You pick ' + this.props.name + '!', // Alert Title
				'Click OK to make him leave forever. \nClick Cancel to watch him die.', // My Alert Msg
				// put the button below
				[
					{text: 'OK', onPress: this.saveHisLife},
					{text: 'Cancel', onPress: this.watchHimDie},
				],
				// { cancelable: true } // useless on ios
			)
		else
			Alert.alert(
				'You pick ' + this.props.name + '!', // Alert Title
				this.props.name + 'is immortal. \n Click OK to kill him immediately! \nClick Cancel to be his minion.',  // My Alert Msg
				// put the button below
				[
					{text: 'OK', onPress: this.die },
					{text: 'Cancel'},
				],
				// { cancelable: true } // useless on ios
			)
	}

	saveHisLife() {
		this.setState({isNeverDie: true});
	}

	watchHimDie() {

	}

	die() {
		this.setState({isNeverDie: false});
		this.setState({isDieImmediately: true});
	}

	startLife() {
		var handler = setInterval(()=>this.increaseAge(),500);
		this.setState({handler: handler});
	}

	isStillAlive() {
		if (this.state.isDieImmediately)
			return false;

		if (this.state.isNeverDie)
			return true;

		return this.props.isStillAlive ? (this.state.age > 99 ? false : true) : false;
	}

	componentWillMount() {
		// console.log('componentWillMount');
	}

	componentDidMount() {
		// console.log('componentDidMount');
		this.startLife();
	}

	// Note: Dynamic styling: way 1
	// style={this.props.isStillAlive ? styles.alivePersonView : styles.deadPersonView}
	// Note: Dynamic styling: way 2, appending to the default, the code is dated, the format is correct.
	// style={	[styles.default, this.props.isStillAlive ? styles.alivePersonTextColor : styles.deadPersonTextColor] }
	// Note: Dynamic styling: way 3, using a function
	// style={personViewColor(this.props.isStillAlive)}

	render() {
		// console.log('render');
		return (
			<ImageBackground source={this.props.imageUrl} style={{width: styles.personViewDefault.width, height: styles.personViewDefault.height}}>
				 <TouchableOpacity onPress={this.onClick}>  
					<View style={personViewColor(this.isStillAlive())}>
						<Text style={styles.personTextdefault}>
							{this.props.name}{"\n"}
							Initial Age = {this.props.initialAge}{"\n"}
						</Text>
						<Text style={styles.personTextdefault}>
							Currnet Age = {this.state.age}{"\n"}
						</Text>
						<Text style={styles.personTextdefault}>
							alive = {this.isStillAlive() ? 'Yes' : 'No'}
						</Text>
					</View>
				</TouchableOpacity>
			</ImageBackground>
		);
	}
}

Personinfo.propTypes = {
	name: PropTypes.string,
	initialAge: PropTypes.number,
	isStillAlive: PropTypes.bool.isRequired,
	imageUrl: PropTypes.number // require() returns number?
};

Personinfo.defaultProps = {
	name: 'Stranger',
	initialAge: 0,
	// the solution below is from BK7's post in
	// https://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names
	imageUrl: require('./images/default.png') 
};

function personViewColor(isStillAlive) {
	// return isStillAlive? styles.alivePersonView : styles.deadPersonView;
	return [styles.personViewDefault, isStillAlive ? styles.alivePersonViewColor : styles.deadPersonViewColor];
}


// ToDO; pull view out of PersonInfo
class PersonView extends Component {


}


const styles = StyleSheet.create({

	// alivePerson: {
  //   textAlign: 'center',
  //   color: 'green',
  //   marginBottom: 5,
  // },
  // deadPerson: {
  //   textAlign: 'center',
  //   color: 'red',
  //   marginBottom: 5,
	// },

	personTextdefault: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black'
	},
	// alivePersonTextColor: {
  //   color: 'green',
  // },
  // deadPersonTextColor: {
  //   color: 'red',
	// },

	personViewDefault: {
		width: 200, 
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'blue',
		opacity: 0.5
	},
	alivePersonViewColor: {
    backgroundColor: 'green',
  },
  deadPersonViewColor: {
    backgroundColor: 'red',
	},

	// alivePersonView: {
	// 	width: 200, 
	// 	height: 200,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	borderWidth: 1,
	// 	borderColor: 'blue',
	// 	backgroundColor: 'green',
	// },
	// deadPersonView: {
	// 	width: 200, 
	// 	height: 200,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	borderWidth: 1,
	// 	borderColor: 'blue',
	// 	backgroundColor: 'red',
	// },
});