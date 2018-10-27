// React
import React, {Component} from "react";
// Resources
import '../styles/CourseButton.css'

export default class CourseButton extends Component {
    constructor(props) {
        super(props)
        this.img = this.readImg(this.props.image)
    }

    readImg(image) {
        if (image.type === "svg") {
            let svgB64 = btoa(image.src)
            return <img className="Course-icon" alt={this.props.courseName} src={"data:image/svg+xml;base64," + svgB64} />
        }
    }

    render() {
        return (
            <div>
                <h3 className="Course-title">{this.props.courseName}</h3>
                <a id={"course-link-" + this.props.courseName} href={"courses/" + this.props.courseName}>
                    {this.img}
                </a>
                <br/>
                <br/>
            </div>
        )
    }
}