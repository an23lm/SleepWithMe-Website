import React from 'react'
import './WhatsNewVersion.css'

class WhatsNewVersion extends React.Component {
    render() {
        return (
            <div className="WNVMain">
                <div className="WNVItem">
                    <div className="WNVTitle SerifFont">
                        Version{" "}
                        <sub>{this.props.version}</sub>
                    </div>
                    <div className="WNVDate">
                        {this.props.date}
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default WhatsNewVersion