import React from 'react';
import './App.css';

//quickReads App
class App extends React.Component {
    constructor(props) {
        super(props);

        // todo: remove
        // ********** FOR TESTING ONLY ***********
        const useTestData = true;
        const testData = [
            { displayName: "React", url: "https://reactjs.org/", timeStamp: new Date(2020, 2, 3, 20, 0, 8, 0), isFavorite: false, isImportant: true, isComplete: false },
            { displayName: "Css Facts", url: "https://www.sitepoint.com/12-little-known-css-facts/", timeStamp: new Date(2020, 0, 3, 18, 0, 0, 0), isFavorite: true, isImportant: false, isComplete: false },
            { displayName: "Area under curve", url: "https://www.youtube.com/watch?v=OaCVdzr3MjM", timeStamp: new Date(2020, 0, 29, 20, 0, 8, 0), isFavorite: false, isImportant: false, isComplete: false },
            { displayName: "ColorPicker", url: "https://htmlcolorcodes.com/color-picker/", timeStamp: Date.now(), isFavorite: false, isImportant: false, isComplete: true },
        ];
        const initialReads = useTestData ? testData : [];
        // *****************************************

        this.state = {
            reads: initialReads
        };

        this.onAddNewRead = this.onAddNewRead.bind(this);
        this.onSaveEditRead = this.onSaveEditRead.bind(this);
        this.onDeleteRead = this.onDeleteRead.bind(this);
        this.onCompleteRead = this.onCompleteRead.bind(this);
        this.onFaveButtonPress = this.onFaveButtonPress.bind(this);
        this.onImportantButtonPress = this.onImportantButtonPress.bind(this);
        this.updateFlair = this.updateFlair.bind(this);
    }

    // Add a new read with given url and displayName
    onAddNewRead(url, displayName) {
        this.setState((state) => ({ initialized: true, reads: [{ displayName: displayName, url: url, timeStamp: new Date(), isFavorite: false, isImportant: false, isComplete: false }, ...state.reads] }));
    }

    // Update an edited read
    onSaveEditRead(index, url, displayName) {
        this.setState((state) => {
            const updatedReads = [...state.reads];
            updatedReads[index].url = url || updatedReads[index].url;
            updatedReads[index].displayName = displayName || updatedReads[index].displayName;
            return { reads: updatedReads };
        });
    }

    // Delete the read at index
    onDeleteRead(index) {
        this.setState((state) => ({ reads: state.reads.slice(0, index).concat(state.reads.slice(index + 1)) }));
    }

    // Mark the read at index as completed
    onCompleteRead(index) {
        this.setState((state) => {
            const updatedReads = [...state.reads];
            updatedReads[index].timeStamp = new Date();
            updatedReads[index].isComplete = true;
            updatedReads.sort((read1, read2) => read2.timeStamp - read1.timeStamp);
            return { reads: updatedReads };
        });
    }

    // Update "favorite" status of the read at index
    onFaveButtonPress(index) {
        this.updateFlair(index, "isFavorite");
    }

    // Update "important" status of the read at index
    onImportantButtonPress(index) {
        this.updateFlair(index, "isImportant");
    }

    // Update the status of the specified "flair" property of the read at index
    updateFlair(index, propertyName) {
        this.setState((state) => {
            const updatedReads = [...state.reads];
            updatedReads[index][propertyName] = !updatedReads[index][propertyName];
            return { reads: updatedReads };
        });
    }

    // Render the full app
    render() {
        return (
            <div className="appContainer">
                <div className="toolbar">
                    <Logo />
                    <NewRead animate={this.state.reads.length === 0} onSave={this.onAddNewRead} />
                </div>

                {/*Display either a welcome message or filters and the list of reads depending on whether there is any data to display*/}
                {this.state.reads.length === 0 ?
                    <div class="message">
                        <p> Welcome to <span class="logoSmall">quickReads</span>, a tool to keep track of articles, tutorials, and other webpages that you'd like to visit later!</p>
                        <p> <span class="logoSmall">Reads</span> that you have saved will appear here. </p>
                        <p> Add a new <span class="logoSmall">read</span> above to get started!</p>
                    </div> :
                    <ReadList onSaveEditRead={this.onSaveEditRead} onDeleteRead={this.onDeleteRead} onCompleteRead={this.onCompleteRead} onFaveButtonPress={this.onFaveButtonPress} onImportantButtonPress={this.onImportantButtonPress} reads={this.state.reads} />
                }
            </div>);
    }
}

