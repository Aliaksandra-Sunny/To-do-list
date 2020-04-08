import React from 'react';

class TodoListFooter extends React.Component {

    state = {
        isHidden: false,
    };

    onShowFiltersClick = () => {
        this.setState({
                isHidden: false,
            }
        )
    };

    onHideFiltersClick = () => {
        this.setState({
                isHidden: true,
            }
        )
    };

    onAllFilterClick = () => {
        this.props.changeFilter("All", this.props.listId);
    };
    onCompletedFilterClick = () => {
        this.props.changeFilter("Completed", this.props.listId);
    };
    onActiveFilterClick = () => {
        this.props.changeFilter("Active", this.props.listId);
    };

    render = () => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";
        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <span onClick={this.onHideFiltersClick}>hide</span>}
                {this.state.isHidden && <span onClick={this.onShowFiltersClick}>show</span>}
                {
                    !this.state.isHidden &&
                    <div>
                        <button className={classForAll} onClick={this.onAllFilterClick}>All</button>
                        <button className={classForCompleted} onClick={this.onCompletedFilterClick}>Completed</button>
                        <button className={classForActive} onClick={this.onActiveFilterClick}>Active</button>
                    </div>
                }

            </div>
        );
    };
}

export default TodoListFooter;

