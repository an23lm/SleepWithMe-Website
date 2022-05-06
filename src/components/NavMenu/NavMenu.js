import React from 'react';
import './NavMenu.css';

class NavMenu extends React.Component {
    menuItemOnClick(e) {

    }

    render() {
        return (
            <div className={this.props.className + " NavMenu"}>
                {this.props.items.map((item, index) => {
                    return (
                        <div className="NavMenuItem" key={index}
                            itemindex={index} isselected="false"
                            onClick={this.menuItemOnClick.bind(this)}>
                            <div className="NavMenuItemSelector" />
                            <div className="NavMenuItemText">{item}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default NavMenu