// Component representing a list of Read items
class ReadList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterActive: false,
            filterCompleted: false,
            filterFavorites: false,
            filterImportant: false
        };

        this.onViewActivePress = this.onViewActivePress.bind(this);
        this.onViewCompletedPress = this.onViewCompletedPress.bind(this);
        this.onClearFiltersPress = this.onClearFiltersPress.bind(this);
        this.onFilterFavoritesPress = this.onFilterFavoritesPress.bind(this);
        this.onFilterImportantPress = this.onFilterImportantPress.bind(this);
    }

    // Handle user pressing the "View Active" filter
    onViewActivePress() {
        this.setState((state) => ({ filterActive: !state.filterActive }));
    }

    // Handle user pressing the "View Completed" filter
    onViewCompletedPress() {
        this.setState((state) => ({ filterCompleted: !state.filterCompleted }));
    }

    // Handle user pressing the "View all" filter
    onClearFiltersPress() {
        this.setState({
            filterCompleted: false,
            filterActive: false,
            filterFavorites: false,
            filterImportant: false
        });
    }

    // Handle user pressing the favorites filter
    onFilterFavoritesPress() {
        this.setState((state) => ({ filterFavorites: !state.filterFavorites }));
    }

    // Handle user pressing the important filter
    onFilterImportantPress() {
        this.setState((state) => ({ filterImportant: !state.filterImportant }));
    }

    // Filter function for identifying important reads
    importantFilter(read) {
        return read.isImportant;
    }

    // Filter function for identifying favorite reads
    favoriteFilter(read) {
        return read.isFavorite;
    }

    // Create a list of Read components from a list of reads data
    createReads(readsData) {
        return readsData.map(
            (item) => <Read uniqueKey={"Read" + item.readIndex} read={item} onSaveEditRead={this.props.onSaveEditRead} onDeleteRead={this.props.onDeleteRead} onCompleteRead={this.props.onCompleteRead} onFaveButtonPress={this.props.onFaveButtonPress} onImportantButtonPress={this.props.onImportantButtonPress} />);
    }

    // Render the list of reads taking into account filter settings
    render() {
        // Keep track of each read's index in the full list of reads.
        let preparedReads = this.props.reads.map((read, index) => ({ ...read, readIndex: index }));

        // If both OR no filters are selected, display all.
        const viewAllStatuses = this.state.filterActive === this.state.filterCompleted;
        const viewAllFlair = !(this.state.filterFavorites || this.state.filterImportant);

        let filteredReads = [];
        let activeReads = [];
        let completedReads = [];

        // Filter the list of reads by "flair" based on applied filters
        if (viewAllFlair) {
            filteredReads = preparedReads;
        }
        else {
            if (this.state.filterFavorites) {
                filteredReads = filteredReads.concat(preparedReads.filter(this.favoriteFilter));
            }
            if (this.state.filterImportant) {
                filteredReads = filteredReads.concat(preparedReads.filter(this.importantFilter));
            }
        }

        // Create active and completed read components to display from the filtered list
        if (viewAllStatuses || this.state.filterActive) {
            activeReads = this.createReads(filteredReads.filter((read) => !read.isComplete));
        }
        if (viewAllStatuses || this.state.filterCompleted) {
            completedReads = this.createReads(filteredReads.filter((read) => read.isComplete));
        }

        return (
            <div className="readListContainer">
                <Filters onViewActivePress={this.onViewActivePress} filterActive={this.state.filterActive} onViewCompletedPress={this.onViewCompletedPress} filterCompleted={this.state.filterCompleted} onClearFiltersPress={this.onClearFiltersPress} onFilterFavoritesPress={this.onFilterFavoritesPress} onFilterImportantPress={this.onFilterImportantPress} filterFavorites={this.state.filterFavorites} filterImportant={this.state.filterImportant} />

                {(activeReads.length === 0 && completedReads.length === 0) ?
                    <p className="message">Nothing to show here!</p> : null}

                {activeReads.length > 0 ?
                    <div className="readList activeReadList">
                        <h2>To Read:</h2>
                        {activeReads}
                    </div> : null}
                {completedReads.length > 0 ?
                    <div className="readList completedReadList">
                        <h2>Completed Reads:</h2>
                        {completedReads}
                    </div> : null
                }
            </div>
        );
    }
}

