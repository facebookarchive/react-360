import React from 'react';
import {
  AppRegistry,
  NativeModules,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-360';

// Extract our custom native module
const BrowserInfo = NativeModules.BrowserInfo;

class Button extends React.Component {
  state = {
    hover: false,
  };

  render() {
    const style = [styles.button];
    if (this.state.hover) {
      style.push(styles.buttonHover);
    }
    return (
      <VrButton
        {...this.props}
        onEnter={() => this.setState({hover: true})}
        onExit={() => this.setState({hover: false})}
        style={style}
      />
    );
  }
}

class ModuleTest extends React.Component {
  constructor() {
    super();

    this.state = {
      batteryLevel: null,
      lastConfirmation: null,
    };

    this.titleCount = 0;

    this.incrementTitle = this.incrementTitle.bind(this);
    this.getConfirmation = this.getConfirmation.bind(this);
  }

  componentDidMount() {
    // When the component initializes, request the battery level from the module
    // The callback is triggered on the other side when that data is available
    BrowserInfo.getBatteryLevel(level => {
      this.setState({batteryLevel: level});
    });
  }

  incrementTitle() {
    this.titleCount++;
    // Set the window title to reflect the latest count
    BrowserInfo.setTitle('Count: ' + this.titleCount);
  }

  getConfirmation() {
    // Display a confirmation dialog, and set the local state based upon
    // the end state of the returned Promise.
    BrowserInfo.getConfirmation('Resolve the Promise?').then(
      () => {
        // Resolved
        this.setState({lastConfirmation: true});
      },
      () => {
        // Rejected
        this.setState({lastConfirmation: false});
      },
    );
  }

  render() {
    const {batteryLevel, lastConfirmation} = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.label}>Battery:</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.value}>
                {this.state.batteryLevel === null
                  ? 'Unknown'
                  : ((batteryLevel * 100) | 0) + '%'}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.label}>Title Bar:</Text>
            </View>

            <View style={styles.right}>
              <Button onClick={this.incrementTitle}>
                <Text style={styles.buttonText}>Increment</Text>
              </Button>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.label}>Get Confirmation:</Text>
            </View>

            <View style={styles.right}>
              <Button onClick={this.getConfirmation}>
                <Text style={styles.buttonText}>Request</Text>
              </Button>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.label}>Last Value:</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.value}>
                {lastConfirmation === null
                  ? 'None'
                  : lastConfirmation
                    ? 'Resolved'
                    : 'Rejected'}
              </Text>
            </View>
          </View>

          <View style={styles.userAgent}>
            <Text style={styles.userAgentString}>{BrowserInfo.userAgent}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
    width: 1000,
  },
  table: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: '#303050',
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: 400,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    height: 50,
  },
  left: {
    marginRight: 20,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  right: {
    paddingRight: 10,
    justifyContent: 'center',
  },
  label: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 24,
  },
  value: {
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#c0c0d0',
    borderRadius: 5,
    width: 100,
    height: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
  },
  buttonHover: {
    backgroundColor: '#a0a9d0',
  },
  userAgent: {
    backgroundColor: 'white',
    padding: 10,
  },
  userAgentString: {
    color: 'black',
    fontSize: 24,
  },
});

AppRegistry.registerComponent('NativeModulesSample', () => ModuleTest);
