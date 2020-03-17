import React from 'react';
import PropTypes from "prop-types";

class AddNewItemForm extends React.Component {

    state = {
        error: true,
        title: "",
    };

    changeInput = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value,
        });
    }

    onEnterPress = (e) => {
        if (e.key === "Enter")
            this.onAddItemClick();
    }

    onAddItemClick = () => {
        if (this.state.title !== "") {
            let newText = this.state.title;
            this.setState({
                error: true,
                title: "",
            })
            this.props.addItem(newText);
        } else {
            this.setState({
                error: false,
            });
        }
    };

    render = () => {
        return (
            <div className="input">
                    <input onKeyPress={this.onEnterPress} onChange={this.changeInput}
                           className={this.state.error === true ? "error" : ""}
                           value={this.state.title}
                           type="text"/>
                <button onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }
};

export default AddNewItemForm;

AddNewItemForm.propTypes = {
    func: PropTypes.func
};