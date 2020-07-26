import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import ChatHistory from './ChatHistory/ChatHistory';
import SendMessage from './SendMessage/SendMessage';
import Divider from 'material-ui/Divider';

class Chat extends Component {
    render() {
        const styles = {
            height: 500,
            width: 290,
            textAlign: 'center',
            // margin: '10px auto',
            position: 'relative'
        };

        return (
            <Paper style={styles} zDepth={2} >
                <ChatHistory />
                <Divider />
                <SendMessage />
            </Paper>
        );
    }

}

export default Chat;

