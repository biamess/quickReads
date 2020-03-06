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
                <Toolbar onAddNewRead={this.onAddNewRead} />

                {/*Display either a welcome message or filters and the list of reads depending on whether there is any data to display*/}
                {this.state.reads.length == 0 ?
                    <div class="message">
                        <p> Welcome to <span class="logoSmall">quickReads</span>, a tool to keep track of articles, tutorials, and other webpages that you'd like to visit later!</p>
                        <p> <span class="logoSmall">Reads</span> that you have saved will appear here. </p>
                        <p> Add a new <span class="logoSmall">read</span> above to get started!</p>
                    </div> :
                    <ReadList onDeleteRead={this.onDeleteRead} onCompleteRead={this.onCompleteRead} onFaveButtonPress={this.onFaveButtonPress} onImportantButtonPress={this.onImportantButtonPress} reads={this.state.reads} />
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
            (item) => <Read key={"Read" + item.readIndex} readIndex={item.readIndex} displayName={item.displayName} url={item.url} timeStamp={item.timeStamp} isImportant={item.isImportant} isFavorite={item.isFavorite} isComplete={item.isComplete} onDeleteRead={this.props.onDeleteRead} onCompleteRead={this.props.onCompleteRead} onFaveButtonPress={this.props.onFaveButtonPress} onImportantButtonPress={this.props.onImportantButtonPress} />);
    }

    // Render the list of reads taking into account filter settings
    render() {
        // Keep track of each read's index in the full list of reads.
        let preparedReads = this.props.reads.map((read, index) => ({ ...read, readIndex: index }));

        // If both OR no filters are selected, display all.
        const viewAllStatuses = this.state.filterActive == this.state.filterCompleted;
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

                {(activeReads.length == 0 && completedReads.length == 0) ?
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
        this.handleDeleteRead = this.handleDeleteRead.bind(this);
        this.handleCompleteRead = this.handleCompleteRead.bind(this);
        this.handleFaveButtonPress = this.handleFaveButtonPress.bind(this);
        this.handleImportantButtonPress = this.handleImportantButtonPress.bind(this);
    }

    // Handle deleting the read
    handleDeleteRead() {
        this.props.onDeleteRead(this.props.readIndex);
    }

    // Handle marking a read as completed
    handleCompleteRead() {
        this.props.onCompleteRead(this.props.readIndex);
    }

    // Handle toggling the "favorite" status of the read
    handleFaveButtonPress() {
        this.props.onFaveButtonPress(this.props.readIndex);
    }

    // Handle toggling the "important" status of the read
    handleImportantButtonPress() {
        this.props.onImportantButtonPress(this.props.readIndex);
    }

    // Render the Read component
    render() {
        return (
            <div className="readItem">

                <a href={this.props.url} target="_blank">
                    <div className="readInfo">
                        <p className="readName" >{this.props.displayName || this.props.url}</p>
                        <ReadTimeStamp timeStamp={this.props.timeStamp} />
                    </div>
                </a>
                <div className="readAction">
                    <div className="readFlair">
                        <FlairButton key="faveButton" buttonClass="favorite" tooltip={this.props.isFavorite ? "Unfavorite" : "Favorite"} onFlairButtonPress={this.handleFaveButtonPress} iconName={this.props.isFavorite ? "star" : "star_border"} />
                        <FlairButton key="importantButton" buttonClass="important" tooltip={this.props.isImportant ? "Unimportant" : "Important"} onFlairButtonPress={this.handleImportantButtonPress} iconName={this.props.isImportant ? "bookmark" : "bookmark_border"} />
                    </div>

                    <button className="readButton" type="button" onClick={this.handleDeleteRead}>
                        <i className="buttonIcon material-icons">clear</i>
                        Delete
          </button>

                    {/* If the read is not yet completed, display a button to complete it*/}
                    {!this.props.isComplete ?
                        <button className="readButton" type="button" onClick={this.handleCompleteRead}>
                            <i className="buttonIcon material-icons">done</i>
                            Complete
            </button> :
                        null}
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

// Component for user input of new reads
class ReadInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            displayName: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUrlInput = this.handleUrlInput.bind(this);
        this.handleDisplayNameInput = this.handleDisplayNameInput.bind(this);
    }

    // Handle submitting the new read form
    handleSubmit(event) {
        event.preventDefault();

        // Only add if url is provided
        if (this.state.url) {
            this.props.onAddNewRead(this.state.url, this.state.displayName);
            this.setState({ url: "", displayName: "" });
        }
    }

    // Update state based on user input in the controlled url field
    handleUrlInput(event) {
        this.setState({ url: event.target.value });
    }

    // Update state based on user input in the controlled display name field
    handleDisplayNameInput(event) {
        this.setState({ displayName: event.target.value });
    }

    // Render the "add new" input box
    render() {
        return (
            <div id="addNewRead" className="addNew">
                <form onSubmit={this.handleSubmit}>
                    <p>Add a new read</p>
                    <input type="url" id="urlInput" placeholder="enter url" value={this.state.url} onChange={this.handleUrlInput} />
                    <input type="text" placeholder="enter display name" value={this.state.displayName} onChange={this.handleDisplayNameInput} />
                    <input type="submit" className="appButton" value="Add" />
                </form>
            </div>);
    }
}

// Buttons which allow a user to mark a read with "flair", such as "liked" or "important"
class FlairButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    // Handle toggling the flair button.
    // Behavior is provided by parent.
    handleClick(event) {
        this.props.onFlairButtonPress();
    }

    // Render the Flair button
    render() {
        return (
            <div className="tooltipContainer flairButton" onClick={this.handleClick}>
                <div className="tooltip">{this.props.tooltip}</div>
                <i className={this.props.buttonClass + " material-icons"}>{this.props.iconName}</i>
            </div>
        );
    }
}

// Main toolbar for the app
function Toolbar(props) {
    return (
        <div className="toolbar">
            <Logo />
            <ReadInput onAddNewRead={props.onAddNewRead} />
        </div>);
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