// Component for single entry in the list of articles to read
class Read extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false
        };

        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleFaveButtonPress = this.handleFaveButtonPress.bind(this);
        this.handleImportantButtonPress = this.handleImportantButtonPress.bind(this);
    }

    // Handle saving edits to the read
    handleSaveEdit(newUrl, newDisplayName) {
        this.props.onSaveEditRead(this.props.read.readIndex, newUrl, newDisplayName);
        this.setState({ editMode: false });
    }

    // Handle cancelling an edit
    handleCancelEdit() {
        this.setState({ editMode: false });
    }

    // Handle editing a read
    handleEdit() {
        this.setState({ editMode: true });
    }

    // Handle deleting the read
    handleDelete() {
        this.props.onDeleteRead(this.props.read.readIndex);
    }

    // Handle marking a read as completed
    handleComplete() {
        this.props.onCompleteRead(this.props.read.readIndex);
    }

    // Handle toggling the "favorite" status of the read
    handleFaveButtonPress() {
        this.props.onFaveButtonPress(this.props.read.readIndex);
    }

    // Handle toggling the "important" status of the read
    handleImportantButtonPress() {
        this.props.onImportantButtonPress(this.props.read.readIndex);
    }

    // Render the Read component
    render() {
        return (
            <div className="readItemContainer">
                {/* Display the edit popup if in edit mode */}
                {
                    this.state.editMode ?
                        <EditRead displayName={this.props.read.displayName} url={this.props.read.url} onSave={this.handleSaveEdit} onCancel={this.handleCancelEdit} /> :
                        null
                }
            <div key={this.props.uniqueKey} className={"readItem" + (this.state.editMode ? " editMode" : "")}>
                <a href={this.props.read.url} target="_blank" rel="noopener noreferrer" >
                    <div className="readInfo">
                        <p className="readName" >{this.props.read.displayName || this.props.read.url}</p>
                        <ReadTimeStamp timeStamp={this.props.read.timeStamp} />
                    </div>
                </a>
                <div className="readAction">
                    <div className="readFlair">
                        <IconButton buttonClass="flairButton" iconClass="favorite" iconName={this.props.read.isFavorite ? "star" : "star_border"} tooltip={this.props.read.isFavorite ? "Unfavorite" : "Favorite"} onButtonPress={this.handleFaveButtonPress} />
                        <IconButton buttonClass="flairButton" iconClass="important" iconName={this.props.read.isImportant ? "bookmark" : "bookmark_border"} tooltip={this.props.read.isImportant ? "Make not important" : "Make Important"} onButtonPress={this.handleImportantButtonPress} />
                    </div>

                    <IconButton buttonClass="readButton" iconClass="buttonIcon" iconName="clear" tooltip="Delete" onButtonPress={this.handleDelete} />
                    <IconButton buttonClass="readButton" iconClass="buttonIcon" iconName="edit" tooltip="Edit" onButtonPress={this.handleEdit} />
                    {/* If the read is not yet completed, display a button to complete it*/}
                    {
                        !this.props.read.isComplete ?
                        <IconButton buttonClass="readButton" iconClass="buttonIcon" iconName="done" tooltip="Done" onButtonPress={this.handleComplete} /> :
                            null
                    }
                </div>
                </div>
                </div>);
    }
}

// Component representing the timestamp of a Read
class ReadTimeStamp extends React.Component {
    constructor(props) {
        super(props);
    }

    // Determine the display text depending on how long ago the read was added/completed
    getDisplayText(timeStamp) {
        let displayText;
        const minsAge = (Date.now() - this.props.timeStamp) / 60000;

        if (minsAge < 1) {
            displayText = "just now";
        }
        else if (minsAge < 60) {
            const mins = Math.floor(minsAge);
            displayText = mins + (mins > 1 ? " minutes" : " minute") + " ago";
        }
        else if (minsAge < 1440) {
            const hours = Math.floor(minsAge / 60);
            displayText = hours + (hours > 1 ? " hours" : " hour") + " ago";
        }
        else {
            const days = Math.floor((minsAge / 60) / 24);
            displayText = days + (days > 1 ? " days" : " day") + " ago";
        }
        return displayText;
    }

