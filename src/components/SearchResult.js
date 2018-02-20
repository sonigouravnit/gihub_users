/**
 * Created by gouravsoni on 20/02/18.
 */


import React, {Component} from 'react';
import '../css/userSearchResult.css';
import restUtil, {urlsConfig} from '../restUtil'

class UserSearchResult extends Component {
    constructor() {
        super();

        this.eachUser = function (item, index) {
            return (
                <UserSearchResultBox key={index}>
                    {item}
                </UserSearchResultBox>
            );
        }
    }


    render() {
        if (this.props.userResult.total_count !== -1) {

            return (
                <div>
                    <div>
                        <b>Total Results : {this.props.userResult.total_count}</b>
                    </div>
                    <div className="UserSearchResult">
                        {this.props.userResult.items.map(this.eachUser)}
                    </div>
                </div>);
        } else {
            return ( <div/>)
        }


    }
}

class UserSearchResultBox extends Component {

    constructor() {
        super();
        this.showUserDetails = function (item) {
            let restConfig = {
                method: urlsConfig.SEARCH.method,
                url: item.target.dataset.user,
            };
            restUtil(restConfig).then(success => {

            }).catch(error => {

            });

        };
    }

    render() {
        return (
            <a href={"/user/" + this.props.children.login}>
                <figure >
                    <img src={this.props.children.avatar_url} alt={this.props.children.login}
                         data-user={this.props.children.url}
                         onClick={this.showUserDetails} className="userImage"/>
                    <figcaption>{this.props.children.login}</figcaption>
                </figure>
            </a>
        )
    }
}

export default UserSearchResult;
