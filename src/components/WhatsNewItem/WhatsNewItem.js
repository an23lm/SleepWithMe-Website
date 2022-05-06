import React from 'react'
import './WhatsNewItem.css'
import bugIcon from '../../assets/bug-icon.svg'
import featureIcon from '../../assets/feature-icon.svg'
class WhatsNewItem extends React.Component {
    titleItem = () => {
        if (this.props.title) {
            return (
                <div className="WNITitle">
                    {this.props.title}
                </div>
            )
        } else {
            return ""
        }
    }
    render() {
        return (
            <div className="WNIItem">
                <img 
                    className="WNIIcon"
                    src={this.props.isFeature ? featureIcon : bugIcon} 
                    alt="icon" />
                <div className="WNIDescriptor">
                    {this.titleItem()}
                    <div className="WNIDescription">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default WhatsNewItem
