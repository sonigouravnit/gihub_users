import React, {Component} from 'react';
import './css/search.css';
import restUtil, {urlsConfig} from './restUtil'
import  UserSearchResult from './components/SearchResult'

class App extends Component {

    constructor() {
        super();
        this.state = {
            userName: '',
            userDetails: {
                total_count: -1,
                items: []
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchUser = this.searchUser.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    searchUser = function (event) {
        event.preventDefault();
        let restConfig = {
            method: urlsConfig.SEARCH.method,
            url: urlsConfig.SEARCH.url.replace(":userName", this.state.userName),
        };
        restUtil(restConfig).then(success => {
            console.log(success);
            this.setState({
                userDetails: success.data
            });
        }).catch(error => {
            window.alert(error.msg);
        });
        this.setState({
            userName: ''
        });

    };

    render() {
        return (
            <div className="App">
                <form onSubmit={this.searchUser} className="searchBar">
                    <input type="text" placeholder="User Name" required className="searchBox" name="userName"
                           value={this.state.userName}
                           onChange={this.handleChange}/>
                    <button type="submit" className="searchButton"> Search User</button>
                </form>
                <UserSearchResult userResult={this.state.userDetails}/>
            </div>
        );
    }
}

export default App;