    // Render the timestamp message
    render() {
        return (
            <div className="timeStamp">
                <p>{this.getDisplayText(this.props.timeStamp)}</p>
            </div>);
    }
}

// Component for user input of reads
class ReadInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url || "" ,
            displayName: this.props.displayName || "",
            errorMessage: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUrlInput = this.handleUrlInput.bind(this);
        this.handleDisplayNameInput = this.handleDisplayNameInput.bind(this);
    }

    // Handle submitting the form
    handleSubmit(event) {
        event.preventDefault();

        // Check if url is required and present
        if (this.props.requireUrl && !this.state.url) {
            this.setState({ errorMessage: "Url is required" });
        }
        else {
            this.props.submitHandler(this.state.url, this.state.displayName);
            this.setState({ url: "", displayName: "", errorMessage: "" });
        }
    }

    // Update state based on user input in the controlled url field
    handleUrlInput(event) {
        this.setState({ url: event.target.value, errorMessage: "" });
    }

    // Update state based on user input in the controlled display name field
    handleDisplayNameInput(event) {
        this.setState({ displayName: event.target.value });
    }

    // Render the "add new" input box
    render() {
        return (
            <div className={this.props.styles}>
                <form onSubmit={this.handleSubmit}>
                    <p>{this.props.label}</p>
                    <input type="url" id="urlInput" placeholder="Enter url" value={this.state.url} onChange={this.handleUrlInput} />
                    <input type="text" placeholder="Enter display name" value={this.state.displayName} onChange={this.handleDisplayNameInput} />

                    {/*Include a cancel button if a handler is provided*/}
                    {
                        this.props.handleCancel ?
                        <button type="button" className="appButton" onClick={this.props.handleCancel}>Cancel</button> :
                            null
                    }
                    <input type="submit" className="appButton" value={this.props.submitButtonName} />
                    <p className={"errorMessage" + (this.state.errorMessage ? "" : " hidden" )}>{"! " + this.state.errorMessage }</p>
                </form>
            </div>
        );
    }
}

// Component for user input of a new read. 
// Returns a ReadInput component.
function NewRead(props) {
    return (
        <ReadInput styles={"newRead" + (props.animate ? " shake" : "")} label="Add a new read" requireUrl={true} submitButtonName="Add" submitHandler={props.onSave} />
        );
}

// Component for editing a read. 
// Returns a ReadInput component.
function EditRead(props) {
    return (
        <div className="lock">
            <ReadInput styles="editRead" label="Edit read" submitButtonName="Save" displayName={props.displayName} url={props.url} submitHandler={props.onSave} handleCancel={props.onCancel} />
        </div>
    );
}

// Button with tooltip displaying an icon.
function IconButton(props) {
        return (
            <button type="button" className={props.buttonClass + " tooltipContainer"} onClick={props.onButtonPress}>
                <div className="tooltip">{props.tooltip}</div>
                <i className={props.iconClass + " material-icons"}>{props.iconName}</i>
            </button>
        );
}

// Filters to allow the user to adjust which reads are displayed
function Filters(props) {

    return (
        <div>
            <div className="filterGroup">
                <FilterButton uniqueKey="viewActive" displayName="View Active" isActive={props.filterActive} clickHandler={props.onViewActivePress} />

                <FilterButton uniqueKey="viewCompleted" displayName="View Completed" isActive={props.filterCompleted} clickHandler={props.onViewCompletedPress} />
            </div>

            <div className="filterGroup">
                <FilterButton uniqueKey="filterFavorites" displayName="Favorites" isActive={props.filterFavorites} clickHandler={props.onFilterFavoritesPress} />

                <FilterButton uniqueKey="filterImportant" displayName="Important" isActive={props.filterImportant} clickHandler={props.onFilterImportantPress} />
            </div>

            <div className="filterGroup">
                <FilterButton uniqueKey="clearFilters" displayName="Clear Filters" isActive={false} clickHandler={props.onClearFiltersPress} />
            </div>
        </div>
    )
}

// Button for applying/removing a filter
function FilterButton(props) {
    return (
        <button type="button" key={props.uniqueKey} className={props.isActive ? "activeFilterButton" : "filterButton"} onClick={props.clickHandler}>{props.displayName}</button>
    );
}

// Logo for the app
function Logo(props) {
    return (
        <div className="appLogo">
            <h1>quickReads</h1>
        </div>);
}

export default App;