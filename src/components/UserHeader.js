import React from 'react';
import { connect } from 'react-redux';

class UserHeader extends React.Component{

    render(){
        const { user } = this.props;
        if(!user) return null; 

        return (
            <div className="header">
                { user.name }
            </div>
        );
    }
}

const matchStateToProps = (state, ownProps) => {
    const user = ownProps.userId in state.users ? state.users[ownProps.userId] : null;
    return { user };
}

export default connect(matchStateToProps)(UserHeader);